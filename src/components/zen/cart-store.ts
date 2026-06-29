"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number; // stored as numeric (cents-free) for math
  priceDisplay: string; // original "$18" string for display
  category: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  // actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  incrementQty: (id: string) => void;
  decrementQty: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  // selectors
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      incrementQty: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        })),

      decrementQty: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "zen-cart",
      storage: createJSONStorage(() => localStorage),
      // Only persist items, not isOpen state
      partialize: (state) => ({ items: state.items }),
    }
  )
);

/**
 * Parse a price string like "$18" or "$11.50" into a numeric value.
 * Returns 0 if parsing fails.
 */
export function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/[$,]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

/**
 * Format a numeric amount as a USD price string.
 */
export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
