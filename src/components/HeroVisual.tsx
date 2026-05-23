import { motion, useReducedMotion } from "framer-motion";
import {
  Accessibility,
  Sparkles,
  Heart,
  Lightbulb,
  Users,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroVisualVariant = "home" | "about" | "initiatives";

interface ChipSpec {
  icon: LucideIcon;
  label: string;
  color: "navy" | "teal" | "orange" | "purple";
  position: string;
  delay: number;
}

interface VariantSpec {
  badgeIcon: LucideIcon;
  headlineStat: string;
  headlineLabel: string;
  headlineSub: string;
  centerIcons: { Icon: LucideIcon; color: string; ring: string }[];
  chips: ChipSpec[];
}

const colorTokens: Record<
  ChipSpec["color"],
  { ring: string; iconBg: string; iconText: string; dot: string }
> = {
  navy: {
    ring: "ring-navy/20",
    iconBg: "bg-navy/10",
    iconText: "text-navy",
    dot: "bg-navy",
  },
  teal: {
    ring: "ring-teal/20",
    iconBg: "bg-teal/10",
    iconText: "text-teal",
    dot: "bg-teal",
  },
  orange: {
    ring: "ring-orange/30",
    iconBg: "bg-orange/10",
    iconText: "text-orange",
    dot: "bg-orange",
  },
  purple: {
    ring: "ring-purple/20",
    iconBg: "bg-purple/10",
    iconText: "text-purple",
    dot: "bg-purple",
  },
};

const variants: Record<HeroVisualVariant, VariantSpec> = {
  home: {
    badgeIcon: Accessibility,
    headlineStat: "800+",
    headlineLabel: "Lives Impacted",
    headlineSub: "across Kerala & beyond",
    centerIcons: [
      { Icon: Heart, color: "text-orange", ring: "ring-orange/30" },
      { Icon: Sparkles, color: "text-teal", ring: "ring-teal/30" },
      { Icon: Lightbulb, color: "text-purple", ring: "ring-purple/30" },
    ],
    chips: [
      { icon: Heart, label: "Empathy", color: "orange", position: "top-2 -left-4 md:-left-8", delay: 0.2 },
      { icon: Lightbulb, label: "Innovation", color: "purple", position: "top-20 -right-2 md:-right-6", delay: 0.35 },
      { icon: Users, label: "Community", color: "teal", position: "bottom-16 -left-6 md:-left-10", delay: 0.5 },
      { icon: Globe, label: "Inclusion", color: "navy", position: "bottom-2 right-4 md:right-2", delay: 0.65 },
    ],
  },
  about: {
    badgeIcon: Heart,
    headlineStat: "2016",
    headlineLabel: "Founded",
    headlineSub: "building inclusive futures",
    centerIcons: [
      { Icon: Users, color: "text-purple", ring: "ring-purple/30" },
      { Icon: Heart, color: "text-orange", ring: "ring-orange/30" },
      { Icon: Sparkles, color: "text-teal", ring: "ring-teal/30" },
    ],
    chips: [
      { icon: Sparkles, label: "Mission", color: "teal", position: "top-2 -left-4 md:-left-8", delay: 0.2 },
      { icon: Users, label: "Leadership", color: "purple", position: "top-20 -right-2 md:-right-6", delay: 0.35 },
      { icon: Heart, label: "Values", color: "orange", position: "bottom-16 -left-6 md:-left-10", delay: 0.5 },
      { icon: Globe, label: "Reach", color: "navy", position: "bottom-2 right-4 md:right-2", delay: 0.65 },
    ],
  },
  initiatives: {
    badgeIcon: Lightbulb,
    headlineStat: "6",
    headlineLabel: "Core Programs",
    headlineSub: "research · outreach · education",
    centerIcons: [
      { Icon: Lightbulb, color: "text-orange", ring: "ring-orange/30" },
      { Icon: Globe, color: "text-teal", ring: "ring-teal/30" },
      { Icon: Users, color: "text-navy", ring: "ring-navy/30" },
    ],
    chips: [
      { icon: Lightbulb, label: "Research", color: "navy", position: "top-2 -left-4 md:-left-8", delay: 0.2 },
      { icon: Users, label: "Outreach", color: "teal", position: "top-20 -right-2 md:-right-6", delay: 0.35 },
      { icon: Globe, label: "Field Work", color: "purple", position: "bottom-16 -left-6 md:-left-10", delay: 0.5 },
      { icon: Heart, label: "Care", color: "orange", position: "bottom-2 right-4 md:right-2", delay: 0.65 },
    ],
  },
};

interface HeroVisualProps {
  variant?: HeroVisualVariant;
  quote?: string;
  className?: string;
  customHeadlineStat?: string;
  customHeadlineLabel?: string;
  customHeadlineSub?: string;
  hideRevolvingIcons?: boolean;
}

export default function HeroVisual({
  variant = "home",
  quote,
  className,
  customHeadlineStat,
  customHeadlineLabel,
  customHeadlineSub,
  hideRevolvingIcons = false,
}: HeroVisualProps) {
  const spec = variants[variant];
  const BadgeIcon = spec.badgeIcon;
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative w-full max-w-[520px] mx-auto aspect-[5/4] select-none",
        className,
      )}
      aria-hidden="true"
      data-testid={`hero-visual-${variant}`}
    >
      {/* Soft brand-colored backdrop blooms */}
      <div className="absolute -top-8 -right-8 w-72 h-72 bg-teal/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-orange/15 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-purple/10 rounded-full blur-3xl" />

      {/* Center medallion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative">
          {/* Decorative concentric rings */}
          <div className="absolute inset-0 -m-12 rounded-full border border-navy/10" />
          <div className="absolute inset-0 -m-20 rounded-full border border-navy/5" />
          <div className="absolute inset-0 -m-28 rounded-full border border-navy/5" />

          {/* Slow rotating icon halo */}
          {!hideRevolvingIcons && (
            <motion.div
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 -m-20"
            >
              {spec.centerIcons.map(({ Icon, color, ring }, i) => {
                const angle = (i * 360) / spec.centerIcons.length;
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-110px) rotate(-${angle}deg)`,
                      marginLeft: -22,
                      marginTop: -22,
                    }}
                  >
                    <motion.div
                      animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                      transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                      className={cn(
                        "w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center ring-2",
                        ring,
                      )}
                    >
                      <Icon className={cn("w-5 h-5", color)} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Core medallion */}
          <div
            className="relative w-44 h-44 rounded-full shadow-2xl flex flex-col items-center justify-center text-white"
            style={{
              background:
                "linear-gradient(135deg, #023A74 0%, #1f2c80 45%, #642396 100%)",
            }}
          >
            <BadgeIcon className="w-7 h-7 text-orange mb-2" />
            <div className="text-3xl font-black tracking-tight leading-none">
              {customHeadlineStat ?? spec.headlineStat}
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/80 mt-1.5">
              {customHeadlineLabel ?? spec.headlineLabel}
            </div>
            <div className="text-[10px] text-white/60 mt-1 px-4 text-center leading-tight">
              {customHeadlineSub ?? spec.headlineSub}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chip badges */}
      {spec.chips.map((chip, i) => {
        const ChipIcon = chip.icon;
        const tokens = colorTokens[chip.color];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: chip.delay, ease: "easeOut" }}
            className={cn("absolute z-10", chip.position)}
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className={cn(
                "flex items-center gap-2.5 bg-white rounded-full pl-2 pr-4 py-2",
                "shadow-lg ring-1",
                tokens.ring,
              )}
            >
              <span
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  tokens.iconBg,
                )}
              >
                <ChipIcon className={cn("w-4 h-4", tokens.iconText)} />
              </span>
              <span className="text-sm font-bold text-navy whitespace-nowrap">
                {chip.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Optional quote card */}
      {quote && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={cn(
            "absolute -bottom-6 left-1/2 -translate-x-1/2 z-20",
            "bg-white/95 backdrop-blur-md rounded-xl shadow-xl",
            "border-l-4 border-l-orange border-t-4 border-t-teal",
            "px-5 py-4 max-w-xs",
          )}
        >
          <p className="italic text-navy font-semibold text-sm leading-snug text-center">
            &ldquo;{quote}&rdquo;
          </p>
        </motion.div>
      )}
    </div>
  );
}
