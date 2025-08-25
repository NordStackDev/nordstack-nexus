import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { LogIn, Home, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

interface NavigationProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  onLogout?: () => void;
}

export const Navigation = ({
  isAuthenticated,
  isAdmin,
  onLogout,
}: NavigationProps) => {
  const location = useLocation();

  const navLinkClasses = (active: boolean) =>
    cn(
      "relative flex items-center space-x-2 px-3 py-2 rounded-[--radius] text-sm font-medium transition-colors duration-200",
      active ? "text-white" : "text-gray-300 hover:text-white",
      "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:rounded after:bg-gradient-to-r after:from-transparent after:via-[#FFD700] after:to-transparent after:opacity-100",
      active
        ? "after:scale-x-100"
        : "after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
    );

  return (
    <nav className="border-b border-border bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 ml-4 sm:ml-6 md:ml-8"
          >
            <div className="flex items-center justify-center">
              <img
                src="/nordstacklogonobg.png"
                alt="Nordstack"
                className="h-16 sm:h-20 md:h-24 w-auto block"
              />
            </div>
            <div className="hidden sm:block ml-2">
              <span className="text-xl font-bold text-foreground">
                Nordstack Nexus
              </span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/" className={navLinkClasses(location.pathname === "/")}>
              <Home className="h-5 w-5" />
              <span>Hjem</span>
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={navLinkClasses(location.pathname === "/admin")}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                )}

                <button onClick={onLogout} className={navLinkClasses(false)}>
                  <LogOut className="h-5 w-5" />
                  <span>Log ud</span>
                </button>
              </>
            ) : (
              <Link to="/auth">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Log ind</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
