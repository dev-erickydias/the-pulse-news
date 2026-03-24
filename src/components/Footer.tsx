import Link from "next/link";
import { CATEGORIES } from "@/types/news";

export function Footer() {
  return (
    <footer className="bg-navy text-white/70 mt-20">
      <div className="h-1 bg-gradient-to-r from-accent via-gold to-accent" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-3xl font-bold text-white mb-4">
              The Pulse
            </h3>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Your trusted source for quality news and in-depth analysis
              on the events shaping the world.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-5 font-body font-medium">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-white/40 mb-5 font-body font-medium">
              About
            </h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Contact
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 tracking-wide">
            &copy; {new Date().getFullYear()} The Pulse. All rights reserved.
          </p>
          <p className="text-xs text-white/20 tracking-wide font-mono">
            Powered by NewsAPI
          </p>
        </div>
      </div>
    </footer>
  );
}
