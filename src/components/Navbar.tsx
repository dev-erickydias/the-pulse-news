"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/types/news";
import { SearchBar } from "./SearchBar";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          {/* Menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>

          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
              The Pulse
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted font-body mt-1">
              Premium News & Analysis
            </span>
          </Link>

          {/* Search */}
          <div className="hidden lg:block w-64">
            <SearchBar />
          </div>
          <div className="lg:hidden w-10" />
        </div>
      </div>

      {/* Category nav - desktop */}
      <nav className="hidden lg:block border-t border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-0">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="block px-5 py-3 text-[13px] tracking-[0.08em] uppercase font-medium text-muted hover:text-ink hover:bg-cream/50 transition-all duration-300 relative group"
                >
                  {cat.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-3/4 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-screen border-b border-ink/10" : "max-h-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          <div className="mb-4">
            <SearchBar />
          </div>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm tracking-wide uppercase text-muted hover:text-ink hover:bg-cream/60 rounded-lg transition-all"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
