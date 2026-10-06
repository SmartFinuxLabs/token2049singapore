'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, CalendarDays, BookOpen, ChevronDown } from 'lucide-react';

export default function DashboardNav() {
  const pathname = usePathname();
  const [blogsOpen, setBlogsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAnalytics = pathname.startsWith('/analytics');
  const isBlogs = pathname.startsWith('/blogs');
  const isItinerary = !isAnalytics && !isBlogs;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setBlogsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setBlogsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950">Connextium · AGENTICS FOUNDATION · TOKEN2049 Singapore</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">Event intelligence dashboard</div>
        </Link>
        <nav className="flex items-center rounded-xl bg-slate-100 p-1" aria-label="Dashboard views">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
              isItinerary ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <CalendarDays size={14} /> Itinerary
          </Link>
          <Link
            href="/analytics"
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
              isAnalytics ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 size={14} /> Analytics
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setBlogsOpen((prev) => !prev)}
              onMouseEnter={() => setBlogsOpen(true)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                isBlogs ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-expanded={blogsOpen}
            >
              <BookOpen size={14} /> Blogs <ChevronDown size={12} className={`transition-transform duration-150 ${blogsOpen ? 'rotate-180' : ''}`} />
            </button>
            {blogsOpen && (
              <div
                onMouseLeave={() => setBlogsOpen(false)}
                className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-slate-950/5 z-50"
              >
                <Link href="/blogs/day2" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-100 text-[10px] font-bold text-emerald-800">D2</span>
                  Day 2
                </Link>
                <Link
                  href="/blogs/day1"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[10px] font-bold text-slate-600">D1</span>
                  Day 1
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

