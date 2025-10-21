import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
  const { t } = useTranslation();

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
    // Top navigation kun på desktop/tablet
    <nav className="border-b border-border bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 hidden md:block">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 w-full">
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-3"
            >
              <div className="flex items-center justify-center">
                <picture>
                  <source srcSet="/NS_logo_nobg.webp" type="image/webp" />
                  <img
                    src="/NS_logo_nobg.webp"
                    alt="Nordstack"
                    className="h-20 sm:h-24 lg:h-28 w-auto block"
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="hidden lg:block">
                <span className="text-xl font-bold text-foreground whitespace-nowrap">
                  Nordstack Nexus
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation/actions til højre */}
          <div className="flex items-center space-x-2 lg:space-x-6 ml-auto">
            <Link
              to="/"
              className={navLinkClasses(location.pathname === "/")}
            >
              <Home className="h-5 w-5" />
              <span>{t("nav.home")}</span>
            </Link>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={navLinkClasses(location.pathname === "/admin")}
                  >
                    <Shield className="h-5 w-5" />
                    <span>{t("nav.admin")}</span>
                  </Link>
                )}
                <button onClick={onLogout} className={navLinkClasses(false)}>
                  <LogOut className="h-5 w-5" />
                  <span>{t("nav.logout")}</span>
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
                  <span>{t("nav.login")}</span>
                </Button>
              </Link>
            )}
            <div className="pl-2 border-l border-border/50">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
