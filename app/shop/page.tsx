export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import ProductGrid from "@/app/components/ProductGrid";
import { CATEGORIES, CATEGORY_SLUGS } from "@/app/data/categories";
import {
  Fish,
  Waves,
  ChevronRight,
  X,
  AlertTriangle,
  Leaf,
  Apple,
  Wrench,
  Package,
  LayoutGrid,
  Tag,
} from "lucide-react";
import Link from "next/link";

interface ShopPageProps {
  searchParams: Promise<{ category?: string; subcategory?: string }>;
}

function getCategoryFromSlug(slug: string): string | undefined {
  return Object.keys(CATEGORY_SLUGS).find(
    (key) => CATEGORY_SLUGS[key] === slug.toLowerCase()
  );
}

const categoryMeta: Record<
  string,
  { icon: React.ElementType; gradient: string; border: string; text: string; bg: string }
> = {
  Fish: {
    icon: Fish,
    gradient: "bg-gradient-to-br from-cyan-400 to-blue-500",
    border: "border-cyan-400/20",
    text: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  Plant: {
    icon: Leaf,
    gradient: "bg-gradient-to-br from-emerald-400 to-green-500",
    border: "border-emerald-400/20",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  Food: {
    icon: Apple,
    gradient: "bg-gradient-to-br from-amber-400 to-orange-500",
    border: "border-amber-400/20",
    text: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  Accessories: {
    icon: Wrench,
    gradient: "bg-gradient-to-br from-slate-400 to-slate-600",
    border: "border-slate-400/20",
    text: "text-slate-400",
    bg: "bg-slate-400/10",
  },
  Others: {
    icon: Package,
    gradient: "bg-gradient-to-br from-gray-400 to-gray-600",
    border: "border-gray-400/20",
    text: "text-gray-400",
    bg: "bg-gray-400/10",
  },
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const categorySlug = params.category?.toLowerCase();
  const subcategorySlug = params.subcategory?.toLowerCase();

  const activeCategory = categorySlug
    ? getCategoryFromSlug(categorySlug)
    : undefined;
  const activeSubcategory = subcategorySlug
    ? Object.entries(CATEGORIES)
        .flatMap(([, subs]) => subs)
        .find(
          (sub) =>
            sub.toLowerCase().replace(/\s+/g, "-") === subcategorySlug
        )
    : undefined;

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (activeCategory) {
    query = query.eq("category", activeCategory);
  }
  if (activeSubcategory) {
    query = query.eq("subcategory", activeSubcategory);
  }

  let { data: products, error } = await query;

  let filterError = false;
  if (error && activeCategory) {
    filterError = true;
    const fallback = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    products = fallback.data;
    error = fallback.error;
  }

  if (error) {
    const isConnectionError =
      error.message?.includes("fetch failed") ||
      error.message?.includes("Network") ||
      error.message?.includes("ECONNREFUSED") ||
      error.message?.includes("ETIMEDOUT");

    const isMissingColumn =
      error.message?.includes("column") ||
      error.message?.includes("does not exist");

    void isMissingColumn;

    const isMissingTable =
      error.message?.includes("Could not find the table") ||
      error.message?.includes("relation") ||
      error.message?.includes("42P01");

    return (
      <section className="min-h-screen bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-72 flex-shrink-0">
              <div className="glass rounded-2xl p-5 sticky top-24 border border-[#38bdf8]/10">
                <SidebarCategories
                  activeCategory={activeCategory}
                  activeSubcategory={activeSubcategory}
                />
              </div>
            </aside>

            <div className="flex-1">
              <div className="text-center p-8 glass-card rounded-2xl">
                <Fish className="h-12 w-12 text-[#38bdf8] mx-auto mb-4" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {isConnectionError
                    ? "Unable to reach the store"
                    : "Store is being set up"}
                </h2>
                <p className="text-muted mt-2">
                  {isConnectionError
                    ? "Please check your internet connection and try again."
                    : "We're getting things ready for you."}
                </p>
                {isMissingTable && (
                  <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-2 rounded-lg max-w-lg mx-auto">
                    Run <code>supabase-setup.sql</code> in your Supabase SQL
                    Editor to create the products table.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const totalCount = products?.length || 0;

  return (
    <section className="min-h-screen bg-[var(--bg)]">
      <div className="relative bg-gradient-to-r from-[var(--bg-soft)] to-[#1e3a5f] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/waves-pattern.svg')] opacity-5 bg-repeat"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Waves className="h-6 w-6 text-[#38bdf8]" />
                <span className="text-[#38bdf8]/80 text-base font-medium uppercase tracking-wider">
                  Freshwater & Marine
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4">
                {activeCategory || "Fish Collection"}
              </h1>
              <p className="text-muted text-lg md:text-xl max-w-xl">
                {activeSubcategory
                  ? `Browse ${activeSubcategory} ${activeCategory?.toLowerCase() || ""} products.`
                  : activeCategory
                  ? `Discover our ${activeCategory.toLowerCase()} collection.`
                  : "Discover vibrant, healthy aquarium fish shipped directly to your door."}
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="glass rounded-2xl p-4 text-center border border-[#38bdf8]/20 min-w-[140px]">
                <p className="text-[#38bdf8] text-4xl font-bold">{totalCount}</p>
                <p className="text-muted text-base">{activeSubcategory || activeCategory || "Species"} available</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="glass rounded-2xl p-4 border border-[#38bdf8]/10 flex items-center gap-3">
                <LayoutGrid className="h-5 w-5 text-[#38bdf8]" />
                <div>
                  <p className="text-base font-semibold text-foreground">Browse Categories</p>
                  <p className="text-sm text-dim">{Object.keys(CATEGORIES).length} main categories</p>
                </div>
              </div>

              <div className="glass rounded-2xl p-4 border border-[#38bdf8]/10">
                {filterError && (
                  <div className="mb-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-3 py-2 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>
                      Category columns missing in database. Showing all products.
                      <Link href="/admin" className="underline hover:text-yellow-300">Add them in Admin →</Link>
                    </span>
                  </div>
                )}
                <SidebarCategories activeCategory={activeCategory} activeSubcategory={activeSubcategory} />
              </div>

              <div className="glass rounded-2xl p-4 border border-[#38bdf8]/10 bg-gradient-to-br from-[#38bdf8]/5 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4 text-[#38bdf8]" />
                  <span className="text-base font-medium text-foreground">Free Delivery</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">On all orders over ৳5000. Fresh, healthy fish delivered to your door across Bangladesh.</p>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-end mb-10 gap-4">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                  {activeSubcategory || activeCategory || "Explore our collection"}
                </h2>
                <p className="text-dim text-base mt-1">
                  {activeSubcategory || activeCategory
                    ? `Showing ${totalCount} result${totalCount !== 1 ? "s" : ""}`
                    : "Curated for quality & beauty"}
                </p>
              </div>
              <div className="text-base text-dim glass px-4 py-2 rounded-full border border-[#38bdf8]/10">
                {totalCount} products
              </div>
            </div>
            <ProductGrid products={products || []} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SidebarCategories({
  activeCategory,
  activeSubcategory,
}: {
  activeCategory?: string;
  activeSubcategory?: string;
}) {
  return (
    <div className="space-y-2">
      <Link
        href="/shop"
        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all border ${
          !activeCategory
            ? "bg-gradient-to-r from-[#38bdf8]/15 to-[#0ea5e9]/10 text-[#38bdf8] border-[#38bdf8]/20 shadow-sm"
            : "text-muted hover:text-foreground hover:bg-[var(--text)]/5 border-transparent"
        }`}
      >
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${!activeCategory ? "bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9]" : "bg-[var(--text)]/5"}`}>
          <LayoutGrid className={`h-4 w-4 ${!activeCategory ? "text-white" : "text-dim"}`} />
        </div>
        <span className="flex-1">All Products</span>
        {!activeCategory && <ChevronRight className="h-4 w-4" />}
      </Link>

      {Object.entries(CATEGORIES).map(([cat, subs]) => {
        const catSlug = CATEGORY_SLUGS[cat];
        const isActive = activeCategory === cat;
        const meta = categoryMeta[cat] || {
          icon: Package,
          gradient: "bg-gradient-to-br from-gray-500 to-gray-700",
          border: "border-gray-400/20",
          text: "text-gray-400",
          bg: "bg-gray-400/10",
        };
        const Icon = meta.icon;

        return (
          <div key={cat} className="space-y-1">
            <Link
              href={`/shop?category=${catSlug}`}
              className={`group flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all border ${
                isActive && !activeSubcategory
                  ? `${meta.bg} ${meta.text} ${meta.border} shadow-sm`
                  : "text-muted hover:text-foreground hover:bg-[var(--text)]/5 border-transparent"
              }`}
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${isActive && !activeSubcategory ? meta.gradient : "bg-[var(--text)]/5 group-hover:scale-110"}`}>
                <Icon className={`h-4 w-4 ${isActive && !activeSubcategory ? "text-white" : "text-dim group-hover:text-foreground"}`} />
              </div>
              <span className="flex-1">{cat}</span>
              {isActive && !activeSubcategory && <ChevronRight className={`h-4 w-4 ${meta.text}`} />}
            </Link>

            {isActive && subs.length > 0 && (
              <div className="ml-3 pl-3 border-l-2 border-[#38bdf8]/20 space-y-1 pt-1">
                {subs.map((sub) => {
                  const subSlug = sub.toLowerCase().replace(/\s+/g, "-");
                  const isSubActive = activeSubcategory === sub;
                  return (
                    <Link
                      key={sub}
                      href={`/shop?category=${catSlug}&subcategory=${subSlug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border ${
                        isSubActive
                          ? `${meta.bg} ${meta.text} ${meta.border}`
                          : "text-dim hover:text-foreground hover:bg-[var(--text)]/5 border-transparent"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${isSubActive ? meta.gradient : "bg-[var(--text)]/20"}`} />
                      {sub}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
