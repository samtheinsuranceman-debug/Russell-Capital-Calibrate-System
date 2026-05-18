import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, Award, BookOpen, Users, Shield, Briefcase } from "lucide-react";

interface Advisor {
  name: string;
  title: string;
  specialty: string;
  bio: string;
  credentials: string[];
  focus: string[];
  clients: string;
  experience: string;
}

const ADVISORS: Advisor[] = [
  {
    name: "Sam Russell",
    title: "Founder & Chief Strategy Officer",
    specialty: "Physician Tax Elimination Architecture",
    bio: "Sam Russell built Russell Capital Solutions after witnessing physicians lose millions to inefficient tax strategies. With 15 patent-pending financial engines and over $847M in tax savings engineered, Sam personally designs the multi-strategy combinations that eliminate physician tax liability. His approach integrates infinite banking, captive insurance, and Roth conversion ladders into a unified system.",
    credentials: ["Series 65 Licensed", "Certified Financial Planner (CFP)", "Patent Holder — 15 Pending Applications", "NLP Master Practitioner"],
    focus: ["High-Income Physician Strategy Design", "Captive Insurance Architecture", "Patent Engine Development", "Multi-Strategy Integration"],
    clients: "2,400+ physicians served",
    experience: "15+ years in physician wealth optimization",
  },
  {
    name: "Dr. Catherine Zhao, MD, CFP",
    title: "Senior Physician Wealth Advisor",
    specialty: "Surgeon & Specialist Tax Strategies",
    bio: "A former practicing internist turned financial advisor, Dr. Zhao brings unique physician-to-physician understanding. She specializes in helping surgical specialists and high-income attendings implement infinite banking and Roth conversion strategies. Her medical background allows her to speak the language of her clients and understand the unique pressures of physician careers.",
    credentials: ["MD — Johns Hopkins", "Certified Financial Planner (CFP)", "Chartered Life Underwriter (CLU)", "Series 7 & 66 Licensed"],
    focus: ["Surgeon Tax Strategies", "Infinite Banking Implementation", "Student Loan Optimization", "Physician Career Transitions"],
    clients: "480+ physicians served",
    experience: "8 years in physician financial planning",
  },
  {
    name: "Marcus Chen, CPA, JD",
    title: "Tax Strategy Director",
    specialty: "Captive Insurance & Entity Structuring",
    bio: "Marcus leads all captive insurance formations and multi-entity structuring for Russell Capital Solutions. With dual credentials in tax law and accounting, he ensures every strategy is legally bulletproof and IRS-compliant. He has structured over 200 captive insurance companies for physician practices with zero audit failures.",
    credentials: ["Juris Doctor — Georgetown Law", "CPA — Licensed in 12 States", "Captive Insurance Specialist", "LLM in Taxation"],
    focus: ["Captive Insurance Formation", "Multi-Entity Structuring", "IRS Compliance & Audit Defense", "Tax Code Optimization"],
    clients: "200+ captive formations",
    experience: "12 years in physician tax law",
  },
  {
    name: "Rachel Okonkwo, CFP, RICP",
    title: "Retirement Income Specialist",
    specialty: "Tax-Free Retirement Waterfall Design",
    bio: "Rachel specializes in designing tax-free retirement income streams using the patent-pending Waterfall Engine. She optimizes the sequencing of IUL loans, Roth distributions, HSA withdrawals, and Social Security timing to deliver maximum lifetime income with zero tax liability. Her Monte Carlo simulations ensure income durability across 10,000+ economic scenarios.",
    credentials: ["Certified Financial Planner (CFP)", "Retirement Income Certified Professional (RICP)", "Chartered Financial Consultant (ChFC)", "Series 65 Licensed"],
    focus: ["Tax-Free Retirement Income", "Waterfall Optimization", "Social Security Timing", "Monte Carlo Analysis"],
    clients: "350+ retirement plans designed",
    experience: "10 years in retirement income planning",
  },
  {
    name: "David Park, MBA, CLU",
    title: "Real Estate & Alternative Strategies Director",
    specialty: "Cost Segregation, STR, & Oil/Gas",
    bio: "David leads all real estate tax shelter implementations including cost segregation studies, short-term rental strategies, 1031 exchanges, and oil & gas partnerships. He identifies properties and structures that maximize depreciation deductions to offset physician W-2 income, often eliminating $150K-$300K in annual tax liability through real estate alone.",
    credentials: ["MBA — Wharton", "Chartered Life Underwriter (CLU)", "Real Estate Investment Specialist", "Oil & Gas Tax Specialist"],
    focus: ["Cost Segregation Analysis", "Short-Term Rental Strategies", "1031 Exchange Optimization", "Oil & Gas Tax Shelters"],
    clients: "280+ real estate strategies deployed",
    experience: "14 years in alternative investments",
  },
];

export default function Advisors() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-16 container">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Your <span className="text-primary text-glow">Advisory Team</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Specialized physician wealth advisors with combined 59+ years of experience and $847M+ in tax savings engineered.
          </p>
        </div>
      </section>

      {/* Team Stats */}
      <section className="container pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {[
            { icon: Users, stat: "5", label: "Senior Advisors" },
            { icon: Award, stat: "59+", label: "Combined Years Experience" },
            { icon: Shield, stat: "0", label: "Audit Failures" },
            { icon: BookOpen, stat: "15", label: "Patent Applications" },
          ].map((item) => (
            <div key={item.label} className="glow-card p-4 text-center space-y-2">
              <item.icon size={18} className="mx-auto text-primary" />
              <p className="stat-number text-xl">{item.stat}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advisor Profiles */}
      <section className="container pb-20">
        <div className="space-y-6">
          {ADVISORS.map((advisor) => (
            <div key={advisor.name} className="glow-card p-6 lg:p-8">
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Left - Identity */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Briefcase size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{advisor.name}</h3>
                    <p className="text-sm text-primary">{advisor.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{advisor.specialty}</p>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <p className="text-xs text-muted-foreground">{advisor.clients}</p>
                    <p className="text-xs text-muted-foreground">{advisor.experience}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {advisor.credentials.map((c) => (
                      <span key={c} className="px-2 py-0.5 text-[10px] bg-card border border-border/50 text-muted-foreground rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right - Bio & Focus */}
                <div className="lg:col-span-8 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{advisor.bio}</p>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Areas of Focus</p>
                    <div className="flex flex-wrap gap-2">
                      {advisor.focus.map((f) => (
                        <span key={f} className="px-2.5 py-1 text-xs bg-primary/10 border border-primary/20 text-primary rounded-md">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="container py-16 text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Meet Your Advisor</h3>
          <p className="text-muted-foreground">Book a free assessment and get matched with the right specialist for your situation.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97]">
            Book Free Assessment <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
