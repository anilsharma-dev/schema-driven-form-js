import { store } from "./store.js";
import { validateField } from "./validation.js";

function createField(field) {

  let element;

  switch (field.type) {

    case "textarea":

      element = document.createElement("textarea");

      break;


    case "select":

      element = document.createElement("select");

      field.options.forEach(opt => {

        const option = document.createElement("option");

        option.value = opt.value;
        option.innerText = opt.label;

        element.appendChild(option);
      });

      break;


    case "checkbox":

      element = document.createElement("input");

      element.type = "checkbox";

      break;


    default:

      element = document.createElement("input");

      element.type = field.type;
  }

  element.name = field.name;

  return element;
}



// ADVANCED CONDITIONAL ENGINE
function shouldShowField(field) {

  // no condition
  if (!field.showIf) return true;

  const {
    mode,
    conditions
  } = field.showIf;


  // AND logic
  if (mode === "AND") {

    return conditions.every(cond => {

      return store.get(cond.field) === cond.value;
    });
  }


  // OR logic
  if (mode === "OR") {

    return conditions.some(cond => {

      return store.get(cond.field) === cond.value;
    });
  }


  return true;
}



// MAIN RENDERER
export function renderForm(schema) {

  const app = document.getElementById("app");

  app.innerHTML = "";

  const form = document.createElement("form");


  schema.forEach(field => {

    // conditional rendering
    const visible = shouldShowField(field);


    // remove hidden field value
    if (!visible) {

      store.remove(field.name);

      return;
    }

    const wrapper = document.createElement("div");

    wrapper.className = "form-group";


    // Label
    const label = document.createElement("label");

    label.innerText = field.label;


    // Dynamic field
    const input = createField(field);


    // restore saved value
    const savedValue = store.get(field.name);

    if (savedValue !== undefined) {

      if (field.type === "checkbox") {

        input.checked = savedValue;

      } else {

        input.value = savedValue;
      }
    }


    //  Error text
    const errorText = document.createElement("small");

    errorText.style.color = "red";


    // EVENT HANDLING
    input.addEventListener("input", (e) => {

      let value;

      if (field.type === "checkbox") {

        value = e.target.checked;

      } else {

        value = e.target.value;
      }


      // save state
      store.set(field.name, value);


      // validation
      const error = validateField(field, value);

      errorText.innerText = error;
    });


    // ONLY re-render for select + checkbox
    if (
      field.type === "select" ||
      field.type === "checkbox"
    ) {

      input.addEventListener("change", () => {

        renderForm(schema);
      });
    }


    wrapper.appendChild(label);

    wrapper.appendChild(input);

    wrapper.appendChild(errorText);

    form.appendChild(wrapper);
  });



  // submit
  form.addEventListener("submit", (e) => {

    e.preventDefault();

    console.log("FINAL DATA:", store.data);
  });



  const button = document.createElement("button");

  button.type = "submit";

  button.innerText = "Submit";


  form.appendChild(button);

  app.appendChild(form);
}