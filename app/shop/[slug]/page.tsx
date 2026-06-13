import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";
import ImageGallery from "@/app/components/ImageGallery";
import WhatsAppButton from "@/app/components/WhatsAppButton";
import AddToCartButton from "@/app/components/AddToCartButton";
import SafeImage from "@/app/components/SafeImage";
import { Metadata } from "next";
import { Share2, Heart, Clock, Fish, Tag, ArrowLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .ilike("slug", slug)
    .single();

  return {
    title: product ? `${product.name} | NK Aqua` : "Fish Product",
    description: product?.description || "Premium aquarium fish",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .ilike("slug", slug)
    .single();

  if (error || !product) {
    notFound();
  }

  const images = product.image_urls || [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://youraquastore.com";
  const productUrl = `${baseUrl}/shop/${product.slug}`;

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("id, name, slug, price, image_urls")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4);

  return (
    <section className="min-h-screen bg-[var(--bg)] py-12 px-4 md:py-24">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-muted hover:text-[var(--accent)] transition mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition" /> Back to all fish
        </Link>

        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-8">
            <div>
              <ImageGallery images={images} productName={product.name} />
            </div>

            <div className="flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="h-1 w-16 bg-gradient-to-r from-[var(--accent)] to-[#818cf8] rounded-full" />
                  <span className="text-sm text-muted flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Fresh arrival
                  </span>
                </div>
              </div>

              {product.category && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[var(--accent)]" />
                  <span className="text-sm text-foreground">
                    {product.category}
                    {product.subcategory && ` › ${product.subcategory}`}
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[var(--accent)]">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.price > 5000 && (
                  <span className="bg-[var(--accent)]/10 text-[var(--accent)] text-xs px-2 py-1 rounded-full border border-[var(--accent)]/20">Premium</span>
                )}
              </div>

              <div className="border-t border-b border-[var(--text)]/10 py-4">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <AddToCartButton product={product} />
                <WhatsAppButton
                  productName={product.name}
                  price={product.price}
                  description={product.description}
                  productUrl={productUrl}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[var(--text)]/10 rounded-xl text-muted hover:bg-[var(--text)]/5 transition flex-1 glass">
                  <Heart className="h-5 w-5" /> Wishlist
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-[var(--text)]/10 rounded-xl text-muted hover:bg-[var(--text)]/5 transition flex-1 glass">
                  <Share2 className="h-5 w-5" /> Share
                </button>
              </div>

              <div className="glass rounded-xl p-4 text-sm text-muted flex flex-col gap-2 border border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <Fish className="h-4 w-4 text-[var(--accent)]" />
                  <span>Live arrival guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent)]">📦</span>
                  <span>Free shipping on orders over ৳2000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent)]">✅</span>
                  <span>7-day health guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              More from {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/shop/${related.slug}`}
                  className="group glass-card rounded-2xl overflow-hidden hover:border-[var(--accent)]/30 transition border border-[var(--text)]/5"
                >
                  <div className="relative h-48 bg-bg-soft">
                    <SafeImage
                      src={related.image_urls?.[0] || "/placeholder.svg"}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground group-hover:text-[var(--accent)] transition">
                      {related.name}
                    </h3>
                    <p className="text-[var(--accent)] font-bold mt-1">৳{related.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
