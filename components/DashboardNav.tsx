'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, CalendarDays } from 'lucide-react';

export default function DashboardNav() {
  const pathname = usePathname();
  const analytics = pathname.startsWith('/analytics');

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-950">Connextium · AGENTICS FOUNDATION · TOKEN2049 Singapore</div>
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">Event intelligence dashboard</div>
        </Link>
        <nav className="flex rounded-xl bg-slate-100 p-1" aria-label="Dashboard views">
          <Link href="/" className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${!analytics ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            <CalendarDays size={14} /> Itinerary
          </Link>
          <Link href="/analytics" className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${analytics ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            <BarChart3 size={14} /> Analytics
          </Link>
        </nav>
      </div>
    </header>
  );
}
