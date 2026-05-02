import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StatCounterProps {
  value: string;
  label: string;
  icon?: ReactNode;
  color?: "navy" | "purple" | "orange" | "teal" | "white";
  className?: string;
}

export function StatCounter({ value, label, icon, color = "navy", className = "" }: StatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const colorClasses = {
    navy: "text-navy",
    purple: "text-purple",
    orange: "text-orange",
    teal: "text-teal",
    white: "text-white"
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col items-center justify-center p-6 text-center ${className}`}
      data-testid={`stat-counter-${label.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {icon && (
        <div className={`mb-3 ${colorClasses[color]} opacity-90`}>
          {icon}
        </div>
      )}
      <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tight ${colorClasses[color]}`}>
        {isInView ? value : "0"}
      </div>
      <div className={`font-semibold tracking-wide uppercase text-sm ${color === "white" ? "text-white/80" : "text-slate-600"}`}>
        {label}
      </div>
    </motion.div>
  );
}
