import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const role = localStorage.getItem("role");

  return role === "admin" ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default ProtectedAdminRoute;
