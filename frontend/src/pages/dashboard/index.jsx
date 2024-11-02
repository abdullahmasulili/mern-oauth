import { Suspense, useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CircularProgress,
} from "@mui/material";

import { useUser } from "../../hooks";
import { fetchUsersByUID, handleSendVerificationEmail } from "../../util/Http";

import classes from "./styles.module.css";

import Sidebar from "../../components/UI/Sidebar";
import { handleLogout } from "../../util/FirebaseAuth";
import LoadingModal from "../../components/UI/LoadingModal";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setAccessToken } = useUser();

  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "uid",
    "emailVerified",
  ]);
  const accessToken = cookies.accessToken;
  const uid = cookies.uid;
  const emailVerified = cookies.emailVerified;

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth?mode=login");
    }
  }, [accessToken, navigate]);

  const resolveCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data: user } = await fetchUsersByUID(uid);

      if (!cookies.emailVerified) {
        setCookie("emailVerified", user.email_verified);
      }

      setCurrentUser(user);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [uid, setCurrentUser, setCookie, cookies]);

  useEffect(() => {
    if (!Object.hasOwn(currentUser, "email")) {
      resolveCurrentUser();
    }
  }, [currentUser, resolveCurrentUser, uid]);

  async function handleResendVerificationEmail() {
    setLoading(true);

    try {
      const result = await handleSendVerificationEmail(
        currentUser.email,
        accessToken
      );

      if (result?.error.code === "auth/id-token-expired") {
        setAccessToken(null);
        removeCookie("accessToken");
        removeCookie("uid");
        handleLogout();
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <>
      <Suspense>
        {emailVerified && !loading && <Sidebar />}
        {emailVerified && !loading && (
          <main>
            <Outlet />
          </main>
        )}
        {!emailVerified && !loading && (
          <main className={classes.container}>
            <Card>
              <CardHeader title="Please verify your email" />
              <CardActions>
                <Button onClick={handleResendVerificationEmail}>
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Resend Verification Link"
                  )}
                </Button>
              </CardActions>
            </Card>
          </main>
        )}
      </Suspense>
      <LoadingModal isOpen={loading} title="Please Wait." />
    </>
  );
}
