import { Link } from "react-router-dom";
import { Scissors, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-foreground">LUXE SALON</span>
            </div>
            <p className="text-sm text-muted-foreground">Premium beauty services crafted for the modern individual.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="space-y-2">
              {["Services", "Gallery", "About", "Contact"].map((l) => (
                <Link key={l} to={`/${l.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />123 Beauty Ave, New York, NY</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />(555) 123-4567</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />hello@luxesalon.com</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Hours</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Mon–Fri: 9AM – 8PM</p>
              <p>Saturday: 9AM – 6PM</p>
              <p>Sunday: 10AM – 5PM</p>
            </div>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Luxe Salon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
