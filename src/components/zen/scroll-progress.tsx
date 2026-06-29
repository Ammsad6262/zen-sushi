"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin vermilion progress bar fixed to the top of the viewport.
 * Tracks page scroll progress.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-vermilion via-gold to-vermilion origin-left z-[70] pointer-events-none"
      aria-hidden="true"
    />
  );
}
