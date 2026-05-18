/**
 * DEMO: "The Physician's War Room"
 * Design Philosophy: Dark command-center. Bloomberg Terminal meets wealth dashboard.
 * Core: Near-black backgrounds, electric emerald accents, monospace data, grid overlays.
 * This is the CURRENT design of the live site.
 */
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "wouter";

export default function DemoWarroom() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0B0F14" }}>
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px"
      }} />

      {/* Nav */}
      <nav className="relative z-10 border-b" style={{ borderColor: "rgba(16, 185, 129, 0.15)" }}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
              <Zap size={16} style={{ color: "#10B981" }} />
            </div>
            <div>
              <span className="text-sm font-semibold" style={{ color: "#F1F5F9" }}>Russell Capital</span>
              <span className="block text-[10px] tracking-wider uppercase" style={{ color: "#10B981" }}>Solutions</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["Services", "Pricing", "Case Studies", "Advisors", "FAQ"].map(item => (
              <span key={item} className="text-sm cursor-pointer transition-colors hover:opacity-70" style={{ color: "#94A3B8" }}>{item}</span>
            ))}
            <span className="text-sm px-3 py-1.5 rounded-md cursor-pointer" style={{ color: "#10B981", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
              Calibrate
            </span>
            <button className="px-4 py-2 text-sm font-medium rounded-lg" style={{ background: "#10B981", color: "#0B0F14" }}>
              Book Assessment
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
              <span className="text-xs font-medium" style={{ color: "#10B981" }}>15 Patent-Pending Financial Engines</span>
            </div>

            <h1>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold" style={{ color: "#F1F5F9" }}>
                Physicians Pay
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold" style={{ color: "#10B981", textShadow: "0 0 30px rgba(16, 185, 129, 0.3)" }}>
                Zero Taxes.
              </span>
              <span className="block text-3xl md:text-4xl font-medium mt-2" style={{ color: "#64748B" }}>
                We Engineered It.
              </span>
            </h1>

            <p className="text-base leading-relaxed max-w-lg" style={{ color: "#94A3B8" }}>
              Russell Capital Solutions deploys patent-pending tax elimination engines exclusively for 
              high-income physicians. Infinite Banking. Roth Ladders. Captive Insurance. Student Loan 
              Arbitrage. All integrated.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button className="group flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all active:scale-[0.97]" style={{ background: "#10B981", color: "#0B0F14" }}>
                View Pricing
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 text-sm font-medium rounded-lg transition-all" style={{ background: "rgba(241, 245, 249, 0.05)", color: "#F1F5F9", border: "1px solid rgba(241, 245, 249, 0.1)" }}>
                See Results
              </button>
            </div>

            <button className="flex items-center gap-2 px-5 py-3 rounded-lg mt-2 transition-all hover:scale-[1.02]" style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)" }}>
              <Zap size={16} style={{ color: "#10B981" }} />
              <span className="text-sm font-medium" style={{ color: "#10B981" }}>Discover Your Wealth Genome</span>
            </button>
          </div>

          {/* Right: Tax calculator card */}
          <div className="relative">
            <div className="rounded-xl p-8 space-y-6" style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#F1F5F9" }}>Instant Tax Savings Estimate</h3>
              <div className="space-y-2">
                <label className="text-xs" style={{ color: "#64748B" }}>Annual W-2 / Practice Income</label>
                <div className="rounded-lg px-4 py-3 text-lg" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(16, 185, 129, 0.2)", color: "#94A3B8" }}>
                  $450,000
                </div>
              </div>
              <button className="w-full py-3 rounded-lg text-sm font-semibold" style={{ background: "#10B981", color: "#0B0F14" }}>
                Calculate My Savings
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t" style={{ borderColor: "rgba(16, 185, 129, 0.15)" }}>
          {[
            { value: "$847M+", label: "Tax Savings Engineered" },
            { value: "2,400+", label: "Physicians Served" },
            { value: "15", label: "Patent-Pending Engines" },
            { value: "$0", label: "Target Tax Liability" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <p className="text-2xl md:text-3xl font-bold" style={{ color: "#10B981", fontFamily: "monospace", textShadow: "0 0 15px rgba(16, 185, 129, 0.3)" }}>{stat.value}</p>
              <p className="text-xs" style={{ color: "#64748B" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom bar */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(16, 185, 129, 0.15)" }}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <span className="text-xs" style={{ color: "#475569" }}>
            Design Style: "The Physician's War Room" — Command Center (CURRENT)
          </span>
          <Link href="/" className="text-xs underline" style={{ color: "#10B981" }}>
            ← Back to live site
          </Link>
        </div>
      </div>
    </div>
  );
}
