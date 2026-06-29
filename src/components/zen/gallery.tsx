"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";

const IMAGES = [
  {
    src: "/zen/hero-sushi.png",
    alt: "Premium sushi platter at ZEN Sushi",
    span: "md:col-span-2 md:row-span-2",
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
    span: "md:col-span-2",
    aspect: "aspect-[2/1]",
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
  return (
    <section id="gallery" className="relative py-24 md:py-36 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
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
              className="font-display text-4xl md:text-6xl font-medium text-ivory leading-[1.05]"
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
            className="inline-flex items-center gap-3 text-sm text-ivory-soft/70 hover:text-vermilion transition-colors group"
          >
            <Camera className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            <span className="uppercase tracking-[0.22em]">
              @zenbethel on Instagram
            </span>
          </motion.a>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-auto">
          {IMAGES.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-xl ${img.span} ${img.aspect}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-ivory text-sm font-medium tracking-wide">
                  {img.alt}
                </span>
              </figcaption>
              {/* Vermilion corner accent */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-vermilion rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
