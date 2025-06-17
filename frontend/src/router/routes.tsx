import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/login/login";
import AuthLayout from "../layout/auth.layout";
import Signup from "../pages/auth/signup/signup";

const routes: any = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
    ],
  },
]);

export default routes;
