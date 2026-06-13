"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  image_urls: string[];
  category?: string;
}

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedProducts({
  products,
  title = "Featured Collection",
  subtitle,
}: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="relative bg-[var(--bg-soft)] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-muted mt-2 text-lg">{subtitle}</p>
            )}
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-deep)] transition font-medium"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <Link href={`/shop/${product.slug}`} className="group block">
                <div className="glass-card rounded-2xl overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[var(--bg-soft)]">
                    <img
                      src={product.image_urls?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                      <span className="bg-white/90 dark:bg-[var(--bg)]/90 backdrop-blur-sm text-foreground text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Quick View
                      </span>
                    </div>
                    {product.category && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[var(--bg)]/80 backdrop-blur-sm text-[var(--accent)] text-[10px] font-semibold uppercase tracking-wide">
                        {product.category}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm md:text-base truncate group-hover:text-[var(--accent)] transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[var(--accent)] font-bold text-sm md:text-base">
                        ৳{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
