
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Founder from './pages/Founder';
import { useAuthStatus } from './hooks/useAuthStatus';
import SearchResultsPage from './pages/SearchResultsPage';
import Index from './pages/Index';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCanceledPage from './pages/PaymentCanceledPage';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/founder" element={<Founder />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/market" element={<Index />} />
        <Route path="/payment/:productId" element={<PaymentPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/canceled" element={<PaymentCanceledPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
