import * as yup from "yup";

export const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(4, "First name must be at least 4 characters")
    .max(100, "First name cannot be more than 100 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(4, "Last name must be at least 4 characters")
    .max(100, "Last name cannot be more than 100 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot be more than 32 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
