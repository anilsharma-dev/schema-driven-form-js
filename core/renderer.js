import { store } from "./store.js";
import { validateField } from "./validation.js";


//  FIELD FACTORY
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



//  ADVANCED CONDITIONAL ENGINE
function shouldShowField(field) {

  if (!field.showIf) return true;

  const {
    mode,
    conditions
  } = field.showIf;


  if (mode === "AND") {

    return conditions.every(cond => {

      return store.get(cond.field) === cond.value;
    });
  }


  if (mode === "OR") {

    return conditions.some(cond => {

      return store.get(cond.field) === cond.value;
    });
  }


  return true;
}



//  MAIN FORM RENDERER
export function renderForm(schema) {

  const app = document.getElementById("app");

  app.innerHTML = "";

  const form = document.createElement("form");


  schema.forEach(field => {

    const visible = shouldShowField(field);


    //  cleanup hidden field state
    if (!visible) {

      store.remove(field.name);

      return;
    }


    const wrapper = document.createElement("div");

    wrapper.className = "form-group";


    //  Label
    const label = document.createElement("label");

    label.innerText = field.label;


    //  Dynamic field
    const input = createField(field);


    //  restore saved value
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


    //  INPUT HANDLING
    input.addEventListener("input", (e) => {

      let value;

      if (field.type === "checkbox") {

        value = e.target.checked;

      } else {

        value = e.target.value;
      }


      //  update state
      store.set(field.name, value);


      //  validation
      const error = validateField(field, value);

      errorText.innerText = error;
    });



    //  conditional re-render
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



  //  SUBMIT BUTTON
  const button = document.createElement("button");

  button.type = "submit";

  button.innerText = "Submit";


  form.appendChild(button);



  //  LOADING MESSAGE
  const statusText = document.createElement("p");

  form.appendChild(statusText);



  //  API SUBMIT
  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

      statusText.innerText = "Submitting...";


      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(store.data)
        }
      );


      if (!response.ok) {

        throw new Error("API request failed");
      }


      const result = await response.json();

      console.log("API RESPONSE:", result);

      statusText.innerText = "Form submitted successfully ✅";

    } catch (error) {

      console.error(error);

      statusText.innerText = "Submission failed ❌";
    }
  });



  app.appendChild(form);
}