import { sampleCustomers } from "@/lib/sample-data";

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground">Customer relationship management</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Name</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Email</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Phone</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Visits</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Total Spent</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {sampleCustomers.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-5 py-3 text-foreground font-medium">{c.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.phone}</td>
                  <td className="px-5 py-3 text-foreground">{c.totalVisits}</td>
                  <td className="px-5 py-3 text-foreground font-medium">${c.totalSpent.toLocaleString()}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
