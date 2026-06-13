"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";
import { Eye, ShoppingCart } from "lucide-react";
import SafeImage from "./SafeImage";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image_urls?: string[];
  category?: string;
  subcategory?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const mainImage = product.image_urls?.[0] || "/placeholder.svg";
  const hasMultipleImages = (product.image_urls?.length || 0) > 1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: mainImage,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group h-full">
      <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col border border-[var(--border)] hover:border-[var(--accent)]/30">
        <Link href={`/shop/${product.slug}`} className="block relative h-64 sm:h-72 w-full bg-gradient-to-br from-bg-soft to-bg-elevated overflow-hidden">
          <SafeImage
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-white/20">
              <Eye className="h-5 w-5 text-white" />
            </div>
          </div>

          {hasMultipleImages && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-full flex items-center gap-1 border border-white/10">
              📸 +{(product.image_urls?.length || 0) - 1}
            </div>
          )}
          {product.category && (
            <div className="absolute top-3 left-3 bg-[var(--accent)]/90 backdrop-blur-sm text-white text-sm px-2.5 py-1 rounded-full font-medium">
              {product.category}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white px-4 py-2.5 rounded-xl font-semibold text-base transition-all glow-button flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingCart className="h-4 w-4" /> Add
          </button>
        </Link>

        <div className="p-5 flex flex-col flex-grow">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="text-xl font-semibold text-foreground line-clamp-1 hover:text-[var(--accent)] transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-[var(--accent)] font-bold text-3xl">
              ৳{product.price.toLocaleString()}
            </span>
            {product.price > 5000 && (
              <span className="ml-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium px-2 py-0.5 rounded-full border border-[var(--accent)]/20">
                Premium
              </span>
            )}
          </div>
          <p className="text-muted text-base mt-3 line-clamp-2 flex-grow">
            {product.description}
          </p>
          <div className="mt-4 pt-2 border-t border-[var(--text)]/10 flex items-center justify-between">
            <Link
              href={`/shop/${product.slug}`}
              className="inline-flex items-center text-base font-medium text-[var(--accent)] hover:opacity-80 transition-all gap-1"
            >
              View Details
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <button
              onClick={handleAddToCart}
              className="md:hidden p-2 bg-[var(--accent)]/10 rounded-lg text-[var(--accent)] hover:bg-[var(--accent)]/20 transition"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
