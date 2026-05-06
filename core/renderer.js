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


// Main render function
export function renderForm(schema) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const form = document.createElement("form");

  schema.forEach(field => {
    const wrapper = document.createElement("div");
    wrapper.className = "form-group";

    const label = document.createElement("label");
    label.innerText = field.label;

    const input = createField(field);

    const errorText = document.createElement("small");
    errorText.style.color = "red";

    // Input handling + validation
    input.addEventListener("input", (e) => {
      let value;

      if (field.type === "checkbox") {
        value = e.target.checked;
      } else {
        value = e.target.value;
      }

      // update state
      store.set(field.name, value);

      // validation
      const error = validateField(field, value);
      errorText.innerText = error;
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(errorText);

    form.appendChild(wrapper);
  });

  // Submit handler
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