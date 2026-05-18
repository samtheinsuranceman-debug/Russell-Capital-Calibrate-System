/**
 * DEMO: "The Kinetic Blueprint"
 * Design Philosophy: Architectural/engineering blueprint aesthetic.
 * Technical drawings, grid overlays, animated construction lines.
 * Core: Deep blue-black backgrounds, white/cyan linework, monospace type, precision.
 */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function DemoBlueprint() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#0A1628" }}>
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px"
      }} />
      {/* Larger grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(56, 189, 248, 0.3) 2px, transparent 2px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.3) 2px, transparent 2px)
        `,
        backgroundSize: "200px 200px"
      }} />

      {/* Nav */}
      <nav className="relative z-10 border-b" style={{ borderColor: "rgba(56, 189, 248, 0.2)" }}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border flex items-center justify-center" style={{ borderColor: "rgba(56, 189, 248, 0.5)" }}>
              <span className="text-xs font-bold" style={{ color: "#38BDF8", fontFamily: "monospace" }}>RC</span>
            </div>
            <div>
              <span className="text-sm font-bold tracking-wider uppercase" style={{ color: "#E2E8F0", fontFamily: "monospace", letterSpacing: "0.15em" }}>
                Russell Capital
              </span>
              <span className="block text-[10px] tracking-[0.3em] uppercase" style={{ color: "#38BDF8", fontFamily: "monospace" }}>
                Solutions
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["SVC", "PRC", "CSE", "ADV", "FAQ"].map(item => (
              <span key={item} className="text-xs cursor-pointer tracking-widest hover:opacity-70 transition-opacity" style={{ color: "#64748B", fontFamily: "monospace" }}>{item}</span>
            ))}
            <button className="px-4 py-2 text-xs tracking-widest border" style={{ borderColor: "#38BDF8", color: "#38BDF8", fontFamily: "monospace" }}>
              INIT_SESSION
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-28 pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Technical headline */}
          <div className="lg:col-span-7 space-y-8">
            {/* Blueprint label */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2" style={{ background: "#38BDF8" }} />
                <div className="w-16 h-px" style={{ background: "#38BDF8" }} />
              </div>
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: "#38BDF8", fontFamily: "monospace" }}>
                SCHEMATIC_v15.3 // TAX_ELIMINATION_ENGINE
              </span>
            </div>

            <h1 style={{ fontFamily: "monospace" }}>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ color: "#F1F5F9" }}>
                ZERO TAX
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ color: "#38BDF8" }}>
                ARCHITECTURE
              </span>
              <span className="block text-lg font-normal mt-4 tracking-wide" style={{ color: "#64748B" }}>
                // engineered for physicians
              </span>
            </h1>

            <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#94A3B8", fontFamily: "monospace", lineHeight: "1.8" }}>
              Patent-pending financial engineering. 15 interlocking systems 
              designed to reduce physician tax liability to $0. Infinite Banking. 
              Roth Ladders. Captive Insurance. Student Loan Arbitrage.
              <span style={{ color: "#38BDF8" }}> All integrated.</span>
            </p>

            <div className="flex items-center gap-4 pt-4">
              <button className="group flex items-center gap-3 px-6 py-3 text-xs tracking-[0.2em] uppercase border transition-all hover:bg-[#38BDF8]/10" style={{ borderColor: "#38BDF8", color: "#38BDF8", fontFamily: "monospace" }}>
                VIEW_SCHEMATICS
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all hover:opacity-70" style={{ color: "#64748B", fontFamily: "monospace" }}>
                CASE_FILES →
              </button>
            </div>
          </div>

          {/* Right: Technical diagram card */}
          <div className="lg:col-span-5 relative">
            {/* Corner markers */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l" style={{ borderColor: "#38BDF8" }} />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r" style={{ borderColor: "#38BDF8" }} />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l" style={{ borderColor: "#38BDF8" }} />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r" style={{ borderColor: "#38BDF8" }} />

            <div className="border p-8 space-y-6" style={{ borderColor: "rgba(56, 189, 248, 0.3)", background: "rgba(10, 22, 40, 0.8)" }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#38BDF8", fontFamily: "monospace" }}>
                  SYSTEM_METRICS
                </span>
                <span className="text-[10px]" style={{ color: "#475569", fontFamily: "monospace" }}>
                  REV_2026.05
                </span>
              </div>

              {[
                { value: "$847M+", label: "TAX_SAVINGS_TOTAL", bar: 92 },
                { value: "2,400+", label: "PHYSICIANS_ACTIVE", bar: 78 },
                { value: "15", label: "PATENT_ENGINES", bar: 100 },
                { value: "$0", label: "TARGET_LIABILITY", bar: 5 },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold" style={{ color: "#F1F5F9", fontFamily: "monospace" }}>{stat.value}</span>
                    <span className="text-[10px] tracking-wider" style={{ color: "#64748B", fontFamily: "monospace" }}>{stat.label}</span>
                  </div>
                  <div className="h-1 w-full" style={{ background: "rgba(56, 189, 248, 0.1)" }}>
                    <div className="h-full transition-all duration-1000" style={{ width: `${stat.bar}%`, background: "#38BDF8" }} />
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t" style={{ borderColor: "rgba(56, 189, 248, 0.2)" }}>
                <span className="text-[10px] block" style={{ color: "#475569", fontFamily: "monospace" }}>
                  // ALL SYSTEMS OPERATIONAL<br />
                  // NEXT CALIBRATION: ON_DEMAND<br />
                  <span style={{ color: "#38BDF8" }}>// STATUS: ACCEPTING_NEW_PHYSICIANS</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(56, 189, 248, 0.2)" }}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <span className="text-xs tracking-wider" style={{ color: "#475569", fontFamily: "monospace" }}>
            DESIGN_STYLE: "The Kinetic Blueprint" — Architectural Precision
          </span>
          <Link href="/" className="text-xs underline" style={{ color: "#38BDF8", fontFamily: "monospace" }}>
            ← RETURN_MAIN
          </Link>
        </div>
      </div>
    </div>
  );
}
