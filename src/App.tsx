
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./App.css";

// Lazy loaded components
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const PaymentPage = lazy(() => import("@/pages/PaymentPage"));
const PaymentSuccessPage = lazy(() => import("@/pages/PaymentSuccessPage"));
const PaymentCanceledPage = lazy(() => import("@/pages/PaymentCanceledPage"));
const SearchResultsPage = lazy(() => import("@/pages/SearchResultsPage"));
const Founder = lazy(() => import("@/pages/Founder"));

// iPhone payment pages
const IPhonePaymentPage = lazy(() => import("@/pages/IPhonePaymentPage"));
const IPhonePaymentSuccessPage = lazy(() => import("@/pages/IPhonePaymentSuccessPage"));
const IPhonePaymentCanceledPage = lazy(() => import("@/pages/IPhonePaymentCanceledPage"));

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment/:productId" element={<PaymentPage />} />
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/payment/canceled" element={<PaymentCanceledPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/founder" element={<Founder />} />
            
            {/* iPhone payment routes */}
            <Route path="/iphone-payment" element={<IPhonePaymentPage />} />
            <Route path="/iphone-payment/success" element={<IPhonePaymentSuccessPage />} />
            <Route path="/iphone-payment/cancel" element={<IPhonePaymentCanceledPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
