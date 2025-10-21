import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
