'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Eye, EyeOff, Filter, MessageCircle, Route, Share2 } from 'lucide-react';
import TimelineDay from '@/components/TimelineDay';
import { events, lumaStatusLabels, type EventItem, type LumaStatus } from '@/lib/events';
import { useItineraryStore } from '@/lib/store';

const RouteMap = dynamic(() => import('@/components/RouteMap'), { ssr: false });
type StatusFilter = 'all' | LumaStatus;

function prettyDate(value: string) {
  return new Intl.DateTimeFormat('en-SG', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Singapore',
  }).format(new Date(`${value}T12:00:00+08:00`));
}

function googleMapsUrl(event: EventItem) {
  const query = event.address || `${event.location}, Singapore`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.title}, ${query}`)}`;
}

export default function HomePage() {
  const { hidden, priorities, comments, addComment } = useItineraryStore();
  const [showHidden, setShowHidden] = useState(false);
  const [dayFilter, setDayFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [activeRouteEventId, setActiveRouteEventId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const availableDays = useMemo(() => [...new Set(events.map((e) => e.date))].sort(), []);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => showHidden || !hidden.includes(e.id))
      .filter((e) => dayFilter === 'all' || e.date === dayFilter)
      .filter((e) => statusFilter === 'all' || e.lumaStatus === statusFilter);
  }, [hidden, showHidden, dayFilter, statusFilter]);

  const days = useMemo(() => {
    const grouped = new Map<string, EventItem[]>();
    for (const event of filteredEvents) {
      if (!grouped.has(event.date)) grouped.set(event.date, []);
      grouped.get(event.date)!.push(event);
    }
    return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filteredEvents]);

  const suggested = useMemo(() => {
    return events
      .filter((e) => !hidden.includes(e.id))
      .filter((e) => statusFilter === 'all' || e.lumaStatus === statusFilter)
      .map((e) => ({ ...e, effectivePriority: priorities[e.id] ?? e.priority }))
      .filter((e) => e.effectivePriority === 'primary')
      .sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start));
  }, [hidden, priorities, statusFilter]);

  async function share() {
    const data = {
      title: 'Connextium · TOKEN2049 Singapore itinerary',
      text: 'My dynamic TOKEN2049 Singapore 2026 itinerary.',
      url: window.location.href,
    };
    if (navigator.share) await navigator.share(data);
    else await navigator.clipboard.writeText(window.location.href);
  }

  return (
    <main className="min-h-screen">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Connextium · Singapore 2026</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl">TOKEN2049 itinerary, optimized for capital, partners and financial infrastructure.</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">Each day is shown as a vertical time schedule. Events are positioned against their actual time range; overlapping sessions stack side-by-side and remain clickable for full details.</p>
            </div>
            <button onClick={share} className="inline-flex w-fit items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-card hover:bg-blue-500">
              <Share2 size={17} /> Share itinerary
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Oct 4–10', 'Planning window'],
              [`${events.length}`, 'Tracked events'],
              [`${events.filter((e) => e.lumaStatus === 'approved').length}`, "You're in"],
              [`${events.filter((e) => e.lumaStatus === 'pending_approval').length}`, 'Pending approval'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xl font-semibold text-slate-950">{value}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500"><Filter size={16} /> Filters</div>
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
            <label className="text-sm font-medium text-slate-700">
              Day
              <select value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
                <option value="all">All days · Oct 4–10</option>
                {availableDays.map((date) => <option key={date} value={date}>{prettyDate(date)}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-slate-700">
              Status
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
                <option value="all">All statuses</option>
                <option value="approved">You're in</option>
                <option value="pending_approval">Pending approval</option>
                <option value="waitlist">Waitlist</option>
                <option value="invited">Invited</option>
                <option value="not_found">Not in Luma</option>
                <option value="external">External pass</option>
              </select>
            </label>
            <div className="flex items-end gap-2">
              <button onClick={() => { setDayFilter('all'); setStatusFilter('all'); }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50">Reset</button>
              <button onClick={() => setShowHidden((x) => !x)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50">
                {showHidden ? <EyeOff size={16} /> : <Eye size={16} />} {showHidden ? 'Hide excluded' : 'Show excluded'}
              </button>
            </div>
          </div>
          <div className="text-sm text-slate-500">Showing {filteredEvents.length} of {events.length} tracked events.</div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Daily timeline</h2>
          <p className="mt-1 text-sm text-slate-500">Singapore time. Event height reflects duration. Overlaps are assigned separate columns; tap/click any visible event edge to open its detail sheet and adjust priority or visibility.</p>
        </div>

        <div className="space-y-8">
          {days.length === 0 && <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No events match the current filters.</div>}
          {days.map(([date, dayEvents]) => <TimelineDay key={date} date={prettyDate(date)} events={dayEvents} />)}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-blue-600"><Route size={20} /><span className="text-sm font-semibold uppercase tracking-[0.15em]">Suggested route</span></div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Minimize travel; maximize confirmed conversations.</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-500">Primary itinerary items matching the selected status are plotted on the map. Hover a route item to highlight its map point. Click an item to open its venue directly in Google Maps.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                {suggested.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">No primary route events match the selected status.</div>}
                {suggested.map((event, index) => {
                  const active = activeRouteEventId === event.id;
                  return (
                    <a
                      key={event.id}
                      href={googleMapsUrl(event)}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => setActiveRouteEventId(event.id)}
                      onMouseLeave={() => setActiveRouteEventId(null)}
                      onFocus={() => setActiveRouteEventId(event.id)}
                      onBlur={() => setActiveRouteEventId(null)}
                      className={`group flex gap-3 rounded-2xl border p-4 transition ${active ? 'border-blue-300 bg-blue-50 shadow-sm' : 'border-transparent bg-slate-50 hover:border-blue-200 hover:bg-blue-50/60'}`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white transition ${active ? 'bg-blue-600 scale-110' : 'bg-slate-950'}`}>{index + 1}</div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-950">{prettyDate(event.date)} · {event.start} · {event.title}</div>
                        <div className="mt-1 text-sm text-slate-500">{event.location} · {lumaStatusLabels[event.lumaStatus ?? 'external']}</div>
                        {event.address && <div className="mt-1 truncate text-xs text-slate-400">{event.address}</div>}
                      </div>
                    </a>
                  );
                })}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-500">Routing rule: confirmed pitch/demo slot &gt; confirmed investor meeting &gt; approved curated institutional session &gt; passive networking. Re-check Luma before departure because status and venue details can change.</p>
            </div>
            <RouteMap events={suggested} activeEventId={activeRouteEventId} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2 text-blue-600"><MessageCircle size={20} /><span className="text-sm font-semibold uppercase tracking-[0.15em]">Comments</span></div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Working notes and social feedback.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">No database is used. Comments are stored only in the current browser/device.</p>
            <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); if (!comment.trim()) return; addComment(name.trim() || 'Guest', comment.trim()); setComment(''); }}>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a note or comment..." rows={4} className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400" />
              <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Post comment</button>
            </form>
          </div>
          <div className="space-y-3">
            {comments.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No comments yet.</div>
            ) : comments.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3"><strong>{item.name}</strong><span className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</span></div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-slate-500 sm:px-8">Connextium · TOKEN2049 Singapore 2026 · Luma registration data synced for Oct 4–10. Event details can change; re-check the Luma or source page before travel.</div>
      </footer>
    </main>
  );
}
