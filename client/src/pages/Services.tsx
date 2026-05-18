import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Shield, DollarSign, Calculator, Zap, Lock, Building2, Landmark, Briefcase, Home as HomeIcon, BarChart3, Brain } from "lucide-react";

const IB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488147919/aw9gfzKTnxGzHcFkredpny/services-infinite-banking-96VwXQ2QrqugsvaEte2yfU.webp";
const PATENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488147919/aw9gfzKTnxGzHcFkredpny/patent-engines-Yzr9sDddr88tMq9VXZ482o.webp";

const CORE_SERVICES = [
  {
    icon: TrendingUp,
    title: "Infinite Banking Concept",
    subtitle: "Become Your Own Bank",
    description: "Leverage dividend-paying whole life insurance cash values as a personal banking system. Fund investments, pay off debt, and generate tax-free income — all while maintaining a growing death benefit for estate planning.",
    benefits: ["Tax-free policy loans", "Guaranteed 4-6% growth floor", "Uninterrupted compounding", "Estate planning integration", "Creditor protection in most states"],
    idealFor: "Physicians earning $300K+ seeking permanent tax-free income streams",
  },
  {
    icon: BarChart3,
    title: "Roth Conversion Ladders",
    subtitle: "Strategic Tax Bracket Optimization",
    description: "Systematically convert tax-deferred 401(k) and IRA assets into tax-free Roth accounts using our patent-pending bracket management algorithm. We identify the optimal conversion amount each year to minimize lifetime tax liability.",
    benefits: ["Zero-tax retirement income", "Eliminate RMDs", "Optimal bracket filling", "Medicare IRMAA avoidance", "Social Security tax minimization"],
    idealFor: "Physicians with $500K+ in tax-deferred accounts seeking tax-free retirement",
  },
  {
    icon: Shield,
    title: "Captive Insurance",
    subtitle: "Your Own Insurance Company",
    description: "Form a captive insurance company owned by you to insure legitimate business risks. Deduct premiums as a business expense, build tax-advantaged reserves, and eventually distribute accumulated wealth at capital gains rates.",
    benefits: ["$1.2M+ annual deduction potential", "Asset protection", "Investment flexibility", "Estate planning vehicle", "Risk management"],
    idealFor: "Practice owners with $500K+ income and identifiable business risks",
  },
  {
    icon: Calculator,
    title: "Student Loan Optimizer",
    subtitle: "Debt Elimination Through Arbitrage",
    description: "Our patent-pending engine identifies the optimal strategy to eliminate $200K-$500K+ in medical school debt while simultaneously building wealth. We exploit the spread between loan rates and tax-advantaged investment returns.",
    benefits: ["Faster payoff than PSLF", "Simultaneous wealth building", "Tax deduction optimization", "Refinance timing engine", "PSLF vs. private comparison"],
    idealFor: "Physicians with $200K+ student debt seeking accelerated elimination",
  },
  {
    icon: Zap,
    title: "Tax-Free Retirement Waterfall",
    subtitle: "Patent-Pending Income Sequencing",
    description: "Our waterfall engine optimizes withdrawal sequencing across IUL loans, Roth distributions, HSA withdrawals, municipal bonds, and Social Security timing to deliver maximum tax-free retirement income for 30-50 years.",
    benefits: ["Zero-tax retirement income", "30-50 year durability", "Dynamic rebalancing", "Monte Carlo validated", "Social Security optimization"],
    idealFor: "Physicians within 10-20 years of retirement seeking guaranteed tax-free income",
  },
  {
    icon: Lock,
    title: "Estate & Asset Protection",
    subtitle: "Generational Wealth Transfer",
    description: "Dynasty trusts, ILITs, SLATs, and IDGTs designed to transfer wealth across generations with minimal estate tax exposure. Combined with captive insurance and infinite banking for maximum protection.",
    benefits: ["Multi-generational tax-free transfer", "Creditor protection", "Divorce protection", "Malpractice shielding", "Charitable planning"],
    idealFor: "Physicians with $2M+ net worth seeking generational wealth preservation",
  },
];

const ADDITIONAL_SERVICES = [
  { icon: HomeIcon, title: "Real Estate Tax Shelters", desc: "Cost segregation, bonus depreciation, and STR strategies to offset W-2 income" },
  { icon: Building2, title: "Oil & Gas Strategies", desc: "Intangible drilling costs and depletion allowances for immediate tax deductions" },
  { icon: Landmark, title: "1031 Exchange Engine", desc: "Defer capital gains indefinitely through strategic property exchanges" },
  { icon: Briefcase, title: "Premium Financing", desc: "Leverage bank financing to fund large life insurance policies with minimal out-of-pocket" },
  { icon: DollarSign, title: "Mortgage Killer", desc: "Eliminate mortgage interest through HELOC-to-IUL arbitrage optimization" },
  { icon: Brain, title: "Wealth Genome Score", desc: "Patent-pending classification system that identifies your optimal strategy combination" },
];

const PATENTS = [
  "PAT-001: Cascading Multi-Calculator Financial Planning Engine",
  "PAT-002: HELOC-to-IUL Arbitrage Optimization Engine",
  "PAT-003: AI Whisper Coaching System for Financial Advisors",
  "PAT-004: Wealth Genome Scoring & Classification System",
  "PAT-005: Tax-Free Retirement Income Waterfall Engine",
  "PAT-006: Divorce Asset Protection Calculator & IUL Shielding",
  "PAT-007: Ecological Drivers Retirement Risk Assessment",
  "PAT-008: Behavioral Lock-In Prevention System",
  "PAT-009: Mortgage Elimination & Real Estate Recycling",
  "PAT-010: Time Machine Dual Illustration IUL Comparison",
  "PAT-011: Russell Number Advisor Performance Scoring",
  "PAT-012: Roth Conversion & STR Tax Offset Strategy",
  "PAT-013: Monte Carlo Simulation with IUL Floor/Cap Constraints",
  "PAT-014: FIA Collateral Assignment Lending Optimization",
  "PAT-015: Automated Advisor Revenue & Territory Strategy",
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-16 container">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Tax-Free Wealth <span className="text-primary text-glow">Services</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Six core engines and nine supplementary strategies — all patent-pending, all integrated, all built exclusively for physician wealth optimization.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="container pb-20">
        <div className="space-y-8">
          {CORE_SERVICES.map((service, idx) => (
            <div key={service.title} className="glow-card p-6 lg:p-8">
              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <service.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                      <p className="text-sm text-primary">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                    Ideal for: {service.idealFor}
                  </p>
                </div>
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Key Benefits</p>
                  <div className="space-y-2">
                    {service.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container py-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Supplementary Strategies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADDITIONAL_SERVICES.map((s) => (
              <div key={s.title} className="glow-card p-5 space-y-2">
                <s.icon size={18} className="text-primary" />
                <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patent Engines Showcase */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              <span className="text-primary">15</span> Patent-Pending Engines
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Russell Capital Solutions has filed 15 patent applications covering our proprietary financial optimization algorithms. These engines work together as an integrated system — each one amplifying the others.
            </p>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {PATENTS.map((p) => (
                <div key={p} className="flex items-start gap-2 py-1.5 border-b border-border/30">
                  <Brain size={12} className="text-primary mt-1 shrink-0" />
                  <span className="text-xs text-muted-foreground">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-border/50">
            <img src={PATENT_IMG} alt="Patent-pending financial engines" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Infinite Banking Visual */}
      <section className="border-t border-border/50">
        <div className="container py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative rounded-xl overflow-hidden border border-border/50 order-2 lg:order-1">
              <img src={IB_IMG} alt="Infinite Banking wealth tree" className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-foreground">
                The Infinite Banking <span className="text-primary">Wealth Tree</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Like a tree with deep roots and ever-growing branches, Infinite Banking creates a self-sustaining financial ecosystem. Your policy cash value grows tax-free, provides tax-free loans for investments, and passes tax-free to your heirs — all while you maintain control.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "$84K/yr", label: "Avg. Tax-Free Income" },
                  { stat: "4.2%", label: "Guaranteed Growth Floor" },
                  { stat: "$2.1M", label: "Avg. 20-Year Cash Value" },
                  { stat: "100%", label: "Creditor Protected" },
                ].map((item) => (
                  <div key={item.label} className="bg-card border border-border/50 rounded-lg p-3 text-center">
                    <p className="stat-number text-lg">{item.stat}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="container py-16 text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Which Engines Are Right for You?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Book a free assessment and we'll identify exactly which combination of strategies will eliminate your tax liability.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97]">
            Book Free Assessment <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
