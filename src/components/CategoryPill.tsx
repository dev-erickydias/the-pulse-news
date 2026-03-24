import Link from "next/link";

interface CategoryPillProps {
  label: string;
  slug: string;
  active?: boolean;
}

export function CategoryPill({ label, slug, active = false }: CategoryPillProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className={`inline-block px-4 py-1.5 text-[11px] tracking-[0.12em] uppercase font-serif font-bold transition-all duration-200 border ${
        active
          ? "bg-ink text-paper border-ink"
          : "bg-transparent text-muted border-rule-light hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
