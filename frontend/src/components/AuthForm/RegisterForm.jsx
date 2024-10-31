/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  TextField,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";

import classes from "./styles.module.css";

import { registerSchema as validationSchema } from "../../util/Validations";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPass: "",
};

export default function RegisterForm({ onSwitchLogin }) {
  function onSubmitHandler(values) {
    console.log(values);
  }

  const { handleSubmit, errors, touched, values, handleChange, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: onSubmitHandler,
    });

  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: "#263238" }}
      className={classes.card}
    >
      <CardHeader title="Create your account" />
      <form onSubmit={handleSubmit}>
        <CardContent className={classes.content}>
          <TextField
            label="First Name"
            type="text"
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
          />
          {errors.firstName && touched.firstName && (
            <FormHelperText error>{errors.firstName}</FormHelperText>
          )}
          <TextField
            label="Last Name"
            type="text"
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
          />
          {errors.lastName && touched.lastName && (
            <FormHelperText error>{errors.lastName}</FormHelperText>
          )}
          <TextField
            label="Email"
            type="email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
          />
          {errors.email && touched.email && (
            <FormHelperText error>{errors.email}</FormHelperText>
          )}
          <TextField
            label="Password"
            type="password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
          />
          {errors.password && touched.password && (
            <FormHelperText error>{errors.password}</FormHelperText>
          )}

          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPass"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.confirmPass}
          />
          {errors.confirmPass && touched.confirmPass && (
            <FormHelperText error>{errors.confirmPass}</FormHelperText>
          )}
          <Button type="submit" variant="outlined">
            Register
          </Button>
          <Button
            type="button"
            variant="contained"
            color="info"
            endIcon={<GoogleIcon />}
          >
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="contained"
            color="info"
            endIcon={<FacebookIcon />}
          >
            Continue with Facebook
          </Button>
          <Button
            type="button"
            variant="text"
            onClick={() => onSwitchLogin("login")}
          >
            Already Have An Account?
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
