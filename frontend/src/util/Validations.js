import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email Required").email("Invalid Email"),
  password: Yup.string().required("Password Required"),
});

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name Required").min(3),
  lastName: Yup.string().required("Last Name Required").min(3),
  email: Yup.string().required("Email Required").email("Invalid Email"),
  password: Yup.string()
    .required("Password Required")
    .min(8)
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Should Match")
    .required("Confirm Password Required"),
});
