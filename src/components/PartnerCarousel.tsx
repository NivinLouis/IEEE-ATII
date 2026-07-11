import React from "react";
import { LogoSlider } from "./ui/logo-slider";

const PARTNERS = [
  { name: "IEEE", logo: "/logos/ieee.webp" },
  { name: "IEEE Kerala Section", logo: "/logos/ieee-kerala-section.webp" },
  { name: "IEEE IES", logo: "/logos/ieee-ies.webp" },
  { name: "IEEE EdSoc Kerala Section", logo: "/logos/EdSoc-KS.webp" },
  { name: "FOSS United", logo: "/logos/foss_united.webp" },
  { name: "CodeX", logo: "/logos/codex.webp" },
  { name: "STRIDE", logo: "/logos/stride-logo.webp" },
];

export function PartnerCarousel() {
  const partnerLogos = [...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
    <div 
      key={index}
      className="flex items-center justify-center px-6 py-3 h-16 rounded-xl border border-slate-200 bg-white shadow-sm mx-4"
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="max-h-full max-w-[120px] object-contain"
      />
    </div>
  ));

  return (
    <section className="py-20 -mt-px bg-white" data-testid="partner-carousel">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">Our Partners in Innovation</h2>
      </div>
      
      <LogoSlider 
        logos={partnerLogos}
        speed={40}
        pauseOnHover={true}
        showBlur={true}
        className="max-w-full"
      />
    </section>
  );
}
