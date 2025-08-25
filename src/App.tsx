import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { lazy } from "react";
import AppShell from "@/components/AppShell";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { PublicOnlyRoute } from "@/components/RouteGuards";
import { AdminProtectedRoute } from "@/components/AdminProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const Admin = lazy(() => import("./pages/Admin"));
const Contact = lazy(() => import("./pages/Contact"));
const PitchNSales = lazy(() => import("./pages/projects/PitchNSales"));

const Terms = lazy(() => import("./pages/paymentterms"));
const Privacy = lazy(() => import("./pages/privacy"));
const Tos = lazy(() => import("./pages/tos"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppShell>
            <Routes>
              <Route element={<PageTransitionWrapper />}>
                <Route path="/" element={<Index />} />
                <Route element={<PublicOnlyRoute />}>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin/login" element={<AdminAuth />} />
                </Route>
                <Route element={<AdminProtectedRoute />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/projects/pitch-n-sales"
                  element={<PitchNSales />}
                />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/tos" element={<Tos />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AppShell>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
