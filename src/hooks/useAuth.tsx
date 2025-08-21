import { useState, useEffect, useRef, createContext, useContext } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  isSigningOut: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInAdmin: (
    email: string,
    password: string
  ) => Promise<{ error: any; isAdmin?: boolean }>;
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
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { toast } = useToast();

  const signingOutRef = useRef(false);

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

  // Initial session
  useEffect(() => {
    console.debug("[useAuth] initializing auth provider...");
    let loadingWatchdog: ReturnType<typeof setTimeout> | null = null;

    // allow public pages to render immediately — don't block UI while we check session
    if (alive.current) setIsLoading(false);

    // keep a short watchdog in case the background check hangs
    loadingWatchdog = setTimeout(() => {
      console.warn(
        "[useAuth] loading watchdog triggered - forcing isLoading=false"
      );
      if (alive.current) setIsLoading(false);
    }, 1200);

    (async () => {
      try {
        console.debug("[useAuth] attempting getSession (with 400ms timeout)");

        const getSessionPromise = supabase.auth.getSession();

        const timeout = new Promise<{ data: any }>((resolve) =>
          setTimeout(() => resolve({ data: null }), 400)
        );

        const { data } = (await Promise.race([
          getSessionPromise,
          timeout,
        ])) as any;

        if (!alive.current) return;

        if (!data) {
          console.warn("[useAuth] getSession timed out or returned empty");
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          return;
        }

        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
        // don't block initial render on role lookup; run in background
        if (data.session?.user) {
          void checkAdminRole(data.session.user.id);
        }
      } catch (err) {
        console.error("[useAuth] initial session error:", err);
        if (alive.current) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
        }
      } finally {
        if (alive.current) setIsLoading(false);
        if (loadingWatchdog) {
          clearTimeout(loadingWatchdog);
          loadingWatchdog = null;
        }
      }
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, s) => {
      try {
        if (!alive.current) return;
        setSession(s);
        setUser(s?.user ?? null);
        // run role-check in background to avoid delaying UI updates
        if (s?.user) {
          void checkAdminRole(s.user.id);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("[useAuth] onAuthStateChange handler error:", err);
        if (alive.current) setIsAdmin(false);
      } finally {
        // ensure we clear the loading flag after any auth state change
        if (alive.current) setIsLoading(false);
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
      // Authenticate via Supabase client (frontend)
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError || !authData.user) {
        console.error("[useAuth] signInAdmin auth error:", authError);
        toast({
          title: "Admin login fejl",
          description:
            authError?.message || "Ugyldige legitimationsoplysninger",
          variant: "destructive",
        });
        return { error: authError, isAdmin: false };
      }

      // Check admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authData.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) {
        console.error("[useAuth] Role check error after signIn:", roleError);
        toast({
          title: "Admin login fejl",
          description: "Fejl ved tjek af admin-rolle",
          variant: "destructive",
        });
        // logout to be safe
        await supabase.auth.signOut();
        return { error: roleError, isAdmin: false };
      }

      if (!roleData) {
        // Not an admin — clear session and inform user
        await supabase.auth.signOut();
        toast({
          title: "Adgang nægtet",
          description: "Du har ikke adminrettigheder",
          variant: "destructive",
        });
        return { error: new Error("Access denied"), isAdmin: false };
      }

      // Success: authData.session should be set by SDK; update state proactively
      if (authData.session) {
        setSession(authData.session);
      }

      await checkAdminRole(authData.user.id);

      toast({
        title: "Admin login succesfuld",
        description: "Du er nu logget ind som administrator",
      });
      return { error: null, isAdmin: true };
    } catch (error: any) {
      console.error("[useAuth] signInAdmin unexpected error:", error);
      toast({
        title: "Admin login fejl",
        description: error?.message || "Uventet fejl",
        variant: "destructive",
      });
      return { error, isAdmin: false };
    }
  };

  const signOut = async () => {
    if (signingOutRef.current) {
      return;
    }

    signingOutRef.current = true;
    setIsSigningOut(true);

    try {
      const before = await supabase.auth.getSession();

      // Supabase v2: ensure all tokens are cleared globally
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("[useAuth] signOut error:", error);
        toast({
          title: "Fejl ved logout",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      const after = await supabase.auth.getSession();

      if (alive.current) {
        setUser(null);
        setSession(null);
        setIsAdmin(false);
      }

      toast({ title: "Logout succesfuld", description: "Du er nu logget ud" });
    } catch (err: any) {
      console.error("[useAuth] signOut unexpected error:", err);
      toast({
        title: "Fejl ved logout",
        description: err?.message || "Uventet fejl",
        variant: "destructive",
      });
    } finally {
      signingOutRef.current = false;
      setIsSigningOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAdmin,
        isSigningOut,
        signUp,
        signIn,
        signInAdmin,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
