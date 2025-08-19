import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="shadow-elegant bg-card/80 backdrop-blur-md sticky top-0 z-10 border-b border-border/50">
        <nav className="container mx-auto flex items-center justify-between py-4 px-4">
          <div className="font-bold text-2xl tracking-tight bg-gradient-primary bg-clip-text text-transparent">
            nordstack-nexus
          </div>
          <div className="flex gap-6">
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
          </div>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-card/50 border-t border-border/50 py-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} NordStack Nexus - Professionel dokumenthåndtering og salgsanalyse
        </div>
      </footer>
    </div>
  );
}
