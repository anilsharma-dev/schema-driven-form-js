import { renderForm } from "./core/renderer.js";

const schema = [

  {
    type: "text",
    name: "username",
    label: "Username",

    required: true,
    minLength: 5,

    // Custom validator
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
    type: "textarea",
    name: "bio",
    label: "Bio"
  },


  {
    type: "select",
    name: "role",
    label: "Role",

    options: [
      { label: "User", value: "user" },
      { label: "Admin", value: "admin" }
    ]
  },


  // NEW: Conditional field (Day 7)
  {
    type: "text",
    name: "adminCode",
    label: "Admin Code",

    showIf: {
      field: "role",
      value: "admin"
    }
  },


  {
    type: "checkbox",
    name: "agree",
    label: "Agree to terms"
  }

];

renderForm(schema);