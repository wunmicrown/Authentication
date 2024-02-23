import * as yup from "yup";

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(4, "Minimum of four characters")
    .max(50, "Maximum of 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(4, "Minimum of four characters")
    .max(50, "Maximum of 50 characters"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]{8,}$/,
      "Password must be at least 8 characters long and contain only letters and numbers"
    )
    .required("Password is required"),
  newPassword: yup
    .string()
    .oneOf([yup.ref('confirmPassword'), null], 'Passwords must match')
    .matches(
      /^[a-zA-Z0-9]{8,}$/,
      "New password must be at least 8 characters long and contain only letters and numbers"
    )
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .matches(
      /^[a-zA-Z0-9]{8,}$/,
      "Confirm password must be at least 8 characters long and contain only letters and numbers"
    )
    .required("Confirm password is required"),
});
