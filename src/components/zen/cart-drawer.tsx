"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useCart, formatPrice } from "./cart-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Step = "review" | "checkout" | "confirmation";

interface SubmittedOrder {
  orderId: string;
  name: string;
  email: string;
  items: { name: string; quantity: number; priceDisplay: string }[];
  subtotal: number;
  submittedAt: string;
}

export function CartDrawer() {
  const { items, isOpen, closeCart, incrementQty, decrementQty, removeItem, clearCart } =
    useCart();
  const [step, setStep] = useState<Step>("review");
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(
    null
  );

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ESC + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (step === "checkout") setStep("review");
        else if (step === "confirmation") {
          // do nothing — must use buttons
        } else closeCart();
      }
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, step, closeCart]);

  // Reset to review step whenever cart is reopened
  useEffect(() => {
    if (isOpen) setStep("review");
  }, [isOpen]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  // Tax + delivery (simple flat model for now — adjust later when admin adds rules)
  const taxRate = 0.05; // 5%
  const tax = subtotal * taxRate;
  const deliveryFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + tax + deliveryFee;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required";
    } else if (form.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please complete the required fields");
      return;
    }
    setSubmitting(true);

    // Simulate a brief network request. When the admin backend is wired up,
    // this is where we'd POST to /api/orders. For now we save to localStorage
    // so the user can see their order history, and show a confirmation.
    await new Promise((r) => setTimeout(r, 900));

    const orderId = `ZEN-${Date.now().toString().slice(-6)}`;
    const order: SubmittedOrder = {
      orderId,
      name: form.name,
      email: form.email,
      items: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        priceDisplay: i.priceDisplay,
      })),
      subtotal,
      submittedAt: new Date().toISOString(),
    };

    // Persist to localStorage as a simple order history (no backend yet)
    try {
      const existing = JSON.parse(
        localStorage.getItem("zen-orders") || "[]"
      );
      existing.push({
        ...order,
        phone: form.phone,
        address: form.address,
        notes: form.notes,
        tax,
        deliveryFee,
        total,
      });
      localStorage.setItem("zen-orders", JSON.stringify(existing));
    } catch {
      // localStorage might be full or disabled — non-critical
    }

    setSubmittedOrder(order);
    setSubmitting(false);
    setStep("confirmation");
    clearCart();
    toast.success(`Order ${orderId} placed!`, {
      description: "We'll call you shortly to confirm.",
    });

    // Reset form for next order
    setForm({ name: "", email: "", phone: "", address: "", notes: "" });
    setErrors({});
  };

  const handleClose = () => {
    if (step === "confirmation") {
      // Reset everything on close from confirmation
      setSubmittedOrder(null);
      setStep("review");
    }
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[95] bg-ink/80 backdrop-blur-md flex items-end md:items-center justify-center md:justify-end"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
        >
          <motion.div
            initial={{ y: "100%", x: 0, opacity: 1 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-md h-[92vh] md:h-[88vh] bg-ink-soft border-t md:border-t-0 md:border-l border-white/10 rounded-t-3xl md:rounded-none flex flex-col"
          >
            {/* Drag handle (mobile) */}
            <div className="md:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-ivory-soft/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                {step === "checkout" && (
                  <button
                    onClick={() => setStep("review")}
                    aria-label="Back to cart"
                    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-white/5 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xl text-ivory">
                      {step === "review" && "Your Order"}
                      {step === "checkout" && "Checkout"}
                      {step === "confirmation" && "Order Placed"}
                    </span>
                  </div>
                  {step === "review" && totalItems > 0 && (
                    <div className="text-xs text-ivory-soft/55 mt-0.5">
                      {totalItems} item{totalItems === 1 ? "" : "s"}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close cart"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Step content */}
            <div className="flex-1 overflow-y-auto px-5 md:px-6 py-5">
              {/* STEP 1: REVIEW */}
              {step === "review" &&
                (items.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-ink/60 border border-white/5"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-ivory text-sm font-medium leading-snug">
                            {item.name}
                          </div>
                          <div className="text-vermilion text-xs mt-0.5 font-display">
                            {item.priceDisplay}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => decrementQty(item.id)}
                            aria-label={`Decrease ${item.name}`}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-ivory text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementQty(item.id)}
                            aria-label={`Increase ${item.name}`}
                            className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-ivory hover:bg-vermilion hover:border-vermilion transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-ivory-soft/50 hover:text-vermilion hover:bg-vermilion/10 transition-colors shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}

                    {/* Order summary */}
                    <div className="mt-6 pt-4 border-t border-white/5 space-y-2 text-sm">
                      <div className="flex justify-between text-ivory-soft/70">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-ivory-soft/70">
                        <span>Tax (5%)</span>
                        <span>{formatPrice(tax)}</span>
                      </div>
                      <div className="flex justify-between text-ivory-soft/70">
                        <span>Delivery</span>
                        <span>{formatPrice(deliveryFee)}</span>
                      </div>
                      <div className="flex justify-between text-ivory font-display text-lg pt-2 border-t border-white/5">
                        <span>Total</span>
                        <span className="text-gold">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>
                ))}

              {/* STEP 2: CHECKOUT */}
              {step === "checkout" && (
                <div className="space-y-4">
                  <p className="text-sm text-ivory-soft/70 leading-relaxed">
                    Fill in your details and we&apos;ll call to confirm your
                    order before preparing it.
                  </p>
                  <CheckoutField
                    icon={User}
                    label="Full name"
                    required
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    error={errors.name}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                  <CheckoutField
                    icon={Mail}
                    label="Email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={errors.email}
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                  <CheckoutField
                    icon={Phone}
                    label="Phone number"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    error={errors.phone}
                    placeholder="+1 907-555-0123"
                    autoComplete="tel"
                  />
                  <CheckoutField
                    icon={MapPin}
                    label="Delivery address"
                    required
                    value={form.address}
                    onChange={(v) => setForm({ ...form, address: v })}
                    error={errors.address}
                    placeholder="123 Tundra Way, Bethel, AK 99559"
                    autoComplete="street-address"
                    multiline
                  />
                  <CheckoutField
                    icon={MessageSquare}
                    label="Order notes (optional)"
                    value={form.notes}
                    onChange={(v) => setForm({ ...form, notes: v })}
                    placeholder="Allergies, gate code, delivery instructions…"
                    multiline
                  />

                  {/* Mini summary */}
                  <div className="mt-6 p-4 rounded-xl bg-ink/60 border border-white/5 space-y-2 text-sm">
                    <div className="flex justify-between text-ivory-soft/70">
                      <span>Items ({totalItems})</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-ivory-soft/70">
                      <span>Tax + delivery</span>
                      <span>{formatPrice(tax + deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between text-ivory font-display text-lg pt-2 border-t border-white/5">
                      <span>Total</span>
                      <span className="text-gold">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: CONFIRMATION */}
              {step === "confirmation" && submittedOrder && (
                <div className="flex flex-col items-center text-center py-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5"
                  >
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </motion.div>
                  <h3 className="font-display text-2xl text-ivory mb-2">
                    Thank you, {submittedOrder.name.split(" ")[0]}!
                  </h3>
                  <p className="text-sm text-ivory-soft/70 leading-relaxed max-w-xs">
                    Your order has been received. We&apos;ll call you shortly to
                    confirm the details and delivery time.
                  </p>
                  <div className="mt-6 w-full p-4 rounded-xl bg-ink/60 border border-white/5 text-left">
                    <div className="flex justify-between text-sm mb-3 pb-3 border-b border-white/5">
                      <span className="text-ivory-soft/55 uppercase tracking-[0.18em] text-[10px]">
                        Order ID
                      </span>
                      <span className="text-ivory font-mono font-medium">
                        {submittedOrder.orderId}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {submittedOrder.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-xs text-ivory-soft/75"
                        >
                          <span>
                            {item.quantity}× {item.name}
                          </span>
                          <span className="text-vermilion">
                            {item.priceDisplay}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm mt-3 pt-3 border-t border-white/5">
                      <span className="text-ivory-soft/55">Total</span>
                      <span className="text-gold font-display">
                        {formatPrice(submittedOrder.subtotal)}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-ivory-soft/40 mt-5 leading-relaxed">
                    A confirmation has been saved. When our online ordering
                    system is fully live, you&apos;ll also receive an email.
                  </p>
                </div>
              )}
            </div>

            {/* Footer action */}
            {step === "review" && items.length > 0 && (
              <div className="px-5 md:px-6 py-4 border-t border-white/5 bg-ink-soft">
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-vermilion text-ivory rounded-full text-sm uppercase tracking-[0.22em] font-medium hover:bg-vermilion-deep transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(200,16,46,0.6)] min-h-[52px]"
                >
                  Checkout · {formatPrice(total)}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === "checkout" && (
              <div className="px-5 md:px-6 py-4 border-t border-white/5 bg-ink-soft">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-vermilion text-ivory rounded-full text-sm uppercase tracking-[0.22em] font-medium hover:bg-vermilion-deep transition-all duration-300 shadow-[0_8px_30px_-8px_rgba(200,16,46,0.6)] min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Placing order…
                    </>
                  ) : (
                    <>
                      Place Order · {formatPrice(total)}
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {step === "confirmation" && (
              <div className="px-5 md:px-6 py-4 border-t border-white/5 bg-ink-soft">
                <button
                  onClick={handleClose}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 border border-ivory/20 text-ivory rounded-full text-sm uppercase tracking-[0.22em] font-medium hover:bg-ivory/5 hover:border-ivory/40 transition-all duration-300 min-h-[52px]"
                >
                  Back to Menu
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Sub-components ---------------- */

function EmptyCart() {
  const closeCart = useCart((s) => s.closeCart);
  const scrollToMenu = () => {
    closeCart();
    const el = document.querySelector("#menu");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  return (
    <div className="flex flex-col items-center text-center py-12">
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5">
        <ShoppingBag className="h-9 w-9 text-ivory-soft/40" />
      </div>
      <h3 className="font-display text-2xl text-ivory mb-2">
        Your cart is empty
      </h3>
      <p className="text-sm text-ivory-soft/60 leading-relaxed max-w-xs mb-6">
        Browse our menu and add the dishes you love. We&apos;ll have them ready
        fresh.
      </p>
      <button
        onClick={scrollToMenu}
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-vermilion text-ivory rounded-full text-xs uppercase tracking-[0.22em] font-medium hover:bg-vermilion-deep transition-all duration-300 min-h-[48px]"
      >
        Browse the Menu
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

interface CheckoutFieldProps {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  autoComplete?: string;
}

function CheckoutField({
  icon: Icon,
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  error,
  multiline,
  autoComplete,
}: CheckoutFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory-soft/60 mb-2">
        <Icon className="h-3.5 w-3.5 text-vermilion" />
        {label}
        {required && <span className="text-vermilion">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          rows={2}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-ink/60 border text-ivory placeholder:text-ivory-soft/35 text-sm transition-colors resize-none min-h-[60px]",
            error
              ? "border-vermilion/60 focus:border-vermilion"
              : "border-white/10 focus:border-vermilion/50"
          )}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-ink/60 border text-ivory placeholder:text-ivory-soft/35 text-sm transition-colors min-h-[48px]",
            error
              ? "border-vermilion/60 focus:border-vermilion"
              : "border-white/10 focus:border-vermilion/50"
          )}
        />
      )}
      {error && (
        <p className="text-xs text-vermilion mt-1.5 flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-vermilion" />
          {error}
        </p>
      )}
    </div>
  );
}
