import Link from "next/link";
import { Fish } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--bg)] border-t border-[#38bdf8]/10 text-foreground py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#818cf8] flex items-center justify-center">
                <Fish className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold">
                NK <span className="text-[#38bdf8]">Aqua</span>
              </h3>
            </div>
            <p className="text-muted text-base leading-relaxed">
              Premium aquarium fish and supplies for enthusiasts who demand quality and beauty.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-muted hover:text-[#38bdf8] transition text-base">All Products</Link></li>
              <li><Link href="/shop?category=fish" className="text-muted hover:text-[#38bdf8] transition text-base">Fish</Link></li>
              <li><Link href="/shop?category=plant" className="text-muted hover:text-[#38bdf8] transition text-base">Plants</Link></li>
              <li><Link href="/shop?category=accessories" className="text-muted hover:text-[#38bdf8] transition text-base">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-muted hover:text-[#38bdf8] transition text-base">Contact Us</Link></li>
              <li><a href="https://wa.me/8801576520009" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-[#38bdf8] transition text-base">WhatsApp</a></li>
              <li><a href="tel:01639477361" className="text-muted hover:text-[#38bdf8] transition text-base">Call Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold text-foreground uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 text-base text-muted">
              <p>WhatsApp: <a href="https://wa.me/8801576520009" className="text-[#38bdf8] hover:text-[#7dd3fc] transition">01576520009</a></p>
              <p>Call: <a href="tel:01639477361" className="text-[#38bdf8] hover:text-[#7dd3fc] transition">01639477361</a></p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--text)]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-dim">
            © {new Date().getFullYear()} NK Aqua. All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm text-dim">
            <Link href="/" className="hover:text-[#38bdf8] transition">Home</Link>
            <Link href="/shop" className="hover:text-[#38bdf8] transition">Shop</Link>
            <Link href="/contact" className="hover:text-[#38bdf8] transition">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
