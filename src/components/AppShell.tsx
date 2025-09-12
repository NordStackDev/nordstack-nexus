

import { ReactNode } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/ui/navigation";
import Footer from "@/components/ui/Footer";
import MobileNavBar from "@/components/MobileNavBar";

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, signOut, isAdmin, isSigningOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="shadow-elegant bg-card/80/90 backdrop-blur sticky top-0 z-20 border-b border-border/50 flex items-center justify-between px-4">
        <Navigation
          isAuthenticated={Boolean(user)}
          isAdmin={isAdmin}
          onLogout={signOut}
        />
  {/* <LanguageSwitcher /> flyttet ind i navigationen */}
      </header>
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
  <Footer />
  <MobileNavBar isAuthenticated={Boolean(user)} isAdmin={isAdmin} onLogout={signOut} />
    </div>
  );
}
