export const validators = {

  required: (value) => {
    if (!value) return "This field is required";
    return "";
  },

  minLength: (value, length) => {
    if (!value) return "";

    if (value.length < length) {
      return `Minimum ${length} characters required`;
    }

    return "";
  },

  email: (value) => {
    if (!value) return "";

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(value)) {
      return "Invalid email format";
    }

    return "";
  },

  pattern: (value, regex) => {
    if (!value) return "";

    if (!regex.test(value)) {
      return "Invalid format";
    }

    return "";
  }
};


// Generic validation runner
export function validateField(field, value) {

  let error = "";

  // Custom validator support
  if (typeof field.custom === "function") {

    const result = field.custom(value);

    if (result) return result;
  }

  // Dynamic rule execution
  for (let rule in field) {

    if (validators[rule]) {

      const result = validators[rule](
        value,
        field[rule]
      );

      if (result) {
        error = result;
        break;
      }
    }
  }

  return error;
}