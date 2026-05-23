"use client"

import { useState, useEffect, type ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Accessibility,
  X,
  Check,
  Type,
  ZapOff,
  Minimize2,
  MousePointer2,
  AlignLeft,
  AlignJustify,
  AlignRight,
  AlignCenter,
  MoveVertical,
  Sun,
} from "lucide-react"

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()
  const [mousePos, setMousePos] = useState({ y: 300 })

  const [settings, setSettings] = useState({
    fontSize: 0,
    lineHeight: 0,
    textAlign: "off",
    dyslexicFont: false,
    grayscale: false,
    stopAnimations: false,
    bigCursor: false,
    readingAid: false,
    readingAidSize: 1,
  })

  useEffect(() => {
    if (isMobile) return
    const handleMouseMove = (e: MouseEvent) => setMousePos({ y: e.clientY })
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) return
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) setMousePos({ y: e.touches[0].clientY })
    }
    window.addEventListener("touchmove", handleTouch, { passive: true })
    return () => window.removeEventListener("touchmove", handleTouch)
  }, [isMobile])

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings-v2")
    if (!saved) return
    try {
      setSettings(prev => ({ ...prev, ...JSON.parse(saved) }))
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const classesToRemove = [
      "v-font-10",
      "v-font-20",
      "v-font-30",
      "v-line-15",
      "v-line-20",
      "v-line-25",
      "v-align-left",
      "v-align-right",
      "v-align-center",
      "v-align-justify",
      "large-text",
      "dyslexic-font",
      "grayscale-mode",
      "stop-animations",
      "big-cursor",
      "extra-line-height",
      "justify-text",
    ]

    classesToRemove.forEach(className => root.classList.remove(className))

    if (settings.fontSize > 0) root.classList.add(`v-font-${settings.fontSize}`)
    if (settings.lineHeight > 0) root.classList.add(`v-line-${settings.lineHeight}`)
    if (settings.textAlign !== "off") root.classList.add(`v-align-${settings.textAlign}`)
    if (settings.dyslexicFont) root.classList.add("dyslexic-font")
    if (settings.grayscale) root.classList.add("grayscale-mode")
    if (settings.stopAnimations) root.classList.add("stop-animations")
    if (settings.bigCursor && !isMobile) root.classList.add("big-cursor")

    localStorage.setItem("accessibility-settings-v2", JSON.stringify(settings))
  }, [settings, isMobile])

  const setVal = (key: keyof typeof settings, val: unknown) => {
    setSettings(prev => ({ ...prev, [key]: val }))
  }

  const resetSettings = () => {
    setSettings({
      fontSize: 0,
      lineHeight: 0,
      textAlign: "off",
      dyslexicFont: false,
      grayscale: false,
      stopAnimations: false,
      bigCursor: false,
      readingAid: false,
      readingAidSize: 1,
    })
  }

  const readingAidHeight = 56 * (settings.readingAidSize || 1)
  const offset = readingAidHeight / 2

  return (
    <>
      {settings.readingAid && (
        <>
          <div
            className="fixed left-0 right-0 top-0 z-[9998] pointer-events-none"
            style={{
              height: `${Math.max(0, mousePos.y - offset)}px`,
              background: "rgba(2, 58, 116, 0.62)",
            }}
          />
          <div
            className="fixed left-0 right-0 bottom-0 z-[9998] pointer-events-none"
            style={{
              top: `${mousePos.y + offset}px`,
              background: "rgba(2, 58, 116, 0.62)",
            }}
          />
          <div
            className="fixed left-0 right-0 z-[9997] pointer-events-none"
            style={{
              top: `${mousePos.y - offset}px`,
              height: `${readingAidHeight}px`,
              background: "rgba(1, 160, 160, 0.06)",
              borderTop: "2px solid rgba(1, 160, 160, 0.6)",
              borderBottom: "2px solid rgba(1, 160, 160, 0.6)",
            }}
          />
        </>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 left-5 z-[60] h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 active:scale-95 ${isOpen ? "rotate-180" : ""}`}
        style={{
          background: isOpen ? "#023A74" : "linear-gradient(135deg, #023A74, #01A0A0)",
          boxShadow: isOpen ? "0 10px 20px rgba(2, 58, 116, 0.3)" : "0 4px 30px rgba(2, 58, 116, 0.28)",
        }}
        aria-label="Accessibility Menu"
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[65] bg-black/20 backdrop-blur-[2px]" onClick={() => setIsOpen(false)} />
          <div className="fixed bottom-20 left-4 right-4 md:left-5 md:right-auto md:w-80 z-[70] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-10 duration-300 overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-navy to-teal flex items-center justify-center text-white shadow-lg shadow-navy/15">
                  <Accessibility className="h-4 w-4" />
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Accessibility</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 customize-scrollbar">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <Type className="h-3 w-3" /> <span>Font Size</span>
                </div>
                <div className="flex gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100/80">
                  {[0, 10, 20, 30].map(val => (
                    <button
                      key={val}
                      onClick={() => setVal("fontSize", val)}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${
                        settings.fontSize === val
                          ? "bg-white shadow-sm text-navy scale-[1.02]"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {val === 0 ? "Off" : `+${val}%`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <MoveVertical className="h-3 w-3" /> <span>Line Height</span>
                </div>
                <div className="flex gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100/80">
                  {[0, 15, 20, 25].map(val => (
                    <button
                      key={val}
                      onClick={() => setVal("lineHeight", val)}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${
                        settings.lineHeight === val
                          ? "bg-white shadow-sm text-navy scale-[1.02]"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {val === 0 ? "Off" : `${1 + val / 100}x`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <AlignJustify className="h-3 w-3" /> <span>Alignment</span>
                </div>
                <div className="flex gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100/80 overflow-x-auto">
                  {["off", "left", "center", "right", "justify"].map(val => {
                    const icons: Record<string, typeof X> = {
                      off: X,
                      left: AlignLeft,
                      center: AlignCenter,
                      right: AlignRight,
                      justify: AlignJustify,
                    }
                    const Icon = icons[val]
                    return (
                      <button
                        key={val}
                        onClick={() => setVal("textAlign", val)}
                        className={`flex-1 min-w-[32px] py-2 flex items-center justify-center rounded-xl transition-all ${
                          settings.textAlign === val
                            ? "bg-white shadow-sm text-navy scale-[1.02]"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  <Minimize2 className="h-3 w-3" /> <span>Reading Aid</span>
                </div>
                <div className="flex gap-1 bg-slate-50 p-1 rounded-2xl border border-slate-100/80 overflow-hidden">
                  {[0, 0.9, 1, 1.2].map(val => (
                    <button
                      key={val}
                      onClick={() => {
                        if (val === 0) {
                          setVal("readingAid", false)
                        } else {
                          setVal("readingAid", true)
                          setVal("readingAidSize", val)
                        }
                      }}
                      className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${
                        (val === 0 && !settings.readingAid) || (val > 0 && settings.readingAid && settings.readingAidSize === val)
                          ? "bg-white shadow-sm text-teal"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {val === 0 ? "Off" : `${val}x`}
                    </button>
                  ))}
                </div>
              </div>

              <AccessibilityToggle
                icon={<Sun className="h-4 w-4" />}
                label="Desaturate"
                isActive={settings.grayscale}
                onToggle={() => setVal("grayscale", !settings.grayscale)}
              />
              <AccessibilityToggle
                icon={<Accessibility className="h-4 w-4" />}
                label="Dyslexia Friendly"
                isActive={settings.dyslexicFont}
                onToggle={() => setVal("dyslexicFont", !settings.dyslexicFont)}
              />
              <AccessibilityToggle
                icon={<MousePointer2 className="h-4 w-4" />}
                label="Big Cursor"
                isActive={settings.bigCursor}
                onToggle={() => setVal("bigCursor", !settings.bigCursor)}
              />
              <AccessibilityToggle
                icon={<ZapOff className="h-4 w-4" />}
                label="Stop Animations"
                isActive={settings.stopAnimations}
                onToggle={() => setVal("stopAnimations", !settings.stopAnimations)}
              />
            </div>

            <button
              onClick={resetSettings}
              className="mt-5 w-full py-3 rounded-2xl bg-slate-50 border border-slate-100 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-colors"
            >
              Reset Settings
            </button>
          </div>
        </>
      )}
    </>
  )
}

function AccessibilityToggle({ icon, label, isActive, onToggle }: { icon: ReactNode, label: string, isActive: boolean, onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-2.5 rounded-2xl border transition-all duration-300 ${isActive ? "bg-teal/5 border-teal/20" : "bg-white border-transparent hover:bg-slate-50/30"}`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-8 w-8 rounded-xl flex items-center justify-center transition-all ${isActive ? "bg-gradient-to-br from-navy to-teal text-white" : "bg-slate-50 text-slate-400"}`}>
          {icon}
        </div>
        <span className={`text-[11px] font-bold tracking-tight ${isActive ? "text-navy" : "text-slate-600"}`}>{label}</span>
      </div>
      <div className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition-all ${isActive ? "bg-teal border-teal text-white" : "bg-white border-slate-200 text-transparent"}`}>
        <Check className="h-2.5 w-2.5" strokeWidth={5} />
      </div>
    </button>
  )
}
