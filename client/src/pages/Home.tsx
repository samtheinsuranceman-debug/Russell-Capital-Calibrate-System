import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Shield, DollarSign, Users, Zap, BarChart3, Calculator, Brain, Lock } from "lucide-react";
import { useState } from "react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488147919/aw9gfzKTnxGzHcFkredpny/hero-main-VZgvXzzmLtB9uDHCPqpZDK.webp";
const PHYSICIAN_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488147919/aw9gfzKTnxGzHcFkredpny/physician-wealth-8rSHGgzguqEDQXfSn9UJh4.webp";

const STATS = [
  { value: "$847M+", label: "Tax Savings Engineered", icon: DollarSign },
  { value: "2,400+", label: "Physicians Served", icon: Users },
  { value: "15", label: "Patent-Pending Engines", icon: Brain },
  { value: "$0", label: "Target Tax Liability", icon: Shield },
];

const SERVICES_PREVIEW = [
  { icon: TrendingUp, title: "Infinite Banking", desc: "Become your own bank. Leverage whole life policy cash values to fund investments tax-free while maintaining death benefit protection." },
  { icon: BarChart3, title: "Roth Conversion Ladders", desc: "Systematically convert tax-deferred assets to tax-free Roth accounts using strategic bracket management and timing." },
  { icon: Shield, title: "Captive Insurance", desc: "Form your own insurance company to deduct premiums, build reserves, and create a tax-advantaged wealth accumulation vehicle." },
  { icon: Calculator, title: "Student Loan Optimizer", desc: "Eliminate $200K-$500K+ in medical school debt while simultaneously building tax-free wealth through arbitrage strategies." },
  { icon: Zap, title: "Tax-Free Retirement Engine", desc: "Patent-pending waterfall optimization across IUL, Roth, HSA, and municipal bonds for zero-tax retirement income." },
  { icon: Lock, title: "Estate & Asset Protection", desc: "Dynasty trusts, ILITs, and SLATs designed to transfer generational wealth with minimal estate tax exposure." },
];

function TaxSavingsCalculator() {
  const [income, setIncome] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const inc = parseInt(income.replace(/[^0-9]/g, ""));
    if (inc && inc > 100000) {
      // Simplified estimate: ~18-32% savings depending on income bracket
      const rate = inc > 750000 ? 0.32 : inc > 500000 ? 0.28 : inc > 350000 ? 0.24 : 0.18;
      setResult(Math.round(inc * rate));
    }
  };

  return (
    <div className="bg-card/80 backdrop-blur border border-border/50 rounded-xl p-6 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Instant Tax Savings Estimate</h3>
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Annual W-2 / Practice Income</label>
          <input
            type="text"
            value={income}
            onChange={(e) => { setIncome(e.target.value); setResult(null); }}
            placeholder="$450,000"
            className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button
          onClick={calculate}
          className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97]"
        >
          Calculate My Savings
        </button>
        {result && (
          <div className="pt-2 text-center">
            <p className="text-xs text-muted-foreground">Estimated Annual Tax Savings</p>
            <p className="stat-number text-3xl mt-1">${result.toLocaleString()}</p>
            <Link href="/contact" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
              See your full optimization plan <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="relative container pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-primary font-medium">15 Patent-Pending Financial Engines</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                Physicians Pay<br />
                <span className="text-primary text-glow">Zero Taxes.</span><br />
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">We Engineered It.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Russell Capital Solutions deploys patent-pending tax elimination engines exclusively for high-income physicians. Infinite Banking. Roth Ladders. Captive Insurance. Student Loan Arbitrage. All integrated.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97]">
                  View Pricing <ArrowRight size={16} />
                </Link>
                <Link href="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-all">
                  See Results
                </Link>
                <Link href="/calibrate" className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary font-medium rounded-lg hover:bg-primary/10 transition-all">
                  <Zap size={16} /> Discover Your Wealth Genome
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2">
              <TaxSavingsCalculator />
            </div>
          </div>
        </div>
        {/* Hero background image overlay */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-card/30">
        <div className="container py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center space-y-2">
                <stat.icon size={20} className="mx-auto text-primary/70" />
                <p className="stat-number text-2xl md:text-3xl">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container py-20 lg:py-28">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tax-Free Wealth Engines
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six integrated strategies that work together to systematically eliminate your tax liability while building generational wealth.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_PREVIEW.map((service) => (
            <div key={service.title} className="glow-card p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <service.icon size={18} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
            Explore All Services <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Physician-Focused Section */}
      <section className="relative border-y border-border/50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={PHYSICIAN_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative container py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Built Exclusively for <span className="text-primary">Physicians</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              You spent 12+ years training to save lives. You shouldn't spend another decade figuring out how to keep what you earn. Our patent-pending engines are calibrated specifically for physician income patterns, student loan structures, and practice ownership models.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-6">
              {[
                { stat: "$347K", label: "Avg. Student Debt Eliminated" },
                { stat: "4.2 yrs", label: "Avg. Time to Tax-Free" },
                { stat: "$2.1M", label: "Avg. 20-Year Wealth Gain" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="stat-number text-2xl">{item.stat}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            <Link href="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97] mt-4">
              View Physician Case Studies <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">What Physicians Say</h2>
          <p className="text-muted-foreground">Real results from real doctors.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { quote: "Went from paying $187K/year in taxes to legally paying $0. The Roth ladder + captive insurance combo changed everything.", name: "Dr. M.K.", role: "Orthopedic Surgeon, Dallas" },
            { quote: "Eliminated $420K in student loans while simultaneously building $1.2M in tax-free assets. I didn't think it was possible.", name: "Dr. A.P.", role: "Cardiologist, Atlanta" },
            { quote: "The infinite banking strategy alone generates $84K/year in tax-free income. Combined with the other engines, I'll never pay taxes again.", name: "Dr. R.S.", role: "Anesthesiologist, Chicago" },
          ].map((t) => (
            <div key={t.name} className="glow-card p-6 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/testimonials" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
            Read All Testimonials <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="container py-20 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Pay <span className="text-primary text-glow">Zero Taxes</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Book a complimentary 30-minute physician wealth assessment. We'll show you exactly how much you can save.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97]">
              Book Free Assessment <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-medium rounded-lg hover:bg-accent transition-all">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
