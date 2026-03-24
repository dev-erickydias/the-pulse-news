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
      className={`inline-block px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
        active
          ? "bg-ink text-paper border-ink"
          : "bg-transparent text-muted border-ink/15 hover:border-ink/40 hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
