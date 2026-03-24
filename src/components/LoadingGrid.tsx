export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse p-6 rounded-2xl border border-ink/6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-5 bg-cream rounded-full w-20" />
            <div className="h-3 bg-cream rounded w-12" />
          </div>
          <div className="space-y-3">
            <div className="h-5 bg-cream rounded w-full" />
            <div className="h-5 bg-cream rounded w-3/4" />
            <div className="h-4 bg-cream rounded w-full mt-4" />
            <div className="h-4 bg-cream rounded w-2/3" />
          </div>
          <div className="h-3 bg-cream rounded w-40 mt-6 pt-4 border-t border-ink/6" />
        </div>
      ))}
    </div>
  );
}

export function LoadingHero() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="editorial-divider-double mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
        <div className="lg:col-span-3 space-y-4">
          <div className="h-4 bg-cream rounded w-24" />
          <div className="h-10 bg-cream rounded w-full" />
          <div className="h-10 bg-cream rounded w-3/4" />
          <div className="h-5 bg-cream rounded w-full mt-4" />
          <div className="h-5 bg-cream rounded w-2/3" />
        </div>
        <div className="lg:col-span-2 lg:border-l lg:border-ink/10 lg:pl-10 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 pb-5 border-b border-ink/8">
              <div className="h-3 bg-cream rounded w-16" />
              <div className="h-5 bg-cream rounded w-full" />
              <div className="h-5 bg-cream rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
