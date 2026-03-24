import Link from "next/link";
import { CATEGORIES } from "@/types/news";

export function Footer() {
  return (
    <footer className="mt-16">
      {/* Thick rule */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="rule-thick" />
      </div>

      <div className="bg-ink text-white/60">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="font-heading text-3xl font-black text-white mb-3">
                The Daily Broadsheet
              </h3>
              <p className="font-serif text-[13px] leading-relaxed text-white/40 max-w-md">
                Delivering quality journalism and in-depth reporting since the dawn of the digital age.
                Your trusted source for the stories that matter.
              </p>
            </div>

            {/* Sections */}
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4 font-serif font-bold">
                Sections
              </h4>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="text-[13px] font-serif text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4 font-serif font-bold">
                About
              </h4>
              <ul className="space-y-2 text-[13px] font-serif text-white/50">
                <li><span className="hover:text-white transition-colors cursor-pointer">About Us</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Contact</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-white/25 tracking-wide font-serif">
              &copy; {new Date().getFullYear()} The Daily Broadsheet. All rights reserved.
            </p>
            <p className="text-[10px] text-white/15 tracking-wide font-mono">
              Powered by NewsAPI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
