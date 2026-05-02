import { services, staff } from "@/lib/sample-data";
import { useAppSelector } from "@/store/hooks";

export default function AdminBookings() {
  const bookings = useAppSelector((state) => state.booking.bookings);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
        <p className="text-sm text-muted-foreground">Manage all salon appointments</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Customer</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Service</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Stylist</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Date</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Time</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Status</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const svc = services.find(s => s.id === b.serviceId);
                const stf = staff.find(s => s.id === b.staffId);
                return (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                    <td className="px-5 py-3">
                      <div className="text-foreground font-medium">{b.customerName}</div>
                      <div className="text-xs text-muted-foreground">{b.customerEmail}</div>
                    </td>
                    <td className="px-5 py-3 text-foreground">{svc?.name}</td>
                    <td className="px-5 py-3 text-foreground">{stf?.name}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.date}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.time}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        b.status === "confirmed" ? "bg-green-500/10 text-green-500" :
                        b.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                        b.status === "completed" ? "bg-blue-500/10 text-blue-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-foreground font-medium">${svc?.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
