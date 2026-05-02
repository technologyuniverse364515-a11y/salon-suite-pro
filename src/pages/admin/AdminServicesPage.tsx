import { services } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import { ButtonLabels } from "@/lib/constants";
import { Plus } from "lucide-react";

export default function AdminServices() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Services</h1>
          <p className="text-sm text-muted-foreground">Manage your salon services</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />{ButtonLabels.addService}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <img src={s.image} alt={s.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <span className="text-xs font-medium uppercase tracking-wider text-primary">{s.category}</span>
              <h3 className="font-semibold text-foreground mt-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-foreground font-semibold">${s.price}</span>
                <span className="text-xs text-muted-foreground">{s.duration} min</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1">{ButtonLabels.editService}</Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">{ButtonLabels.deleteService}</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
