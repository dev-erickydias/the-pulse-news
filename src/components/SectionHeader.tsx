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
    <div className="mb-6">
      {accent && <div className="rule-thick mb-0" />}
      <div className={`flex items-center gap-3 ${accent ? "pt-2" : ""}`}>
        <h2 className="font-heading text-2xl md:text-3xl font-black tracking-tight uppercase">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-[12px] text-muted tracking-wide font-serif mt-1">{subtitle}</p>
      )}
      <div className="rule-thin mt-3" />
    </div>
  );
}
