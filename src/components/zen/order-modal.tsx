"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, ShoppingBag, Bike, Utensils, MessageCircle } from "lucide-react";

const ORDER_OPTIONS = [
  {
    icon: Phone,
    title: "Call to Order",
    desc: "Fastest — speak with our kitchen directly",
    action: "tel:+19075432222",
    cta: "+1 907-543-2222",
    external: true,
  },
  {
    icon: ShoppingBag,
    title: "Takeout",
    desc: "Call ahead, ready in 20–30 min",
    action: "tel:+19075432222",
    cta: "Call ahead",
    external: true,
  },
  {
    icon: Bike,
    title: "No-contact Delivery",
    desc: "Bethel area · 45–60 min",
    action: "tel:+19075432222",
    cta: "Order delivery",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "Facebook Messenger",
    desc: "Send us a message on Facebook",
    action: "https://m.facebook.com/zenbethel/",
    cta: "Open Messenger",
    external: true,
  },
] as const;

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

export function OrderModal({ open, onClose }: OrderModalProps) {
  // ESC to close + body scroll lock
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] bg-ink/80 backdrop-blur-md flex items-end md:items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Order options"
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-ink-soft border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-8 bg-vermilion" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-ivory-soft/60">
                  Order
                </span>
              </div>
              <h3 className="font-display text-3xl text-ivory leading-tight">
                How would you like to{" "}
                <span className="italic text-gold/90">order?</span>
              </h3>
              <p className="text-sm text-ivory-soft/60 mt-2">
                Choose an option below — we&apos;ll take care of the rest.
              </p>
            </div>

            <div className="space-y-3">
              {ORDER_OPTIONS.map((opt) => (
                <a
                  key={opt.title}
                  href={opt.action}
                  target={opt.external ? "_blank" : undefined}
                  rel={opt.external ? "noopener noreferrer" : undefined}
                  onClick={onClose}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-ink/60 hover:border-vermilion/40 hover:bg-vermilion/5 transition-all duration-300 min-h-[64px]"
                >
                  <div className="w-11 h-11 rounded-xl bg-vermilion/15 border border-vermilion/30 flex items-center justify-center shrink-0 group-hover:bg-vermilion group-hover:border-vermilion transition-colors">
                    <opt.icon className="h-5 w-5 text-vermilion group-hover:text-ivory transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-ivory font-medium text-sm">
                      {opt.title}
                    </div>
                    <div className="text-ivory-soft/55 text-xs mt-0.5">
                      {opt.desc}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-vermilion opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                    {opt.cta}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-ivory-soft/45">
              <Utensils className="h-3.5 w-3.5" />
              <span>Daily · 11 AM – 9 PM · Fri/Sat till 10 PM</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
