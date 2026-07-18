import type { Volunteer } from "./VolunteerMarquee";

type VolunteerCardProps = {
  volunteer: Volunteer;
  isActive?: boolean;
  onActivate?: (volunteerId: string) => void;
  onDeactivate?: () => void;
};

export function VolunteerCard({ volunteer, isActive = false, onActivate, onDeactivate }: VolunteerCardProps) {
  const handleClick = () => {
    onActivate?.(volunteer.id);
  };

  return (
    <article
      tabIndex={0}
      aria-label={`${volunteer.name}, ${volunteer.designation}`}
      aria-pressed={isActive}
      onClick={handleClick}
      onFocus={() => onActivate?.(volunteer.id)}
      onBlur={onDeactivate}
      className="group relative w-32 shrink-0 overflow-hidden rounded-2xl outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-36 md:w-48 lg:w-52"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={volunteer.imageUrl}
          alt={volunteer.imageAlt ?? `${volunteer.name}, ${volunteer.designation}`}
          draggable={false}
          className={`h-full w-full object-cover object-center contrast-125 brightness-90 transition duration-500 ease-out will-change-transform group-hover:scale-[1.04] group-focus-visible:scale-[1.04] group-active:scale-[1.04] ${isActive ? "grayscale-0 scale-[1.04]" : "grayscale"} group-hover:grayscale-0 group-focus-visible:grayscale-0 group-active:grayscale-0`}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-3 pb-3 pt-10 text-white transition duration-300 group-hover:from-black/85 group-focus-visible:from-black/85">
        <div className={`translate-y-0 opacity-100 transition duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100 ${isActive ? "md:translate-y-0 md:opacity-100" : ""}`}>
          <h3 className="truncate text-sm font-bold leading-tight sm:text-base">{volunteer.name}</h3>
          <p className="truncate text-xs font-medium text-orange sm:text-sm">{volunteer.designation}</p>
        </div>
      </div>
    </article>
  );
}
