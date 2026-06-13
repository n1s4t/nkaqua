import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import ProductCarousel from "./components/ProductCarousel";
import FeaturedProducts from "./components/FeaturedProducts";
import {
  ArrowRight,
  Fish,
  Leaf,
  UtensilsCrossed,
  Wrench,
  HelpCircle,
  Sparkles,
  Shield,
  Truck,
  HeartHandshake,
  TrendingUp,
  Star,
  ShoppingBag,
} from "lucide-react";
import { CATEGORIES, CATEGORY_SLUGS } from "@/app/data/categories";

const categoryIcons: Record<string, React.ReactNode> = {
  Fish: <Fish className="h-6 w-6" />,
  Plant: <Leaf className="h-6 w-6" />,
  Food: <UtensilsCrossed className="h-6 w-6" />,
  Accessories: <Wrench className="h-6 w-6" />,
  Others: <HelpCircle className="h-6 w-6" />,
};

const categoryGradients: Record<string, string> = {
  Fish: "from-[#38bdf8] to-[#0ea5e9]",
  Plant: "from-[#4ade80] to-[#22c55e]",
  Food: "from-[#fb923c] to-[#f97316]",
  Accessories: "from-[#94a3b8] to-[#64748b]",
  Others: "from-[#c084fc] to-[#a855f7]",
};

export default async function Home() {
  // Fetch products for homepage
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(12);

  const carouselProducts = products?.slice(0, 5) || [];
  const featuredProducts = products?.slice(0, 8) || [];

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fish-swimming.jpg"
            alt="Aquarium background"
            fill
            className="object-cover"
            priority
            quality={60}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--bg)]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]/30" />
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-[#818cf8]/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-foreground w-full py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-base font-medium">
                <Sparkles className="h-4 w-4" />
                Bangladesh&apos;s Premium Aquarium Store
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                Discover Nature
                <br />
                <span className="gradient-text">Underwater</span>
              </h1>

              <p className="text-lg md:text-xl text-muted leading-relaxed max-w-lg">
                From vibrant tropical fish to premium aquarium accessories —
                everything you need to build your living underwater world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40 group"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Shop Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all border border-[var(--text)]/10 hover:border-[var(--accent)]/30 hover:bg-[var(--text)]/5 text-muted hover:text-foreground"
                >
                  Contact Us
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Shield className="h-4 w-4 text-[var(--accent)]" />
                  Healthy Fish
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Truck className="h-4 w-4 text-[var(--accent)]" />
                  Fast Delivery
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <HeartHandshake className="h-4 w-4 text-[var(--accent)]" />
                  Expert Support
                </div>
              </div>
            </div>

            {/* Product Showcase on Hero */}
            <div className="hidden lg:block">
              {carouselProducts.length > 0 && (
                <ProductCarousel products={carouselProducts} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MOBILE PRODUCT CAROUSEL (below hero) ===== */}
      <section className="lg:hidden bg-[var(--bg)] px-6 py-10">
        {carouselProducts.length > 0 && (
          <ProductCarousel products={carouselProducts} />
        )}
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-[var(--bg-soft)] border-y border-[var(--border)] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Fish className="h-5 w-5" />, label: "Fish Species", value: "120+" },
            { icon: <Star className="h-5 w-5" />, label: "Happy Customers", value: "2,500+" },
            { icon: <TrendingUp className="h-5 w-5" />, label: "Products Sold", value: "8,000+" },
            { icon: <Shield className="h-5 w-5" />, label: "Quality Guarantee", value: "100%" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      {featuredProducts.length > 0 && (
        <FeaturedProducts
          products={featuredProducts}
          title="Fresh Arrivals"
          subtitle="Newly added to our collection — handpicked for health and vibrancy"
        />
      )}

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="relative bg-[var(--bg)] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Everything you need to build and maintain your underwater world, organized for easy discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {Object.entries(CATEGORIES).map(([cat, subs]) => {
              const catSlug = CATEGORY_SLUGS[cat];
              return (
                <Link
                  key={cat}
                  href={`/shop?category=${catSlug}`}
                  className="group relative glass-card rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${categoryGradients[cat]}`}
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                      {categoryIcons[cat]}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-[var(--accent)] transition-colors">
                      {cat}
                    </h3>
                  </div>
                  <ul className="space-y-1.5">
                    {subs.slice(0, 4).map((sub) => (
                      <li key={sub}>
                        <span className="text-sm text-dim group-hover:text-muted transition-colors">
                          {sub}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center text-sm font-medium text-[var(--accent)] gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US / AQUARIUM BENEFITS ===== */}
      <section className="relative bg-[var(--bg-soft)] py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/aqurium.png"
            alt="Aquarium tank"
            fill
            className="object-cover opacity-15"
            quality={40}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--bg-soft)]/80" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium">
                <Sparkles className="h-3 w-3" /> Why Aquarium
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
                Why Build an
                <span className="gradient-text"> Aquarium?</span>
              </h2>
              <p className="text-lg md:text-xl text-muted leading-relaxed">
                An aquarium is more than decoration — it is a living ecosystem that brings calm,
                focus, and natural balance into your space.
              </p>
              <p className="text-base md:text-lg text-dim leading-relaxed">
                Watching aquatic life move silently reduces stress and transforms any room into
                something alive and constantly evolving.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="glass rounded-xl p-4 text-center">
                  <Shield className="h-6 w-6 mx-auto text-[var(--accent)] mb-2" />
                  <p className="text-sm text-foreground font-medium">Quality</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <Truck className="h-6 w-6 mx-auto text-[var(--accent)] mb-2" />
                  <p className="text-sm text-foreground font-medium">Delivery</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <HeartHandshake className="h-6 w-6 mx-auto text-[var(--accent)] mb-2" />
                  <p className="text-sm text-foreground font-medium">Support</p>
                </div>
              </div>
            </div>

            <div className="relative h-[380px] md:h-[520px] rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl">
              <Image
                src="/aqurium.png"
                alt="Beautiful aquarium tank"
                fill
                className="object-cover"
                quality={50}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-foreground font-semibold text-lg">Living Ecosystem</p>
                <p className="text-muted text-sm">Handpicked for health and vibrancy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative bg-[var(--bg)] py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/fish-swimming.jpg"
            alt="Fish swimming"
            fill
            className="object-cover opacity-15"
            quality={40}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--bg)]/80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight text-foreground">
            Ready to Build Your
            <br />
            <span className="gradient-text">Aquarium World?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
            Explore carefully selected aquarium fish and start building a living ecosystem
            that brings calm, color, and movement into your space.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white px-12 py-4 rounded-full font-semibold transition-all glow-button group"
            >
              Go to Shop
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
