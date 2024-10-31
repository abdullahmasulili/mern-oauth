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

import { loginSchema as validationSchema } from "../../util/Validations";

const initialValues = {
  email: "",
  password: "",
};

export default function AuthForm({ onSwitchRegister }) {
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
      <CardHeader title="Log in to your account" />
      <form onSubmit={handleSubmit}>
        <CardContent className={classes.content}>
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
          <Button type="submit" variant="outlined">
            Log In
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
          <Button variant="text" onClick={() => onSwitchRegister("register")}>
            Don&apos;t Have An Account?
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
