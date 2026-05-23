import { ArrowRight, Repeat2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type CardFlipColor = "navy" | "teal" | "orange" | "purple";

export interface CardFlipProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color?: CardFlipColor;
  featured?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const colorMap: Record<
  CardFlipColor,
  {
    text: string;
    bg: string;
    border: string;
    ctaText: string;
    ctaHover: string;
  }
> = {
  navy: {
    text: "text-navy",
    bg: "bg-navy/10",
    border: "border-navy/20",
    ctaText: "group-hover/start:text-navy",
    ctaHover: "hover:bg-navy/10",
  },
  teal: {
    text: "text-teal",
    bg: "bg-teal/10",
    border: "border-teal/20",
    ctaText: "group-hover/start:text-teal",
    ctaHover: "hover:bg-teal/10",
  },
  orange: {
    text: "text-orange",
    bg: "bg-orange/10",
    border: "border-orange/20",
    ctaText: "group-hover/start:text-orange",
    ctaHover: "hover:bg-orange/10",
  },
  purple: {
    text: "text-purple",
    bg: "bg-purple/10",
    border: "border-purple/20",
    ctaText: "group-hover/start:text-purple",
    ctaHover: "hover:bg-purple/10",
  },
};

export default function CardFlip({
  icon,
  title,
  subtitle,
  description,
  features,
  color = "navy",
  featured = false,
  ctaLabel = "Learn more",
  ctaHref,
  className,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const tokens = colorMap[color];

  return (
    <div
      className={cn(
        "group relative h-[340px] w-full [perspective:2000px]",
        featured && "lg:-translate-y-2 lg:scale-[1.02]",
        className,
      )}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      data-testid={`card-flip-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-transform duration-700",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
        )}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "bg-gradient-to-br from-navy via-[#063f79] to-teal border border-navy/15",
            "shadow-lg shadow-navy/15",
            "transition-shadow duration-500",
          )}
        >
          <div className={cn("relative h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(1,160,160,0.06),transparent_28%)]")}>
            {/* Subtle background decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-[0.2]">
                <div className="h-full w-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
            </div>

            {/* Icon badge */}
            {icon && (
              <div
                className={cn(
                  "absolute top-5 left-5 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm transition-colors duration-200",
                  featured
                    ? "bg-white/15 backdrop-blur-md text-white border border-white/20"
                    : cn(tokens.bg, "text-white", "group-hover:bg-white group-hover:text-navy")
                )}
                aria-hidden="true"
              >
                {icon}
              </div>
            )}

            {featured && (
              <div className="absolute top-5 left-24 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/20">
                Featured
              </div>
            )}

            {/* Flip toggle button (keyboard-accessible) */}
            <button
              type="button"
              onClick={() => setIsFlipped((f) => !f)}
              className={cn(
                "absolute top-5 right-5 z-10 inline-flex items-center justify-center",
                "h-9 w-9 rounded-lg bg-transparent border border-white/10 text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange",
                "transition-transform duration-200 hover:scale-105 hover:bg-white/10",
              )}
              aria-label={`Flip card to see details about ${title}`}
              aria-pressed={isFlipped}
            >
              <Repeat2 className="h-4 w-4 text-inherit" aria-hidden="true" />
            </button>
          </div>

          {/* Front footer */}
          <div className="absolute right-0 bottom-0 left-0 p-5 pointer-events-none bg-gradient-to-t from-navy/80 via-navy/50 to-transparent">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-white leading-snug tracking-tight">{title}</h3>
              <p className="line-clamp-2 text-sm text-white/80">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-6",
            featured
              ? "bg-white border-2 border-teal/25 shadow-md shadow-navy/10 flex flex-col"
              : cn("bg-white border-2", tokens.border, "shadow-md flex flex-col"),
          )}
          aria-hidden={!isFlipped}
        >
          <div className="flex-1 space-y-5">
            <div className="space-y-2">
              <h3 className={cn("font-bold text-lg leading-snug tracking-tight", featured ? "text-navy" : "text-navy")}>
                {title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {description}
              </p>
            </div>

            <ul className="space-y-2" aria-label="Key activities">
              {features.map((feature, index) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-slate-700 transition-all duration-500"
                  style={{
                    transform: isFlipped ? "translateX(0)" : "translateX(-10px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 80 + 200}ms`,
                  }}
                >
                  <ArrowRight
                    className={cn("h-3.5 w-3.5 mt-0.5 shrink-0", tokens.text)}
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {ctaHref && (
            <div className="mt-5 border-t border-slate-200 pt-5">
              <Link
                to={ctaHref}
                tabIndex={isFlipped ? 0 : -1}
                className={cn(
                  "group/start relative flex items-center justify-between",
                  "-m-3 rounded-xl p-3 bg-slate-50",
                  tokens.ctaHover,
                  "hover:scale-[1.02] transition-all duration-300",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange",
                )}
              >
                <span
                  className={cn(
                    "font-semibold text-sm text-navy transition-colors duration-300",
                    tokens.ctaText,
                  )}
                >
                  {ctaLabel}
                </span>
                <ArrowRight
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    "group-hover/start:translate-x-0.5",
                    tokens.text,
                  )}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
