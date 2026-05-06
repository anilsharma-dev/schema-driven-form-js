import { renderForm } from "./core/renderer.js";

const schema = [
  {
    type: "text",
    name: "username",
    label: "Username",
    required: true,
    minLength: 5,
    custom: (value) => {
      if (value === "admin") {
        return "This username is not allowed";
      }
      return "";
    }
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    required: true,
    email: true
  },
  {
    type: "textarea", // 🔥 नया
    name: "bio",
    label: "Bio"
  },
  {
    type: "select", // 🔥 नया
    name: "role",
    label: "Role",
    options: [
      { label: "User", value: "user" },
      { label: "Admin", value: "admin" }
    ]
  },
  {
    type: "checkbox", // 🔥 नया
    name: "agree",
    label: "Agree to terms"
  }
];

renderForm(schema);