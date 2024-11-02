/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  FormHelperText,
  TextField,
} from "@mui/material";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import classes from "./styles.module.css";

import { handleRegisterWithEmailAndPassword } from "../../util/FirebaseAuth";

import { useUser } from "../../hooks";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPass: "",
};

export default function RegisterForm({ onSwitchLogin, validationSchema }) {
  const [cookie, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const { setAccessToken, setCurrentUser } = useUser();

  async function onSubmitHandler(values) {
    const { email, password, firstName, lastName } = values;
    try {
      const { accessToken, data: userData } =
        await handleRegisterWithEmailAndPassword(
          email,
          password,
          firstName,
          lastName
        );

      setCookie("accessToken", accessToken);
      setAccessToken(accessToken);
      setCurrentUser(userData);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  const {
    handleSubmit,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik({
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          {errors.confirmPass && touched.confirmPass && (
            <FormHelperText error>{errors.confirmPass}</FormHelperText>
          )}
          <Button type="submit" variant="outlined" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="info"
            endIcon={<GoogleIcon />}
            disabled={isSubmitting}
          >
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="contained"
            color="info"
            endIcon={<FacebookIcon />}
            disabled={isSubmitting}
          >
            Continue with Facebook
          </Button>
          <Button
            type="button"
            variant="text"
            onClick={() => onSwitchLogin("login")}
            disabled={isSubmitting}
          >
            Already Have An Account?
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
