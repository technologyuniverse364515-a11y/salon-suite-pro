import { Link } from "react-router-dom";
import { Clock, DollarSign, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/sample-data";
import { ButtonLabels } from "@/lib/constants";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link to={`/services/${service.id}`} className="group block">
      <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-primary">{service.category}</span>
          <h3 className="text-lg font-semibold text-foreground mt-1">{service.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{service.price}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{service.duration} min</span>
            </div>
            <span className="text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {ButtonLabels.learnMore} <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
