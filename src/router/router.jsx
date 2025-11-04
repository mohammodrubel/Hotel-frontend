import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";

// Dashboard Layout
import DashboardLayout from "../dashboard/DashboardLayout";
import DashboardHome from "../dashboard/DashboardHome";
import DashboardRooms from "../dashboard/DashboardRooms";
import AddNewRoom from "../dashboard/AddNewRoom";
import DashboardHotel from "../dashboard/DashboardHotel";
import AddNewHotel from "../dashboard/AddNewHotel";
import DashboardUsers from "../dashboard/DashboardUsers";
import Room from "../page/Room/Room";
import RoomDetail from "../page/Room/SingleRoom";
import RequiredRoute from "../RequiredRoute/RequiredRoute";
import LoggedInRequiredRoute from "../LoggedInRequiredRoute/LoggedInRequiredRoute";
import PaymentSuccess from "../page/PaymentSuccess/PaymentSuccess";
export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <LoggedInRequiredRoute>
        <Login />
      </LoggedInRequiredRoute>
    ),
  },
  {
  path: "/payment/success",
  element: <PaymentSuccess />,
},
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/room",
    element: <Room />,
  },

  {
    path: "/room/:id",
    element: <RoomDetail />,
  },

  // Dashboard routes
  {
    path: "/dashboard",
    element: (
      <RequiredRoute>
        <DashboardLayout />
      </RequiredRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      // Users
      {
        path: "users",
        element: <DashboardUsers />,
      },
      // Rooms
      {
        path: "rooms",
        element: <DashboardRooms />,
      },
      {
        path: "rooms/create",
        element: <AddNewRoom />,
      },
      // Hotels
      {
        path: "hotels",
        element: <DashboardHotel />,
      },
      {
        path: "hotels/create",
        element: <AddNewHotel />,
      },

      // Bookings
      // {
      //   path: "bookings",
      //   element: <BookingList />,
      // },
      // {
      //   path: "bookings/create",
      //   element: <CreateBooking />,
      // },
    ],
  },
]);
