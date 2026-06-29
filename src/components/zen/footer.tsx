"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Instagram, Facebook, ArrowUp } from "lucide-react";
import { ZenLogo } from "./logo";

const NAV = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

export function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/5 bg-ink pt-12 md:pt-20 pb-24 md:pb-10 overflow-hidden">
      {/* Decorative giant kanji */}
      <div className="absolute -bottom-32 -left-20 opacity-[0.025] pointer-events-none">
        <span className="font-display text-[16rem] md:text-[30rem] leading-none text-ivory select-none">
          寿
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10 mb-10 md:mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <ZenLogo size={48} showText />
            <p className="mt-5 md:mt-6 text-sm md:text-base text-ivory-soft/65 leading-relaxed max-w-sm">
              A family-run kitchen serving Japanese, Korean, Chinese &amp;
              American cuisine in Bethel, Alaska. One table, many traditions.
            </p>
            <div className="mt-5 md:mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/zenbethel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full border border-ivory/15 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://m.facebook.com/zenbethel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full border border-ivory/15 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="tel:+19075432222"
                aria-label="Call ZEN Sushi"
                className="w-11 h-11 rounded-full border border-ivory/15 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-3"
          >
            <h4 className="text-xs uppercase tracking-[0.32em] text-ivory-soft/45 mb-4 md:mb-5">
              Explore
            </h4>
            <ul className="space-y-2.5 md:space-y-3">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-ivory-soft/75 hover:text-vermilion transition-colors text-sm tracking-wide inline-flex items-center gap-2 group min-h-[44px] py-1"
                  >
                    <span className="h-px w-3 bg-vermilion opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-4"
          >
            <h4 className="text-xs uppercase tracking-[0.32em] text-ivory-soft/45 mb-4 md:mb-5">
              Visit
            </h4>
            <ul className="space-y-3 md:space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-vermilion mt-0.5 shrink-0" />
                <span className="text-ivory-soft/75">
                  320 Tundra Way, Bethel, AK 99559, United States
                </span>
              </li>
              <li className="flex items-center gap-3 min-h-[44px]">
                <Phone className="h-4 w-4 text-vermilion shrink-0" />
                <a
                  href="tel:+19075432222"
                  className="text-ivory-soft/75 hover:text-vermilion transition-colors"
                >
                  +1 907-543-2222
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-vermilion shrink-0" />
                <span className="text-ivory-soft/75">
                  Daily · 11 AM – 9 PM (Fri/Sat till 10)
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory-soft/45 tracking-wide">
            © {new Date().getFullYear()} ZEN Sushi · Family-run in Bethel, Alaska
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-ivory-soft/45">
              Crafted with care
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group w-10 h-10 rounded-full border border-ivory/15 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
