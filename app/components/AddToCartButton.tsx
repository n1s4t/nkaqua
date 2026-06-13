"use client";

import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image_urls?: string[];
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image_urls?.[0] || "/placeholder.svg",
    });
    toast.success(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
        added
          ? "bg-green-500/15 text-green-400 border border-green-500/30"
          : "bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-white shadow-lg shadow-[#38bdf8]/20 hover:shadow-[#38bdf8]/40"
      }`}
    >
      {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
