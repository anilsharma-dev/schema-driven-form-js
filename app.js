import { renderForm } from "./core/renderer.js";


//  FORM SCHEMA
const schema = [

  //Username Field
  {
    type: "text",

    name: "username",

    label: "Username",

    required: true,

    minLength: 5,


    //  Custom Validator
    custom: (value) => {

      if (value === "admin") {

        return "This username is not allowed";
      }

      return "";
    }
  },



  // Email Field
  {
    type: "email",

    name: "email",

    label: "Email",

    required: true,

    email: true
  },



  // Textarea Field
  {
    type: "textarea",

    name: "bio",

    label: "Bio"
  },



  // Role Dropdown
  {
    type: "select",

    name: "role",

    label: "Role",

    options: [

      {
        label: "Select Role",
        value: ""
      },

      {
        label: "User",
        value: "user"
      },

      {
        label: "Admin",
        value: "admin"
      }
    ]
  },



  // Agree Checkbox
  {
    type: "checkbox",

    name: "agree",

    label: "Agree to terms"
  },



  // CONDITIONAL FIELD
  {
    type: "text",

    name: "adminCode",

    label: "Admin Code",


    // MULTI CONDITION
    showIf: {

      mode: "AND",

      conditions: [

        {
          field: "role",
          value: "admin"
        },

        {
          field: "agree",
          value: true
        }
      ]
    }
  }

];



// INITIAL RENDER
renderForm(schema);