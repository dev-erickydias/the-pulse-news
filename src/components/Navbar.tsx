"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/types/news";
import { SearchBar } from "./SearchBar";

function getTodayFormatted() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/98 backdrop-blur-sm">
      {/* Top info bar */}
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-[11px] tracking-wide text-muted rule-hairline">
          <span className="font-serif hidden sm:inline">{getTodayFormatted()}</span>
          <span className="font-serif sm:hidden text-[10px]">{getTodayFormatted()}</span>
          <div className="hidden lg:block w-60">
            <SearchBar />
          </div>
          <span className="font-serif hidden sm:inline">Today&apos;s Edition</span>
        </div>
      </div>

      {/* Masthead */}
      <div className="max-w-[1200px] mx-auto px-4 pt-3 pb-2">
        <div className="rule-thick" />
        <div className="flex items-center justify-between py-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
            </div>
          </button>

          <Link href="/" className="flex-1 text-center">
            <h1 className="font-heading text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-tight leading-[0.9] py-2">
              The Daily Broadsheet
            </h1>
          </Link>

          <div className="lg:hidden w-10" />
        </div>
        <div className="rule-double" />
      </div>

      {/* Category nav — desktop */}
      <nav className="hidden lg:block">
        <div className="max-w-[1200px] mx-auto px-4">
          <ul className="flex items-center justify-center">
            {CATEGORIES.map((cat, i) => (
              <li key={cat.slug} className="flex items-center">
                {i > 0 && (
                  <span className="text-rule-light mx-1 text-xs select-none">|</span>
                )}
                <Link
                  href={`/category/${cat.slug}`}
                  className="px-3 py-2 text-[12px] tracking-[0.1em] uppercase font-serif font-bold text-ink/70 hover:text-accent transition-colors duration-200"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="rule-thin" />
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 py-3 space-y-0.5">
          <div className="mb-3">
            <SearchBar />
          </div>
          <div className="rule-thin mb-2" />
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-2.5 text-[12px] tracking-[0.1em] uppercase font-serif font-bold text-ink/70 hover:text-accent transition-colors"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
