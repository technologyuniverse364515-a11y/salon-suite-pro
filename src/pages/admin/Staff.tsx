import { staff } from "@/lib/sample-data";
import { Star } from "lucide-react";

export default function AdminStaff() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Staff</h1>
        <p className="text-sm text-muted-foreground">Manage your team</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {staff.map((s) => (
          <div key={s.id} className="bg-card border border-border rounded-lg p-5 text-center">
            <img src={s.avatar} alt={s.name} className="w-20 h-20 rounded-full mx-auto object-cover" />
            <h3 className="font-semibold text-foreground mt-3">{s.name}</h3>
            <p className="text-sm text-primary">{s.role}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Star className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="text-sm text-muted-foreground">{s.rating}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1 mt-3">
              {s.specialties.map((sp) => (
                <span key={sp} className="px-2 py-0.5 text-xs rounded-full border border-border text-muted-foreground">{sp}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
