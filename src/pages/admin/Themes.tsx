import { useTheme, themes, themeLabels, type ThemeName } from "@/lib/theme";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminThemes() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Theme Management</h1>
        <p className="text-sm text-muted-foreground">Choose a visual theme for your salon platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(themes) as ThemeName[]).map((key) => {
          const t = themes[key];
          const active = theme === key;
          return (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={cn(
                "relative rounded-lg border-2 overflow-hidden transition-all text-left",
                active ? "border-primary shadow-lg" : "border-border hover:border-primary/30"
              )}
            >
              {active && (
                <div className="absolute top-2 right-2 bg-primary rounded-full p-1 z-10">
                  <Check className="h-3 w-3" style={{ color: t.background }} />
                </div>
              )}
              {/* Preview */}
              <div className="p-4" style={{ background: t.background }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full" style={{ background: t.primary }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: t.text }}>{themeLabels[key]}</div>
                    <div className="text-xs" style={{ color: t.muted }}>{key}</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {Object.entries(t).map(([colorKey, val]) => (
                    <div key={colorKey} className="flex-1 h-6 rounded" style={{ background: val }} title={colorKey} />
                  ))}
                </div>
                {/* Mini mockup */}
                <div className="mt-3 rounded" style={{ background: t.card, border: `1px solid ${t.border}` }}>
                  <div className="p-2">
                    <div className="h-2 w-16 rounded" style={{ background: t.primary }} />
                    <div className="h-1.5 w-24 rounded mt-1.5" style={{ background: t.muted, opacity: 0.5 }} />
                    <div className="h-6 w-full rounded mt-2 flex items-center justify-center text-[10px] font-medium" style={{ background: t.primary, color: t.background }}>
                      Book Now
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
