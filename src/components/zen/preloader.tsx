"use client";

/* eslint-disable react-hooks/set-state-in-effect -- the preloader intentionally drives local animation/progress state via requestAnimationFrame inside an effect; this is the canonical pattern for time-based UI animations and does not cause cascading renders in parent components. */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium cinematic preloader for ZEN Sushi.
 *
 * Sequence:
 *  1. Ink-black overlay fills the viewport
 *  2. Vermilion circle draws itself (SVG stroke animation)
 *  3. Zen kanji strokes draw in sequence
 *  4. "ZEN" wordmark reveals with a shimmer
 *  5. Tagline fades in
 *  6. Progress bar fills at the bottom
 *  7. Whole overlay slides up smoothly, revealing the site
 *
 * Only shows on the first load of a session (sessionStorage gate),
 * so navigating between pages or soft-refreshing doesn't re-trigger it.
 */
export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Don't show the preloader again within the same browser session
    // (e.g. when navigating back, or after a soft refresh)
    try {
      if (sessionStorage.getItem("zen-preloader-done")) {
        setLoading(false);
        return;
      }
    } catch {
      // sessionStorage might be unavailable (in-app browsers, privacy mode)
      // In that case, skip the preloader entirely — better to show the site
      // immediately than force a 1.2s black screen every time
      setLoading(false);
      return;
    }

    // Detect prefers-reduced-motion — skip preloader for users who
    // prefer less motion (accessibility + performance on low-end devices)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      try {
        sessionStorage.setItem("zen-preloader-done", "1");
      } catch {}
      setLoading(false);
      return;
    }

    // Shorter duration: 1.2s is enough for the brand moment without
    // feeling sluggish on slow in-app browser WebViews
    const start = performance.now();
    const DURATION = 1200;

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      // easeOutCubic for a natural deceleration
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Brief pause at 100% before sliding away
        setTimeout(() => {
          try {
            sessionStorage.setItem("zen-preloader-done", "1");
          } catch {}
          setLoading(false);
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);

    // Safety: force-hide after 2.5s no matter what (was 4s — too long
    // for in-app browser sessions where every second feels like lag)
    const safety = setTimeout(() => {
      try {
        sessionStorage.setItem("zen-preloader-done", "1");
      } catch {}
      setLoading(false);
    }, 2500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, []);

  // Lock body scroll while the preloader is visible
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[200] bg-ink flex flex-col items-center justify-center"
          aria-label="Loading ZEN Sushi"
          role="status"
          aria-live="polite"
        >
          {/* Subtle grain texture */}
          <div className="absolute inset-0 grain-overlay" />

          {/* Faint background kanji */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="font-display text-[40vw] md:text-[30rem] leading-none text-ivory select-none">
              禅
            </span>
          </motion.div>

          {/* Center: animated logo */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-28 h-28 md:w-36 md:h-36"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                role="img"
                aria-label="ZEN Sushi logo"
              >
                <defs>
                  <radialGradient id="loaderRed" cx="35%" cy="30%" r="80%">
                    <stop offset="0%" stopColor="#e63946" />
                    <stop offset="60%" stopColor="#c8102e" />
                    <stop offset="100%" stopColor="#8c0a1f" />
                  </radialGradient>
                </defs>

                {/* Circle draws itself */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="url(#loaderRed)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.4,
                    ease: "easeInOut",
                  }}
                />
                {/* Fill fades in after the stroke completes */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="url(#loaderRed)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                />

                {/* Zen kanji strokes draw in sequence */}
                <g fill="#0a0a0a">
                  {/* Top horizontal stroke */}
                  <motion.rect
                    x="30"
                    y="26"
                    width="40"
                    height="4.5"
                    rx="1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.3, duration: 0.3, ease: "easeOut" }}
                    style={{ transformOrigin: "30px 28.25px" }}
                  />
                  {/* Left vertical */}
                  <motion.rect
                    x="30"
                    y="26"
                    width="4.5"
                    height="22"
                    rx="1"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.45, duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "32.25px 26px" }}
                  />
                  {/* Right vertical */}
                  <motion.rect
                    x="65.5"
                    y="26"
                    width="4.5"
                    height="22"
                    rx="1"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.55, duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "67.75px 26px" }}
                  />
                  {/* Middle horizontal */}
                  <motion.rect
                    x="38"
                    y="38"
                    width="24"
                    height="3.5"
                    rx="1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.7, duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "38px 39.75px" }}
                  />
                  {/* Lower box - left vertical */}
                  <motion.rect
                    x="36"
                    y="50"
                    width="4"
                    height="22"
                    rx="1"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.85, duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "38px 50px" }}
                  />
                  {/* Lower box - right vertical */}
                  <motion.rect
                    x="60"
                    y="50"
                    width="4"
                    height="22"
                    rx="1"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.95, duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "62px 50px" }}
                  />
                  {/* Lower box - top horizontal */}
                  <motion.rect
                    x="36"
                    y="50"
                    width="28"
                    height="3.5"
                    rx="1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.05, duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "36px 51.75px" }}
                  />
                  {/* Lower box - bottom horizontal */}
                  <motion.rect
                    x="34"
                    y="68.5"
                    width="32"
                    height="4"
                    rx="1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2.15, duration: 0.3, ease: "easeOut" }}
                    style={{ transformOrigin: "34px 70.5px" }}
                  />
                  {/* Center vertical */}
                  <motion.rect
                    x="48"
                    y="46"
                    width="4"
                    height="30"
                    rx="1"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 2.25, duration: 0.3, ease: "easeOut" }}
                    style={{ transformOrigin: "50px 46px" }}
                  />
                </g>

                {/* Gold seal dot */}
                <motion.circle
                  cx="76"
                  cy="76"
                  r="3.2"
                  fill="#e8c87a"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.4, duration: 0.4, type: "spring" }}
                />
              </svg>

              {/* Rotating ring around the logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute inset-0 -m-4"
              >
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full"
                  style={{ animation: "spin-slow 3s linear infinite" }}
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="58"
                    fill="none"
                    stroke="rgba(232, 200, 122, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-medium tracking-[0.3em] text-ivory overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 1.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  ZEN
                </motion.span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-ivory-soft/50 mt-2"
              >
                Sushi · Bethel
              </motion.div>
            </motion.div>
          </div>

          {/* Progress bar at the bottom */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-md px-8 pb-8">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ivory-soft/40 mb-3">
                <span>Preparing your table</span>
                <span className="font-mono text-ivory-soft/60 tabular-nums">
                  {progress.toString().padStart(2, "0")}%
                </span>
              </div>
              <div className="h-px bg-ivory-soft/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-vermilion via-gold to-vermilion"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
