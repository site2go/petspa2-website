"use client";

import { useState, useEffect } from "react";

// PetSPA2 color palettes from brand.json
const palettes = {
  "fresh-clean": {
    name: "Fresh & Clean",
    colors: {
      "--primary": "178 87% 37%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "145 63% 49%",
      "--secondary-foreground": "0 0% 100%",
      "--accent": "204 70% 53%",
      "--accent-foreground": "0 0% 100%",
      "--background": "0 0% 100%",
      "--foreground": "0 0% 7%",
      "--muted": "170 47% 96%",
      "--muted-foreground": "218 14% 35%",
      "--card": "0 0% 100%",
      "--card-foreground": "0 0% 7%",
      "--border": "170 30% 90%",
      "--input": "170 30% 90%",
      "--ring": "178 87% 37%",
    },
  },
  "warm-friendly": {
    name: "Warm & Friendly",
    colors: {
      "--primary": "37 90% 63%",
      "--primary-foreground": "20 30% 18%",
      "--secondary": "30 45% 48%",
      "--secondary-foreground": "0 0% 100%",
      "--accent": "27 95% 57%",
      "--accent-foreground": "20 30% 18%",
      "--background": "40 100% 98%",
      "--foreground": "20 30% 18%",
      "--muted": "35 70% 94%",
      "--muted-foreground": "20 15% 42%",
      "--card": "0 0% 100%",
      "--card-foreground": "20 30% 18%",
      "--border": "35 40% 88%",
      "--input": "35 40% 88%",
      "--ring": "37 90% 63%",
    },
  },
  "premium-spa": {
    name: "Premium Pet Spa",
    colors: {
      "--primary": "290 40% 18%",
      "--primary-foreground": "0 0% 100%",
      "--secondary": "324 80% 72%",
      "--secondary-foreground": "0 0% 7%",
      "--accent": "271 50% 54%",
      "--accent-foreground": "0 0% 100%",
      "--background": "0 0% 100%",
      "--foreground": "0 0% 7%",
      "--muted": "290 30% 96%",
      "--muted-foreground": "290 10% 40%",
      "--card": "0 0% 100%",
      "--card-foreground": "0 0% 7%",
      "--border": "290 20% 90%",
      "--input": "290 20% 90%",
      "--ring": "290 40% 18%",
    },
  },
};

export default function ThemeSwitcher() {
  const [currentPalette, setCurrentPalette] = useState<string>(Object.keys(palettes)[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load saved palette from localStorage
    const saved = localStorage.getItem("theme-palette");
    if (saved && palettes[saved as keyof typeof palettes]) {
      setCurrentPalette(saved);
      applyPalette(saved);
    }
  }, []);

  const applyPalette = (paletteKey: string) => {
    const palette = palettes[paletteKey as keyof typeof palettes];
    if (!palette) return;

    const root = document.documentElement;
    Object.entries(palette.colors).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    localStorage.setItem("theme-palette", paletteKey);
  };

  const handleSwitch = (paletteKey: string) => {
    setCurrentPalette(paletteKey);
    applyPalette(paletteKey);
    setIsOpen(false);
  };

  // Don't render if only one palette
  if (Object.keys(palettes).length <= 1) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-card shadow-lg border border-border flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Schimba tema culorilor"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" />
        </svg>
      </button>

      {/* Palette Selector */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-card rounded-lg shadow-xl border border-border p-3 min-w-[200px]">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Tema Culorilor</p>
          <div className="space-y-2">
            {Object.entries(palettes).map(([key, palette]) => (
              <button
                key={key}
                onClick={() => handleSwitch(key)}
                className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${
                  currentPalette === key
                    ? "bg-primary/10 border border-primary"
                    : "hover:bg-muted border border-transparent"
                }`}
              >
                {/* Color Preview */}
                <div className="flex -space-x-1">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: `hsl(${palette.colors["--primary"]})` }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: `hsl(${palette.colors["--secondary"]})` }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: `hsl(${palette.colors["--accent"]})` }}
                  />
                </div>
                <span className="text-sm font-medium">{palette.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
