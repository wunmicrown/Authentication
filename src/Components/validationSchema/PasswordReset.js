import * as yup from "yup";

export const passwordReset = yup.object({
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
