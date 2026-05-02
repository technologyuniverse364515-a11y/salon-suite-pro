import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScreenText, ButtonLabels } from "@/lib/constants";
import { toast } from "sonner";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{ScreenText.contact.title}</h1>
          <p className="text-muted-foreground mt-2">{ScreenText.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Address", value: "123 Beauty Ave, New York, NY 10001" },
              { icon: Phone, label: "Phone", value: "(555) 123-4567" },
              { icon: Mail, label: "Email", value: "hello@luxesalon.com" },
              { icon: Clock, label: "Hours", value: "Mon–Fri 9AM–8PM, Sat 9AM–6PM, Sun 10AM–5PM" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <item.icon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="contact-name" className="text-foreground">Name</Label>
              <Input id="contact-name" placeholder="Your name" className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="contact-email" className="text-foreground">Email</Label>
              <Input id="contact-email" type="email" placeholder="your@email.com" className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="contact-message" className="text-foreground">Message</Label>
              <Textarea id="contact-message" placeholder="How can we help?" className="mt-1 min-h-[120px]" required />
            </div>
            <Button type="submit" className="w-full">{ButtonLabels.submit}</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
