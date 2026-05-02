import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Accessibility } from "lucide-react";

export function AccessibilityToolbar() {
  const [fontSize, setFontSize] = useState<"normal" | "large" | "small">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [textOnly, setTextOnly] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (fontSize === "small") {
      html.style.fontSize = "14px";
    } else if (fontSize === "large") {
      html.style.fontSize = "18px";
    } else {
      html.style.fontSize = "16px";
    }
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    if (textOnly) {
      document.body.classList.add("text-only");
    } else {
      document.body.classList.remove("text-only");
    }
  }, [textOnly]);

  return (
    <div className="accessibility-bar w-full px-4 py-1.5 flex flex-wrap items-center justify-between z-50 relative" data-testid="toolbar-accessibility">
      <div className="flex items-center gap-4 text-slate-700">
        <div className="flex items-center gap-1.5 font-medium">
          <Accessibility className="w-3.5 h-3.5 text-navy" />
          <span>Accessibility Tools</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-1 border-l border-slate-300 pl-4">
          <button 
            onClick={() => setFontSize("small")} 
            className={`px-1.5 py-0.5 rounded hover:bg-slate-200 transition-colors ${fontSize === "small" ? "bg-slate-200 font-bold" : ""}`}
            aria-label="Decrease font size"
            data-testid="btn-font-small"
          >
            A-
          </button>
          <button 
            onClick={() => setFontSize("normal")} 
            className={`px-1.5 py-0.5 rounded hover:bg-slate-200 transition-colors ${fontSize === "normal" ? "bg-slate-200 font-bold" : ""}`}
            aria-label="Reset font size"
            data-testid="btn-font-normal"
          >
            A
          </button>
          <button 
            onClick={() => setFontSize("large")} 
            className={`px-1.5 py-0.5 rounded hover:bg-slate-200 transition-colors ${fontSize === "large" ? "bg-slate-200 font-bold" : ""}`}
            aria-label="Increase font size"
            data-testid="btn-font-large"
          >
            A+
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 border-l border-slate-300 pl-4">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-navy transition-colors">
            <input 
              type="checkbox" 
              checked={highContrast} 
              onChange={(e) => setHighContrast(e.target.checked)} 
              className="accent-navy"
              data-testid="toggle-high-contrast"
            />
            <span>High Contrast</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-navy transition-colors">
            <input 
              type="checkbox" 
              checked={textOnly} 
              onChange={(e) => setTextOnly(e.target.checked)} 
              className="accent-navy"
              data-testid="toggle-text-only"
            />
            <span>Text Only</span>
          </label>
        </div>

        <div className="hidden lg:flex items-center gap-3 border-l border-slate-300 pl-4">
          <a href="#main-content" className="hover:text-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded px-1 transition-all" data-testid="link-screen-reader">Screen Reader Access</a>
          <a href="#main-content" className="hover:text-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded px-1 transition-all" data-testid="link-keyboard-nav">Keyboard Navigation</a>
        </div>
      </div>
      
      <div>
        <a 
          href="#main-content" 
          className="text-navy font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded px-2 py-0.5 transition-all"
          data-testid="link-skip-content"
        >
          Skip to content
        </a>
      </div>
    </div>
  );
}
