import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth?mode=login");
  }, [navigate]);

  return <Outlet />;
}
