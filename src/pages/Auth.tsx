import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center mb-2">
            {isLogin ? "Log ind" : "Opret konto"}
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <Label htmlFor="fullName">Navn</Label>
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            )}
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
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading
                ? "Vent venligst..."
                : isLogin
                ? "Log ind"
                : "Opret konto"}
            </Button>
          </form>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline focus:outline-none"
            onClick={() => {
              setIsLogin((v) => !v);
              setEmail("");
              setPassword("");
              setFullName("");
            }}
          >
            {isLogin
              ? "Har du ikke en konto? Opret dig her."
              : "Allerede bruger? Log ind her."}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
