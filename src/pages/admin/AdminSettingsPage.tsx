import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ButtonLabels } from "@/lib/constants";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Salon configuration</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 max-w-xl space-y-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2"><Settings className="h-4 w-4" /> General</h3>
        <div>
          <Label className="text-foreground">Salon Name</Label>
          <Input defaultValue="Luxe Salon" className="mt-1" />
        </div>
        <div>
          <Label className="text-foreground">Phone</Label>
          <Input defaultValue="(555) 123-4567" className="mt-1" />
        </div>
        <div>
          <Label className="text-foreground">Email</Label>
          <Input defaultValue="hello@luxesalon.com" className="mt-1" />
        </div>
        <div>
          <Label className="text-foreground">Address</Label>
          <Input defaultValue="123 Beauty Ave, New York, NY 10001" className="mt-1" />
        </div>
        <Button>{ButtonLabels.save}</Button>
      </div>
    </div>
  );
}
