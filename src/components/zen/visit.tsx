"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Navigation,
  ExternalLink,
  Utensils,
  ShoppingBag,
  Bike,
} from "lucide-react";

const HOURS = [
  { day: "Monday", time: "11 AM – 9 PM" },
  { day: "Tuesday", time: "11 AM – 9 PM" },
  { day: "Wednesday", time: "11 AM – 9 PM" },
  { day: "Thursday", time: "11 AM – 9 PM" },
  { day: "Friday", time: "11 AM – 10 PM" },
  { day: "Saturday", time: "11 AM – 10 PM" },
  { day: "Sunday", time: "12 PM – 8 PM" },
];

const SERVICES = [
  { icon: Utensils, label: "Dine-in", desc: "Sit-down service" },
  { icon: ShoppingBag, label: "Takeout", desc: "Call ahead, ready fast" },
  { icon: Bike, label: "No-contact delivery", desc: "Bethel area" },
];

const PHONE = "+19075432222";
const PHONE_DISPLAY = "+1 907-543-2222";
const ADDRESS = "320 Tundra Way, Bethel, AK 99559, United States";
const MAPS_DIR_URL =
  "https://www.google.com/maps/dir/?api=1&destination=320+Tundra+Way+Bethel+AK+99559";
const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=320+Tundra+Way,+Bethel,+AK+99559&output=embed";

export function Visit() {
  // Hydration-safe "today" highlight.
  // Compute only on the client to avoid SSR/CSR mismatch.
  const [todayIdx, setTodayIdx] = useState<number>(-1);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: must run on client only to avoid SSR/CSR hydration mismatch for "Today" highlight
    setTodayIdx((new Date().getDay() + 6) % 7);
  }, []);

  return (
    <section
      id="visit"
      className="relative py-16 md:py-36 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="h-px w-12 bg-vermilion" />
            <span className="text-xs uppercase tracking-[0.32em] text-ivory-soft/60">
              Visit Us
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
            Find us on <span className="italic text-gold/90">Tundra Way.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left: Map + address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="ZEN Sushi location on Google Maps"
                src={MAPS_EMBED_URL}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // Security: sandbox restricts the iframe to the minimum
                // capabilities needed to render the Google Maps embed.
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms"
                style={{
                  border: 0,
                  filter:
                    "invert(0.9) hue-rotate(180deg) saturate(0.6)",
                }}
              />
              {/* Address card overlay */}
              <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-auto md:w-80 p-4 md:p-5 rounded-xl bg-ink/90 md:bg-ink/85 backdrop-blur-xl border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-vermilion/20 border border-vermilion/40 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-vermilion" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-ivory font-medium text-sm leading-snug">
                      320 Tundra Way
                    </div>
                    <div className="text-ivory-soft/65 text-xs mt-0.5">
                      Bethel, AK 99559, United States
                    </div>
                    <div className="text-ivory-soft/45 text-[11px] mt-1 font-mono">
                      Q6VX+PG Bethel, Alaska
                    </div>
                  </div>
                </div>
                <a
                  href={MAPS_DIR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-vermilion hover:text-gold transition-colors text-xs uppercase tracking-[0.18em] min-h-[44px] py-2"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Get Directions
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Services — stack to 1 col on very small screens */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {SERVICES.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 sm:flex-col sm:items-start p-4 rounded-xl border border-white/5 bg-ink-soft/40 hover:border-vermilion/30 transition-colors group"
                >
                  <s.icon className="h-5 w-5 text-vermilion group-hover:scale-110 transition-transform shrink-0" />
                  <div className="sm:mt-2">
                    <div className="text-ivory text-xs font-medium">
                      {s.label}
                    </div>
                    <div className="text-ivory-soft/50 text-[11px] mt-0.5">
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: hours + contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Status card */}
            <div className="p-5 md:p-6 rounded-2xl border border-white/10 bg-ink-soft/60">
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-vermilion/60 animate-slow-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-vermilion" />
                </span>
                <div>
                  <div className="text-ivory font-medium text-sm">
                    Currently closed
                  </div>
                  <div className="text-ivory-soft/60 text-xs">
                    Opens today at 11 AM
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3 text-ivory-soft/70 text-xs uppercase tracking-[0.22em]">
                <Clock className="h-3.5 w-3.5" />
                Opening Hours
              </div>
              <ul className="space-y-1.5">
                {HOURS.map((row, i) => {
                  const isToday = i === todayIdx;
                  return (
                    <li
                      key={row.day}
                      className={`flex items-center justify-between text-sm py-1.5 px-3 rounded-lg transition-colors ${
                        isToday
                          ? "bg-vermilion/15 border border-vermilion/30"
                          : ""
                      }`}
                    >
                      <span
                        className={`${
                          isToday
                            ? "text-ivory font-medium"
                            : "text-ivory-soft/75"
                        }`}
                      >
                        {row.day}
                        {isToday && (
                          <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-vermilion">
                            Today
                          </span>
                        )}
                      </span>
                      <span
                        className={`font-mono text-xs ${
                          isToday ? "text-ivory" : "text-ivory-soft/60"
                        }`}
                      >
                        {row.time}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact card */}
            <div className="p-5 md:p-6 rounded-2xl border border-white/10 bg-ink-soft/60">
              <div className="flex items-center gap-2 mb-4 text-ivory-soft/70 text-xs uppercase tracking-[0.22em]">
                <Phone className="h-3.5 w-3.5" />
                Reservations &amp; Orders
              </div>
              <a
                href={`tel:${PHONE}`}
                className="group flex items-center justify-between gap-4 py-3 border-b border-white/5 hover:border-vermilion/30 transition-colors min-h-[44px]"
              >
                <div>
                  <div className="text-ivory-soft/55 text-xs uppercase tracking-[0.2em]">
                    Call
                  </div>
                  <div className="font-display text-xl md:text-2xl text-ivory group-hover:text-vermilion transition-colors">
                    {PHONE_DISPLAY}
                  </div>
                </div>
                <Phone className="h-5 w-5 text-vermilion opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://m.facebook.com/zenbethel/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-3 hover:text-vermilion transition-colors min-h-[44px]"
              >
                <div>
                  <div className="text-ivory-soft/55 text-xs uppercase tracking-[0.2em]">
                    Facebook
                  </div>
                  <div className="text-ivory group-hover:text-vermilion transition-colors text-sm">
                    m.facebook.com/zenbethel
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-ivory-soft/40 group-hover:text-vermilion transition-colors" />
              </a>
            </div>

            {/* Pricing */}
            <div className="p-5 md:p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-vermilion/15 to-transparent">
              <div className="flex items-center gap-2 mb-2 text-ivory-soft/70 text-xs uppercase tracking-[0.22em]">
                <Car className="h-3.5 w-3.5" />
                Average per person
              </div>
              <div className="font-display text-2xl md:text-3xl text-ivory">
                $20 – $30
              </div>
              <div className="text-ivory-soft/55 text-xs mt-1">
                Reported by 22 people · Family-friendly pricing
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
