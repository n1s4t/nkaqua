import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | NK Aqua",
  description:
    "Get in touch with NK Aqua via WhatsApp or phone call. We're here to help you build your aquarium world.",
};

export default function ContactPage() {
  const whatsappNumber = "01576520009";
  const phoneNumber = "01639477361";
  const formattedWhatsApp = whatsappNumber.replace(/[+\s-]/g, "");
  const whatsappLink = `https://wa.me/${formattedWhatsApp}?text=Hi%2C%20I%27m%20interested%20in%20your%20aquarium%20fish!`;

  return (
    <>
      <section className="relative bg-[var(--bg)] py-16 md:py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium mb-6">
            <Sparkles className="h-3 w-3" /> Get in Touch
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Get in
            <span className="gradient-text"> Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-6 leading-relaxed">
            Whether you have questions about fish care, aquarium setup, or want
            to explore our collection — we&apos;re just a message or call away.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg)] px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* WhatsApp Card */}
            <div className="group glass-card rounded-2xl overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-300 hover:-translate-y-2">
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-[#25D366]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">WhatsApp</h2>
                <p className="text-muted mb-4">Fastest way to reach us</p>
                <div className="mb-6">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl md:text-2xl font-semibold text-foreground hover:text-[#25D366] transition-colors break-all"
                  >
                    {whatsappNumber}
                  </a>
                </div>
                <div className="space-y-3 text-muted text-sm mb-8">
                  <div className="flex items-center gap-2 justify-center">
                    <Clock className="w-4 h-4 text-[#25D366]" />
                    <span>Response within 30 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <MapPin className="w-4 h-4 text-[#25D366]" />
                    <span>Available worldwide via chat</span>
                  </div>
                </div>
                <Link
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start WhatsApp Chat
                </Link>
              </div>
            </div>

            {/* Call / Phone Card */}
            <div className="group glass-card rounded-2xl overflow-hidden hover:border-[var(--accent)]/30 transition-all duration-300 hover:-translate-y-2">
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-[var(--accent)]" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Call Us</h2>
                <p className="text-muted mb-4">Speak directly with our team</p>
                <div className="mb-6">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="text-xl md:text-2xl font-semibold text-foreground hover:text-[var(--accent)] transition-colors break-all"
                  >
                    {phoneNumber}
                  </a>
                </div>
                <div className="space-y-3 text-muted text-sm mb-8">
                  <div className="flex items-center gap-2 justify-center">
                    <Clock className="w-4 h-4 text-[var(--accent)]" />
                    <span>Mon - Fri: 9AM – 6PM (BST)</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <MapPin className="w-4 h-4 text-[var(--accent)]" />
                    <span>Dhaka, Bangladesh (HQ)</span>
                  </div>
                </div>
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all glow-button"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto glass-card rounded-2xl p-6 border border-[var(--border)]">
            <p className="text-muted">
              <span className="font-semibold text-foreground">Prefer WhatsApp?</span>
              You&apos;ll get the fastest response there. For urgent matters, feel
              free to give us a call during business hours.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--bg-soft)] py-20 px-6 border-t border-[var(--border)]">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-foreground">
            Ready to Bring Your
            <br />
            <span className="gradient-text">Aquarium to Life?</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Explore our handpicked fish collection and start building your
            underwater paradise today.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] hover:opacity-90 text-white px-10 py-3 rounded-full font-semibold transition-all glow-button"
            >
              Visit Our Shop
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
