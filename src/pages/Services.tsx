import { useState } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/sample-data";
import { ScreenText } from "@/lib/constants";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

export default function Services() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{ScreenText.services.title}</h1>
          <p className="text-muted-foreground mt-2">{ScreenText.services.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border",
                active === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
