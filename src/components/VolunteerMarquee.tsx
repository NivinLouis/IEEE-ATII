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

let cachedVolunteers: Volunteer[] | null = null;
let cachedFirstIllustrationUrl: string | null = null;

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

function preloadFirstIllustration(imageUrl: string, signal: AbortSignal) {
  return new Promise<boolean>((resolve) => {
    if (signal.aborted) {
      resolve(false);
      return;
    }

    const image = new Image();
    let isSettled = false;

    const finish = (didLoad: boolean) => {
      if (isSettled) return;

      isSettled = true;
      image.onload = null;
      image.onerror = null;
      signal.removeEventListener("abort", handleAbort);
      resolve(didLoad);
    };

    const handleAbort = () => {
      image.src = "";
      finish(false);
    };

    image.decoding = "async";
    image.fetchPriority = "high";
    image.onload = () => {
      void image.decode()
        .catch(() => undefined)
        .finally(() => finish(true));
    };
    image.onerror = () => finish(false);
    signal.addEventListener("abort", handleAbort, { once: true });
    image.src = imageUrl;
  });
}

export function VolunteerMarquee({
  title = "Meet the Volunteers",
  description = "These volunteers help power the organisation’s events, community programs, and technical activities.",
  durationSeconds = 75,
}: VolunteerMarqueeProps) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => cachedVolunteers ?? []);
  const [isLoading, setIsLoading] = useState(
    () =>
      cachedVolunteers === null ||
      (cachedVolunteers.length > 0 &&
        cachedFirstIllustrationUrl !== cachedVolunteers[0].imageUrl),
  );
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);
  const [areInteractionsSuppressed, setAreInteractionsSuppressed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVolunteers() {
      try {
        setIsLoading(true);
        setError(null);

        let loadedVolunteers: Volunteer[];

        if (retryKey === 0 && cachedVolunteers !== null) {
          loadedVolunteers = cachedVolunteers;
        } else {
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

          loadedVolunteers = data.volunteers;
          cachedVolunteers = loadedVolunteers;
        }

        setVolunteers(loadedVolunteers);
        setActiveIndex(0);
        setActiveCardId(null);
        setHoveredCardId(null);
        setFocusedCardId(null);
        setAreInteractionsSuppressed(false);

        const firstIllustrationUrl = loadedVolunteers[0]?.imageUrl;

        if (
          firstIllustrationUrl &&
          cachedFirstIllustrationUrl !== firstIllustrationUrl
        ) {
          const didLoad = await preloadFirstIllustration(
            firstIllustrationUrl,
            controller.signal,
          );

          if (didLoad) {
            cachedFirstIllustrationUrl = firstIllustrationUrl;
          }
        }
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
    const clearInteractions = () => {
      setActiveCardId(null);
      setHoveredCardId(null);
      setFocusedCardId(null);
      setAreInteractionsSuppressed(true);
    };
    const clearInteractionsFromOutside = (event: PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("[data-volunteer-card]")) {
        clearInteractions();
      }
    };
    const resumeInteractionsFromOutside = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (event.target instanceof Element && event.target.closest("[data-volunteer-marquee]")) return;

      setAreInteractionsSuppressed(false);
    };

    window.addEventListener("scroll", clearInteractions, { passive: true });
    window.addEventListener("pointerdown", clearInteractionsFromOutside);
    window.addEventListener("pointermove", resumeInteractionsFromOutside, { passive: true });

    return () => {
      window.removeEventListener("scroll", clearInteractions);
      window.removeEventListener("pointerdown", clearInteractionsFromOutside);
      window.removeEventListener("pointermove", resumeInteractionsFromOutside);
    };
  }, []);

  const style = {
    "--volunteer-marquee-duration": `${durationSeconds}s`,
  } as CSSProperties;

  const volunteerLanes = [0, 1, 2].map((laneIndex) =>
    rotateVolunteers(
      volunteers,
      Math.floor((laneIndex * volunteers.length) / 3),
    ),
  );
  const laneVisualOffsets = [0, -0.45, -0.9];

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
            data-volunteer-marquee
            className="volunteer-marquee relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden py-3"
            style={style}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent sm:w-24" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent sm:w-24" aria-hidden="true" />

            <div className="space-y-4 sm:space-y-5" aria-label="IEEE volunteers showcase">
              {volunteerLanes.map((lane, laneIndex) => {
                const laneSequence = [...lane, ...lane, ...lane, ...lane];
                const laneIdPrefix = `${laneIndex}-`;
                const isLanePaused = [activeCardId, hoveredCardId, focusedCardId]
                  .some((cardId) => cardId?.startsWith(laneIdPrefix));

                return (
                  <div
                    key={`volunteer-lane-${laneIndex}`}
                    className={`${laneIndex === 2 ? "hidden md:flex" : "flex"} volunteer-marquee__lane overflow-hidden`}
                    aria-hidden={laneIndex > 0 ? true : undefined}
                  >
                    <div
                      className="volunteer-marquee__track relative flex w-max items-stretch motion-reduce:animate-none"
                      style={{
                        left: `calc(var(--volunteer-card-step) * ${laneVisualOffsets[laneIndex]})`,
                        animationPlayState: isLanePaused ? "paused" : "running",
                      }}
                    >
                      {[0, 1].map((groupIndex) => (
                        <div
                          key={`${laneIndex}-group-${groupIndex}`}
                          className="flex min-w-[100vw] w-max shrink-0 items-stretch gap-4 px-2 sm:gap-5 sm:px-2.5"
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
                                  areInteractionsSuppressed={areInteractionsSuppressed}
                                  onToggle={(selectedCardId) => {
                                    setAreInteractionsSuppressed(false);
                                    setActiveCardId((current) => (current === selectedCardId ? null : selectedCardId));
                                    if (volunteerIndex >= 0) {
                                      setActiveIndex(volunteerIndex);
                                    }
                                  }}
                                  onDeactivate={(blurredCardId) =>
                                    setActiveCardId((current) => (current === blurredCardId ? null : current))
                                  }
                                  onInteractionResume={() => setAreInteractionsSuppressed(false)}
                                  onHoverChange={(changedCardId, isHovered) =>
                                    setHoveredCardId((current) =>
                                      isHovered ? changedCardId : current === changedCardId ? null : current
                                    )
                                  }
                                  onFocusChange={(changedCardId, isFocused) =>
                                    setFocusedCardId((current) =>
                                      isFocused ? changedCardId : current === changedCardId ? null : current
                                    )
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
