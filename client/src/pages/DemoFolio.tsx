/**
 * DEMO: "The White Coat Folio"
 * Design Philosophy: Clean editorial luxury. Light mode. Serif typography.
 * Like a premium medical journal meets a private wealth report.
 * Core: Cream/ivory backgrounds, deep navy text, gold accents, generous whitespace.
 */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function DemoFolio() {
  return (
    <div className="min-h-screen" style={{ background: "#FDFBF7" }}>
      {/* Nav */}
      <nav className="border-b" style={{ borderColor: "#E8E2D6" }}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#1B2B4B" }}>
              <span className="text-sm font-bold" style={{ color: "#C9A96E" }}>RC</span>
            </div>
            <div>
              <span className="text-lg tracking-tight" style={{ fontFamily: "'Georgia', serif", color: "#1B2B4B", fontWeight: 600 }}>Russell Capital</span>
              <span className="block text-xs tracking-widest uppercase" style={{ color: "#8B7D6B", letterSpacing: "0.15em" }}>Solutions</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Pricing", "Case Studies", "Advisors"].map(item => (
              <span key={item} className="text-sm cursor-pointer transition-colors hover:opacity-70" style={{ color: "#4A4035", fontFamily: "'Georgia', serif" }}>{item}</span>
            ))}
            <button className="px-5 py-2.5 text-sm font-medium rounded-none" style={{ background: "#1B2B4B", color: "#FDFBF7", fontFamily: "'Georgia', serif" }}>
              Book Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Editorial text */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px" style={{ background: "#C9A96E" }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "#C9A96E", fontFamily: "'Georgia', serif" }}>
                Physician Wealth Advisory
              </span>
            </div>

            <h1 className="leading-[1.1]" style={{ fontFamily: "'Georgia', serif", color: "#1B2B4B" }}>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-normal">The Art of</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-normal italic" style={{ color: "#C9A96E" }}>Paying Nothing</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-normal">in Taxes.</span>
            </h1>

            <p className="text-lg leading-relaxed max-w-md" style={{ color: "#5C5347", fontFamily: "'Georgia', serif" }}>
              Fifteen patent-pending financial engines, designed exclusively for physicians 
              who refuse to surrender their income to the IRS.
            </p>

            <div className="flex items-center gap-6 pt-4">
              <button className="group flex items-center gap-3 px-7 py-4 text-sm tracking-wide uppercase" style={{ background: "#1B2B4B", color: "#FDFBF7", letterSpacing: "0.1em" }}>
                View Our Approach
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-sm" style={{ color: "#8B7D6B", fontFamily: "'Georgia', serif" }}>
                or <span className="underline cursor-pointer" style={{ color: "#1B2B4B" }}>read a case study</span>
              </span>
            </div>
          </div>

          {/* Right: Elegant stat card */}
          <div className="relative">
            <div className="p-10 border" style={{ borderColor: "#E8E2D6", background: "#FFFFFF" }}>
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px" style={{ background: "#C9A96E" }} />
                  <span className="text-xs uppercase tracking-[0.15em]" style={{ color: "#8B7D6B" }}>By the Numbers</span>
                </div>
                
                {[
                  { value: "$847M+", label: "Tax Savings Engineered" },
                  { value: "2,400+", label: "Physicians Served" },
                  { value: "15", label: "Patent-Pending Engines" },
                  { value: "$0", label: "Target Annual Tax Liability" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-baseline justify-between border-b pb-4" style={{ borderColor: "#F0EBE3" }}>
                    <span className="text-3xl font-light" style={{ fontFamily: "'Georgia', serif", color: "#1B2B4B" }}>{stat.value}</span>
                    <span className="text-xs uppercase tracking-wider" style={{ color: "#8B7D6B" }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: "#C9A96E" }} />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: "#C9A96E" }} />
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "#E8E2D6" }}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <span className="text-xs tracking-wider uppercase" style={{ color: "#8B7D6B" }}>
            Design Style: "The White Coat Folio" — Editorial Luxury
          </span>
          <Link href="/" className="text-xs underline" style={{ color: "#1B2B4B" }}>
            ← Back to current site
          </Link>
        </div>
      </div>
    </div>
  );
}
