import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { Check, ArrowRight, Zap, Crown, Building2 } from "lucide-react";

const PLANS = [
  {
    name: "Advisor Starter",
    icon: Zap,
    price: "$1,997",
    period: "/month",
    annualPrice: "$19,970",
    annualSavings: "Save $3,994/yr",
    description: "For independent financial advisors looking to add tax-free wealth strategies to their practice. Serve up to 25 clients.",
    features: [
      "White-Label Calibrate System",
      "10 Wealth Genome Types Engine",
      "Student Loan Optimization Engine",
      "Basic Roth Conversion Ladder Tools",
      "Tax Bracket Analyzer",
      "1 Strategy Session / Month",
      "Client Portal (25 clients)",
      "Email Support",
      "Basic Reporting Dashboard",
      "Your Branding on Client Materials",
    ],
    cta: "Start Free Assessment",
    popular: false,
  },
  {
    name: "Advisor Professional",
    icon: Crown,
    price: "$5,997",
    period: "/month",
    annualPrice: "$59,970",
    annualSavings: "Save $11,994/yr",
    description: "Full tax elimination platform for established advisory firms. Unlimited clients. All 15 patent engines. Our most popular plan.",
    features: [
      "Everything in Starter, plus:",
      "Infinite Banking Engine",
      "Captive Insurance Setup Tools",
      "Advanced Roth Conversion Ladders",
      "Real Estate Tax Shelter Engine",
      "Mortgage Killer Strategy",
      "4 Strategy Sessions / Month",
      "Unlimited Client Portal",
      "AI-Powered Wealth Genome Scoring",
      "Priority Support",
      "Custom Advisor Dashboard",
      "Quarterly Platform Updates",
      "Co-Branded Marketing Materials",
    ],
    cta: "Book Strategy Call",
    popular: true,
  },
  {
    name: "Advisor Enterprise",
    icon: Building2,
    price: "$15,997",
    period: "/month",
    annualPrice: "$159,970",
    annualSavings: "Save $31,994/yr",
    description: "For multi-advisor firms, RIAs, and broker-dealers seeking full platform licensing with custom integrations.",
    features: [
      "Everything in Professional, plus:",
      "Multi-Advisor Team Access",
      "Oil & Gas Tax Shelter Engine",
      "Cost Segregation Analysis Tools",
      "1031 Exchange Optimization",
      "Dynasty Trust Planning Engine",
      "Premium Financing Strategies",
      "Weekly Strategy Sessions",
      "White-Glove Onboarding",
      "Custom Patent Engine Access",
      "API Access & CRM Integration",
      "Dedicated Account Manager",
      "24/7 Priority Access",
      "Custom Compliance Workflows",
    ],
    cta: "Schedule Executive Briefing",
    popular: false,
  },
];

const COMPARISON = [
  { feature: "Client Capacity", starter: "25 clients", pro: "Unlimited", enterprise: "Unlimited + Team" },
  { feature: "Wealth Genome Calibration", starter: true, pro: true, enterprise: true },
  { feature: "Roth Conversion Ladders", starter: "Basic", pro: "Advanced", enterprise: "Advanced" },
  { feature: "Infinite Banking Engine", starter: false, pro: true, enterprise: true },
  { feature: "Captive Insurance Tools", starter: false, pro: "Single Entity", enterprise: "Multi-Entity" },
  { feature: "Real Estate Tax Shelters", starter: false, pro: true, enterprise: true },
  { feature: "Oil & Gas Strategies", starter: false, pro: false, enterprise: true },
  { feature: "Cost Segregation", starter: false, pro: false, enterprise: true },
  { feature: "1031 Exchange Engine", starter: false, pro: false, enterprise: true },
  { feature: "White-Label Branding", starter: "Basic", pro: "Full", enterprise: "Custom" },
  { feature: "Strategy Sessions", starter: "1/mo", pro: "4/mo", enterprise: "Weekly" },
  { feature: "Patent Engine Access", starter: "2 Engines", pro: "8 Engines", enterprise: "All 15" },
  { feature: "API & CRM Integration", starter: false, pro: false, enterprise: true },
  { feature: "Multi-Advisor Access", starter: false, pro: false, enterprise: true },
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
            License the <span className="text-primary text-glow">Tax-Free Wealth Platform</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Add patent-pending tax elimination engines to your advisory practice. Every dollar your clients save strengthens your retention and AUM growth.
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
              An advisor with 50 physician clients averaging $400K income can generate $6M+ in collective tax savings annually. Your Professional license costs $59,970/year — that's less than the savings from a single client.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-1">
                <p className="stat-number text-2xl">100x+</p>
                <p className="text-xs text-muted-foreground">Platform ROI for Your Practice</p>
              </div>
              <div className="space-y-1">
                <p className="stat-number text-2xl">$2.4M</p>
                <p className="text-xs text-muted-foreground">Avg. Client 10-Year Tax Savings</p>
              </div>
              <div className="space-y-1">
                <p className="stat-number text-2xl">97%</p>
                <p className="text-xs text-muted-foreground">Advisor Retention Rate</p>
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
          <h3 className="text-xl font-bold text-foreground">90-Day Revenue Guarantee</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If you don't generate at least $50,000 in new client tax savings within your first 90 days using our platform, we'll refund your entire investment. No questions asked. We've never had to issue this refund.
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
