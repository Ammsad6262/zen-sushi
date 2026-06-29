"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/zen/navbar";
import { Hero } from "@/components/zen/hero";
import { About } from "@/components/zen/about";
import { Menu } from "@/components/zen/menu";
import { Gallery } from "@/components/zen/gallery";
import { Reviews } from "@/components/zen/reviews";
import { Visit } from "@/components/zen/visit";
import { Footer } from "@/components/zen/footer";
import { ScrollProgress } from "@/components/zen/scroll-progress";
import { MobileActionBar } from "@/components/zen/mobile-action-bar";
import { BackToTop } from "@/components/zen/back-to-top";
import { OrderModal } from "@/components/zen/order-modal";
import { CartButton } from "@/components/zen/cart-button";
import { CartDrawer } from "@/components/zen/cart-drawer";

export default function Home() {
  const [orderOpen, setOrderOpen] = useState(false);

  const openOrder = useCallback(() => {
    setOrderOpen(true);
  }, []);

  // Global event listener so any deep component can open the order modal
  // without prop drilling.
  useEffect(() => {
    const handler = () => openOrder();
    window.addEventListener("zen:open-order", handler);
    return () => window.removeEventListener("zen:open-order", handler);
  }, [openOrder]);

  return (
    <div className="relative min-h-screen flex flex-col bg-ink text-ivory overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <Footer />

      {/* Floating helpers */}
      <BackToTop />
      <MobileActionBar />
      <CartButton />

      {/* Order modal — triggered via window event from any CTA */}
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />

      {/* Cart drawer — add items / checkout / place order */}
      <CartDrawer />
    </div>
  );
}
