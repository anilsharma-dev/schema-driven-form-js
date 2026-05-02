import { renderForm } from "./core/renderer.js";

const schema = [
  {
    type: "text",
    name: "username",
    label: "Username"
  },
  {
    type: "email",
    name: "email",
    label: "Email"
  },
  {
    type: "password",
    name: "password",
    label: "Password"
  },
  { type: "text",
    name: "city",
    label: "City" 
  }
];

renderForm(schema);