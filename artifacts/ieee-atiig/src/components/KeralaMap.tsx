import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DistrictData {
  id: string;
  name: string;
  path: string;
  projects: number;
  lives: string;
  initiatives: string[];
  tier: "high" | "active" | "emerging";
}

const districts: DistrictData[] = [
  {
    id: "tvm",
    name: "Thiruvananthapuram",
    path: "M58,370 L72,355 L85,360 L95,375 L90,395 L78,410 L60,405 L50,390 Z",
    projects: 12,
    lives: "4.8K",
    initiatives: ["AT Innovation Lab (HQ)", "Sparsh Prosthetic Center", "Accessible Campus Audit"],
    tier: "high",
  },
  {
    id: "kollam",
    name: "Kollam",
    path: "M50,340 L65,330 L80,335 L85,355 L72,355 L58,370 L50,390 L40,375 L38,355 Z",
    projects: 5,
    lives: "1.6K",
    initiatives: ["Community Outreach Program", "Mobility Device Distribution"],
    tier: "active",
  },
  {
    id: "pathanamthitta",
    name: "Pathanamthitta",
    path: "M65,305 L82,295 L95,305 L95,325 L80,335 L65,330 L55,320 Z",
    projects: 3,
    lives: "820",
    initiatives: ["Inclusive Education Pilot", "Volunteer Training"],
    tier: "active",
  },
  {
    id: "alappuzha",
    name: "Alappuzha",
    path: "M35,310 L50,300 L65,305 L55,320 L50,340 L38,355 L30,340 L28,320 Z",
    projects: 4,
    lives: "1.1K",
    initiatives: ["Assistive Device Workshops", "Water-Quality Sensing"],
    tier: "active",
  },
  {
    id: "kottayam",
    name: "Kottayam",
    path: "M50,275 L70,265 L82,275 L82,295 L65,305 L50,300 L42,290 Z",
    projects: 6,
    lives: "2.1K",
    initiatives: ["Inclusive Education Hub", "Teacher Training Program", "Adaptive Learning Kits"],
    tier: "active",
  },
  {
    id: "idukki",
    name: "Idukki",
    path: "M70,230 L92,220 L105,235 L105,275 L95,305 L82,295 L82,275 L70,265 L65,245 Z",
    projects: 2,
    lives: "450",
    initiatives: ["Off-Grid Energy Project", "Tribal Outreach"],
    tier: "emerging",
  },
  {
    id: "ernakulam",
    name: "Ernakulam",
    path: "M30,260 L50,248 L70,230 L65,245 L70,265 L50,275 L42,290 L28,280 Z",
    projects: 10,
    lives: "3.9K",
    initiatives: ["Smart Campus Initiative", "Industry Partnership Hub", "Hackathon Series"],
    tier: "high",
  },
  {
    id: "thrissur",
    name: "Thrissur",
    path: "M28,225 L48,210 L65,215 L70,230 L50,248 L30,260 L22,245 Z",
    projects: 7,
    lives: "2.4K",
    initiatives: ["Assistive Device R&D Lab", "Community Awareness Camps", "SHG Partnerships"],
    tier: "active",
  },
  {
    id: "palakkad",
    name: "Palakkad",
    path: "M48,175 L72,165 L88,175 L92,200 L92,220 L70,230 L65,215 L48,210 L42,195 Z",
    projects: 4,
    lives: "1.3K",
    initiatives: ["Rural AT Distribution", "Disaster Response Kit Testing"],
    tier: "active",
  },
  {
    id: "malappuram",
    name: "Malappuram",
    path: "M22,185 L42,170 L48,175 L42,195 L48,210 L28,225 L18,210 Z",
    projects: 5,
    lives: "1.7K",
    initiatives: ["Inclusive Education Drive", "Volunteer Network", "Communication Devices"],
    tier: "active",
  },
  {
    id: "kozhikode",
    name: "Kozhikode",
    path: "M15,155 L32,142 L42,155 L42,170 L22,185 L12,175 Z",
    projects: 8,
    lives: "3.2K",
    initiatives: ["Regional Innovation Center", "Accessibility Audit Drive", "Student Mentorship"],
    tier: "high",
  },
  {
    id: "wayanad",
    name: "Wayanad",
    path: "M32,120 L52,108 L65,118 L65,140 L52,155 L42,155 L32,142 Z",
    projects: 2,
    lives: "380",
    initiatives: ["Tribal Assistive Tech Program", "Off-Grid Solutions"],
    tier: "emerging",
  },
  {
    id: "kannur",
    name: "Kannur",
    path: "M12,115 L32,100 L52,108 L32,120 L32,142 L15,155 L8,140 Z",
    projects: 4,
    lives: "1.2K",
    initiatives: ["Livelihood Skills Training", "Disability Awareness Camps"],
    tier: "active",
  },
  {
    id: "kasaragod",
    name: "Kasaragod",
    path: "M8,80 L25,68 L38,78 L32,100 L12,115 L5,100 Z",
    projects: 2,
    lives: "340",
    initiatives: ["Border Region Outreach", "Emerging Research Partner"],
    tier: "emerging",
  },
];

const tierColors: Record<string, { fill: string; hover: string; stroke: string; label: string; bg: string }> = {
  high: {
    fill: "fill-orange/25",
    hover: "fill-orange/45",
    stroke: "stroke-orange/60",
    label: "High Impact",
    bg: "bg-orange",
  },
  active: {
    fill: "fill-teal/20",
    hover: "fill-teal/40",
    stroke: "stroke-teal/50",
    label: "Active",
    bg: "bg-teal",
  },
  emerging: {
    fill: "fill-purple/15",
    hover: "fill-purple/35",
    stroke: "stroke-purple/40",
    label: "Emerging",
    bg: "bg-purple",
  },
};

export default function KeralaMap() {
  const [active, setActive] = useState<DistrictData | null>(null);

  const totalProjects = districts.reduce((s, d) => s + d.projects, 0);
  const totalDistricts = districts.length;

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="font-bold text-navy text-xl">Impact Across Kerala</h3>
          <p className="text-sm text-slate-500 mt-1">Hover any district to see active programs.</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-2xl font-black text-navy">{totalProjects}+</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Projects in {totalDistricts} Districts</div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_1.1fr] gap-6 mt-4">
        {/* SVG Map */}
        <div className="relative">
          <svg
            viewBox="-5 55 120 375"
            className="w-full h-auto max-h-[480px]"
            role="img"
            aria-label="Interactive map of Kerala showing project impact by district"
          >
            <defs>
              <filter id="mapShadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#023A74" floodOpacity="0.08" />
              </filter>
            </defs>
            <g filter="url(#mapShadow)">
              {districts.map((d) => {
                const tier = tierColors[d.tier];
                const isActive = active?.id === d.id;
                return (
                  <path
                    key={d.id}
                    d={d.path}
                    className={`
                      ${isActive ? tier.hover : tier.fill}
                      ${tier.stroke}
                      stroke-[1.2]
                      cursor-pointer
                      transition-all duration-200
                    `}
                    onMouseEnter={() => setActive(d)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(d)}
                    onBlur={() => setActive(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${d.name}: ${d.projects} projects, ${d.lives} lives impacted`}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex flex-col">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-3 h-3 rounded-full ${tierColors[active.tier].bg}`} />
                  <h4 className="font-black text-navy text-lg">{active.name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-200 px-2 py-0.5 rounded">
                    {tierColors[active.tier].label}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                    <div className="text-2xl font-black text-orange">{active.projects}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-slate-100">
                    <div className="text-2xl font-black text-teal">{active.lives}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lives Impacted</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-black uppercase tracking-widest text-slate-500">Active Initiatives</div>
                  {active.initiatives.map((init) => (
                    <div key={init} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-orange font-bold mt-px">›</span>
                      <span className="font-medium">{init}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-navy mb-1">Select a District</p>
                <p className="text-xs text-slate-500">Hover over the map to explore projects and impact data across Kerala's 14 districts.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
            {(["high", "active", "emerging"] as const).map((tier) => {
              const t = tierColors[tier];
              const count = districts.filter((d) => d.tier === tier).length;
              return (
                <div key={tier} className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className={`w-3 h-3 rounded-full ${t.bg}`} />
                  </div>
                  <div className="text-xs font-bold text-navy">{t.label}</div>
                  <div className="text-[10px] text-slate-500">{count} districts</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
