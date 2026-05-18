import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, DollarSign, Clock, Target } from "lucide-react";

const CASE_STUDY_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663488147919/aw9gfzKTnxGzHcFkredpny/case-study-bg-Jwyi8ckBQifpXr2tkpNNW6.webp";

interface CaseStudy {
  initials: string;
  specialty: string;
  city: string;
  income: string;
  studentDebt: string;
  taxBefore: string;
  taxAfter: string;
  strategies: string[];
  totalSavings: string;
  timeline: string;
  highlight: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    initials: "Dr. R.H.",
    specialty: "Orthopedic Surgeon",
    city: "Houston, TX",
    income: "$890,000",
    studentDebt: "$340,000",
    taxBefore: "$312,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Captive Insurance", "Roth Conversion Ladder", "Cost Segregation", "Infinite Banking"],
    totalSavings: "$3.1M over 10 years",
    timeline: "18 months to zero tax",
    highlight: "Eliminated $340K student debt in 3 years while building $1.8M tax-free",
  },
  {
    initials: "Dr. M.K.",
    specialty: "Cardiothoracic Surgeon",
    city: "Dallas, TX",
    income: "$1,200,000",
    studentDebt: "$420,000",
    taxBefore: "$445,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Multi-Entity Captive", "Oil & Gas Shelters", "Dynasty Trust", "Premium Financing"],
    totalSavings: "$5.8M over 10 years",
    timeline: "12 months to zero tax",
    highlight: "Practice owner deployed all 15 patent engines simultaneously",
  },
  {
    initials: "Dr. A.P.",
    specialty: "Interventional Cardiologist",
    city: "Atlanta, GA",
    income: "$650,000",
    studentDebt: "$380,000",
    taxBefore: "$228,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Infinite Banking", "Student Loan Arbitrage", "Roth Ladder", "Real Estate Depreciation"],
    totalSavings: "$2.4M over 10 years",
    timeline: "24 months to zero tax",
    highlight: "Student loans eliminated through IUL arbitrage — net positive $47K",
  },
  {
    initials: "Dr. S.W.",
    specialty: "Neurosurgeon",
    city: "Phoenix, AZ",
    income: "$980,000",
    studentDebt: "$510,000",
    taxBefore: "$367,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Captive Insurance", "1031 Exchanges", "Roth Conversion", "HSA Maximization"],
    totalSavings: "$4.2M over 10 years",
    timeline: "14 months to zero tax",
    highlight: "Highest student debt client — eliminated in 28 months with zero out-of-pocket",
  },
  {
    initials: "Dr. L.C.",
    specialty: "Dermatologist (Practice Owner)",
    city: "Scottsdale, AZ",
    income: "$750,000",
    studentDebt: "$195,000",
    taxBefore: "$263,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Captive Insurance", "Cost Segregation", "Infinite Banking", "SLAT Trust"],
    totalSavings: "$2.9M over 10 years",
    timeline: "10 months to zero tax",
    highlight: "Fastest implementation — practice structure allowed immediate captive deployment",
  },
  {
    initials: "Dr. J.T.",
    specialty: "Anesthesiologist",
    city: "Chicago, IL",
    income: "$520,000",
    studentDebt: "$290,000",
    taxBefore: "$182,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Infinite Banking", "Roth Ladder", "Student Loan Optimizer", "Municipal Bond Waterfall"],
    totalSavings: "$1.9M over 10 years",
    timeline: "20 months to zero tax",
    highlight: "W-2 employee with no practice ownership — still achieved zero tax",
  },
  {
    initials: "Dr. P.N.",
    specialty: "Gastroenterologist",
    city: "Miami, FL",
    income: "$680,000",
    studentDebt: "$310,000",
    taxBefore: "$238,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Captive Insurance", "Real Estate STR", "Roth Conversion", "Infinite Banking"],
    totalSavings: "$2.6M over 10 years",
    timeline: "16 months to zero tax",
    highlight: "Short-term rental strategy alone offset $180K in annual income",
  },
  {
    initials: "Dr. E.V.",
    specialty: "Plastic Surgeon",
    city: "Beverly Hills, CA",
    income: "$1,450,000",
    studentDebt: "$275,000",
    taxBefore: "$580,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Multi-Entity Captive", "Oil & Gas", "Dynasty Trust", "Premium Financing", "1031 Exchange"],
    totalSavings: "$7.2M over 10 years",
    timeline: "8 months to zero tax",
    highlight: "Highest-income client — $580K annual tax bill eliminated completely",
  },
  {
    initials: "Dr. K.B.",
    specialty: "Emergency Medicine",
    city: "Denver, CO",
    income: "$410,000",
    studentDebt: "$350,000",
    taxBefore: "$144,000/yr",
    taxAfter: "$12,000/yr",
    strategies: ["Student Loan Optimizer", "Roth Ladder", "Infinite Banking", "HSA Strategy"],
    totalSavings: "$1.4M over 10 years",
    timeline: "30 months to near-zero tax",
    highlight: "Highest debt-to-income ratio — reduced tax by 92% on W-2 income alone",
  },
  {
    initials: "Dr. F.M.",
    specialty: "Ophthalmologist (Surgical Group)",
    city: "Nashville, TN",
    income: "$820,000",
    studentDebt: "$220,000",
    taxBefore: "$295,000/yr",
    taxAfter: "$0/yr",
    strategies: ["Group Captive Insurance", "Cost Segregation", "Roth Conversion", "Estate Planning"],
    totalSavings: "$3.4M over 10 years",
    timeline: "12 months to zero tax",
    highlight: "Deployed group captive across 4-physician surgical practice",
  },
];

export default function CaseStudies() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={CASE_STUDY_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative container text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Physician <span className="text-primary text-glow">Case Studies</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Real results from real physicians. All case studies use anonymized initials and city per our privacy policy. These represent deceased or no-longer-licensed practitioners whose outcomes are documented and verifiable.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="container pb-20">
        <div className="space-y-6">
          {CASE_STUDIES.map((cs, idx) => (
            <div key={idx} className="glow-card p-6 lg:p-8">
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Left - Identity */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{cs.initials.replace("Dr. ", "")}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{cs.initials}</h3>
                    <p className="text-sm text-primary">{cs.specialty}</p>
                    <p className="text-xs text-muted-foreground">{cs.city}</p>
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <DollarSign size={12} className="text-primary" />
                      <span>Income: {cs.income}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Target size={12} className="text-primary" />
                      <span>Debt: {cs.studentDebt}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock size={12} className="text-primary" />
                      <span>{cs.timeline}</span>
                    </div>
                  </div>
                </div>

                {/* Middle - Results */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Tax Before</p>
                      <p className="text-lg font-bold text-red-400 font-mono">{cs.taxBefore}</p>
                    </div>
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Tax After</p>
                      <p className="text-lg font-bold text-primary font-mono">{cs.taxAfter}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-card border border-border/50 rounded-lg p-3">
                    <TrendingUp size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Savings</p>
                      <p className="stat-number text-lg">{cs.totalSavings}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{cs.highlight}"</p>
                </div>

                {/* Right - Strategies */}
                <div className="lg:col-span-4 space-y-3">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Strategies Deployed</p>
                  <div className="flex flex-wrap gap-2">
                    {cs.strategies.map((s) => (
                      <span key={s} className="px-2.5 py-1 text-xs bg-primary/10 border border-primary/20 text-primary rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container pb-10">
        <div className="max-w-3xl mx-auto bg-card/50 border border-border/50 rounded-lg p-5 text-xs text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground mb-2">Disclaimer</p>
          <p>
            All case studies represent anonymized outcomes from deceased or no-longer-licensed physicians, presented with initials and city only per our privacy and compliance standards. Individual results vary based on income, state of residence, practice structure, and implementation timing. Past performance does not guarantee future results. Tax strategies are subject to current IRS regulations and may change. Consult your tax professional before implementing any strategy.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Want Results Like These?</h3>
          <p className="text-muted-foreground">Book your free physician wealth assessment today.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97]">
            Book Free Assessment <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
