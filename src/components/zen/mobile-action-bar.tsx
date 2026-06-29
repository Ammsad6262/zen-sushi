"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, UtensilsCrossed, Navigation, Clock } from "lucide-react";

/**
 * Sticky bottom action bar shown on mobile only.
 * Appears after the user scrolls past the hero (~80% of viewport height).
 * Provides three primary actions: Call, Menu, Directions.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~80% of the first viewport
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-[55] bg-ink/95 backdrop-blur-xl border-t border-white/10"
          // Respect iOS safe area
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="grid grid-cols-3 gap-px bg-white/5">
            <a
              href="tel:+19075432222"
              className="flex flex-col items-center justify-center gap-1 py-3 bg-ink text-ivory hover:bg-vermilion/20 transition-colors min-h-[60px]"
            >
              <Phone className="h-5 w-5 text-vermilion" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-ivory-soft/80">
                Call
              </span>
            </a>
            <button
              onClick={() => scrollTo("#menu")}
              className="flex flex-col items-center justify-center gap-1 py-3 bg-ink text-ivory hover:bg-vermilion/20 transition-colors min-h-[60px]"
            >
              <UtensilsCrossed className="h-5 w-5 text-vermilion" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-ivory-soft/80">
                Menu
              </span>
            </button>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=320+Tundra+Way+Bethel+AK+99559"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1 py-3 bg-ink text-ivory hover:bg-vermilion/20 transition-colors min-h-[60px]"
            >
              <Navigation className="h-5 w-5 text-vermilion" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-ivory-soft/80">
                Directions
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
