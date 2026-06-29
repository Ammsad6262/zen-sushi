"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Leaf, Star, Wheat, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Dish = {
  name: string;
  description: string;
  price: string;
  tags?: ("spicy" | "veg" | "popular" | "gf")[];
};
type Category = {
  id: string;
  label: string;
  kanji: string;
  blurb: string;
  image: string;
  dishes: Dish[];
};

const CATEGORIES: Category[] = [
  {
    id: "sushi",
    label: "Sushi & Sashimi",
    kanji: "鮨",
    blurb: "Hand-pressed nigiri, signature rolls, and sashimi cut to order.",
    image: "/zen/dish-sashimi.png",
    dishes: [
      {
        name: "Zen Signature Roll",
        description:
          "Salmon, yellowtail, avocado, asparagus, finished with yuzu-truffle aioli and gold leaf.",
        price: "$18",
        tags: ["popular"],
      },
      {
        name: "Salmon Nigiri (2 pc)",
        description: "Atlantic salmon over hand-formed vinegared rice.",
        price: "$8",
      },
      {
        name: "Tuna Sashimi (5 pc)",
        description: "Five slices of lean akami tuna with house-grated wasabi.",
        price: "$16",
      },
      {
        name: "Rainbow Roll",
        description:
          "California roll crowned with tuna, salmon, yellowtail & avocado.",
        price: "$16",
        tags: ["popular"],
      },
      {
        name: "Spicy Tuna Roll",
        description: "Tuna tartare, sriracha aioli, scallion, sesame.",
        price: "$14",
        tags: ["spicy"],
      },
      {
        name: "Yellowtail Jalapeño",
        description: "Hamachi, jalapeño, yuzu-soy, micro cilantro.",
        price: "$15",
        tags: ["spicy"],
      },
      {
        name: "Eel & Avocado Roll",
        description: "Unagi, avocado, sweet kabayaki glaze, sesame seeds.",
        price: "$13",
      },
      {
        name: "California Roll",
        description: "Lump crab, avocado, cucumber, sesame.",
        price: "$12",
        tags: ["veg"],
      },
    ],
  },
  {
    id: "korean",
    label: "Korean",
    kanji: "한",
    blurb: "Bulgogi, stews, and banchan-worthy plates from family recipes.",
    image: "/zen/dish-bulgogi.png",
    dishes: [
      {
        name: "Bulgogi",
        description:
          "Thin-sliced marinated beef grilled tableside, sesame, scallion, served with rice & banchan.",
        price: "$22",
        tags: ["popular"],
      },
      {
        name: "Galbi Short Ribs",
        description: "Korean-style beef short ribs, soy-pear marinade, 24-hour cure.",
        price: "$26",
      },
      {
        name: "Bibimbap",
        description:
          "Hot stone bowl with seasoned vegetables, beef, egg yolk, gochujang.",
        price: "$18",
        tags: ["spicy"],
      },
      {
        name: "Kimchi Jjigae",
        description: "Spicy kimchi stew with pork belly, tofu & scallion.",
        price: "$16",
        tags: ["spicy"],
      },
      {
        name: "Japchae",
        description: "Sweet potato glass noodles with beef and vegetables.",
        price: "$15",
        tags: ["veg"],
      },
      {
        name: "Tteokbokki",
        description: "Rice cakes in spicy gochujang glaze with fish cake.",
        price: "$13",
        tags: ["spicy"],
      },
    ],
  },
  {
    id: "chinese",
    label: "Chinese",
    kanji: "中",
    blurb: "Wok-fired classics — General Tso, Kung Pao, and homestyle plates.",
    image: "/zen/dish-tso.png",
    dishes: [
      {
        name: "General Tso's Chicken",
        description:
          "Crispy chicken thigh in a glossy sweet-tangy glaze, broccoli, sesame.",
        price: "$16",
        tags: ["popular", "spicy"],
      },
      {
        name: "Kung Pao Shrimp",
        description: "Wok-tossed shrimp, peanuts, dried chili, scallion.",
        price: "$18",
        tags: ["spicy"],
      },
      {
        name: "Mongolian Beef",
        description: "Tender beef flank, caramelized scallions, dark soy glaze.",
        price: "$19",
      },
      {
        name: "Mapo Tofu",
        description: "Silken tofu, spicy doubanjiang, ground pork, Sichuan pepper.",
        price: "$14",
        tags: ["spicy"],
      },
      {
        name: "Pork Fried Rice",
        description: "Wok-fried rice with roast pork, egg, scallion, peas.",
        price: "$11",
      },
      {
        name: "Salt & Pepper Calamari",
        description: "Crispy squid tossed with garlic, chili, scallion.",
        price: "$17",
      },
    ],
  },
  {
    id: "american",
    label: "American",
    kanji: "米",
    blurb: "Bethel favorites — burgers, baskets, and the classics done right.",
    image: "/zen/dish-burger.png",
    dishes: [
      {
        name: "Bethel Burger",
        description:
          "Half-pound Angus patty, cheddar, bacon, house pickles, brioche bun.",
        price: "$15",
        tags: ["popular"],
      },
      {
        name: "Fish & Chips",
        description: "Beer-battered Alaskan cod, hand-cut fries, tartar sauce.",
        price: "$17",
      },
      {
        name: "Chicken Tender Basket",
        description: "Hand-breaded tenders, fries, honey-mustard & BBQ.",
        price: "$13",
      },
      {
        name: "Caesar Salad",
        description: "Romaine, parmesan, garlic croutons, classic Caesar dressing.",
        price: "$11",
        tags: ["veg"],
      },
      {
        name: "New York Cheesecake",
        description: "House-baked, graham crust, seasonal berry compote.",
        price: "$8",
      },
      {
        name: "Mochi Trio",
        description: "Matcha, black sesame & yuzu mochi with gold leaf.",
        price: "$9",
        tags: ["popular"],
      },
    ],
  },
];

const TAG_META: Record<string, { label: string; icon: LucideIcon; color: string }> = {
  spicy: { label: "Spicy", icon: Flame, color: "text-vermilion" },
  veg: { label: "Veg", icon: Leaf, color: "text-emerald-400" },
  popular: { label: "Popular", icon: Star, color: "text-gold" },
  gf: { label: "GF", icon: Wheat, color: "text-amber-300" },
};

export function Menu() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const category = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section
      id="menu"
      className="relative py-16 md:py-36 border-t border-white/5 bg-ink-soft/40"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
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
                The Menu
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl md:text-6xl font-medium text-ivory leading-[1.1] md:leading-[1.05]"
            >
              Four cuisines,
              <br />
              <span className="italic text-gold/90">one table.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-sm md:text-base text-ivory-soft/70 max-w-md leading-relaxed"
          >
            Prices range $11–$26 per plate. Average per person $20–$30. Full
            menu available for dine-in, takeout, and no-contact delivery.
          </motion.p>
        </div>

        {/* Tabs — horizontally scrollable on mobile, wrap on desktop */}
        <div
          className="flex md:flex-wrap gap-2 mb-8 md:mb-10 border-b border-white/5 pb-4 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                aria-pressed={isActive}
                className={cn(
                  "relative group flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full text-xs md:text-sm uppercase tracking-[0.18em] md:tracking-[0.2em] transition-all duration-300 shrink-0 min-h-[44px]",
                  isActive
                    ? "bg-vermilion text-ivory"
                    : "bg-transparent text-ivory-soft/70 hover:text-ivory hover:bg-white/5"
                )}
              >
                <span className="font-display text-sm md:text-base opacity-80">
                  {cat.kanji}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active category content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-12 gap-6 md:gap-12"
          >
            {/* Left: category image + blurb — stacks on top on mobile */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <div className="relative aspect-[16/10] lg:aspect-square overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <div className="font-display text-5xl md:text-7xl text-ivory/95 leading-none mb-2">
                    {category.kanji}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-ivory mb-1.5">
                    {category.label}
                  </h3>
                  <p className="text-xs md:text-sm text-ivory-soft/75 leading-relaxed">
                    {category.blurb}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: dish list */}
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-6 md:gap-y-8">
                {category.dishes.map((dish, i) => (
                  <motion.div
                    key={dish.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.5 }}
                    className="group"
                  >
                    <div className="flex items-baseline gap-2 md:gap-3 mb-1.5">
                      <h4 className="font-display text-lg md:text-xl text-ivory group-hover:text-gold transition-colors duration-300">
                        {dish.name}
                      </h4>
                      <span className="flex-1 border-b border-dashed border-ivory-soft/20 translate-y-[-3px]" />
                      <span className="font-display text-base md:text-lg text-vermilion font-medium shrink-0">
                        {dish.price}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-ivory-soft/65 leading-relaxed">
                      {dish.description}
                    </p>
                    {dish.tags && dish.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2.5">
                        {dish.tags.map((tag) => {
                          const meta = TAG_META[tag];
                          return (
                            <span
                              key={tag}
                              className={cn(
                                "inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded border border-current/30",
                                meta.color
                              )}
                            >
                              <meta.icon className="h-2.5 w-2.5" />
                              {meta.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-ivory-soft/55"
        >
          <p>
            Have a dietary request? Call us — we&apos;ll happily adapt most
            dishes.
          </p>
          <a
            href="tel:+19075432222"
            className="text-vermilion hover:text-gold transition-colors uppercase tracking-[0.18em] text-xs"
          >
            +1 907-543-2222
          </a>
        </motion.div>
      </div>
    </section>
  );
}
