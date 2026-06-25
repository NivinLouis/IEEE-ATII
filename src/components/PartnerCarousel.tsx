import React from "react";
import { LogoSlider } from "./ui/logo-slider";

const PARTNERS = [
  { name: "IEEE", logo: "/logos/ieee.png" },
  { name: "IEEE Region 10", logo: "/logos/R10-Logo.png" },
  { name: "IEEE SA", logo: "/logos/ieee-sa.webp" },
  { name: "IEEE SIGHT", logo: "/logos/IEEE-SIGHT-logo.webp" },
  { name: "Sustainable Development Goals", logo: "/logos/sdg.png" },
  { name: "Kerala Startup Mission", logo: "/logos/ksum.png" },
  { name: "NASSCOM Foundation", logo: "/logos/nasscom-logo.svg" },
  { name: "Sightsavers", logo: "/logos/sightsavers-logo.png" },
  { name: "CBM", logo: "/logos/cbm.jpeg" },
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
