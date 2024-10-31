import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/Root";
import AuthPage from "../pages/auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);

export default router;
