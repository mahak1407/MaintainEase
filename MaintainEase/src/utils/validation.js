// src/utils/validation.js

export const isCharacterOnly = (value, min = 2, max = 50) => {
  const regex = /^[A-Za-z\s]+$/;
  if (!value) return "This field is required";
  if (!regex.test(value)) return "Only characters allowed";
  if (value.length < min) return `Must be at least ${min} characters`;
  if (value.length > max) return `Must not exceed ${max} characters`;
  return "";
};

export const isNumberOnly = (value, min = 1, max = 9999) => {
  const regex = /^[0-9]+$/;
  if (!value) return "This field is required";
  if (!regex.test(value)) return "Only numbers allowed";
  const numValue = parseInt(value);
  if (numValue < min) return `Value must be at least ${min}`;
  if (numValue > max) return `Value must not exceed ${max}`;
  return "";
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!regex.test(email)) return "Invalid email address";
  return "";
};

export const validatePhone = (phone, minLength = 10, maxLength = 15) => {
  if (!phone) return "Phone number required";
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < minLength) return `Phone number must be at least ${minLength} digits`;
  if (digitsOnly.length > maxLength) return `Phone number must not exceed ${maxLength} digits`;
  return "";
};

export const validatePassword = (password, minLength = 8, maxLength = 50) => {
  if (!password) return "Password required";
  if (password.length < minLength) return `Password must be at least ${minLength} characters`;
  if (password.length > maxLength) return `Password must not exceed ${maxLength} characters`;
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};