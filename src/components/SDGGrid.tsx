import React from "react";

interface SDGGoal {
  number: number;
  title: string;
  color: string;
  image: string;
}

const goals: SDGGoal[] = [
  { number: 3, title: "Good Health", color: "#4C9F38", image: "/sdg/03.png" },
  { number: 4, title: "Quality Education", color: "#C5192D", image: "/sdg/04.jpg" },
  { number: 8, title: "Economic Growth", color: "#A21942", image: "/sdg/08.jpg" },
  { number: 9, title: "Innovation", color: "#FD6925", image: "/sdg/09.jpg" },
  { number: 10, title: "Reduced Inequalities", color: "#DD1367", image: "/sdg/10.png" },
  { number: 11, title: "Sustainable Cities", color: "#FD9D24", image: "/sdg/E_WEB_11.png" },
  { number: 17, title: "Partnerships", color: "#19486A", image: "/sdg/E_WEB_17.png" },
];

export function SDGGrid() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6 w-full max-w-7xl mx-auto px-4"
      role="list"
      aria-label="Sustainable Development Goals Alignment"
    >
      {goals.map((goal, index) => {
        const isLast = index === goals.length - 1;

        const cardStyle = {
          "--goal-color": goal.color,
          "--goal-glow": `color-mix(in srgb, ${goal.color} 15%, transparent)`,
          "--goal-shadow-hover": `0 20px 25px -5px color-mix(in srgb, ${goal.color} 25%, transparent), 0 10px 10px -5px color-mix(in srgb, ${goal.color} 15%, transparent)`,
          "--goal-border-box": `color-mix(in srgb, ${goal.color} 15%, transparent)`,
          "--goal-border-box-hover": `color-mix(in srgb, ${goal.color} 40%, transparent)`,
          "--goal-accent-gradient": `linear-gradient(90deg, ${goal.color}, color-mix(in srgb, ${goal.color} 35%, transparent))`,
        } as React.CSSProperties;

        return (
          <div
            key={goal.number}
            style={cardStyle}
            role="listitem"
            tabIndex={0}
                className={[
                  // Shared base
                  "group relative aspect-square cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--goal-color)] focus-visible:ring-offset-2",
                  "dark:focus-visible:ring-offset-slate-950 motion-reduce:transition-none motion-reduce:transform-none",

                  // Mobile/tablet: white card with border, shadow, rounded corners
                  "bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-2xl",
                  "shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.12)]",
                  "hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:border-slate-200/80",
                  "p-3",

                  // Desktop: remove card background, border, shadow, padding — bare image only
                  "lg:bg-transparent lg:dark:bg-transparent lg:border-transparent lg:dark:border-transparent",
                  "lg:shadow-none hover:lg:shadow-none lg:p-0",

                  // Same size on all screens; center last item if alone on row
                  "w-full max-w-[130px] mx-auto lg:max-w-none lg:mx-0",
                  isLast && "col-span-2 justify-self-center lg:col-span-1 lg:justify-self-auto",
                ].join(" ")}
          >
            {/* Screen Reader Only */}
            <span className="sr-only">SDG Goal {goal.number}: {goal.title}</span>

            {/* Top Accent Line — mobile/tablet only */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-75 group-hover:opacity-100 group-hover:h-[4px] transition-all duration-300 ease-out lg:hidden motion-reduce:transition-none"
              style={{ background: "var(--goal-accent-gradient)" }}
            />

            {/* Soft Glow behind image */}
            <div
              className="absolute inset-0 rounded-2xl bg-[var(--goal-glow)] blur-lg group-hover:blur-xl transition-all duration-300 ease-out scale-105 group-hover:scale-115 opacity-80 group-hover:opacity-100 pointer-events-none motion-reduce:transition-none"
            />

            {/* Image container */}
            <div
              className={[
                "relative z-10 w-full h-full overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none",
                // Mobile: inner image box with soft border
                "rounded-xl border border-[var(--goal-border-box)] group-hover:border-[var(--goal-border-box-hover)] bg-slate-50/50 dark:bg-slate-800/30",
                // Desktop: no inner border/bg, full rounded card is just the image
                "lg:rounded-2xl lg:border-transparent lg:dark:border-transparent lg:bg-transparent lg:dark:bg-transparent",
                "hover:shadow-[var(--goal-shadow-hover)]",
              ].join(" ")}
            >
              <img
                src={goal.image}
                alt={`UN Sustainable Development Goal ${goal.number} - ${goal.title}`}
                className="w-full h-full object-cover opacity-95 saturate-95 group-hover:opacity-100 group-hover:saturate-100 transition-all duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none"
                loading="lazy"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
