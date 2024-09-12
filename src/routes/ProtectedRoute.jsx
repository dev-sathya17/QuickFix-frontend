import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useLoaderData();

  return isAuthenticated ? <Outlet /> : Navigate({ to: "/", replace: true });
};

export default ProtectedRoute;
