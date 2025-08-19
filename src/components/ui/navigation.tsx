import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { LogIn, Home, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  onLogout?: () => void;
}

export const Navigation = ({ isAuthenticated, isAdmin, onLogout }: NavigationProps) => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* navbar højere så logoet kan fylde */}
        <div className="flex h-24 items-center justify-between"> 
          
          {/* Logo + tekst */}
          <Link to="/" className="flex items-center ml-4 sm:ml-6 md:ml-8">
            <div className="flex items-center justify-center">
              <img
                src="/nordstacktest(2).png"
                alt="Nordstack"
                className="h-12 sm:h-16 md:h-[160px] w-auto block"
              />
            </div>
            <div className="hidden sm:block ml-3">
              <span className="text-2xl font-bold text-foreground">Nordstack</span>
              <span className="text-sm text-muted-foreground block leading-tight">
                Pitch Sales Tracker
              </span>
            </div>
          </Link>

          {/* Navigation menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={cn(
                "flex items-center space-x-1 px-3 py-2 rounded-md text-base font-medium transition-colors",
                location.pathname === "/"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Home className="h-5 w-5" />
              <span>Hjem</span>
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 rounded-md text-base font-medium transition-colors",
                      location.pathname === "/admin"
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Shield className="h-5 w-5" />
                    <span>Admin</span>
                  </Link>
                )}
                <Button onClick={onLogout} variant="outline" size="sm">
                  Log ud
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm" className="flex items-center space-x-1">
                  <LogIn className="h-5 w-5" />
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
