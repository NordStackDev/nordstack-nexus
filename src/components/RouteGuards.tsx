import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}

export function AdminRoute() {
  const { user, isAdmin, isLoading } = useAuth();
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">Loader...</div>
    );
  if (!user) return <Navigate to="/auth" replace />;
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}

export function PublicOnlyRoute() {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}
