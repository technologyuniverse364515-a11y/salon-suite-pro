import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeName = "luxuryDark" | "modernLight" | "pastelElegance" | "premiumGold" | "freshGreen";

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
  card: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
  luxuryDark: {
    primary: "#D4AF37",
    background: "#0B0B0C",
    text: "#F5F5F5",
    secondary: "#1A1A1D",
    accent: "#C9A14A",
    muted: "#A1A1AA",
    border: "#2A2A2E",
    card: "#141416",
  },
  modernLight: {
    primary: "#1A1A1A",
    background: "#FFFFFF",
    text: "#2B2B2B",
    secondary: "#F7F7F8",
    accent: "#6B7280",
    muted: "#9CA3AF",
    border: "#E5E7EB",
    card: "#FAFAFA",
  },
  pastelElegance: {
    primary: "#E8AEB7",
    background: "#FFF7F9",
    text: "#4B3F44",
    secondary: "#FDECEF",
    accent: "#D48C9A",
    muted: "#BFA3AA",
    border: "#F3D6DC",
    card: "#FFFFFF",
  },
  premiumGold: {
    primary: "#C6A75E",
    background: "#050505",
    text: "#FAFAFA",
    secondary: "#121212",
    accent: "#E5C97B",
    muted: "#A3A3A3",
    border: "#262626",
    card: "#0E0E0E",
  },
  freshGreen: {
    primary: "#2F855A",
    background: "#F4FBF7",
    text: "#1F3D2B",
    secondary: "#E6F4EA",
    accent: "#68D391",
    muted: "#7C9A87",
    border: "#C6E6D4",
    card: "#FFFFFF",
  },
};

export const themeLabels: Record<ThemeName, string> = {
  luxuryDark: "Luxury Dark",
  modernLight: "Modern Light",
  pastelElegance: "Pastel Elegance",
  premiumGold: "Premium Gold",
  freshGreen: "Fresh Green",
};

function hexToHSL(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function getContrastForeground(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "0 0% 5%" : "0 0% 98%";
}

function applyTheme(name: ThemeName) {
  const t = themes[name];
  const root = document.documentElement;
  root.style.setProperty("--background", hexToHSL(t.background));
  root.style.setProperty("--foreground", hexToHSL(t.text));
  root.style.setProperty("--primary", hexToHSL(t.primary));
  root.style.setProperty("--primary-foreground", getContrastForeground(t.primary));
  root.style.setProperty("--secondary", hexToHSL(t.secondary));
  root.style.setProperty("--secondary-foreground", hexToHSL(t.text));
  root.style.setProperty("--muted", hexToHSL(t.secondary));
  root.style.setProperty("--muted-foreground", hexToHSL(t.muted));
  root.style.setProperty("--accent", hexToHSL(t.accent));
  root.style.setProperty("--accent-foreground", getContrastForeground(t.accent));
  root.style.setProperty("--card", hexToHSL(t.card));
  root.style.setProperty("--card-foreground", hexToHSL(t.text));
  root.style.setProperty("--popover", hexToHSL(t.card));
  root.style.setProperty("--popover-foreground", hexToHSL(t.text));
  root.style.setProperty("--border", hexToHSL(t.border));
  root.style.setProperty("--input", hexToHSL(t.border));
  root.style.setProperty("--ring", hexToHSL(t.primary));
  root.style.setProperty("--destructive", "0 84% 60%");
  root.style.setProperty("--destructive-foreground", "0 0% 98%");
}

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "luxuryDark",
  setTheme: () => {},
  colors: themes.luxuryDark,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    const saved = localStorage.getItem("salon-theme") as ThemeName | null;
    return saved && themes[saved] ? saved : "luxuryDark";
  });

  const setTheme = (name: ThemeName) => {
    setThemeState(name);
    localStorage.setItem("salon-theme", name);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}
