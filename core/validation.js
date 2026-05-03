export function validateField(field, value) {
  let error = "";

  if (field.required && !value) {
    error = "This field is required";
  }

  if (field.minLength && value.length < field.minLength) {
    error = `Minimum ${field.minLength} characters required`;
  }

  return error;
}