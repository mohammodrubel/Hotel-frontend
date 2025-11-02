import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RequiredRoute({ children }) {
  const user = useSelector((state) => state?.auth?.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default RequiredRoute;
