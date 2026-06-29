"use client";

/* eslint-disable react-hooks/set-state-in-effect -- this component intentionally triggers local state in effects for hydration-safe mounting and visual bump animations */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-store";

/**
 * Floating cart button (bottom-right on desktop, above the mobile action bar).
 * Shows a badge with the total item count.
 * Hydration-safe: only renders the count after mount to avoid SSR/CSR mismatch.
 * Triggers a brief bump animation when an item is added.
 */
export function CartButton() {
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.openCart);
  const [mounted, setMounted] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  // Bump the badge whenever the total item count changes (and is non-zero).
  useEffect(() => {
    if (totalItems > 0) {
      setBumpKey((k) => k + 1);
    }
  }, [totalItems]);

  return (
    <AnimatePresence>
      {mounted && totalItems > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={openCart}
          aria-label={`View cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          className="fixed right-4 md:right-6 bottom-24 lg:bottom-6 z-50 h-14 px-5 rounded-full bg-vermilion text-ivory shadow-[0_8px_30px_-8px_rgba(200,16,46,0.7)] hover:bg-vermilion-deep hover:-translate-y-1 transition-all duration-300 flex items-center gap-2.5 group"
        >
          <motion.div
            key={`icon-${bumpKey}`}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <ShoppingBag className="h-5 w-5" />
          </motion.div>
          <span className="font-sans text-sm font-medium uppercase tracking-[0.15em]">
            Cart
          </span>
          <motion.span
            key={`badge-${bumpKey}`}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 0.4 }}
            className="bg-ivory text-vermilion rounded-full min-w-[24px] h-6 px-1.5 flex items-center justify-center text-xs font-bold"
          >
            {totalItems}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
