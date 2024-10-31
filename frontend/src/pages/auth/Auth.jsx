import { useSearchParams } from "react-router-dom";

import classes from "./Auth.module.css";
import { loginSchema, registerSchema } from "../../util/Validations.js";

import LoginForm from "../../components/AuthForm/LoginForm";
import RegisterForm from "../../components/AuthForm/RegisterForm";

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  function handleSwitchForm(mode) {
    setSearchParams({ mode });
  }

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
