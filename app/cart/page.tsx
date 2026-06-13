"use client";

import Link from "next/link";
import SafeImage from "@/app/components/SafeImage";
import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package, MessageCircle } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    const phoneNumber = "8801576520009";
    let message = `🛒 *New Order from NK Aqua*%0A%0A*Items:*%0A`;
    items.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      message += `${index + 1}. ${item.name}%0A`;
      message += `   Qty: ${item.quantity} × ৳${item.price.toLocaleString()} = ৳${lineTotal.toLocaleString()}%0A%0A`;
    });
    message += `*Total: ৳${totalPrice.toLocaleString()}*%0A`;
    message += `*Items: ${totalItems}*%0A%0A`;
    message += `Hello, I want to order these items. Please confirm availability and payment method.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Order sent to WhatsApp!");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg)] px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-[#38bdf8]/10 to-[#818cf8]/10 border border-[#38bdf8]/20 mb-8">
            <ShoppingBag className="h-12 w-12 text-[#38bdf8]/50" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted text-lg mb-8 max-w-md mx-auto">
            Explore our collection of vibrant aquarium fish and find the perfect additions for your underwater world.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-white px-8 py-3 rounded-xl font-semibold text-base transition-all glow-button"
          >
            Browse Shop
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-8 w-8 text-[#38bdf8]" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Your Cart</h1>
          <span className="ml-2 px-3 py-1 bg-[#38bdf8]/10 text-[#38bdf8] rounded-full text-base font-medium">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-4 flex gap-4 items-center group">
                <Link href={`/shop/${item.slug}`} className="flex-shrink-0">
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-bg-soft">
                    <SafeImage src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/shop/${item.slug}`}>
                    <h3 className="text-xl font-semibold text-foreground truncate hover:text-[#38bdf8] transition">{item.name}</h3>
                  </Link>
                  <p className="text-[#38bdf8] font-bold text-2xl mt-1">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-dim text-base">৳{item.price.toLocaleString()} each</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-bg-soft/80 rounded-xl border border-[#38bdf8]/20">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-[#38bdf8] transition text-muted">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-foreground font-semibold text-base">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-[#38bdf8] transition text-muted">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => { removeItem(item.id); toast.success("Removed from cart"); }}
                    className="p-2 text-dim hover:text-red-400 transition"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-base">
                    <span className="text-muted truncate max-w-[150px]">{item.name} × {item.quantity}</span>
                    <span className="text-foreground">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-[#38bdf8]/20 pt-3 flex justify-between">
                  <span className="text-foreground font-semibold text-lg">Total</span>
                  <span className="text-[#38bdf8] font-bold text-2xl">৳{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 text-base"
              >
                <MessageCircle className="h-5 w-5" />
                Order on WhatsApp
              </button>

              <div className="mt-4 flex items-center gap-2 text-dim text-base">
                <Package className="h-4 w-4" />
                <span>Free shipping on orders over ৳2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
