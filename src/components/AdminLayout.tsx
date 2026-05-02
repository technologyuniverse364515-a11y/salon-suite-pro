import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users, Scissors, UserCog, Palette, Settings, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScreenText } from "@/lib/constants";

const adminLinks = [
  { label: ScreenText.admin.dashboard, path: "/admin", icon: LayoutDashboard },
  { label: ScreenText.admin.bookings, path: "/admin/bookings", icon: CalendarDays },
  { label: ScreenText.admin.customers, path: "/admin/customers", icon: Users },
  { label: ScreenText.admin.services, path: "/admin/services", icon: Scissors },
  { label: ScreenText.admin.staff, path: "/admin/staff", icon: UserCog },
  { label: ScreenText.admin.themes, path: "/admin/themes", icon: Palette },
  { label: ScreenText.admin.settings, path: "/admin/settings", icon: Settings },
];

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && <span className="font-bold text-foreground">Admin Panel</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {adminLinks.map((l) => {
            const active = location.pathname === l.path || (l.path !== "/admin" && location.pathname.startsWith(l.path));
            return (
              <Link
                key={l.path}
                to={l.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
                title={collapsed ? l.label : undefined}
              >
                <l.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{l.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
