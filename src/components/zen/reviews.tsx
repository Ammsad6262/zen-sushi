"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    name: "Sarah K.",
    location: "Bethel, AK",
    rating: 5,
    date: "2 weeks ago",
    text: "The freshest sushi I've had anywhere in Alaska — and I've lived in Anchorage. The Zen Signature Roll is worth driving across town for. Family vibe, real hospitality.",
    initials: "SK",
  },
  {
    name: "Michael T.",
    location: "Local Guide · 24 reviews",
    rating: 4,
    date: "1 month ago",
    text: "Solid little spot. The bulgogi was tender and well-marinated, portions are honest for the price. Service was friendly and quick. Will be back for the bibimbap next.",
    initials: "MT",
  },
  {
    name: "Jennifer L.",
    location: "Bethel, AK",
    rating: 5,
    date: "1 month ago",
    text: "We ordered delivery on a -25°F night and it arrived hot, beautifully packed, with a handwritten thank-you on the bag. The General Tso's was perfect and the mochi trio was a beautiful surprise.",
    initials: "JL",
  },
  {
    name: "David P.",
    location: "Visited from Seattle",
    rating: 4,
    date: "2 months ago",
    text: "Stumbled in on a work trip and was genuinely impressed. Sashimi cuts were clean, rice was seasoned right. The family running it clearly cares — you can taste it.",
    initials: "DP",
  },
  {
    name: "Anna M.",
    location: "Bethel, AK",
    rating: 5,
    date: "3 months ago",
    text: "Our family's go-to. Kids get the Bethel Burger, husband gets the galbi, I get the rainbow roll — everyone's happy. They remember our order now. That's a real restaurant.",
    initials: "AM",
  },
];

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + REVIEWS.length) % REVIEWS.length);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paginate]);

  const review = REVIEWS[index];

  return (
    <section
      id="reviews"
      className="relative py-16 md:py-36 border-t border-white/5 bg-ink-soft/40 overflow-hidden"
    >
      {/* Decorative giant quote */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.04]">
        <Quote className="h-16 w-16 md:h-[28rem] md:w-[28rem] text-ivory" fill="currentColor" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="h-px w-12 bg-vermilion" />
            <span className="text-xs uppercase tracking-[0.32em] text-ivory-soft/60">
              Guest Words
            </span>
            <span className="h-px w-12 bg-vermilion" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl md:text-6xl font-medium text-ivory leading-[1.1] md:leading-[1.05]"
          >
            What Bethel is <span className="italic text-gold/90">saying.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 inline-flex items-center gap-3"
          >
            <div className="flex">
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-gold text-gold" />
              ))}
              <Star className="h-4 w-4 md:h-5 md:w-5 text-ivory-soft/30" />
            </div>
            <span className="text-ivory-soft/70 text-sm">
              <span className="text-ivory font-medium">3.8</span> · 44 Google reviews
            </span>
          </motion.div>
        </div>

        {/* Review card */}
        <div className="relative min-h-[300px] md:min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <Quote className="h-8 w-8 md:h-10 md:w-10 text-vermilion mx-auto mb-4 md:mb-6" fill="currentColor" />
              <blockquote className="font-display text-lg md:text-3xl text-ivory leading-relaxed italic max-w-3xl mx-auto px-2">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="mt-6 md:mt-8 flex flex-col items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-gold text-gold"
                          : "text-ivory-soft/30"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-vermilion/20 border border-vermilion/40 flex items-center justify-center font-display text-vermilion text-sm tracking-wider">
                    {review.initials}
                  </div>
                  <div className="text-left">
                    <div className="text-ivory font-medium text-sm">
                      {review.name}
                    </div>
                    <div className="text-ivory-soft/55 text-xs">
                      {review.location} · {review.date}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 md:mt-10 flex items-center justify-center gap-3 md:gap-4">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous review"
            className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-ivory/20 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300 group shrink-0"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-vermilion"
                    : "w-1.5 bg-ivory-soft/30 hover:bg-ivory-soft/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next review"
            className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-ivory/20 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300 group shrink-0"
          >
            <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
