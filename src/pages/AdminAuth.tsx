import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Shield } from "lucide-react";

const AdminAuth = () => {
  const { user, signInAdmin, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated as admin
  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Redirect regular users to home
  if (user && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error, isAdmin: adminStatus } = await signInAdmin(
        email,
        password
      );

      if (error) {
        toast.error(error.message || "Admin login fejlede");
        return;
      }

      if (!adminStatus) {
        toast.error("Du har ikke admin rettigheder");
        return;
      }

      toast.success("Admin login succesfuld");
    } catch (error: any) {
      toast.error(error.message || "Uventet fejl");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card/80 backdrop-blur-md rounded-2xl shadow-elegant border border-border/50 p-8 flex flex-col gap-6 animate-scale-in">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-transparent border border-[rgba(255,255,255,0.03)]">
              <Shield className="h-8 w-8 text-muted" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-foreground">
              Admin Login
            </h2>
            <p className="text-muted">
              Log ind med dine admin legitimationsoplysninger
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground">
                Adgangskode
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-background/50 border-border/50 focus:border-primary"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-4 btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Logger ind..." : "Log ind som Admin"}
            </Button>
          </form>

          <div className="text-center">
            <a
              href="/"
              className="text-sm text-primary hover:text-primary-glow transition-colors duration-200"
            >
              Tilbage til forsiden
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
