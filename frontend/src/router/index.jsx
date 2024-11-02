import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/Root";
import AuthPage from "../pages/auth/Auth";
import Dashboard from "../pages/dashboard";

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
      {
        path: "dashboard",
        id: "dashboard",
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export default router;
