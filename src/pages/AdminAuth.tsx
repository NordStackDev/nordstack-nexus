import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

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
      const { error, isAdmin: adminStatus } = await signInAdmin(email, password);
      
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
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
            <p className="text-gray-600">Log ind med dine admin legitimationsoplysninger</p>
          </div>
          
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Adgangskode</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? "Logger ind..." : "Log ind som Admin"}
            </Button>
          </form>
          
          <div className="text-center">
            <a
              href="/"
              className="text-sm text-blue-600 hover:underline"
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