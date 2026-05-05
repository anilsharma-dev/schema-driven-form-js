import { renderForm } from "./core/renderer.js";

const schema = [
  {
    type: "text",
    name: "username",
    label: "Username",
    required: true,
    custom: (value) => {
    if (value === "admin") {
      return "This username is not allowed";
    }
    return "";
  },
    minLength: 5
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    email:true,
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