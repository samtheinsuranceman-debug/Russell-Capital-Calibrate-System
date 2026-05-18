import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Check, ArrowRight, Zap, Crown, Building2 } from "lucide-react";

const PLANS = [
  {
    name: "Physician Starter",
    icon: Zap,
    price: "$997",
    period: "/month",
    annualPrice: "$9,970",
    annualSavings: "Save $1,994/yr",
    description: "For physicians beginning their tax-free wealth journey. Ideal for residents and early-career attendings.",
    features: [
      "Student Loan Optimization Engine",
      "Basic Roth Conversion Ladder",
      "Tax Bracket Analyzer",
      "1 Strategy Session / Month",
      "Physician Financial Health Score",
      "Email Support",
      "Basic Retirement Projections",
      "Document Vault (10 docs)",
    ],
    cta: "Start Free Assessment",
    popular: false,
  },
  {
    name: "Physician Professional",
    icon: Crown,
    price: "$2,997",
    period: "/month",
    annualPrice: "$29,970",
    annualSavings: "Save $5,994/yr",
    description: "Full tax elimination suite for established physicians earning $400K+. Our most popular plan.",
    features: [
      "Everything in Starter, plus:",
      "Infinite Banking Engine",
      "Captive Insurance Setup & Management",
      "Advanced Roth Conversion Ladders",
      "Real Estate Tax Shelter Engine",
      "Mortgage Killer Strategy",
      "4 Strategy Sessions / Month",
      "Dedicated Physician Advisor",
      "Tax-Free Retirement Waterfall",
      "Priority Support",
      "Unlimited Document Vault",
      "Quarterly Tax Review",
    ],
    cta: "Book Strategy Call",
    popular: true,
  },
  {
    name: "Physician Enterprise",
    icon: Building2,
    price: "$7,997",
    period: "/month",
    annualPrice: "$79,970",
    annualSavings: "Save $15,994/yr",
    description: "For practice owners, surgical groups, and physicians with $1M+ income seeking complete tax elimination.",
    features: [
      "Everything in Professional, plus:",
      "Multi-Entity Captive Insurance",
      "Oil & Gas Tax Shelters",
      "Cost Segregation Analysis",
      "1031 Exchange Optimization",
      "Dynasty Trust Planning",
      "Premium Financing Strategies",
      "Weekly Strategy Sessions",
      "White-Glove Concierge Service",
      "Custom Patent Engine Access",
      "Estate Tax Elimination",
      "Family Office Integration",
      "24/7 Priority Access",
    ],
    cta: "Schedule Executive Briefing",
    popular: false,
  },
];

const COMPARISON = [
  { feature: "Student Loan Optimizer", starter: true, pro: true, enterprise: true },
  { feature: "Roth Conversion Ladders", starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
  { feature: "Infinite Banking", starter: false, pro: true, enterprise: true },
  { feature: "Captive Insurance", starter: false, pro: "Single Entity", enterprise: "Multi-Entity" },
  { feature: "Real Estate Tax Shelters", starter: false, pro: true, enterprise: true },
  { feature: "Oil & Gas Strategies", starter: false, pro: false, enterprise: true },
  { feature: "Cost Segregation", starter: false, pro: false, enterprise: true },
  { feature: "1031 Exchange Engine", starter: false, pro: false, enterprise: true },
  { feature: "Tax-Free Retirement Waterfall", starter: false, pro: true, enterprise: true },
  { feature: "Estate Planning", starter: false, pro: "Basic", enterprise: "Dynasty Trust" },
  { feature: "Strategy Sessions", starter: "1/mo", pro: "4/mo", enterprise: "Weekly" },
  { feature: "Dedicated Advisor", starter: false, pro: true, enterprise: true },
  { feature: "Patent Engine Access", starter: "2 Engines", pro: "8 Engines", enterprise: "All 15" },
  { feature: "Support Level", starter: "Email", pro: "Priority", enterprise: "24/7 Concierge" },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-16 container">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-xs text-primary font-medium">Transparent Pricing — No Hidden Fees</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Invest in <span className="text-primary text-glow">Tax Freedom</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Every dollar you invest in our engines returns 10-50x in tax savings. Choose the plan that matches your income level and goals.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container pb-20">
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-7 space-y-6 transition-all ${
                plan.popular
                  ? "bg-card border-2 border-primary shadow-[0_0_40px_oklch(0.76_0.18_160/0.15)]"
                  : "glow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <plan.icon size={20} className="text-primary" />
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="stat-number text-4xl">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {plan.annualPrice}/yr billed annually · <span className="text-primary">{plan.annualSavings}</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
              </div>
              <div className="space-y-2.5">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check size={14} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className={`block text-center py-3 rounded-lg text-sm font-medium transition-all active:scale-[0.97] ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:bg-accent"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ROI Callout */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container py-14">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">The Math is Simple</h3>
            <p className="text-muted-foreground">
              A physician earning $500K pays approximately $175K in annual taxes. Our Professional plan costs $29,970/year and typically saves $120K-$175K in year one alone.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-1">
                <p className="stat-number text-2xl">8-12x</p>
                <p className="text-xs text-muted-foreground">Average First-Year ROI</p>
              </div>
              <div className="space-y-1">
                <p className="stat-number text-2xl">$2.4M</p>
                <p className="text-xs text-muted-foreground">Avg. 10-Year Tax Savings</p>
              </div>
              <div className="space-y-1">
                <p className="stat-number text-2xl">97%</p>
                <p className="text-xs text-muted-foreground">Client Retention Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container py-20">
        <h3 className="text-2xl font-bold text-foreground text-center mb-10">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Starter</th>
                <th className="text-center py-3 px-4 text-primary font-medium">Professional</th>
                <th className="text-center py-3 px-4 text-muted-foreground font-medium">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-border/50">
                  <td className="py-3 px-4 text-foreground">{row.feature}</td>
                  {[row.starter, row.pro, row.enterprise].map((val, i) => (
                    <td key={i} className="text-center py-3 px-4">
                      {val === true ? (
                        <Check size={16} className="mx-auto text-primary" />
                      ) : val === false ? (
                        <span className="text-muted-foreground/40">—</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Guarantee */}
      <section className="container pb-20">
        <div className="max-w-3xl mx-auto glow-card p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-foreground">90-Day Tax Savings Guarantee</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If we don't identify at least $50,000 in actionable tax savings within your first 90 days, we'll refund your entire investment. No questions asked. We've never had to issue this refund.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
            Start Risk-Free <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
