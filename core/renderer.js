import { store } from "./store.js";
import { validateField } from "./validation.js";

export function renderForm(schema) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const form = document.createElement("form");

  schema.forEach(field => {
    const wrapper = document.createElement("div");
    wrapper.className = "form-group";

    const label = document.createElement("label");
    label.innerText = field.label;

    const input = document.createElement("input");
    input.type = field.type;
    input.name = field.name;

    const errorText = document.createElement("small");
    errorText.style.color = "red";

    input.addEventListener("input", (e) => {
      const value = e.target.value;

      store.set(field.name, value);

      // 🔥 VALIDATION
      const error = validateField(field, value);
      errorText.innerText = error;
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    wrapper.appendChild(errorText);

    form.appendChild(wrapper);
  });

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