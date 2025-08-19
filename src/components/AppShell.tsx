import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/ui/navigation";

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, signOut, isAdmin, isSigningOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="shadow-elegant bg-card/80/90 backdrop-blur sticky top-0 z-20 border-b border-border/50">
        <Navigation isAuthenticated={Boolean(user)} isAdmin={isAdmin} onLogout={signOut} />
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      <footer className="bg-card/60 border-t border-border/50 py-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} NordStack NEXUS - Professionel
          dokumenthåndtering og salgsanalyse
        </div>
      </footer>
    </div>
  );
}
