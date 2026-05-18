import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SPECIALTIES = [
  "Orthopedic Surgery",
  "Cardiology / Cardiothoracic",
  "Neurosurgery",
  "Anesthesiology",
  "Dermatology",
  "Plastic Surgery",
  "Gastroenterology",
  "Ophthalmology",
  "Radiology",
  "Emergency Medicine",
  "Urology",
  "OB/GYN",
  "Oncology",
  "Pulmonology",
  "Other Specialty",
];

const INCOME_RANGES = [
  "$200K - $350K",
  "$350K - $500K",
  "$500K - $750K",
  "$750K - $1M",
  "$1M - $1.5M",
  "$1.5M+",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    income: "",
    studentDebt: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track conversion event
    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami.track("assessment_booking", {
        specialty: formData.specialty,
        income: formData.income,
      });
    }
    
    setSubmitted(true);
    toast.success("Assessment request submitted! We'll contact you within 24 hours.");
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-28 pb-20 container">
          <div className="max-w-lg mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto">
              <CheckCircle size={28} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Assessment Requested</h1>
            <p className="text-muted-foreground">
              Thank you, Dr. {formData.name.split(" ")[1] || formData.name}. A senior physician wealth advisor will contact you within 24 hours to schedule your complimentary 30-minute assessment.
            </p>
            <div className="glow-card p-5 text-left space-y-3">
              <p className="text-sm font-medium text-foreground">What to Expect:</p>
              <div className="space-y-2">
                {[
                  "30-minute video or phone call at your convenience",
                  "Preliminary tax savings estimate based on your situation",
                  "Overview of which patent engines apply to you",
                  "No obligation — just information and strategy",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="pt-28 pb-12 container">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Book Your Free <span className="text-primary text-glow">Assessment</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            30 minutes. No obligation. We'll show you exactly how much you can save.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="container pb-20">
        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glow-card p-6 lg:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Dr. Jane Smith"
                    className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="jane@hospital.org"
                    className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Specialty *</label>
                  <select
                    required
                    value={formData.specialty}
                    onChange={(e) => updateField("specialty", e.target.value)}
                    className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select specialty</option>
                    {SPECIALTIES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Annual Income *</label>
                  <select
                    required
                    value={formData.income}
                    onChange={(e) => updateField("income", e.target.value)}
                    className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select range</option>
                    {INCOME_RANGES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Student Loan Balance</label>
                  <input
                    type="text"
                    value={formData.studentDebt}
                    onChange={(e) => updateField("studentDebt", e.target.value)}
                    placeholder="$350,000"
                    className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Anything else we should know?</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  rows={3}
                  placeholder="Current tax situation, goals, timeline..."
                  className="w-full px-3 py-2.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all active:scale-[0.97] text-sm"
              >
                Request Free Assessment
              </button>
              <p className="text-xs text-muted-foreground text-center">
                No credit card required. 100% confidential. HIPAA compliant.
              </p>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glow-card p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">What You'll Get</h3>
              <div className="space-y-3">
                {[
                  { icon: Calendar, text: "30-min strategy call with a senior advisor" },
                  { icon: Clock, text: "Preliminary tax savings estimate" },
                  { icon: CheckCircle, text: "Custom strategy recommendation" },
                  { icon: Mail, text: "Written summary within 48 hours" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon size={14} className="text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glow-card p-5 space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Direct Contact</h3>
              <div className="space-y-3">
                <a href="mailto:sam@russellcapitalsolutions.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={14} className="text-primary" /> sam@russellcapitalsolutions.com
                </a>
                <a href="tel:+15550199000" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={14} className="text-primary" /> (555) 019-9000
                </a>
                <p className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin size={14} className="text-primary" /> Nationwide — Virtual & In-Person
                </p>
              </div>
            </div>

            <div className="glow-card p-5 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Calendly Direct</h3>
              <p className="text-xs text-muted-foreground">Prefer to book directly?</p>
              <a
                href="https://calendly.com/samtheinsuranceman-1/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/10 transition-all"
              >
                Open Calendly
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
