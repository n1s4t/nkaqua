"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image_urls: string[];
  category?: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -600 : 600,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      let next = prev + dir;
      if (next < 0) next = products.length - 1;
      if (next >= products.length) next = 0;
      return next;
    });
  }, [products.length]);

  useEffect(() => {
    if (products.length === 0) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [products.length, paginate]);

  if (products.length === 0) return null;

  const product = products[current];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl glass-card border border-[var(--border)] relative min-h-[420px] md:min-h-[480px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={product.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 350, damping: 35, opacity: { duration: 0.25 } }}
            className="absolute inset-0"
          >
            <div className="grid md:grid-cols-2 h-full">
              {/* Image Side */}
              <div className="relative h-[240px] md:h-full overflow-hidden">
                <img
                  src={product.image_urls?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg)]/20 md:bg-gradient-to-l md:from-[var(--bg)]/60 md:to-transparent" />
                {product.category && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-semibold backdrop-blur-sm">
                    {product.category}
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-center p-6 md:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {product.name}
                  </h3>
                  <p className="text-muted text-sm md:text-base mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-[var(--accent)]">
                      ৳{product.price.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white px-6 py-3 rounded-xl font-semibold transition-all glow-button"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    View Product
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass flex items-center justify-center text-foreground hover:text-[var(--accent)] hover:bg-[var(--text)]/10 transition border border-[var(--border)] z-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass flex items-center justify-center text-foreground hover:text-[var(--accent)] hover:bg-[var(--text)]/10 transition border border-[var(--border)] z-10"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-8 bg-[var(--accent)]"
                : "w-2 bg-[var(--text)]/20 hover:bg-[var(--text)]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
