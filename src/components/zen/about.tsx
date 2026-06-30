"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Heart, Leaf, Users } from "lucide-react";

const STATS = [
  { value: "Family", label: "Run & Operated", icon: Users },
  { value: "4", label: "Cuisines Under One Roof", icon: Leaf },
  { value: "11 AM", label: "Fresh Daily from Open", icon: Heart },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="story" className="relative py-16 md:py-36 overflow-hidden">
      {/* Decorative vertical kanji */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block opacity-[0.04] pointer-events-none">
        <span className="font-display text-[28rem] leading-none text-ivory select-none">
          禅
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Left: image stack */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/zen/interior.webp"
                alt="The ZEN Sushi dining room in Bethel, Alaska"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            {/* Floating dish image - hidden on small mobile to avoid overlap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="hidden sm:block absolute -bottom-10 -right-6 md:-right-10 w-32 h-32 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-ink shadow-2xl"
            >
              <Image
                src="/zen/dish-nigiri.webp"
                alt="Fresh nigiri at ZEN Sushi"
                fill
                className="object-cover"
                sizes="220px"
              />
            </motion.div>
            {/* Gold seal - smaller on mobile, repositioned */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              animate={
                inView
                  ? { opacity: 1, scale: 1, rotate: -12 }
                  : {}
              }
              transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
              className="absolute -top-4 -left-3 sm:-top-5 sm:-left-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-vermilion flex items-center justify-center shadow-xl"
            >
              <span className="font-display text-ivory text-[9px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-center leading-tight">
                Est.
                <br />
                Bethel
              </span>
            </motion.div>
          </motion.div>

          {/* Right: copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-px w-12 bg-vermilion" />
              <span className="text-xs uppercase tracking-[0.32em] text-ivory-soft/60">
                Our Story
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-6xl font-medium text-ivory leading-[1.1] md:leading-[1.05]"
            >
              A small kitchen with a{" "}
              <span className="italic text-gold/90">big&nbsp;heart</span>{" "}
              — and four cuisines on the pass.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="mt-6 md:mt-8 space-y-4 md:space-y-5 text-ivory-soft/80 text-base md:text-lg leading-relaxed max-w-2xl"
            >
              <p>
                ZEN Sushi began as a simple idea — that the calm of a perfectly
                pressed piece of nigiri and the comfort of a sizzling plate of
                bulgogi could live under one roof, in a town where good food
                deserves the same care as anywhere else.
              </p>
              <p>
                Run by a family who made Bethel home, every dish is prepared to
                order with the kind of attention you can taste. From the
                knife-work on our sashimi to the slow-simmered broths of our
                Korean stews, nothing leaves the pass that we wouldn&apos;t
                serve at our own table.
              </p>
              <p>
                Whether you&apos;re here for a quick lunch, a long dinner with
                friends, or a no-contact delivery on a cold Bethel evening —
                welcome. Sit, breathe, eat well.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.9 }}
              className="mt-10 md:mt-12 grid grid-cols-3 gap-3 md:gap-6"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border-t border-white/10 pt-3 md:pt-4"
                >
                  <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-vermilion mb-2 md:mb-3" />
                  <div className="font-display text-lg md:text-3xl text-ivory leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.18em] text-ivory-soft/55 mt-1 md:mt-1.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
