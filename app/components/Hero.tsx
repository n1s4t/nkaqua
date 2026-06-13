"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
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
        <div className="absolute inset-0 bg-[var(--bg)]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]/40" />
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-[#818cf8]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-foreground w-full py-20 md:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-base font-medium">
              <Sparkles className="h-4 w-4" />
              Premium Aquarium Store
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.05] tracking-tight">
              Bring Your Space
              <br />
              <span className="gradient-text">to Life</span>
              <span className="block text-muted text-3xl md:text-4xl font-medium mt-3 font-sans">
                in living color
              </span>
            </h1>

            <div className="w-32 h-[2px] bg-gradient-to-r from-[var(--accent)] to-[#818cf8] rounded-full" />

            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-xl">
              From vibrant tropical fish to elegant aquatic species,
              create a calm, living ecosystem that moves, breathes, and evolves.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40 group"
              >
                <ShoppingBag className="h-5 w-5" />
                Browse Fish
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all border border-[var(--text)]/10 hover:border-[var(--accent)]/30 hover:bg-[var(--text)]/5 text-muted hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
