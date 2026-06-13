"use client";

import ProductCard from "./ProductCard";
import { Fish } from "lucide-react";

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

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 glass-card rounded-3xl">
        <Fish className="h-16 w-16 mx-auto text-[#38bdf8]/30 mb-4" />
        <h3 className="text-xl font-medium text-white">No fish yet</h3>
        <p className="text-gray-400 mt-1">Our aquarium is being stocked. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
