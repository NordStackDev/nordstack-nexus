import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { checkCurrentUserIsAdmin } from "@/utils/adminAuth";

export function AdminProtectedRoute() {
  const { user, isLoading } = useAuth();
  const [isAdminVerified, setIsAdminVerified] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const verifyAdminStatus = async () => {
      if (!user) {
        setIsAdminVerified(false);
        return;
      }

      try {
        const isAdmin = await checkCurrentUserIsAdmin();
        if (isMounted) {
          setIsAdminVerified(isAdmin);
        }
      } catch (error) {
        console.error('Admin verification error:', error);
        if (isMounted) {
          setIsAdminVerified(false);
        }
      }
    };

    verifyAdminStatus();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // Show loading while checking auth and admin status
  if (isLoading || isAdminVerified === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to home if not admin
  if (!isAdminVerified) {
    return <Navigate to="/" replace />;
  }

  // Render admin content
  return <Outlet />;
}