"use client";

const TICKER_ITEMS = [
  "Global markets rally as economic data exceeds expectations",
  "Breakthrough in quantum computing could transform industry",
  "Climate summit: world leaders agree on new emissions targets",
  "AI revolution reshaping healthcare and diagnostics",
  "Space exploration: new mission to Mars launch date confirmed",
];

export function BreakingNewsTicker() {
  return (
    <div className="bg-ink text-paper overflow-hidden py-2 relative z-50">
      <div className="flex items-center">
        <span className="bg-accent text-white text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1 mr-4 ml-4 shrink-0">
          Breaking
        </span>
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <div className="inline-flex animate-marquee">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span
                key={i}
                className="text-sm font-body tracking-wide mx-8 text-warm-gray"
              >
                {item}
                <span className="mx-8 text-accent">&#x2022;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
