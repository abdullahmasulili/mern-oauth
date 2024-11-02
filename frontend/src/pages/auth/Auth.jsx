/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";

import classes from "./Auth.module.css";
import { loginSchema, registerSchema } from "../../util/Validations.js";

import LoginForm from "../../components/AuthForm/LoginForm";
import RegisterForm from "../../components/AuthForm/RegisterForm";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function AuthPage() {
  const [cookie, setCookie, removeCookie] = useCookies(
    "accessToken",
    "uid",
    "emailVerified"
  );
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  function handleSwitchForm(mode) {
    setSearchParams({ mode });
  }

  useEffect(() => {
    if (cookie.accessToken) {
      navigate("/dashboard");
    }
  }, [cookie.accessToken, navigate]);

  return (
    <main className={classes.container}>
      {isLogin ? (
        <LoginForm
          onSwitchRegister={handleSwitchForm}
          validationSchema={loginSchema}
        />
      ) : (
        <RegisterForm
          onSwitchLogin={handleSwitchForm}
          validationSchema={registerSchema}
        />
      )}
    </main>
  );
}
