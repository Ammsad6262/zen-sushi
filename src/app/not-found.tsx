"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink text-ivory px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md"
      >
        <div className="font-display text-[8rem] md:text-[12rem] leading-none text-vermilion mb-2">
          404
        </div>
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-px w-12 bg-vermilion" />
          <span className="text-xs uppercase tracking-[0.32em] text-ivory-soft/60">
            Lost in the kitchen
          </span>
          <span className="h-px w-12 bg-vermilion" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-ivory mb-4">
          This page went <span className="italic text-gold/90">off-menu.</span>
        </h1>
        <p className="text-ivory-soft/70 leading-relaxed mb-8">
          The page you&apos;re looking for isn&apos;t on our table. Let us guide
          you back to something delicious.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-vermilion text-ivory rounded-full text-xs uppercase tracking-[0.22em] font-medium hover:bg-vermilion-deep transition-all duration-300 min-h-[48px]"
          >
            <Home className="h-4 w-4" />
            Back Home
          </Link>
          <Link
            href="/#menu"
            className="inline-flex items-center gap-2 px-6 py-3.5 border border-ivory/20 text-ivory rounded-full text-xs uppercase tracking-[0.22em] font-medium hover:bg-ivory/5 hover:border-ivory/40 transition-all duration-300 min-h-[48px]"
          >
            <UtensilsCrossed className="h-4 w-4 text-vermilion" />
            See the Menu
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
