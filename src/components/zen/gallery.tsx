"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = [
  {
    src: "/zen/hero-sushi.png",
    alt: "Premium sushi platter at ZEN Sushi",
    span: "sm:col-span-2 sm:row-span-2",
    aspect: "aspect-square",
  },
  {
    src: "/zen/dish-roll.png",
    alt: "Spicy tuna roll with avocado",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/zen/dish-bibimbap.png",
    alt: "Korean bibimbap in hot stone bowl",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/zen/chef-action.png",
    alt: "Sushi chef plating nigiri",
    span: "sm:col-span-2",
    aspect: "aspect-[2/1] sm:aspect-[2/1]",
  },
  {
    src: "/zen/dish-sashimi.png",
    alt: "Salmon sashimi on slate",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/zen/dish-bulgogi.png",
    alt: "Korean bulgogi sizzling",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/zen/dish-mochi.png",
    alt: "Mochi dessert trio",
    span: "",
    aspect: "aspect-square",
  },
];

export function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIdx(null), []);
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? i : (i + 1) % IMAGES.length)),
    []
  );
  const prev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length
      ),
    []
  );

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, close, next, prev]);

  return (
    <section
      id="gallery"
      className="relative py-16 md:py-36 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8 mb-10 md:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-12 bg-vermilion" />
              <span className="text-xs uppercase tracking-[0.32em] text-ivory-soft/60">
                The Gallery
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-6xl font-medium text-ivory leading-[1.1] md:leading-[1.05]"
            >
              A look at <span className="italic text-gold/90">the pass.</span>
            </motion.h2>
          </div>
          <motion.a
            href="https://www.instagram.com/zenbethel/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-flex items-center gap-3 text-sm text-ivory-soft/70 hover:text-vermilion transition-colors group min-h-[44px]"
          >
            <Camera className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            <span className="uppercase tracking-[0.22em] text-xs md:text-sm">
              @zenbethel on Instagram
            </span>
          </motion.a>
        </div>

        {/* Masonry grid — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-auto">
          {IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setLightboxIdx(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: Math.min(i * 0.08, 0.5),
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-label={`View: ${img.alt}`}
              className={`group relative overflow-hidden rounded-xl ${img.span} ${img.aspect} cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:ring-offset-ink`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-left">
                <span className="text-ivory text-xs md:text-sm font-medium tracking-wide">
                  {img.alt}
                </span>
              </figcaption>
              {/* Vermilion corner accent */}
              <div className="absolute top-2 right-2 md:top-3 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 bg-vermilion rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close gallery"
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300 z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300 z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300 z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/10]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[lightboxIdx].src}
                alt={IMAGES[lightboxIdx].alt}
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-ink/90 to-transparent rounded-b-xl">
                <p className="text-ivory text-sm md:text-base font-medium">
                  {IMAGES[lightboxIdx].alt}
                </p>
                <p className="text-ivory-soft/55 text-xs mt-1">
                  {lightboxIdx + 1} / {IMAGES.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
