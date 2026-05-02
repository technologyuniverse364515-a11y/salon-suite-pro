import { CalendarDays, DollarSign, Users, TrendingUp, Clock, Star } from "lucide-react";
import { sampleCustomers, services } from "@/lib/sample-data";
import { useAppSelector } from "@/store/hooks";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function buildStats(bookings: { serviceId: string }[]) {
  return [
    { label: "Total Bookings", value: bookings.length.toString(), icon: CalendarDays, change: "+12%" },
    { label: "Revenue", value: `$${bookings.reduce((a, b) => a + (services.find(s => s.id === b.serviceId)?.price || 0), 0).toLocaleString()}`, icon: DollarSign, change: "+8%" },
    { label: "Customers", value: sampleCustomers.length.toString(), icon: Users, change: "+5%" },
    { label: "Avg. Rating", value: "4.9", icon: Star, change: "+0.1" },
  ];
}

const weeklyData = [
  { day: "Mon", bookings: 8 }, { day: "Tue", bookings: 12 }, { day: "Wed", bookings: 10 },
  { day: "Thu", bookings: 15 }, { day: "Fri", bookings: 18 }, { day: "Sat", bookings: 22 }, { day: "Sun", bookings: 6 },
];

const serviceData = services.slice(0, 5).map((s, i) => ({
  name: s.name,
  value: [35, 25, 18, 12, 10][i],
}));

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--muted-foreground))", "hsl(var(--border))", "hsl(var(--secondary))"];

export default function AdminDashboard() {
  const bookings = useAppSelector((state) => state.booking.bookings);
  const stats = buildStats(bookings);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's your salon overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mt-1">{s.value}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">{s.change}</span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly bookings chart */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Weekly Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
              <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service distribution */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Popular Services</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={serviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {serviceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, color: "hsl(var(--foreground))" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {serviceData.map((s, i) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-medium text-foreground">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Customer</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Service</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Date</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Time</th>
                <th className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(-5).map((b) => (
                <tr key={b.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-foreground">{b.customerName}</td>
                  <td className="px-5 py-3 text-foreground">{services.find(s => s.id === b.serviceId)?.name}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
