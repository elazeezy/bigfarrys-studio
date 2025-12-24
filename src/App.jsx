// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import BottomTabs from "./components/BottomTabs.jsx";
import FabStack from "./components/FabStack.jsx";
import Footer from "./components/Footer.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";

import Denim from "./pages/Denim.jsx";

import { CartProvider } from "./providers/CartProvider.jsx";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-dvh bg-premium text-white">
        <Header />

        <main className="pb-24 md:pb-8">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServicePage />} />

            <Route path="/denim" element={<Denim />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <FabStack />
        <BottomTabs />
        <Footer />
      </div>
    </CartProvider>
  );
}
