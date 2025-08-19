import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, signOut, isAdmin, isSigningOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="shadow-elegant bg-card/80 backdrop-blur-md sticky top-0 z-10 border-b border-border/50">
        <nav className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="font-bold text-2xl tracking-tight bg-gradient-primary bg-clip-text text-transparent">
            nordstack-nexus
          </div>
          <div className="flex gap-6 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                  : "text-muted-foreground hover:text-primary transition-colors duration-200"
              }
            >
              Home
            </NavLink>
            {user && isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-muted-foreground hover:text-primary transition-colors duration-200"
                }
              >
                Admin
              </NavLink>
            )}
            {user && (
              <button
                onClick={signOut}
                disabled={isSigningOut}
                className={`text-sm text-red-500 hover:text-red-600 transition-colors duration-200 ${
                  isSigningOut ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {isSigningOut ? "Logger ud..." : "Log ud"}
              </button>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-card/50 border-t border-border/50 py-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} NordStack Nexus - Professionel
          dokumenthåndtering og salgsanalyse
        </div>
      </footer>
    </div>
  );
}
