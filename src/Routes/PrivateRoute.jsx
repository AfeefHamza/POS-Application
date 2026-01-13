import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute() {
  const token = sessionStorage.getItem("token");
  const location = useLocation();

  // not logged in → send to login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default PrivateRoute;
