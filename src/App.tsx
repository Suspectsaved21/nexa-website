
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthGuard } from "./components/AuthGuard";
import Index from "./pages/Index";
import Founder from "./pages/Founder";
import LandingPage from "./pages/LandingPage";
import CheckoutPage from "./pages/CheckoutPage";
import AuthPage from "./pages/AuthPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutCancelPage from "./pages/CheckoutCancelPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/founder" element={<Founder />} />
              <Route 
                path="/market" 
                element={
                  <AuthGuard>
                    <LandingPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <AuthGuard>
                    <CheckoutPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/checkout/success" 
                element={
                  <AuthGuard>
                    <CheckoutSuccessPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/checkout/cancel" 
                element={
                  <AuthGuard>
                    <CheckoutCancelPage />
                  </AuthGuard>
                } 
              />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
