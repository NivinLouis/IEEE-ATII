import { useEffect, useState, type CSSProperties } from "react";
import { VolunteerCard } from "./VolunteerCard";

export interface Volunteer {
  id: string;
  name: string;
  designation: string;
  imageUrl: string;
  imageAlt?: string;
}

const VOLUNTEERS: Volunteer[] = [
  {
    id: "volunteer-1",
    name: "Ananya Nair",
    designation: "Community Outreach Lead",
    imageUrl: "/assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(5)_1777748003996.png",
    imageAlt: "Ananya Nair, Community Outreach Lead for IEEE Kerala",
  },
  {
    id: "volunteer-2",
    name: "Rahul Menon",
    designation: "Technical Programs Coordinator",
    imageUrl: "/assets/ChatGPT_Image_May_2,_2026,_09_48_21_PM_(3)_1777748003997.png",
    imageAlt: "Rahul Menon, Technical Programs Coordinator for IEEE Kerala",
  },
  {
    id: "volunteer-3",
    name: "Meera Suresh",
    designation: "Inclusive Education Volunteer",
    imageUrl: "/assets/ChatGPT_Image_May_2,_2026,_09_48_09_PM_(1)_1777748003994.png",
    imageAlt: "Meera Suresh, Inclusive Education Volunteer for IEEE Kerala",
  },
  {
    id: "volunteer-4",
    name: "Arjun Varma",
    designation: "Event Experience Designer",
    imageUrl: "/assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(6)_1777748003996.png",
    imageAlt: "Arjun Varma, Event Experience Designer for IEEE Kerala",
  },
  {
    id: "volunteer-5",
    name: "Nandana Prakash",
    designation: "Research & Innovation Support",
    imageUrl: "/assets/ChatGPT_Image_May_2,_2026,_09_48_21_PM_(5)_1777748003997.png",
    imageAlt: "Nandana Prakash, Research and Innovation Support volunteer for IEEE Kerala",
  },
  {
    id: "volunteer-6",
    name: "Vivek Thomas",
    designation: "Mentorship Circle Facilitator",
    imageUrl: "/assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(7)_1777748003996.png",
    imageAlt: "Vivek Thomas, Mentorship Circle Facilitator for IEEE Kerala",
  },
  {
    id: "volunteer-7",
    name: "Asha K. George",
    designation: "Accessibility Advocate",
    imageUrl: "/assets/ChatGPT_Image_May_2,_2026,_09_48_21_PM_(2)_1777748003996.png",
    imageAlt: "Asha K. George, Accessibility Advocate for IEEE Kerala",
  },
  {
    id: "volunteer-8",
    name: "Fahad Rahman",
    designation: "Community Tech Volunteer",
    imageUrl: "/assets/ChatGPT_Image_May_2,_2026,_09_48_10_PM_(8)_1777748003996.png",
    imageAlt: "Fahad Rahman, Community Tech Volunteer for IEEE Kerala",
  },
];

type VolunteerMarqueeProps = {
  title?: string;
  description?: string;
  durationSeconds?: number;
};

const VOLUNTEER_LANES = [
  VOLUNTEERS,
  [...VOLUNTEERS.slice(3), ...VOLUNTEERS.slice(0, 3)],
  [...VOLUNTEERS.slice(5), ...VOLUNTEERS.slice(0, 5)],
] as const;

const MOBILE_ROW_DIRECTIONS = ["marquee-mobile-forward", "marquee-mobile-reverse"] as const;

export function VolunteerMarquee({
  title = "Meet the Volunteers",
  description = "These volunteers help power the organisation’s events, community programs, and technical activities.",
  durationSeconds = 30,
}: VolunteerMarqueeProps) {
  const [activeVolunteerId, setActiveVolunteerId] = useState<string | null>(null);

  useEffect(() => {
    const clearActiveVolunteer = () => setActiveVolunteerId(null);

    window.addEventListener("scroll", clearActiveVolunteer, { passive: true });
    window.addEventListener("touchstart", clearActiveVolunteer, { passive: true });
    window.addEventListener("mousedown", clearActiveVolunteer);

    return () => {
      window.removeEventListener("scroll", clearActiveVolunteer);
      window.removeEventListener("touchstart", clearActiveVolunteer);
      window.removeEventListener("mousedown", clearActiveVolunteer);
    };
  }, []);

  const style = {
    "--volunteer-marquee-duration": `${durationSeconds}s`,
  } as CSSProperties;

  return (
    <section className="scroll-mt-32 overflow-x-clip bg-slate-50 py-20" data-testid="volunteer-marquee">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-teal">Volunteer Wall</p>
          <h2 className="mt-3 text-3xl font-black text-navy md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
        </div>

        <div
          className="volunteer-marquee relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden py-3"
          style={style}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" aria-hidden="true" />

          <div className="space-y-4 px-4 sm:space-y-5 sm:px-6 lg:px-8" aria-label="IEEE volunteers showcase">
            {VOLUNTEER_LANES.map((lane, laneIndex) => (
              <div
                key={`volunteer-lane-${laneIndex}`}
                className={`${laneIndex === 2 ? "hidden md:flex" : "flex"} overflow-hidden`}
                aria-hidden={laneIndex >= 2 ? true : undefined}
              >
                <div
                  className={`volunteer-marquee__track flex w-max items-stretch gap-4 motion-reduce:animate-none sm:gap-5 ${laneIndex === 0 ? "marquee-mobile-forward" : laneIndex === 1 ? "marquee-mobile-reverse" : "md:translate-x-12"}`}
                >
                  {[...lane, ...lane].map((volunteer, index) => (
                    <div
                      key={`${laneIndex}-${volunteer.id}-${index}`}
                      role="listitem"
                      aria-hidden={index >= lane.length ? true : undefined}
                      className="shrink-0"
                    >
                      <VolunteerCard
                        volunteer={volunteer}
                        isActive={activeVolunteerId === volunteer.id}
                        onActivate={setActiveVolunteerId}
                        onDeactivate={() => setActiveVolunteerId((current) => (current === volunteer.id ? null : current))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
