import { store } from "./store.js";

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

    // 🔥 MAIN PART
    input.addEventListener("input", (e) => {
      store.set(field.name, e.target.value);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    form.appendChild(wrapper);
  });

  // submit handle
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