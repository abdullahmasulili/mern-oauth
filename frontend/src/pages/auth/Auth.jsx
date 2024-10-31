import { useSearchParams } from "react-router-dom";
import LoginForm from "../../components/AuthForm/LoginForm";

import classes from "./Auth.module.css";
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
        <LoginForm onSwitchRegister={handleSwitchForm} />
      ) : (
        <RegisterForm onSwitchLogin={handleSwitchForm} />
      )}
    </main>
  );
}
