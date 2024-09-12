import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthenticatedRoute = () => {
  const { isAuthenticated, role } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "user") {
        navigate("/user/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate]);

  return <Outlet />;
};

export default AuthenticatedRoute;
