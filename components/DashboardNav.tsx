'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, CalendarDays, BookOpen, ChevronDown, Menu, X } from 'lucide-react';

export default function DashboardNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
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
    function closeMobileOutside(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
        setBlogsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setBlogsOpen(false);
        if (window.matchMedia('(max-width: 767px)').matches && headerRef.current?.contains(document.activeElement)) {
          menuButtonRef.current?.focus();
        }
      }
    }
    document.addEventListener('pointerdown', closeMobileOutside);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('pointerdown', closeMobileOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    setBlogsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="min-w-0 flex-1" onClick={() => { setMobileOpen(false); setBlogsOpen(false); }}>
          <div className="truncate text-sm font-semibold text-slate-950">Connextium · AGENTICS FOUNDATION · TOKEN2049 Singapore</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">Event intelligence dashboard</div>
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="dashboard-navigation"
          onClick={() => { setMobileOpen((open) => !open); setBlogsOpen(false); }}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 md:hidden"
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <nav
          id="dashboard-navigation"
          className={`${mobileOpen ? 'flex' : 'hidden'} w-full flex-col items-stretch rounded-xl bg-slate-100 p-1 md:flex md:w-auto md:flex-row md:items-center`}
          aria-label="Dashboard views"
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('a')) {
              setMobileOpen(false);
              setBlogsOpen(false);
            }
          }}
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm md:py-2 md:text-xs font-semibold transition ${
              isItinerary ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <CalendarDays size={14} /> Itinerary
          </Link>
          <Link
            href="/analytics"
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-3 text-sm md:py-2 md:text-xs font-semibold transition ${
              isAnalytics ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <BarChart3 size={14} /> Analytics
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setBlogsOpen((prev) => !prev)}
              onMouseEnter={() => { if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) setBlogsOpen(true); }}
              className={`inline-flex w-full items-center gap-1.5 rounded-lg px-3 py-3 text-sm md:py-2 md:text-xs font-semibold transition ${
                isBlogs ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              aria-expanded={blogsOpen}
              aria-controls="blog-navigation"
            >
              <BookOpen size={14} /> Blogs <ChevronDown size={12} className={`transition-transform duration-150 ${blogsOpen ? 'rotate-180' : ''}`} />
            </button>
            {blogsOpen && (
              <div
                id="blog-navigation"
                onMouseLeave={() => { if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) setBlogsOpen(false); }}
                className="relative mt-1.5 w-full md:absolute md:right-0 md:top-full md:w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ring-1 ring-slate-950/5 z-50"
              >
                <Link href="/blogs/day3" className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm md:py-2 md:text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-100 text-[10px] font-bold text-emerald-800">D3</span>
                  Day 3
                </Link>
                <Link href="/blogs/day2" className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm md:py-2 md:text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-100 text-[10px] font-bold text-emerald-800">D2</span>
                  Day 2
                </Link>
                <Link
                  href="/blogs/day1"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm md:py-2 md:text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition"
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

