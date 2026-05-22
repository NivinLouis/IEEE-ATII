import React from "react";
import { LogoSlider } from "./ui/logo-slider";

const PARTNERS = [
  { name: "IEEE" },
  { name: "IEEE Region 10" },
  { name: "IEEE SA" },
  { name: "IEEE HAC" },
  { name: "IEEE SIGHT" },
  { name: "Sustainable Development Goals" },
  { name: "Kerala Startup Mission" },
  { name: "NASSCOM Foundation" },
  { name: "Sightsavers" },
  { name: "CBM" },
];

export function PartnerCarousel() {
  const partnerLogos = [...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
    <div 
      key={index}
      className="flex items-center justify-center px-6 py-3 h-14 rounded-xl border border-slate-200 bg-white shadow-sm font-bold text-sm tracking-wide whitespace-nowrap text-navy hover:border-orange/30 transition-colors mx-4"
    >
      {partner.name}
    </div>
  ));

  return (
    <section className="py-20 bg-white border-b border-slate-100" data-testid="partner-carousel">
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
