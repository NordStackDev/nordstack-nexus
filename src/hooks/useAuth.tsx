import { useState, useEffect, useRef, createContext, useContext } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInAdmin: (email: string, password: string) => Promise<{ error: any; isAdmin?: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // prevent setState efter unmount
  const alive = useRef(true);
  useEffect(
    () => () => {
      alive.current = false;
    },
    []
  );

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (!alive.current) return;

      if (error) {
        console.error("[useAuth] Role check error:", error);
        setIsAdmin(false);
        return;
      }
      
      setIsAdmin(Boolean(data));
    } catch (error) {
      console.error("[useAuth] Unexpected error checking admin role:", error);
      setIsAdmin(false);
    }
  };

  // Initial session → ingen race
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!alive.current) return;

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      if (data.session?.user) await checkAdminRole(data.session.user.id);

      setIsLoading(false);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, s) => {
      if (!alive.current) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        await checkAdminRole(s.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl =
      typeof window !== "undefined" ? `${window.location.origin}/` : undefined;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl, data: { full_name: fullName } },
    });

    if (error) {
      toast({
        title: "Fejl ved registrering",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registrering gennemført",
        description: "Tjek din email for at bekræfte din konto.",
      });
    }
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("[useAuth] signIn error:", error);
      toast({
        title: "Fejl ved login",
        description: error.message,
        variant: "destructive",
      });
    }
    return { error };
  };

  const signInAdmin = async (email: string, password: string) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/functions/v1/admin-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: "Admin login fejl",
          description: result.error || "Kunne ikke logge ind som admin",
          variant: "destructive",
        });
        return { error: result.error, isAdmin: false };
      }

      if (result.session) {
        await supabase.auth.setSession(result.session);
      }

      toast({
        title: "Admin login succesfuld",
        description: "Du er nu logget ind som administrator",
      });

      return { error: null, isAdmin: true };
    } catch (error: any) {
      console.error("[useAuth] signInAdmin error:", error);
      toast({
        title: "Admin login fejl",
        description: "Netværksfejl eller server utilgængelig",
        variant: "destructive",
      });
      return { error: error.message, isAdmin: false };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("[useAuth] signOut error:", error);
      toast({
        title: "Fejl ved logout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, session, isLoading, isAdmin, signUp, signIn, signInAdmin, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
