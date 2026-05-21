import { ReactNode, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface StatCounterProps {
  value: string;
  label: string;
  icon?: ReactNode;
  color?: "navy" | "purple" | "orange" | "teal" | "white";
  className?: string;
}

function parseNumeric(value: string): { number: number; prefix: string; suffix: string } {
  const match = value.match(/^([^\d.-]*)([\d.,]+)(.*)$/);
  if (!match) return { number: 0, prefix: "", suffix: value };
  const num = parseFloat(match[2].replace(/,/g, ""));
  return {
    number: isNaN(num) ? 0 : num,
    prefix: match[1] ?? "",
    suffix: match[3] ?? "",
  };
}

export function StatCounter({ value, label, icon, color = "navy", className = "" }: StatCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { number, prefix, suffix } = parseNumeric(value);
  const isInteger = Number.isInteger(number);

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1800, bounce: 0 });
  const display = useTransform(spring, (v) => {
    const n = isInteger ? Math.round(v) : Math.round(v * 10) / 10;
    return `${prefix}${n.toLocaleString("en-IN")}${suffix}`;
  });
  const [text, setText] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  useEffect(() => {
    if (isInView) motionVal.set(number);
  }, [isInView, motionVal, number]);

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
      <div
        className={`text-4xl md:text-5xl font-black mb-2 tracking-tight tabular-nums ${colorClasses[color]}`}
        aria-label={value}
      >
        {text}
      </div>
      <div className={`font-semibold tracking-wide uppercase text-sm ${color === "white" ? "text-white/80" : "text-slate-600"}`}>
        {label}
      </div>
    </motion.div>
  );
}
