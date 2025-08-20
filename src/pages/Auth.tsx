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
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card/80 backdrop-blur-md rounded-2xl shadow-elegant border border-border/50 p-8 flex flex-col gap-6 animate-scale-in">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-foreground">
              {isLogin ? "Velkommen tilbage" : "Opret din konto"}
            </h2>
            <p className="text-muted">
              {isLogin
                ? "Log ind for at fortsætte"
                : "Kom i gang med Nordstack"}
            </p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <Label htmlFor="fullName" className="text-foreground">
                  Navn
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-1 bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
            )}
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
                autoComplete={isLogin ? "current-password" : "new-password"}
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
              {isLoading
                ? "Vent venligst..."
                : isLogin
                ? "Log ind"
                : "Opret konto"}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-glow transition-colors duration-200 focus:outline-none"
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
    </div>
  );
};

export default Auth;
