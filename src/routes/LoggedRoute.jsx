import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Spinning } from "@/components";

const LoggedRoute = () => {
  const { user, loading, login } = useAuth();

  if (loading) {
    return <Spinning />;
  }
  if (user) {
    login();
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default LoggedRoute;
