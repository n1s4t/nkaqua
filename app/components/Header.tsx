"use client";

import Link from "next/link";
import SafeImage from "@/app/components/SafeImage";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { useTheme } from "@/app/context/ThemeContext";
import {
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  ShoppingBag,
  User,
  LogOut,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Home,
  Phone,
  Search,
  Fish,
  Leaf,
  Apple,
  Wrench,
  Package,
  LayoutGrid,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { CATEGORIES, CATEGORY_SLUGS } from "@/app/data/categories";

const categoryMeta: Record<string, { icon: React.ElementType; gradient: string }> = {
  Fish: { icon: Fish, gradient: "bg-gradient-to-br from-cyan-400 to-blue-500" },
  Plant: { icon: Leaf, gradient: "bg-gradient-to-br from-emerald-400 to-green-500" },
  Food: { icon: Apple, gradient: "bg-gradient-to-br from-amber-400 to-orange-500" },
  Accessories: { icon: Wrench, gradient: "bg-gradient-to-br from-slate-400 to-slate-600" },
  Others: { icon: Package, gradient: "bg-gradient-to-br from-gray-400 to-gray-700" },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { totalItems, items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice } = useCart();
  const { user, signOut } = useAuth();
  const { resolved, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "h-[72px] glass-strong shadow-lg border-[#38bdf8]/10"
            : "h-[80px] bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-[#38bdf8]/20 group-hover:shadow-[#38bdf8]/40 transition-all duration-300 border border-[#38bdf8]/20">
              <img
                src="/logo.jpeg"
                alt="NK Aqua"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="block">
              <span className="text-xl font-bold text-foreground tracking-tight">
                NK <span className="text-[#38bdf8]">Aqua</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-[var(--text)]/[0.03] backdrop-blur-sm rounded-2xl p-1 border border-[var(--text)]/[0.08]">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-base font-medium transition-all ${
                isActive("/")
                  ? "bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/20"
                  : "text-muted hover:text-foreground hover:bg-[var(--text)]/5 border border-transparent"
              }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            <Link
              href="/contact"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-base font-medium transition-all ${
                isActive("/contact")
                  ? "bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/20"
                  : "text-muted hover:text-foreground hover:bg-[var(--text)]/5 border border-transparent"
              }`}
            >
              <Phone className="h-4 w-4" />
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className="p-2.5 text-muted hover:text-[#38bdf8] transition rounded-xl hover:bg-[var(--text)]/5"
              aria-label="Toggle theme"
            >
              {resolved === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Search */}
            <button className="p-2.5 text-muted hover:text-[#38bdf8] transition rounded-xl hover:bg-[var(--text)]/5">
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 text-muted hover:text-[#38bdf8] transition rounded-xl hover:bg-[var(--text)]/5"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[var(--bg)]">
                  {totalItems}
                </span>
              )}
            </button>

            <div className="h-6 w-px bg-[var(--text)]/10 mx-1" />

            {/* Shop CTA */}
            <div
              ref={catRef}
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button
                onClick={() => setCatOpen((prev) => !prev)}
                className={`flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-xl text-base font-semibold transition-all cursor-pointer border ${
                  catOpen || pathname.startsWith("/shop")
                    ? "bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white border-transparent shadow-lg shadow-[#38bdf8]/25"
                    : "bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white border-transparent shadow-lg shadow-[#38bdf8]/20 hover:shadow-[#38bdf8]/40"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
              </button>

              {catOpen && (
                <div className="absolute top-full right-0 pt-3 w-[28rem]">
                  <div className="glass-strong rounded-2xl shadow-2xl overflow-hidden border border-[#38bdf8]/20">
                    <div className="px-5 py-4 bg-gradient-to-r from-[#38bdf8]/20 to-[#0ea5e9]/10 border-b border-[#38bdf8]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LayoutGrid className="h-5 w-5 text-[#38bdf8]" />
                        <span className="text-lg font-bold text-foreground tracking-tight">Shop by Category</span>
                      </div>
                      <Link
                        href="/shop"
                        onClick={() => setCatOpen(false)}
                        className="text-sm text-[#38bdf8] hover:text-foreground transition flex items-center gap-1"
                      >
                        View All <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <div className="p-3 grid grid-cols-2 gap-2">
                      {Object.entries(CATEGORIES).map(([cat, subs]) => {
                        const meta = categoryMeta[cat] || { icon: Package, gradient: "bg-gradient-to-br from-gray-500 to-gray-700" };
                        const Icon = meta.icon;
                        return (
                          <div key={cat} className="group">
                            <Link
                              href={`/shop?category=${CATEGORY_SLUGS[cat]}`}
                              onClick={() => setCatOpen(false)}
                              className="flex items-start gap-3 p-3 rounded-xl transition-all border border-transparent hover:border-[#38bdf8]/20 hover:bg-[#38bdf8]/5"
                            >
                              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${meta.gradient}`}>
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-base font-semibold text-foreground group-hover:text-[#38bdf8] transition">
                                    {cat}
                                  </span>
                                  <ChevronRight className="h-3.5 w-3.5 text-dim group-hover:text-[#38bdf8] transition" />
                                </div>
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                  {subs.slice(0, 3).map((sub) => (
                                    <span
                                      key={sub}
                                      className="text-xs px-1.5 py-0.5 rounded bg-[var(--text)]/5 text-dim border border-[var(--text)]/5"
                                    >
                                      {sub}
                                    </span>
                                  ))}
                                  {subs.length > 3 && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--text)]/5 text-muted border border-[var(--text)]/5">
                                      +{subs.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>

                    <div className="px-5 py-3 bg-gradient-to-r from-[#38bdf8]/10 to-transparent border-t border-[#38bdf8]/10 flex items-center justify-between">
                      <span className="text-sm text-muted">Free delivery on orders over ৳5000</span>
                      <span className="text-sm text-[#38bdf8] font-medium">New arrivals weekly →</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div ref={userRef} className="relative ml-1">
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full bg-[var(--text)]/5 border border-[var(--text)]/10 hover:border-[#38bdf8]/30 transition text-foreground/80 hover:text-foreground"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#818cf8] flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-base font-medium max-w-[80px] truncate">{user.email?.split("@")[0]}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${userOpen ? "rotate-180" : ""}`} />
                </button>

                {userOpen && (
                  <div className="absolute top-full right-0 pt-2 w-48">
                    <div className="glass-strong rounded-xl shadow-2xl border border-[#38bdf8]/20 overflow-hidden">
                      <div className="px-4 py-3 border-b border-[var(--text)]/10">
                        <p className="text-sm text-muted">Signed in as</p>
                        <p className="text-base text-foreground truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { signOut(); setUserOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition text-base"
                      >
                        <LogOut className="h-4 w-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-base bg-[var(--text)]/5 hover:bg-[var(--text)]/10 text-muted hover:text-foreground border border-[var(--text)]/10 hover:border-[var(--text)]/20 px-4 py-2.5 rounded-xl font-medium transition-all ml-1"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 text-muted hover:text-[#38bdf8] transition rounded-xl hover:bg-[var(--text)]/5"
              aria-label="Toggle theme"
            >
              {resolved === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsOpen(true)} className="relative p-2 text-muted">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setOpen(!open)} className="p-2 text-muted hover:text-foreground transition rounded-xl hover:bg-[var(--text)]/5">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-[110] transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute right-0 h-full w-full max-w-md bg-[var(--bg)] shadow-2xl flex flex-col transition-all duration-300 border-l border-[#38bdf8]/20 ${isOpen ? "translate-x-0" : "translate-x-full"}`} style={{ top: 0, paddingTop: "24px" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#38bdf8]/20">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6 text-[#38bdf8]" />
              <h2 className="text-2xl font-bold text-foreground">Your Cart</h2>
              <span className="px-2 py-0.5 bg-[#38bdf8]/10 text-[#38bdf8] rounded-full text-sm font-medium">{totalItems}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted hover:text-foreground transition p-1 hover:bg-[var(--text)]/5 rounded-lg">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-dim mb-4" />
                <p className="text-muted text-lg">Your cart is empty</p>
                <Link href="/shop" onClick={() => setIsOpen(false)} className="inline-block mt-4 text-[#38bdf8] hover:text-[#7dd3fc] transition text-lg">Start shopping →</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="glass-card rounded-xl p-3 flex gap-3">
                    <Link href={`/shop/${item.slug}`} onClick={() => setIsOpen(false)}>
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-bg-soft flex-shrink-0">
                        <SafeImage src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/shop/${item.slug}`} onClick={() => setIsOpen(false)}>
                        <h4 className="text-lg font-semibold text-foreground truncate hover:text-[#38bdf8] transition">{item.name}</h4>
                      </Link>
                      <p className="text-[#38bdf8] font-bold text-lg mt-1">৳{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded bg-bg-soft border border-[#38bdf8]/20 text-muted hover:text-[#38bdf8] transition"><Minus className="h-3 w-3" /></button>
                        <span className="text-base text-foreground w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-bg-soft border border-[#38bdf8]/20 text-muted hover:text-[#38bdf8] transition"><Plus className="h-3 w-3" /></button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto p-1 text-dim hover:text-red-400 transition"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-4 border-t border-[#38bdf8]/20">
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted text-lg">Total</span>
                <span className="text-[#38bdf8] font-bold text-2xl">৳{totalPrice.toLocaleString()}</span>
              </div>
              <Link href="/cart" onClick={() => setIsOpen(false)} className="w-full py-3 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#38bdf8]/20 text-base">
                View Cart <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={`absolute right-0 h-full w-72 bg-[var(--bg)] shadow-xl flex flex-col transition-all duration-300 border-l border-[#38bdf8]/20 ${open ? "translate-x-0" : "translate-x-full"}`} style={{ top: 0, paddingTop: "80px" }}>
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted hover:text-foreground p-1"><X className="h-5 w-5" /></button>

          <div className="flex flex-col gap-2 p-4">
            <Link href="/" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-base ${isActive("/") ? "bg-[#38bdf8]/15 text-[#38bdf8]" : "text-muted hover:text-foreground hover:bg-[var(--text)]/5"}`}>
              <Home className="h-5 w-5" /> Home
            </Link>
            <Link href="/shop" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-base ${isActive("/shop") ? "bg-[#38bdf8]/15 text-[#38bdf8]" : "text-muted hover:text-foreground hover:bg-[var(--text)]/5"}`}>
              <ShoppingBag className="h-5 w-5" /> Shop
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-base ${isActive("/contact") ? "bg-[#38bdf8]/15 text-[#38bdf8]" : "text-muted hover:text-foreground hover:bg-[var(--text)]/5"}`}>
              <Phone className="h-5 w-5" /> Contact
            </Link>

            <div className="border-t border-[var(--text)]/10 pt-4 mt-2 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#818cf8] flex items-center justify-center"><User className="h-5 w-5 text-white" /></div>
                    <div><p className="text-base text-foreground font-medium">{user.email?.split("@")[0]}</p><p className="text-sm text-dim truncate max-w-[180px]">{user.email}</p></div>
                  </div>
                  <button onClick={() => { signOut(); setOpen(false); }} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition text-base px-4 py-2"><LogOut className="h-4 w-4" /> Sign Out</button>
                </>
              ) : (
                <div className="space-y-2 px-4">
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="block w-full text-center py-2.5 border border-[var(--text)]/10 rounded-xl text-muted hover:text-foreground hover:bg-[var(--text)]/5 transition text-base">Sign In</Link>
                  <Link href="/auth/signup" onClick={() => setOpen(false)} className="block w-full text-center py-2.5 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white rounded-xl font-medium text-base">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
