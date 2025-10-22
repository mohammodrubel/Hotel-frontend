import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import App from "../App";
import Room from "../page/Room/Room";
import DashboardLayout from "../dashboard/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/room",
    element: <Room />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
