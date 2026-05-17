import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NewsStateBlockProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function NewsStateBlock({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: NewsStateBlockProps) {
  return (
    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center md:px-10">
      <div className="mx-auto max-w-2xl">
        <div className="text-[11px] font-black uppercase tracking-[0.32em] text-slate-500">
          {eyebrow}
        </div>
        <h2 className="mt-4 text-2xl font-black text-navy md:text-3xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
        {ctaLabel && ctaHref ? (
          <Button asChild className="mt-8 bg-navy text-white hover:bg-navy/90">
            <Link to={ctaHref}>{ctaLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
