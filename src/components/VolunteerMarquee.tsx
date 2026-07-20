import { useEffect, useState, type CSSProperties } from "react";
import { VolunteerCard } from "./VolunteerCard";

export type Volunteer = {
  id: string;
  name: string;
  imageUrl: string;
  realImageUrl: string;
  imageAlt: string;
};

type VolunteersApiResponse = {
  success: boolean;
  volunteers: Volunteer[];
  message?: string;
};

const VOLUNTEERS_API_URL = "/api/volunteers.php";

type VolunteerMarqueeProps = {
  title?: string;
  description?: string;
  durationSeconds?: number;
};

function rotateVolunteers(volunteers: Volunteer[], offset: number) {
  if (volunteers.length === 0) return [];

  const normalizedOffset = offset % volunteers.length;
  return [...volunteers.slice(normalizedOffset), ...volunteers.slice(0, normalizedOffset)];
}

export function VolunteerMarquee({
  title = "Meet the Volunteers",
  description = "These volunteers help power the organisation’s events, community programs, and technical activities.",
  durationSeconds = 30,
}: VolunteerMarqueeProps) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVolunteers() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(VOLUNTEERS_API_URL, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Volunteer API returned ${response.status}`);
        }

        const data: VolunteersApiResponse = await response.json();

        if (!data.success || !Array.isArray(data.volunteers)) {
          throw new Error(data.message || "Invalid volunteer API response");
        }

        setVolunteers(data.volunteers);
        setActiveIndex(0);
        setActiveCardId(null);
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }

        console.error("Could not load volunteers:", loadError);
        setVolunteers([]);
        setError("The volunteer wall could not be loaded right now.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadVolunteers();

    return () => {
      controller.abort();
    };
  }, [retryKey]);

  useEffect(() => {
    if (volunteers.length === 0) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((current) => Math.min(current, volunteers.length - 1));
  }, [volunteers.length]);

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

  const volunteerLanes = volunteers.length === 0
    ? []
    : [
        volunteers,
        rotateVolunteers(volunteers, 1),
        rotateVolunteers(volunteers, 2),
      ];
  const laneOffsets = [0, -0.45, -0.9];

  return (
    <section className="scroll-mt-32 overflow-x-clip bg-slate-50 py-20" data-testid="volunteer-marquee">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.32em] text-teal">Volunteer Wall</p>
          <h2 className="mt-3 text-3xl font-black text-navy md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{description}</p>
        </div>

        {isLoading ? (
          <div
            className="relative left-1/2 mt-10 w-screen -translate-x-1/2 space-y-4 overflow-hidden sm:space-y-5"
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">Loading volunteers…</span>
            {[0, 1, 2].map((laneIndex) => (
              <div
                key={`volunteer-skeleton-lane-${laneIndex}`}
                className={`${laneIndex === 2 ? "hidden md:flex" : "flex"} gap-4 px-4 sm:gap-5 sm:px-6 lg:px-8`}
                aria-hidden="true"
              >
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={index}
                    className="aspect-square w-32 shrink-0 animate-pulse rounded-2xl bg-slate-200 motion-reduce:animate-none sm:w-36 md:w-48 lg:w-52"
                  />
                ))}
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 flex max-w-xl items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setRetryKey((current) => current + 1)}
              className="shrink-0 rounded-lg border border-red-300 bg-white px-3 py-1.5 font-bold text-red-800 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Retry
            </button>
          </div>
        ) : volunteers.length === 0 ? (
          <p className="mt-8 text-sm font-medium text-slate-600" role="status">
            Volunteer profiles will be added soon.
          </p>
        ) : (
          <div
            className="volunteer-marquee relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden py-3"
            style={style}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" aria-hidden="true" />

            <div className="space-y-4 sm:space-y-5" aria-label="IEEE volunteers showcase">
              {volunteerLanes.map((lane, laneIndex) => {
                const laneSequence = [...lane, ...lane, ...lane, ...lane];

                return (
                  <div
                    key={`volunteer-lane-${laneIndex}`}
                    className={`${laneIndex === 2 ? "hidden md:flex" : "flex"} volunteer-marquee__lane overflow-hidden`}
                    aria-hidden={laneIndex > 0 ? true : undefined}
                  >
                    <div
                      className="volunteer-marquee__track relative flex w-max items-stretch motion-reduce:animate-none"
                      style={{
                        left: `calc(var(--volunteer-card-step) * ${laneOffsets[laneIndex]})`,
                      }}
                    >
                      {[0, 1].map((groupIndex) => (
                        <div
                          key={`${laneIndex}-group-${groupIndex}`}
                          className="flex min-w-[100vw] w-max shrink-0 items-stretch gap-4 px-4 sm:gap-5 sm:px-6 lg:px-8"
                          aria-hidden={groupIndex === 1 ? true : undefined}
                        >
                          {laneSequence.map((volunteer, index) => {
                            const isDuplicate = laneIndex > 0 || groupIndex === 1 || index >= lane.length;
                            const cardId = `${laneIndex}-${groupIndex}-${volunteer.id}-${index}`;
                            const volunteerIndex = volunteers.findIndex((item) => item.id === volunteer.id);

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
                                  isPriority={laneIndex === 0 && groupIndex === 0 && index === activeIndex}
                                  isActive={activeCardId === cardId}
                                  onToggle={(selectedCardId) => {
                                    setActiveCardId((current) => (current === selectedCardId ? null : selectedCardId));
                                    if (volunteerIndex >= 0) {
                                      setActiveIndex(volunteerIndex);
                                    }
                                  }}
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
        )}
      </div>
    </section>
  );
}
