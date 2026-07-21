import { useEffect, useState } from "react";
import type { Volunteer } from "./VolunteerMarquee";

type VolunteerCardProps = {
  volunteer: Volunteer;
  cardId: string;
  tabIndex?: number;
  isPriority?: boolean;
  isActive?: boolean;
  areInteractionsSuppressed?: boolean;
  onToggle?: (cardId: string) => void;
  onDeactivate?: (cardId: string) => void;
  onInteractionResume?: () => void;
  onHoverChange?: (cardId: string, isHovered: boolean) => void;
  onFocusChange?: (cardId: string, isFocused: boolean) => void;
};

export function VolunteerCard({
  volunteer,
  cardId,
  tabIndex,
  isPriority = false,
  isActive = false,
  areInteractionsSuppressed = false,
  onToggle,
  onDeactivate,
  onInteractionResume,
  onHoverChange,
  onFocusChange,
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

  useEffect(() => {
    if (areInteractionsSuppressed) {
      setIsHovered(false);
      setIsFocused(false);
    }
  }, [areInteractionsSuppressed]);

  const isInteracting = !areInteractionsSuppressed && (isActive || isHovered || isFocused);
  const isRealImageVisible = isInteracting && isRealImageLoaded;

  const handlePointerEnter = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (areInteractionsSuppressed) return;

    setIsHovered(true);
    setShouldLoadRealImage(true);
    onHoverChange?.(cardId, true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    onHoverChange?.(cardId, false);
  };

  const handleFocus = () => {
    onInteractionResume?.();
    setIsFocused(true);
    setShouldLoadRealImage(true);
    onFocusChange?.(cardId, true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onFocusChange?.(cardId, false);
    onDeactivate?.(cardId);
  };

  const handleClick = () => {
    onInteractionResume?.();
    setShouldLoadRealImage(true);
    onToggle?.(cardId);
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
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-3 pb-3 pt-10 text-white transition duration-300 ${isInteracting ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
      >
        <h3 className="truncate text-sm font-bold leading-tight sm:text-base">{volunteer.name}</h3>
      </div>
    </button>
  );
}
