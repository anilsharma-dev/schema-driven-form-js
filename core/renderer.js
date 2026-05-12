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



//  CONDITIONAL ENGINE
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



//  FULL FORM VALIDATION
function validateForm(schema) {

  let isValid = true;

  schema.forEach(field => {

    const visible = shouldShowField(field);

    if (!visible) return;

    const value = store.get(field.name) || "";

    const error = validateField(field, value);

    if (error) {

      isValid = false;
    }
  });

  return isValid;
}



//  MAIN RENDERER
export function renderForm(schema) {

  const app = document.getElementById("app");

  app.innerHTML = "";

  const form = document.createElement("form");



  schema.forEach(field => {

    const visible = shouldShowField(field);


    //  remove hidden field data
    if (!visible) {

      store.remove(field.name);

      return;
    }


    const wrapper = document.createElement("div");

    wrapper.className = "form-group";


    //  label
    const label = document.createElement("label");

    label.innerText = field.label;


    //  input
    const input = createField(field);


    //  RESTORE SAVED VALUE
    const savedValue = store.get(field.name);

    if (savedValue !== undefined) {

      if (field.type === "checkbox") {

        input.checked = savedValue;

      } else {

        input.value = savedValue;
      }
    }


    //  error
    const errorText = document.createElement("small");

    errorText.style.color = "red";



    //  COMMON CHANGE HANDLER
    const handleChange = (e) => {

      let value;

      if (field.type === "checkbox") {

        value = e.target.checked;

      } else {

        value = e.target.value;
      }


      //  save state
      store.set(field.name, value);


      //  validate
      const error = validateField(field, value);

      errorText.innerText = error;


      //  rerender conditional fields
      if (
        field.type === "select" ||
        field.type === "checkbox"
      ) {

        renderForm(schema);
      }
    };



    //  Correct event binding
    if (
      field.type === "select" ||
      field.type === "checkbox"
    ) {

      input.addEventListener("change", handleChange);

    } else {

      input.addEventListener("input", handleChange);
    }



    wrapper.appendChild(label);

    wrapper.appendChild(input);

    wrapper.appendChild(errorText);

    form.appendChild(wrapper);
  });




  //  submit button
  const button = document.createElement("button");

  button.type = "submit";

  button.innerText = "Submit";

  form.appendChild(button);




  //  status text
  const statusText = document.createElement("p");

  form.appendChild(statusText);




  //  submit handler
  form.addEventListener("submit", async (e) => {

    e.preventDefault();


    const valid = validateForm(schema);

    if (!valid) {

      statusText.innerText =
        "Please fix validation errors";

      return;
    }


    try {

      button.disabled = true;

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


      statusText.innerText =
        "Form submitted successfully ";


      //  reset store
      store.reset();


      //  rerender clean form
      renderForm(schema);

    } catch (error) {

      console.error(error);

      statusText.innerText =
        "Submission failed";

    } finally {

      button.disabled = false;
    }
  });



  app.appendChild(form);
}