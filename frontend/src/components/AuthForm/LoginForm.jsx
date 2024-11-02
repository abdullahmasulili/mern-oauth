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
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import classes from "./styles.module.css";
import { handleLoginWithEmailAndPassword } from "../../util/FirebaseAuth";
import { useUser } from "../../hooks";

const initialValues = {
  email: "",
  password: "",
};

export default function AuthForm({ onSwitchRegister, validationSchema }) {
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies([
    "accessToken",
    "uid",
    "emailVerified",
  ]);
  const navigate = useNavigate();
  const { setAccessToken, setCurrentUser } = useUser();

  async function onSubmitHandler(values) {
    const { email, password } = values;
    try {
      const { accessToken, data: userData } =
        await handleLoginWithEmailAndPassword(email, password);

      setCookie("accessToken", accessToken);
      setCookie("uid", userData.firebase_uid);
      setCookie("emailVerified", userData.email_verified);
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
          <Button type="submit" variant="outlined" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : "Log In"}
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
            onClick={() => onSwitchRegister("register")}
            disabled={isSubmitting}
          >
            Don&apos;t Have An Account?
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
