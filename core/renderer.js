export function renderForm(schema) {
  const app = document.getElementById("app");

  const form = document.createElement("form");

  schema.forEach(field => {
    const wrapper = document.createElement("div");
    wrapper.className = "form-group";

    const label = document.createElement("label");
    label.innerText = field.label;

    const input = document.createElement("input");
    input.type = field.type;
    input.name = field.name;

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    form.appendChild(wrapper);
  });

  const button = document.createElement("button");
  button.type = "submit";
  button.innerText = "Submit";

  form.appendChild(button);

  app.appendChild(form);
}