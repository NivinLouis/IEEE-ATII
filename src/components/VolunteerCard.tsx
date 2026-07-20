import { useEffect, useState } from "react";
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
  const [shouldLoadRealImage, setShouldLoadRealImage] = useState(false);
  const [isRealImageLoaded, setIsRealImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShouldLoadRealImage(true);
    }
  }, [isActive]);

  const isInteracting = isActive || isHovered || isFocused;
  const isRealImageVisible = isInteracting && isRealImageLoaded;

  const handlePointerEnter = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setIsHovered(true);
    setShouldLoadRealImage(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShouldLoadRealImage(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onDeactivate?.(cardId);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const isKeyboardClick = event.detail === 0;
    const isTouchDevice = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (isKeyboardClick || isTouchDevice) {
      setShouldLoadRealImage(true);
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
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="group relative w-32 shrink-0 overflow-hidden rounded-2xl text-left outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-36 md:w-48 lg:w-52"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-200">
        <img
          src={volunteer.imageUrl}
          alt={volunteer.imageAlt}
          draggable={false}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          decoding="async"
          width={800}
          height={800}
          className={`absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out will-change-transform ${isInteracting ? "scale-[1.04]" : ""} ${isRealImageVisible ? "opacity-0" : "opacity-100"}`}
        />
        {shouldLoadRealImage && (
          <img
            src={volunteer.realImageUrl}
            alt=""
            aria-hidden="true"
            draggable={false}
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            width={800}
            height={800}
            onLoad={() => setIsRealImageLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover object-center transition duration-500 ease-out will-change-transform ${isInteracting ? "scale-[1.04]" : ""} ${isRealImageVisible ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-3 pb-3 pt-10 text-white opacity-0 transition duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100 ${isActive ? "translate-y-0 opacity-100" : ""}`}
      >
        <h3 className="truncate text-sm font-bold leading-tight sm:text-base">{volunteer.name}</h3>
      </div>
    </button>
  );
}
