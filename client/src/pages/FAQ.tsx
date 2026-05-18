import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "General",
    question: "How can physicians legally pay zero in taxes?",
    answer: "Through a combination of IRS-approved strategies including captive insurance (IRC 831(b)), Roth conversions (IRC 408A), infinite banking (IRC 7702), cost segregation (IRC 168), and oil & gas deductions (IRC 263). Each strategy is individually well-established — our innovation is the patent-pending integration engine that optimizes them together for maximum effect.",
  },
  {
    category: "General",
    question: "Is this legal? It sounds too good to be true.",
    answer: "Every strategy we deploy is fully compliant with current IRS regulations. We work with tax attorneys and CPAs to ensure every implementation passes muster. Our captive insurance structures are reviewed by independent actuaries. Our Roth conversions follow established IRS guidelines. We have zero audit failures across 2,400+ clients.",
  },
  {
    category: "General",
    question: "Why is this built specifically for physicians?",
    answer: "Physicians have unique financial characteristics: high W-2 income, massive student debt, delayed earning years, practice ownership opportunities, and specific malpractice exposure. Our engines are calibrated for these exact parameters. A strategy that works for a tech entrepreneur won't work the same way for a surgeon.",
  },
  {
    category: "Pricing",
    question: "How much does it cost?",
    answer: "Our plans range from $497/month (Physician Starter) to $3,997/month (Physician Enterprise). The typical physician on our Professional plan ($1,497/month) saves $120K-$175K in taxes in year one alone — an 8-12x return on investment. We also offer a 90-day guarantee: if we can't identify at least $50K in savings, you get a full refund.",
  },
  {
    category: "Pricing",
    question: "What's the ROI on your services?",
    answer: "Our average client sees an 8-12x return in year one. A physician earning $500K typically pays $175K in taxes. Our Professional plan costs $14,970/year and typically saves $120K-$175K annually. Over 10 years, the average savings exceeds $2.4M. The math is straightforward.",
  },
  {
    category: "Pricing",
    question: "Is there a money-back guarantee?",
    answer: "Yes. We offer a 90-day tax savings guarantee. If we don't identify at least $50,000 in actionable tax savings within your first 90 days, we'll refund your entire investment. No questions asked. In our history, we've never had to issue this refund.",
  },
  {
    category: "Strategies",
    question: "What is Infinite Banking and how does it work?",
    answer: "Infinite Banking uses dividend-paying whole life insurance as a personal banking system. You overfund a specially-designed policy, then borrow against the cash value tax-free (IRC 7702) to fund investments, pay off debt, or generate income. Your cash value continues growing even while you have loans outstanding — creating uninterrupted compound growth.",
  },
  {
    category: "Strategies",
    question: "How does captive insurance eliminate taxes?",
    answer: "Under IRC 831(b), a captive insurance company with less than $2.65M in annual premiums can elect to be taxed only on investment income. Your practice pays premiums (tax-deductible expense) to your captive (which you own). The captive accumulates these funds tax-advantaged. After the risk period, underwriting profits can be distributed at capital gains rates.",
  },
  {
    category: "Strategies",
    question: "Can W-2 employed physicians benefit, or only practice owners?",
    answer: "Both. While practice owners have access to additional strategies (captive insurance, cost segregation), W-2 physicians can still achieve dramatic tax reduction through infinite banking, Roth conversion ladders, real estate strategies, HSA maximization, and our retirement waterfall engine. Our case study Dr. J.T. achieved zero tax as a W-2 anesthesiologist.",
  },
  {
    category: "Strategies",
    question: "How does the Student Loan Optimizer work?",
    answer: "Our engine analyzes your specific loan terms, income trajectory, and available strategies to find the optimal path. Often this involves refinancing at lower rates while simultaneously deploying the payment differential into tax-advantaged vehicles that grow faster than your loan interest — creating positive arbitrage that accelerates payoff while building wealth.",
  },
  {
    category: "Process",
    question: "How long does it take to see results?",
    answer: "Most physicians see their first tax savings within 60-90 days. Full implementation of a multi-strategy plan typically takes 12-24 months. Our fastest implementation was 8 months to zero tax (Dr. E.V., plastic surgeon). The timeline depends on your income level, practice structure, and which strategies are deployed.",
  },
  {
    category: "Process",
    question: "What does the onboarding process look like?",
    answer: "Step 1: Free 30-minute assessment call. Step 2: Comprehensive financial analysis (income, debt, assets, goals). Step 3: Custom strategy design using our patent engines. Step 4: Implementation roadmap with timeline. Step 5: Ongoing optimization and quarterly reviews. Most clients are fully onboarded within 2-3 weeks.",
  },
  {
    category: "Process",
    question: "Do I need to change my existing CPA or financial advisor?",
    answer: "No. We work alongside your existing team. In fact, we often collaborate with your CPA to ensure seamless implementation. Many CPAs are grateful for the strategies we bring — they simply don't have the specialized knowledge or patent-pending tools to identify these opportunities independently.",
  },
  {
    category: "Technology",
    question: "What are the 'patent-pending engines' you reference?",
    answer: "We've filed 15 patent applications covering proprietary financial optimization algorithms. These include our Tax-Free Retirement Waterfall Engine, Wealth Genome Scoring System, HELOC-to-IUL Arbitrage Engine, and others. They're computational tools that identify optimal strategy combinations based on your specific financial parameters.",
  },
  {
    category: "Technology",
    question: "How is this different from other financial advisors?",
    answer: "Three ways: (1) We're physician-specific — every engine is calibrated for physician income patterns. (2) We have 15 patent-pending algorithms that no other firm possesses. (3) We integrate strategies that most advisors treat as separate silos. The combination effect is where the real power lies.",
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors pr-4">
          {item.question}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const categories = Array.from(new Set(FAQS.map((f) => f.category)));
  const [activeCategory, setActiveCategory] = useState("General");

  const filtered = FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-16 container">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Frequently Asked <span className="text-primary text-glow">Questions</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything physicians ask before starting their tax-free wealth journey.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="container pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="border-t border-border/50">
            {filtered.map((item, idx) => (
              <FAQAccordion key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="container py-16 text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Still Have Questions?</h3>
          <p className="text-muted-foreground">Book a free 30-minute call and we'll answer everything personally.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97]">
            Book Free Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
