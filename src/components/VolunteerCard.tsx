import type { Volunteer } from "./VolunteerMarquee";

type VolunteerCardProps = {
  volunteer: Volunteer;
  cardId: string;
  tabIndex?: number;
  isPriority?: boolean;
  isActive?: boolean;
  onToggle?: (cardId: string) => void;
  onDeactivate?: (cardId: string) => void;
};

export function VolunteerCard({
  volunteer,
  cardId,
  tabIndex,
  isPriority = false,
  isActive = false,
  onToggle,
  onDeactivate,
}: VolunteerCardProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const isKeyboardClick = event.detail === 0;
    const isTouchDevice = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (isKeyboardClick || isTouchDevice) {
      onToggle?.(cardId);
    }
  };

  return (
    <button
      type="button"
      data-volunteer-card
      tabIndex={tabIndex}
      aria-label={volunteer.name}
      aria-pressed={isActive}
      onClick={handleClick}
      onBlur={() => onDeactivate?.(cardId)}
      className="group relative w-32 shrink-0 overflow-hidden rounded-2xl text-left outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-36 md:w-48 lg:w-52"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-200">
        <img
          src={volunteer.imageUrl}
          alt={volunteer.imageAlt}
          draggable={false}
          loading={isPriority || isActive ? "eager" : "lazy"}
          decoding="async"
          width={800}
          height={800}
          className={`absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out will-change-transform md:group-hover:scale-[1.04] md:group-hover:opacity-0 md:group-focus-visible:scale-[1.04] md:group-focus-visible:opacity-0 ${isActive ? "scale-[1.04] opacity-0" : "opacity-100"}`}
        />
        <img
          src={volunteer.realImageUrl}
          alt=""
          aria-hidden="true"
          draggable={false}
          loading={isPriority || isActive ? "eager" : "lazy"}
          decoding="async"
          width={800}
          height={800}
          className={`absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out will-change-transform md:group-hover:scale-[1.04] md:group-hover:opacity-100 md:group-focus-visible:scale-[1.04] md:group-focus-visible:opacity-100 ${isActive ? "scale-[1.04] opacity-100" : "opacity-0"}`}
        />
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-3 pb-3 pt-10 text-white opacity-0 transition duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100 ${isActive ? "translate-y-0 opacity-100" : ""}`}
      >
        <h3 className="truncate text-sm font-bold leading-tight sm:text-base">{volunteer.name}</h3>
      </div>
    </button>
  );
}
