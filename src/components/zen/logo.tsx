"use client";

import { motion } from "framer-motion";

interface ZenLogoProps {
  size?: number;
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

/**
 * ZEN Sushi brand mark.
 * A red circle (Japanese rising-sun motif) housing a stylized
 * zen kanji + wordmark "ZEN".
 */
export function ZenLogo({
  size = 48,
  showText = true,
  animated = false,
  className = "",
}: ZenLogoProps) {
  const Wrapper: any = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: { rotate: -8, opacity: 0, scale: 0.85 },
        animate: { rotate: 0, opacity: 1, scale: 1 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
      }
    : {};

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Wrapper {...wrapperProps} style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          role="img"
          aria-label="ZEN Sushi logo"
        >
          <defs>
            <radialGradient id="zenRed" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#e63946" />
              <stop offset="60%" stopColor="#c8102e" />
              <stop offset="100%" stopColor="#8c0a1f" />
            </radialGradient>
            <linearGradient id="zenGoldStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e8c87a" />
              <stop offset="100%" stopColor="#a07b2c" />
            </linearGradient>
          </defs>

          {/* Outer ring with subtle gold edge */}
          <circle cx="50" cy="50" r="48" fill="url(#zenRed)" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#zenGoldStroke)"
            strokeWidth="0.6"
            opacity="0.55"
          />

          {/* Zen kanji (禅) stylized as a single bold brushstroke mark */}
          <g fill="#0a0a0a">
            {/* Top horizontal stroke */}
            <rect x="30" y="26" width="40" height="4.5" rx="1" />
            {/* Left vertical */}
            <rect x="30" y="26" width="4.5" height="22" rx="1" />
            {/* Right vertical */}
            <rect x="65.5" y="26" width="4.5" height="22" rx="1" />
            {/* Middle horizontal */}
            <rect x="38" y="38" width="24" height="3.5" rx="1" />
            {/* Lower box - left vertical */}
            <rect x="36" y="50" width="4" height="22" rx="1" />
            {/* Lower box - right vertical */}
            <rect x="60" y="50" width="4" height="22" rx="1" />
            {/* Lower box - top horizontal */}
            <rect x="36" y="50" width="28" height="3.5" rx="1" />
            {/* Lower box - bottom horizontal */}
            <rect x="34" y="68.5" width="32" height="4" rx="1" />
            {/* Center vertical line crossing lower box */}
            <rect x="48" y="46" width="4" height="30" rx="1" />
          </g>

          {/* Tiny gold dot accent (the seal) */}
          <circle cx="76" cy="76" r="3.2" fill="url(#zenGoldStroke)" />
        </svg>
      </Wrapper>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold tracking-[0.18em] text-ivory">
            ZEN
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.42em] text-ivory-soft/70 mt-1">
            Sushi · Bethel
          </span>
        </div>
      )}
    </div>
  );
}
