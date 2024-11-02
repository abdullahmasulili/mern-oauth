import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { useUser } from "../../hooks";
import { fetchUsersByUID } from "../../util/Http";

import Sidebar from "../../components/UI/Sidebar";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUser();

  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["accessToken", "uid"]);
  const accessToken = cookies.accessToken;
  const uid = cookies.uid;

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth?mode=login");
    }
  }, [accessToken, navigate]);

  const resolveCurrentUser = useCallback(async () => {
    try {
      const { data: user } = await fetchUsersByUID(uid);

      setCurrentUser(user);
    } catch (err) {
      console.error(err);
    }
  }, [uid, setCurrentUser]);

  useEffect(() => {
    if (!Object.hasOwn(currentUser, "email")) {
      resolveCurrentUser();
    }
  }, [currentUser, resolveCurrentUser]);

  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
