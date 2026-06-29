"use client";

import { Navbar } from "@/components/zen/navbar";
import { Hero } from "@/components/zen/hero";
import { About } from "@/components/zen/about";
import { Menu } from "@/components/zen/menu";
import { Gallery } from "@/components/zen/gallery";
import { Reviews } from "@/components/zen/reviews";
import { Visit } from "@/components/zen/visit";
import { Footer } from "@/components/zen/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-ink text-ivory overflow-x-hidden">
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
    </div>
  );
}
