import { renderForm } from "./core/renderer.js";

const schema = [
  {
    type: "text",
    name: "username",
    label: "Username",
    required: true,
    minLength: 3
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    required:true
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