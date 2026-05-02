import React from "react";

const PARTNERS = [
  { name: "IEEE", color: "border-navy bg-navy/5 text-navy" },
  { name: "IEEE Region 10", color: "border-purple bg-purple/5 text-purple" },
  { name: "IEEE SA", color: "border-teal bg-teal/5 text-teal" },
  { name: "IEEE HAC", color: "border-orange bg-orange/5 text-orange" },
  { name: "IEEE SIGHT", color: "border-navy bg-navy/5 text-navy" },
  { name: "Sustainable Development Goals", color: "border-purple bg-purple/5 text-purple" },
  { name: "Kerala Startup Mission", color: "border-teal bg-teal/5 text-teal" },
  { name: "NASSCOM Foundation", color: "border-orange bg-orange/5 text-orange" },
  { name: "Sightsavers", color: "border-navy bg-navy/5 text-navy" },
  { name: "CBM", color: "border-teal bg-teal/5 text-teal" },
];

export function PartnerCarousel() {
  return (
    <section className="py-12 overflow-hidden bg-slate-50 border-y border-slate-100" data-testid="partner-carousel">
      <div className="container mx-auto px-4 mb-8 text-center">
        <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">Our Partners in Innovation</h2>
      </div>
      
      <div className="relative w-full flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex w-max partner-scroll items-center gap-8 pl-8">
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div 
              key={index}
              className={`flex-shrink-0 flex items-center justify-center px-8 py-4 h-20 rounded-lg border-2 font-bold text-lg tracking-wide whitespace-nowrap bg-white shadow-sm ${partner.color}`}
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
