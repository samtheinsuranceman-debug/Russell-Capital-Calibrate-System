import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import { ArrowRight, Star, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  specialty: string;
  city: string;
  savings: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "I was paying $312,000 a year in taxes as an orthopedic surgeon. Within 18 months of working with Russell Capital, my tax liability dropped to zero. Not reduced — eliminated. The captive insurance + Roth ladder combination is genius.",
    name: "Dr. R.H.",
    specialty: "Orthopedic Surgeon",
    city: "Houston, TX",
    savings: "$3.1M saved",
    rating: 5,
  },
  {
    quote: "The student loan optimizer alone was worth 10x the fee. I had $420K in debt and was on track for PSLF. They showed me how to eliminate it in 3 years while building $1.2M in tax-free assets. The math was undeniable.",
    name: "Dr. M.K.",
    specialty: "Cardiothoracic Surgeon",
    city: "Dallas, TX",
    savings: "$5.8M saved",
    rating: 5,
  },
  {
    quote: "As a W-2 anesthesiologist, I thought tax-free wealth was only for practice owners. Wrong. The infinite banking + Roth conversion strategy works beautifully for employed physicians. I now have $84K/year in tax-free income.",
    name: "Dr. J.T.",
    specialty: "Anesthesiologist",
    city: "Chicago, IL",
    savings: "$1.9M saved",
    rating: 5,
  },
  {
    quote: "My accountant told me there was nothing more I could do. Russell Capital found $228K in annual savings my CPA missed. The patent-pending waterfall engine sequences withdrawals in ways I've never seen anywhere else.",
    name: "Dr. A.P.",
    specialty: "Interventional Cardiologist",
    city: "Atlanta, GA",
    savings: "$2.4M saved",
    rating: 5,
  },
  {
    quote: "The 90-day guarantee made it a no-brainer. Within 60 days they identified $367K in annual tax savings. The captive insurance structure alone saves me $180K/year. I only wish I'd found them sooner.",
    name: "Dr. S.W.",
    specialty: "Neurosurgeon",
    city: "Phoenix, AZ",
    savings: "$4.2M saved",
    rating: 5,
  },
  {
    quote: "I run a 4-physician surgical group. Russell Capital set up a group captive that saves our practice $720K annually. Each partner's individual tax liability is now zero. The implementation was seamless.",
    name: "Dr. F.M.",
    specialty: "Ophthalmologist",
    city: "Nashville, TN",
    savings: "$3.4M saved",
    rating: 5,
  },
  {
    quote: "The short-term rental strategy offset $180K of my income in year one. Combined with infinite banking and the Roth ladder, I'm building wealth faster than I ever thought possible — all tax-free.",
    name: "Dr. P.N.",
    specialty: "Gastroenterologist",
    city: "Miami, FL",
    savings: "$2.6M saved",
    rating: 5,
  },
  {
    quote: "At $1.45M income, I was paying $580K in taxes. That's more than most people earn. Russell Capital eliminated it completely in 8 months using a multi-entity captive + oil & gas + dynasty trust combination.",
    name: "Dr. E.V.",
    specialty: "Plastic Surgeon",
    city: "Beverly Hills, CA",
    savings: "$7.2M saved",
    rating: 5,
  },
  {
    quote: "The Wealth Genome scoring system identified strategies I didn't even know existed. It's like having a financial GPS that shows you exactly which path to take based on your specific situation.",
    name: "Dr. L.C.",
    specialty: "Dermatologist",
    city: "Scottsdale, AZ",
    savings: "$2.9M saved",
    rating: 5,
  },
  {
    quote: "I had the highest debt-to-income ratio they'd ever seen — $350K debt on $410K income. They still got my tax bill down 92%. The student loan optimizer + HSA strategy is remarkable.",
    name: "Dr. K.B.",
    specialty: "Emergency Medicine",
    city: "Denver, CO",
    savings: "$1.4M saved",
    rating: 5,
  },
  {
    quote: "What impressed me most is the integration. Each strategy amplifies the others. The infinite banking feeds the real estate, which feeds the Roth conversion, which feeds the retirement waterfall. It's a machine.",
    name: "Dr. T.R.",
    specialty: "Urologist",
    city: "San Diego, CA",
    savings: "$2.2M saved",
    rating: 5,
  },
  {
    quote: "Sam Russell personally walked me through every step. This isn't a cookie-cutter operation. They built a custom 8-strategy combination specifically for my practice structure and income pattern.",
    name: "Dr. N.G.",
    specialty: "Radiologist",
    city: "Seattle, WA",
    savings: "$1.8M saved",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-16 container">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Physician <span className="text-primary text-glow">Testimonials</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Hear directly from physicians who have transformed their financial futures with our patent-pending tax elimination engines.
          </p>
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="text-center">
              <p className="stat-number text-2xl">4.97/5</p>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="stat-number text-2xl">2,400+</p>
              <p className="text-xs text-muted-foreground">Physicians Served</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="stat-number text-2xl">97%</p>
              <p className="text-xs text-muted-foreground">Retention Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="glow-card p-6 space-y-4 flex flex-col">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <Quote size={20} className="text-primary/30" />
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.quote}</p>
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.specialty} — {t.city}</p>
                  </div>
                  <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {t.savings}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-card/30">
        <div className="container py-16 text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Join 2,400+ Physicians</h3>
          <p className="text-muted-foreground">Start your tax-free wealth journey today.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97]">
            Book Free Assessment <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
