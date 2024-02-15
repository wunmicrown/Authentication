import * as yup from "yup"

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("required")
    .max(10)
    .min(4, "minimum of four character"),
  lastName: yup
    .string()
    .required("required")
    .max(10)
    .min(4, "minimum of four character"),
  email: yup.string().email("valid email address").required("required"),
  password: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]{8,}$/,
      "Password must be at least 8 characters long and contain only letters and numbers"
    ),
});