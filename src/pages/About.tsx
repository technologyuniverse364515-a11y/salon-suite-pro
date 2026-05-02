import { ScreenText } from "@/lib/constants";
import { Award, Heart, Users, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div>
      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
          alt="Luxe Salon Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white">{ScreenText.about.title}</h1>
            <p className="text-white/80 mt-2 max-w-xl mx-auto">{ScreenText.about.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto mb-20">
            <div>
              <img
                src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800"
                alt="Salon interior"
                className="rounded-lg w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2014, Luxe Salon was born from a passion for transforming not just appearances, but confidence. Our team of internationally trained stylists brings together the best techniques from around the world.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe beauty is personal. Every service is tailored to your unique features, lifestyle, and preferences. From precision cuts to artistic color, we craft looks that make you feel extraordinary.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Award, label: "Award Winning", desc: "Industry recognized" },
              { icon: Heart, label: "Client First", desc: "5,000+ happy clients" },
              { icon: Users, label: "Expert Team", desc: "12+ specialists" },
              { icon: Sparkles, label: "Premium Products", desc: "Organic & cruelty-free" },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 rounded-lg bg-card border border-border">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="font-semibold text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
