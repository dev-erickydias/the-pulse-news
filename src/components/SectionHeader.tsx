interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  accent = false,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-3">
        {accent && <div className="w-8 h-1 bg-accent rounded-full" />}
        <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-sm text-muted tracking-wide pl-12">{subtitle}</p>
      )}
      <div className="editorial-divider mt-4" />
    </div>
  );
}
