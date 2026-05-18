import { Link } from "wouter";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Shield size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Russell Capital Solutions</p>
                <p className="text-[10px] text-muted-foreground">Physician Tax-Free Wealth</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Patent-pending financial engines built exclusively for physicians seeking tax-free wealth accumulation.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Services</h4>
            <div className="space-y-2">
              {["Infinite Banking", "Roth Conversion Ladders", "Captive Insurance", "Student Loan Optimizer", "Estate Planning", "Tax-Free Retirement"].map((s) => (
                <Link key={s} href="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <div className="space-y-2">
              {[
                { label: "Pricing", href: "/pricing" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Our Advisors", href: "/advisors" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:sam@russellcapitalsolutions.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={14} /> sam@russellcapitalsolutions.com
              </a>
              <a href="tel:+1-555-0199" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} /> (555) 019-9000
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} /> Nationwide — Virtual & In-Person
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Russell Capital Solutions. All rights reserved. Patent pending.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>SEC Registered Investment Advisor</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>Fiduciary Standard</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
