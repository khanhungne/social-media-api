export const validateSignupForm = (values) => {
  const errors = {};

  if (!values.name || values.name.trim().length === 0) {
    errors.name = "Full Name is required.";
  }
  if (!values.username || values.username.trim().length < 5) {
    errors.username = "Username must be at least 5 characters.";
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
    errors.username = "Username can only contain letters, numbers, and underscores.";
  }
  if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};