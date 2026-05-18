/**
 * DEMO: "The White Coat Folio" — Full Multi-Section Page
 * Design Philosophy: Editorial luxury. Premium medical journal meets wealth report.
 * Core: Cream/ivory backgrounds, deep navy text, gold accents, Georgia serif, thin rules.
 */
import { ArrowRight, Check, Quote } from "lucide-react";
import { Link } from "wouter";

export default function DemoFolio() {
  return (
    <div className="min-h-screen" style={{ background: "#FDFBF7", color: "#1B2A4A" }}>
      {/* Gold top rule */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, #C9A84C, #E8D48B, #C9A84C)" }} />

      {/* Nav */}
      <nav className="border-b" style={{ borderColor: "#E8E2D6" }}>
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "#1B2A4A", color: "#C9A84C" }}>
              RC
            </div>
            <div>
              <span className="text-base font-semibold" style={{ fontFamily: "Georgia, serif", color: "#1B2A4A" }}>Russell Capital</span>
              <span className="block text-[10px] tracking-[0.2em] uppercase" style={{ color: "#C9A84C" }}>SOLUTIONS</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Pricing", "Case Studies", "Advisors"].map(item => (
              <span key={item} className="text-sm cursor-pointer transition-colors hover:opacity-70" style={{ color: "#5A6B8A", fontFamily: "Georgia, serif" }}>{item}</span>
            ))}
            <button className="px-5 py-2.5 text-sm font-medium" style={{ background: "#1B2A4A", color: "#FDFBF7" }}>
              Book Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px" style={{ background: "#C9A84C" }} />
              <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: "#C9A84C" }}>Financial Advisor Platform</span>
            </div>
            <h1 style={{ fontFamily: "Georgia, serif" }}>
              <span className="block text-5xl md:text-6xl leading-tight" style={{ color: "#1B2A4A" }}>
                The Art of
              </span>
              <span className="block text-5xl md:text-6xl italic leading-tight" style={{ color: "#C9A84C" }}>
                Paying Nothing
              </span>
              <span className="block text-5xl md:text-6xl leading-tight" style={{ color: "#1B2A4A" }}>
                in Taxes.
              </span>
            </h1>
            <p className="text-base leading-relaxed max-w-md" style={{ color: "#5A6B8A", fontFamily: "Georgia, serif" }}>
              Fifteen patent-pending financial engines, licensed exclusively to advisors who refuse to let their clients surrender income to the IRS.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <button className="group flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all" style={{ background: "#1B2A4A", color: "#FDFBF7" }}>
                View Our Approach
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-sm" style={{ color: "#5A6B8A", fontFamily: "Georgia, serif" }}>
                or <span className="underline cursor-pointer" style={{ color: "#1B2A4A" }}>read a case study</span>
              </span>
            </div>
          </div>

          {/* Stats card */}
          <div className="relative p-8 space-y-6" style={{ border: "1px solid #E8E2D6", background: "#FFFFFF" }}>
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: "#C9A84C" }} />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: "#C9A84C" }} />
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: "#C9A84C" }} />
              <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#5A6B8A" }}>By the Numbers</span>
            </div>
            {[
              { value: "$847M+", label: "Tax Savings Engineered" },
              { value: "2,400+", label: "Physicians Served" },
              { value: "15", label: "Patent-Pending Engines" },
              { value: "$0", label: "Target Annual Tax Liability" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: i < 3 ? "1px solid #E8E2D6" : "none" }}>
                <span className="text-2xl font-light" style={{ fontFamily: "Georgia, serif", color: "#1B2A4A" }}>{stat.value}</span>
                <span className="text-xs tracking-wide uppercase" style={{ color: "#5A6B8A" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{ background: "#F5F1EA" }}>
        <div className="max-w-6xl mx-auto px-8 py-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-px" style={{ background: "#C9A84C" }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#C9A84C" }}>Our Engines</span>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Infinite Banking", desc: "Whole life policies as your own private banking system. Borrow against yourself, tax-free." },
              { title: "Roth Conversion Ladders", desc: "Systematic tax-bracket arbitrage that moves wealth from taxable to tax-free over time." },
              { title: "Captive Insurance", desc: "Your own insurance company. Deduct premiums, invest reserves, build generational wealth." },
            ].map((svc, i) => (
              <div key={i} className="p-6 space-y-4" style={{ background: "#FDFBF7", border: "1px solid #E8E2D6" }}>
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#C9A84C" }}>0{i + 1}</span>
                <h3 className="text-xl" style={{ fontFamily: "Georgia, serif", color: "#1B2A4A" }}>{svc.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5A6B8A" }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center space-y-4 mb-14">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px" style={{ background: "#C9A84C" }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "#C9A84C" }}>Investment</span>
            <div className="w-12 h-px" style={{ background: "#C9A84C" }} />
          </div>
          <h2 className="text-3xl" style={{ fontFamily: "Georgia, serif", color: "#1B2A4A" }}>License the Platform</h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "#5A6B8A" }}>Transparent pricing. No hidden fees. Every dollar returns 10-50x in client tax savings.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Advisor Starter", price: "$1,997", period: "/month", features: ["25 Client Portal", "White-Label Branding", "2 Patent Engines", "Email Support"] },
            { name: "Advisor Professional", price: "$5,997", period: "/month", popular: true, features: ["Unlimited Clients", "All 15 Engines", "AI Wealth Genome", "Priority Support"] },
            { name: "Advisor Enterprise", price: "$15,997", period: "/month", features: ["Multi-Advisor Teams", "API & CRM Integration", "Custom Compliance", "24/7 Concierge"] },
          ].map((plan, i) => (
            <div key={i} className="p-7 space-y-5 relative" style={{ background: plan.popular ? "#1B2A4A" : "#FDFBF7", border: plan.popular ? "none" : "1px solid #E8E2D6" }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium" style={{ background: "#C9A84C", color: "#1B2A4A" }}>
                  Most Popular
                </div>
              )}
              <h3 className="text-sm tracking-wide uppercase" style={{ color: plan.popular ? "#C9A84C" : "#5A6B8A" }}>{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-light" style={{ fontFamily: "Georgia, serif", color: plan.popular ? "#FDFBF7" : "#1B2A4A" }}>{plan.price}</span>
                <span className="text-sm" style={{ color: plan.popular ? "#8A9BBF" : "#5A6B8A" }}>{plan.period}</span>
              </div>
              <div className="space-y-2.5 pt-2">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <Check size={12} style={{ color: "#C9A84C" }} />
                    <span className="text-sm" style={{ color: plan.popular ? "#C8D4E8" : "#5A6B8A" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 text-sm font-medium mt-4" style={{
                background: plan.popular ? "#C9A84C" : "transparent",
                color: plan.popular ? "#1B2A4A" : "#1B2A4A",
                border: plan.popular ? "none" : "1px solid #1B2A4A"
              }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ background: "#1B2A4A" }}>
        <div className="max-w-4xl mx-auto px-8 py-20 text-center space-y-6">
          <Quote size={32} style={{ color: "#C9A84C", margin: "0 auto" }} />
          <blockquote className="text-xl md:text-2xl italic leading-relaxed" style={{ fontFamily: "Georgia, serif", color: "#E8E2D6" }}>
            "In my first year using the Russell Capital platform with my physician clients, I identified over $4.2 million in collective tax savings. My retention rate went from 82% to 97%."
          </blockquote>
          <div>
            <p className="text-sm font-medium" style={{ color: "#FDFBF7" }}>M.K., CFP</p>
            <p className="text-xs" style={{ color: "#8A9BBF" }}>Independent Financial Advisor — Chicago, IL</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-8 py-20 text-center space-y-6">
        <h2 className="text-3xl" style={{ fontFamily: "Georgia, serif", color: "#1B2A4A" }}>
          Ready to Transform Your Practice?
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: "#5A6B8A" }}>
          Join 200+ financial advisors who've added tax-free wealth strategies to their practice with our patent-pending platform.
        </p>
        <button className="px-8 py-3 text-sm font-medium tracking-wide uppercase" style={{ background: "#1B2A4A", color: "#FDFBF7" }}>
          Schedule a Demo
        </button>
      </section>

      {/* Footer */}
      <div className="border-t" style={{ borderColor: "#E8E2D6" }}>
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <span className="text-xs" style={{ color: "#5A6B8A" }}>
            Design Style: "The White Coat Folio" — Editorial Luxury
          </span>
          <Link href="/" className="text-xs underline" style={{ color: "#C9A84C" }}>
            ← Back to current site
          </Link>
        </div>
      </div>
    </div>
  );
}
