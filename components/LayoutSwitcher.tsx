"use client";

import { useState } from "react";
import { useLayout, layoutConfigs, LayoutProfile } from "./LayoutContext";

// Icons for each layout
const layoutIcons: Record<LayoutProfile, JSX.Element> = {
  minimal: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="12" x2="16" y2="12" />
      <line x1="4" y1="16" x2="12" y2="16" />
    </svg>
  ),
  classic: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  split: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="8" height="18" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  bold: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
  glass: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="4" opacity="0.5" />
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  ),
  magazine: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="10" rx="1" />
      <rect x="3" y="15" width="8" height="6" rx="1" />
      <rect x="13" y="15" width="8" height="6" rx="1" />
    </svg>
  ),
  brutalist: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="9" x2="9" y2="21" />
    </svg>
  ),
  sidebar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="6" height="18" rx="1" />
      <rect x="11" y="3" width="10" height="18" rx="1" />
    </svg>
  ),
  fullscreen: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <polyline points="15,3 15,9 21,9" />
      <polyline points="9,21 9,15 3,15" />
    </svg>
  ),
  horizontal: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="6" height="12" rx="1" />
      <rect x="9" y="6" width="6" height="12" rx="1" />
      <rect x="16" y="6" width="6" height="12" rx="1" />
    </svg>
  ),
  bento: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="5" rx="1" />
      <rect x="13" y="10" width="8" height="11" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  storytelling: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="20" cy="6" r="2" />
      <circle cx="20" cy="12" r="2" />
      <circle cx="20" cy="18" r="2" />
      <line x1="4" y1="6" x2="16" y2="6" />
      <line x1="4" y1="12" x2="16" y2="12" />
      <line x1="4" y1="18" x2="16" y2="18" />
    </svg>
  ),
  bottomnav: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <rect x="3" y="19" width="18" height="2" rx="1" />
    </svg>
  ),
  masonry: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="12" y="3" width="9" height="6" rx="1" />
      <rect x="12" y="11" width="9" height="10" rx="1" />
    </svg>
  ),
};

// Visual preview colors for each layout
const layoutPreviewColors: Record<LayoutProfile, { bg: string; accent: string; pattern: string }> = {
  minimal: {
    bg: "bg-white",
    accent: "bg-gray-900",
    pattern: "none"
  },
  classic: {
    bg: "bg-slate-100",
    accent: "bg-slate-600",
    pattern: "none"
  },
  split: {
    bg: "bg-gradient-to-r from-gray-100 to-blue-50",
    accent: "bg-blue-600",
    pattern: "border-r-2 border-blue-200"
  },
  bold: {
    bg: "bg-gradient-to-br from-orange-400 to-pink-500",
    accent: "bg-white",
    pattern: "none"
  },
  glass: {
    bg: "bg-gradient-to-br from-purple-100 to-blue-100",
    accent: "bg-purple-500/50",
    pattern: "backdrop-blur-sm"
  },
  magazine: {
    bg: "bg-gray-900",
    accent: "bg-white",
    pattern: "none"
  },
  brutalist: {
    bg: "bg-yellow-300",
    accent: "bg-black",
    pattern: "border-2 border-black"
  },
  sidebar: {
    bg: "bg-gradient-to-r from-gray-800 to-gray-100",
    accent: "bg-blue-500",
    pattern: "none"
  },
  fullscreen: {
    bg: "bg-gradient-to-br from-indigo-900 to-purple-900",
    accent: "bg-white",
    pattern: "none"
  },
  horizontal: {
    bg: "bg-gradient-to-r from-teal-100 to-cyan-100",
    accent: "bg-teal-600",
    pattern: "none"
  },
  bento: {
    bg: "bg-gradient-to-br from-violet-100 to-pink-100",
    accent: "bg-violet-500",
    pattern: "none"
  },
  storytelling: {
    bg: "bg-amber-50",
    accent: "bg-amber-600",
    pattern: "none"
  },
  bottomnav: {
    bg: "bg-gradient-to-b from-sky-100 to-sky-200",
    accent: "bg-sky-600",
    pattern: "none"
  },
  masonry: {
    bg: "bg-stone-100",
    accent: "bg-stone-600",
    pattern: "none"
  },
};

export default function LayoutSwitcher() {
  const { layout, setLayout } = useLayout();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-card shadow-lg border border-border flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Change layout style"
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
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      </button>

      {/* Layout Selector */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-card rounded-lg shadow-xl border border-border p-3 min-w-[300px] max-h-[80vh] overflow-y-auto">
          <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">
            Layout Style
          </p>
          <div className="space-y-2">
            {(Object.keys(layoutConfigs) as LayoutProfile[]).map((key) => {
              const config = layoutConfigs[key];
              const preview = layoutPreviewColors[key];
              return (
                <button
                  key={key}
                  onClick={() => {
                    setLayout(key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                    layout === key
                      ? "bg-primary/10 border border-primary"
                      : "hover:bg-muted border border-transparent"
                  }`}
                >
                  {/* Layout Preview */}
                  <div className={`w-12 h-12 rounded-lg ${preview.bg} flex items-center justify-center relative overflow-hidden ${preview.pattern}`}>
                    {/* Mini layout visualization */}
                    {key === "minimal" && (
                      <div className="flex flex-col items-center gap-1 w-full px-2">
                        <div className="w-full h-1.5 bg-gray-900 rounded-sm" />
                        <div className="w-3/4 h-0.5 bg-gray-400 rounded-sm" />
                        <div className="w-1/2 h-0.5 bg-gray-300 rounded-sm" />
                      </div>
                    )}
                    {key === "classic" && (
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-1.5 ${preview.accent} rounded-full`} />
                        <div className="w-5 h-0.5 bg-slate-400 rounded-full" />
                        <div className="flex gap-0.5 mt-1">
                          <div className="w-2.5 h-2.5 bg-slate-300 rounded-sm" />
                          <div className="w-2.5 h-2.5 bg-slate-300 rounded-sm" />
                          <div className="w-2.5 h-2.5 bg-slate-300 rounded-sm" />
                        </div>
                      </div>
                    )}
                    {key === "split" && (
                      <div className="flex gap-0.5 w-full h-full p-1">
                        <div className="w-1/2 flex flex-col gap-0.5 justify-center px-1">
                          <div className="h-1.5 bg-blue-600 rounded-sm" />
                          <div className="h-1 bg-blue-300 rounded-sm w-3/4" />
                        </div>
                        <div className="w-1/2 bg-blue-200 rounded-sm" />
                      </div>
                    )}
                    {key === "bold" && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="w-8 h-3 bg-white rounded-md shadow-sm" />
                        <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full" />
                        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/40 rounded-full" />
                      </div>
                    )}
                    {key === "glass" && (
                      <div className="relative w-full h-full p-1.5">
                        <div className="absolute inset-1.5 bg-white/40 backdrop-blur-sm rounded-md border border-white/50" />
                        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-1">
                          <div className="w-5 h-1 bg-purple-500/70 rounded-full" />
                          <div className="w-3 h-0.5 bg-purple-400/50 rounded-full" />
                        </div>
                      </div>
                    )}
                    {key === "magazine" && (
                      <div className="flex flex-col w-full h-full p-1 gap-0.5">
                        <div className="h-2/3 bg-gray-700 rounded-sm relative">
                          <div className="absolute bottom-0.5 left-0.5 w-3 h-1 bg-white rounded-sm" />
                        </div>
                        <div className="flex gap-0.5 h-1/3">
                          <div className="flex-1 bg-gray-700 rounded-sm" />
                          <div className="flex-1 bg-gray-700 rounded-sm" />
                        </div>
                      </div>
                    )}
                    {key === "brutalist" && (
                      <div className="flex w-full h-full">
                        <div className="w-1/4 bg-black" />
                        <div className="flex-1 flex flex-col justify-center px-1">
                          <div className="h-2 bg-black mb-1" />
                          <div className="h-1 bg-black/50 w-3/4" />
                        </div>
                      </div>
                    )}
                    {key === "sidebar" && (
                      <div className="flex w-full h-full p-0.5 gap-0.5">
                        <div className="w-1/4 bg-gray-800 rounded-sm flex flex-col items-center pt-1 gap-0.5">
                          <div className="w-2 h-0.5 bg-blue-400" />
                          <div className="w-2 h-0.5 bg-gray-600" />
                          <div className="w-2 h-0.5 bg-gray-600" />
                        </div>
                        <div className="flex-1 bg-white rounded-sm" />
                      </div>
                    )}
                    {key === "fullscreen" && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="w-6 h-2 bg-white/90 rounded-sm" />
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60" />
                      </div>
                    )}
                    {key === "horizontal" && (
                      <div className="flex w-full h-full p-1 gap-1">
                        <div className="w-1/3 bg-teal-500 rounded-sm" />
                        <div className="w-1/3 bg-teal-400 rounded-sm" />
                        <div className="w-1/3 bg-teal-300 rounded-sm" />
                      </div>
                    )}
                    {key === "bento" && (
                      <div className="grid grid-cols-2 w-full h-full p-1 gap-0.5">
                        <div className="bg-violet-400 rounded-sm" />
                        <div className="bg-violet-300 rounded-sm row-span-2" />
                        <div className="bg-violet-500 rounded-sm" />
                      </div>
                    )}
                    {key === "storytelling" && (
                      <div className="flex w-full h-full p-1">
                        <div className="flex-1 flex flex-col justify-center gap-1">
                          <div className="h-1.5 bg-amber-600 rounded-sm w-3/4" />
                          <div className="h-1 bg-amber-400 rounded-sm w-1/2" />
                        </div>
                        <div className="flex flex-col justify-center gap-1 pr-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                        </div>
                      </div>
                    )}
                    {key === "bottomnav" && (
                      <div className="flex flex-col w-full h-full p-1">
                        <div className="flex-1 bg-sky-200 rounded-sm mb-0.5" />
                        <div className="h-2 bg-sky-600 rounded-sm flex items-center justify-center gap-1">
                          <div className="w-1 h-1 bg-white rounded-full" />
                          <div className="w-1 h-1 bg-white/60 rounded-full" />
                          <div className="w-1 h-1 bg-white/60 rounded-full" />
                        </div>
                      </div>
                    )}
                    {key === "masonry" && (
                      <div className="grid grid-cols-2 w-full h-full p-1 gap-0.5">
                        <div className="bg-stone-400 rounded-sm" style={{ height: "60%" }} />
                        <div className="bg-stone-500 rounded-sm row-span-2" />
                        <div className="bg-stone-300 rounded-sm" />
                      </div>
                    )}
                  </div>

                  {/* Layout Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{config.name}</span>
                      {layout === key && (
                        <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {config.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info */}
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-[10px] text-muted-foreground">
              Switch layouts to preview different visual styles.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
