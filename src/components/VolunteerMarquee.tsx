import { useEffect, useState, type CSSProperties } from "react";
import { VolunteerCard } from "./VolunteerCard";

export interface Volunteer {
  id: string;
  name: string;
  imageUrl: string;
  imageAlt?: string;
  realImageUrl?: string;
}

const VOLUNTEERS: Volunteer[] = [
  {
    id: "volunteer-1",
    name: "Brigit Thomas",
    imageUrl: "/volunteer_wall_trial/brigit/illustartion.png",
    realImageUrl: "/volunteer_wall_trial/brigit/normal.jpeg",
    imageAlt: "Brigit Thomas, IEEE Kerala volunteer",
  },
  {
    id: "volunteer-2",
    name: "Shayen Thomas",
    imageUrl: "/volunteer_wall_trial/shayen/illustration.jpeg",
    realImageUrl: "/volunteer_wall_trial/shayen/normal.jpeg",
    imageAlt: "Shayen Thomas, IEEE Kerala volunteer",
  },
  {
    id: "volunteer-3",
    name: "Robin Francis",
    imageUrl: "/volunteer_wall_trial/robin/illustartion.png",
    realImageUrl: "/volunteer_wall_trial/robin/normal.webp",
    imageAlt: "Robin Francis, IEEE Kerala volunteer",
  },
];

type VolunteerMarqueeProps = {
  title?: string;
  description?: string;
  durationSeconds?: number;
};

const VOLUNTEER_LANES = [
  VOLUNTEERS,
  [...VOLUNTEERS.slice(1), ...VOLUNTEERS.slice(0, 1)],
  [...VOLUNTEERS.slice(2), ...VOLUNTEERS.slice(0, 2)],
] as const;

const LANE_PHASE_OFFSETS = [0, -0.08, -0.21] as const;

export function VolunteerMarquee({
  title = "Meet the Volunteers",
  description = "These volunteers help power the organisation’s events, community programs, and technical activities.",
  durationSeconds = 30,
}: VolunteerMarqueeProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const clearActiveCard = () => setActiveCardId(null);
    const clearActiveCardFromOutside = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-volunteer-card]")) {
        clearActiveCard();
      }
    };

    window.addEventListener("scroll", clearActiveCard, { passive: true });
    window.addEventListener("pointerdown", clearActiveCardFromOutside);

    return () => {
      window.removeEventListener("scroll", clearActiveCard);
      window.removeEventListener("pointerdown", clearActiveCardFromOutside);
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

          <div className="space-y-4 sm:space-y-5" aria-label="IEEE volunteers showcase">
            {VOLUNTEER_LANES.map((lane, laneIndex) => {
              const laneSequence = [...lane, ...lane, ...lane, ...lane];

              return (
                <div
                  key={`volunteer-lane-${laneIndex}`}
                  className={`${laneIndex === 2 ? "hidden md:flex" : "flex"} overflow-hidden`}
                  aria-hidden={laneIndex >= 2 ? true : undefined}
                >
                  <div
                    className="volunteer-marquee__track flex w-max items-stretch motion-reduce:animate-none"
                    style={{ animationDelay: `${durationSeconds * LANE_PHASE_OFFSETS[laneIndex]}s` }}
                  >
                    {[0, 1].map((groupIndex) => (
                      <div
                        key={`${laneIndex}-group-${groupIndex}`}
                        className="flex min-w-[100vw] w-max shrink-0 items-stretch gap-4 px-4 sm:gap-5 sm:px-6 lg:px-8"
                        aria-hidden={groupIndex === 1 ? true : undefined}
                      >
                        {laneSequence.map((volunteer, index) => {
                          const isDuplicate = groupIndex === 1 || index >= lane.length;
                          const cardId = `${laneIndex}-${groupIndex}-${volunteer.id}-${index}`;

                          return (
                            <div
                              key={cardId}
                              role="listitem"
                              aria-hidden={isDuplicate ? true : undefined}
                              className="shrink-0"
                            >
                              <VolunteerCard
                                volunteer={volunteer}
                                cardId={cardId}
                                tabIndex={isDuplicate ? -1 : undefined}
                                isActive={activeCardId === cardId}
                                onToggle={(selectedCardId) =>
                                  setActiveCardId((current) => (current === selectedCardId ? null : selectedCardId))
                                }
                                onDeactivate={(blurredCardId) =>
                                  setActiveCardId((current) => (current === blurredCardId ? null : current))
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
