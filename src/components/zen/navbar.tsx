"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, Clock } from "lucide-react";
import { ZenLogo } from "./logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);

    // Track active section
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    let current = "";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
    }
    setActiveSection(current);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ink/85 backdrop-blur-xl border-b border-white/5 py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="group"
            aria-label="ZEN Sushi — home"
          >
            <ZenLogo size={scrolled ? 38 : 42} showText={!scrolled} animated={false} />
            {scrolled && (
              <span className="sr-only">ZEN Sushi — home</span>
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm tracking-[0.18em] uppercase transition-colors duration-300",
                    active
                      ? "text-ivory"
                      : "text-ivory-soft/70 hover:text-ivory"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-px w-8 bg-vermilion"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:+19075432222"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-vermilion/40 bg-vermilion/10 text-ivory text-xs uppercase tracking-[0.22em] hover:bg-vermilion hover:border-vermilion transition-all duration-300 group"
            >
              <Phone className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform" />
              Order
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 -mr-2 text-ivory"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.div
                animate={{ rotate: mobileOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden bg-ink/95 backdrop-blur-xl pt-24 pb-10 px-8 flex flex-col"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  className="font-display text-4xl py-3 border-b border-white/5 text-ivory hover:text-vermilion transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto space-y-4">
              <a
                href="tel:+19075432222"
                className="flex items-center gap-3 text-ivory-soft hover:text-vermilion transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="font-sans text-sm tracking-wider">
                  +1 907-543-2222
                </span>
              </a>
              <div className="flex items-center gap-3 text-ivory-soft">
                <Clock className="h-4 w-4" />
                <span className="font-sans text-sm tracking-wider">
                  Daily · 11 AM – 9 PM
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
