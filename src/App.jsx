// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import BottomTabs from "./components/BottomTabs.jsx";
import Footer from "./components/Footer.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import Denim from "./pages/Denim.jsx";
import { CartProvider } from "./providers/CartProvider.jsx";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard"; 
import AdminGuard from "./components/AdminGuard.jsx";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-dvh bg-premium text-white">
        <Header />

      <main className="pt-[calc(var(--header-h,88px)+12px)]">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServicePage />} />

            <Route path="/denim" element={<Denim />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<Navigate to="/" replace />} />
            {/* Admin Routes */}
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
  <Route path="/admin/dashboard" element={<AdminGuard><AdminDashboard /></AdminGuard>} />

  {/* CATCH-ALL MUST BE LAST */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
        </main>

      
        <BottomTabs />
        <Footer />
      </div>
    </CartProvider>
  );
}
