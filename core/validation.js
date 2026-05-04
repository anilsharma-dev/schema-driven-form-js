export const validators = {
  required: (value) => {
    if (!value) return "This field is required";
    return "";
  },

  minLength: (value, length) => {
    if (value.length < length) {
      return `Minimum ${length} characters required`;
    }
    return "";
  }
};

export function validateField(field, value) {
  let error = "";

  for (let rule in field) {
    if (validators[rule]) {
      const result = validators[rule](value, field[rule]);

      if (result) {
        error = result;
        break;
      }
    }
  }

  return error;
}