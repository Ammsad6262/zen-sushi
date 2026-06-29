"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, MapPin, ChevronDown, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[600px] md:min-h-[680px] w-full overflow-hidden"
    >
      {/* Background image with parallax + ken burns */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute inset-0 animate-ken-burns bg-cover bg-center"
          style={{ backgroundImage: "url('/zen/hero-sushi.png')" }}
        />
        {/* Dark cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/30" />
        {/* Grain */}
        <div className="absolute inset-0 grain-overlay" />
      </motion.div>

      {/* Vertical Japanese accent (left) - desktop only */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="vertical-rl text-ivory-soft/40 font-display text-sm tracking-[0.4em] uppercase"
        >
          Fresh · Honest · Family-Run
        </motion.div>
      </div>

      {/* Right rating card - desktop only */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute right-6 top-28 hidden lg:block z-10"
      >
        <div className="rounded-2xl border border-white/10 bg-ink/40 backdrop-blur-md p-5 w-56">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[0, 1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-gold text-gold"
                />
              ))}
              <Star className="h-3.5 w-3.5 text-ivory-soft/30" />
            </div>
            <span className="text-ivory text-xs font-medium">3.8</span>
          </div>
          <p className="text-ivory-soft/70 text-[11px] tracking-wide">
            <span className="text-ivory font-medium">44 reviews</span>
            <br />
            on Google Maps
          </p>
        </div>
      </motion.div>

      {/* Center content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-5 md:px-8 pb-20 md:pb-0"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Top eyebrow */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
          >
            <span className="h-px w-8 md:w-12 bg-vermilion" />
            <span className="text-ivory-soft/80 text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.32em] font-sans">
              Japanese · Korean · Chinese · American
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-[22vw] sm:text-[18vw] md:text-[10rem] leading-[0.88] font-medium text-ivory"
          >
            <span className="block">ZEN</span>
            <span className="block italic text-gold/90 font-light">
              Sushi
            </span>
          </motion.h1>

          {/* Sub headline */}
          <motion.p
            variants={itemVariants}
            className="mt-5 md:mt-6 text-base md:text-xl text-ivory-soft/85 font-light max-w-xl leading-relaxed"
          >
            A family-run kitchen in Bethel, Alaska — where the calm of Japanese
            craft meets the warmth of Korean, Chinese &amp; American favorites.
            One table, many traditions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 w-full sm:w-auto"
          >
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#menu");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 70;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="group inline-flex items-center justify-center gap-3 px-6 md:px-7 py-3.5 md:py-4 bg-vermilion text-ivory rounded-full text-xs md:text-sm uppercase tracking-[0.18em] md:tracking-[0.22em] font-medium hover:bg-vermilion-deep transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(200,16,46,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(200,16,46,0.8)] hover:-translate-y-0.5 min-h-[48px]"
            >
              <UtensilsCrossed className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              Explore the Menu
            </a>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("zen:open-order"));
                toast.info("Opening order options…", { duration: 2000 });
              }}
              className="group inline-flex items-center justify-center gap-3 px-6 md:px-7 py-3.5 md:py-4 border border-ivory/20 text-ivory rounded-full text-xs md:text-sm uppercase tracking-[0.18em] md:tracking-[0.22em] font-medium hover:bg-ivory/5 hover:border-ivory/40 transition-all duration-300 min-h-[48px]"
            >
              <MapPin className="h-4 w-4 text-vermilion group-hover:scale-110 transition-transform" />
              Order Now
            </button>
          </motion.div>

          {/* Meta row */}
          <motion.div
            variants={itemVariants}
            className="mt-8 md:mt-12 flex flex-wrap items-center gap-x-4 md:gap-x-8 gap-y-2.5 text-[10px] md:text-xs uppercase tracking-[0.18em] md:tracking-[0.22em] text-ivory-soft/60"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-vermilion animate-slow-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-vermilion" />
              </span>
              Closed · Opens 11 AM
            </span>
            <span className="hidden sm:inline-block h-3 w-px bg-ivory-soft/20" />
            <span>$20–30 per person</span>
            <span className="hidden sm:inline-block h-3 w-px bg-ivory-soft/20" />
            <span>Dine-in · Takeout · Delivery</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue - desktop only (mobile has bottom marquee) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-ivory-soft/60"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>

      {/* Bottom marquee strip */}
      <div className="absolute bottom-0 inset-x-0 z-20 overflow-hidden border-t border-white/5 bg-ink/60 backdrop-blur-sm py-2.5 md:py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {[
                "Fresh Salmon Daily",
                "Hand-pressed Nigiri",
                "Korean Bulgogi",
                "Spicy Tuna Rolls",
                "General Tso's Chicken",
                "Bethel Burger",
                "Mochi Desserts",
                "Family Recipes",
              ].map((item) => (
                <span
                  key={item + dup}
                  className="flex items-center text-[10px] md:text-xs uppercase tracking-[0.22em] md:tracking-[0.32em] text-ivory-soft/50 font-sans px-5 md:px-8"
                >
                  <span className="text-vermilion mr-2 md:mr-3">◆</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
