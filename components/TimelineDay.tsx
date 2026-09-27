'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Eye, EyeOff, MapPin, X } from 'lucide-react';
import { lumaStatusLabels, priorityLabels, type EventItem, type Priority } from '@/lib/events';
import { useItineraryStore } from '@/lib/store';

const HOUR_PX = 64;
const GUTTER = 72;

function toMinutes(value: string) {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
}

function floorHour(mins: number) {
  return Math.floor(mins / 60) * 60;
}

function ceilHour(mins: number) {
  return Math.ceil(mins / 60) * 60;
}

function formatHour(mins: number) {
  const h = Math.floor(mins / 60);
  return `${String(h).padStart(2, '0')}:00`;
}

function googleMapsUrl(event: EventItem) {
  const query = event.address || `${event.location}, Singapore`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function attendanceClass(status?: EventItem['lumaStatus']) {
  if (status === 'approved') return 'border-emerald-300 bg-emerald-50';
  if (status === 'pending_approval') return 'border-amber-300 bg-amber-50';
  if (status === 'waitlist') return 'border-violet-300 bg-violet-50';
  if (status === 'invited') return 'border-cyan-300 bg-cyan-50';
  return 'border-slate-300 bg-white';
}

export default function TimelineDay({ date, events }: { date: string; events: EventItem[] }) {
  const { hidden, priorities, toggleHidden, setPriority } = useItineraryStore();
  const [selected, setSelected] = useState<EventItem | null>(null);

  const layout = useMemo(() => {
    const sorted = [...events].sort((a, b) => toMinutes(a.start) - toMinutes(b.start) || toMinutes(a.end) - toMinutes(b.end));
    const minStart = Math.min(...sorted.map((e) => toMinutes(e.start)));
    const maxEnd = Math.max(...sorted.map((e) => toMinutes(e.end)));
    const dayStart = Math.max(0, floorHour(minStart - 30));
    const dayEnd = Math.min(24 * 60, ceilHour(maxEnd + 30));

    const columnEnds: number[] = [];
    const placed = sorted.map((event) => {
      const start = toMinutes(event.start);
      const end = toMinutes(event.end);
      let column = columnEnds.findIndex((columnEnd) => columnEnd <= start);
      if (column === -1) {
        column = columnEnds.length;
        columnEnds.push(end);
      } else {
        columnEnds[column] = end;
      }
      return { event, start, end, column };
    });

    return { dayStart, dayEnd, columns: Math.max(columnEnds.length, 1), placed };
  }, [events]);

  const totalHeight = ((layout.dayEnd - layout.dayStart) / 60) * HOUR_PX;
  const hours = [];
  for (let t = layout.dayStart; t <= layout.dayEnd; t += 60) hours.push(t);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{date}</div>
            <div className="mt-1 text-sm text-slate-500">Click any event edge/card to open details. Overlaps are stacked side-by-side.</div>
          </div>
          <div className="text-xs font-medium text-slate-400">{events.length} events · Singapore time</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="relative min-w-[760px]" style={{ height: totalHeight + 24 }}>
          {hours.map((hour) => {
            const top = ((hour - layout.dayStart) / 60) * HOUR_PX;
            return (
              <div key={hour} className="absolute inset-x-0" style={{ top }}>
                <div className="absolute left-0 w-[64px] -translate-y-2 text-right text-xs font-medium tabular-nums text-slate-400">{formatHour(hour)}</div>
                <div className="absolute left-[72px] right-0 border-t border-dashed border-slate-200" />
              </div>
            );
          })}

          <div className="absolute left-[70px] top-0 bottom-0 w-px bg-slate-300" />

          {layout.placed.map(({ event, start, end, column }) => {
            const top = ((start - layout.dayStart) / 60) * HOUR_PX;
            const height = Math.max(((end - start) / 60) * HOUR_PX, 42);
            const hiddenNow = hidden.includes(event.id);
            const effectivePriority = priorities[event.id] ?? event.priority;
            const columnPct = 100 / layout.columns;
            const left = `calc(${GUTTER + 8}px + ${column * columnPct}% - ${(column * (GUTTER + 16)) / layout.columns}px)`;
            const width = `calc(${columnPct}% - ${(GUTTER + 16) / layout.columns + 8}px)`;

            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelected(event)}
                className={`absolute overflow-hidden rounded-r-xl border border-l-4 text-left shadow-sm transition hover:z-30 hover:-translate-y-0.5 hover:shadow-md focus:z-30 focus:outline-none focus:ring-2 focus:ring-blue-500 ${attendanceClass(event.lumaStatus)} ${hiddenNow ? 'opacity-35' : ''}`}
                style={{ top: top + 3, height: height - 6, left, width, zIndex: effectivePriority === 'primary' ? 20 : effectivePriority === 'secondary' ? 15 : 10 }}
                aria-label={`Open ${event.title}`}
              >
                <div className="h-full px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[11px] font-bold uppercase tracking-wide text-slate-500">{event.start}–{event.end}</span>
                    <span className="shrink-0 rounded-full bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">{priorityLabels[effectivePriority]}</span>
                  </div>
                  <div className="mt-1 line-clamp-2 text-sm font-semibold leading-4 text-slate-950">{event.title}</div>
                  {height > 72 && <div className="mt-1 truncate text-xs text-slate-500">{event.host}</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6" onClick={() => setSelected(null)}>
          <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{priorityLabels[priorities[selected.id] ?? selected.priority]}</span>
                  {selected.lumaStatus && <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">{lumaStatusLabels[selected.lumaStatus]}</span>}
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">{selected.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{selected.host}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Close details"><X size={20} /></button>
            </div>

            <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-2">
              <div><span className="font-semibold">Time:</span> {selected.start}–{selected.end}</div>
              <a
                href={googleMapsUrl(selected)}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-2 rounded-xl -m-2 p-2 hover:bg-blue-50"
                aria-label={`Open ${selected.location} in Google Maps`}
              >
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-600" />
                <span className="min-w-0">
                  <span className="block font-semibold text-slate-800 group-hover:text-blue-700">{selected.location}</span>
                  {selected.address && <span className="mt-0.5 block text-xs leading-5 text-slate-500 group-hover:text-blue-600">{selected.address}</span>}
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">Open in Google Maps <ExternalLink size={12} /></span>
                </span>
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selected.tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600">{tag}</span>)}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 p-4 text-sm leading-6 text-slate-700">
              <span className="font-semibold">Route suggestion:</span> {selected.routeHint}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <select value={priorities[selected.id] ?? selected.priority} onChange={(e) => setPriority(selected.id, e.target.value as Priority)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="third">3rd option</option>
              </select>
              <button onClick={() => toggleHidden(selected.id)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium hover:bg-slate-50">
                {hidden.includes(selected.id) ? <Eye size={16} /> : <EyeOff size={16} />} {hidden.includes(selected.id) ? 'Show event' : 'Hide event'}
              </button>
              {selected.luma && <a href={selected.luma} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white">Luma <ExternalLink size={15} /></a>}
              {selected.source && <a href={selected.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium">Event source <ExternalLink size={15} /></a>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
