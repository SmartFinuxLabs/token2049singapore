'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, EyeOff, MapPin, X } from 'lucide-react';
import { lumaStatusLabels, priorityLabels, type EventItem, type Priority } from '@/lib/events';
import { useItineraryStore } from '@/lib/store';

const HOUR_PX = 64;
const GUTTER = 72;
const MOBILE_PX_PER_MIN = 1.45;
const MOBILE_CARD_HEIGHT = 106;
const MOBILE_LANE_OFFSET = 58;

function toMinutes(value: string) {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
}

function eventRange(event: EventItem) {
  const start = toMinutes(event.start);
  let end = toMinutes(event.end);
  if (end <= start) end += 24 * 60;
  return { start, end };
}

function floorHour(mins: number) {
  return Math.floor(mins / 60) * 60;
}

function ceilHour(mins: number) {
  return Math.ceil(mins / 60) * 60;
}

function formatHour(mins: number) {
  const normalized = ((mins % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(normalized / 60);
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

function priorityZ(priority: Priority) {
  if (priority === 'primary') return 30;
  if (priority === 'secondary') return 20;
  return 10;
}

export default function TimelineDay({ date, events }: { date: string; events: EventItem[] }) {
  const { hidden, priorities, toggleHidden, setPriority } = useItineraryStore();
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [frontEventId, setFrontEventId] = useState<string | null>(null);

  const layout = useMemo(() => {
    const sorted = [...events].sort((a, b) => {
      const ar = eventRange(a);
      const br = eventRange(b);
      return ar.start - br.start || ar.end - br.end;
    });

    const ranges = sorted.map((event) => ({ event, ...eventRange(event) }));
    const minStart = Math.min(...ranges.map((item) => item.start));
    const maxEnd = Math.max(...ranges.map((item) => item.end));
    const dayStart = Math.max(0, floorHour(minStart - 30));
    const dayEnd = ceilHour(maxEnd + 30);

    const columnEnds: number[] = [];
    const placed = ranges.map(({ event, start, end }) => {
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

  const hours = useMemo(() => {
    const values: number[] = [];
    for (let t = layout.dayStart; t <= layout.dayEnd; t += 60) values.push(t);
    return values;
  }, [layout.dayStart, layout.dayEnd]);

  const totalHeight = ((layout.dayEnd - layout.dayStart) / 60) * HOUR_PX;
  const mobileTrackWidth = Math.max((layout.dayEnd - layout.dayStart) * MOBILE_PX_PER_MIN + 96, 720);
  const mobileTrackHeight = 82 + Math.min(layout.columns, 4) * MOBILE_LANE_OFFSET + MOBILE_CARD_HEIGHT;

  function overlapGroup(item: (typeof layout.placed)[number]) {
    return layout.placed
      .filter((other) => other.start < item.end && other.end > item.start)
      .sort((a, b) => a.start - b.start || a.end - b.end || a.event.title.localeCompare(b.event.title));
  }

  function cycleOverlap(item: (typeof layout.placed)[number], direction: -1 | 1) {
    const group = overlapGroup(item);
    if (group.length === 0) return;

    const currentId = frontEventId && group.some((candidate) => candidate.event.id === frontEventId)
      ? frontEventId
      : item.event.id;
    const currentIndex = Math.max(0, group.findIndex((candidate) => candidate.event.id === currentId));
    const nextIndex = (currentIndex + direction + group.length) % group.length;
    setFrontEventId(group[nextIndex].event.id);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
      <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{date}</div>
            <div className="mt-1 text-sm leading-5 text-slate-500 md:hidden">Swipe the time bar. Tap a card to open it; tap its left or right edge to bring overlapping events to the front.</div>
            <div className="mt-1 hidden text-sm text-slate-500 md:block">Click any event card to open details. Overlaps are stacked side-by-side.</div>
          </div>
          <div className="text-xs font-medium text-slate-400">{events.length} events · Singapore time</div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="overflow-x-auto overscroll-x-contain px-2 pb-3 pt-2 [scrollbar-width:thin]" style={{ touchAction: 'pan-x pan-y' }}>
          <div className="relative" style={{ width: mobileTrackWidth, height: mobileTrackHeight }}>
            <div className="absolute left-8 right-8 top-10 h-px bg-slate-300" />

            {hours.map((hour) => {
              const left = 32 + (hour - layout.dayStart) * MOBILE_PX_PER_MIN;
              return (
                <div key={hour} className="absolute top-5" style={{ left }}>
                  <div className="h-5 w-px bg-slate-300" />
                  <div className="mt-1 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tabular-nums text-slate-400">{formatHour(hour)}</div>
                </div>
              );
            })}

            {layout.placed.map((item) => {
              const { event, start, end, column } = item;
              const effectivePriority = priorities[event.id] ?? event.priority;
              const hiddenNow = hidden.includes(event.id);
              const front = frontEventId === event.id;
              const group = overlapGroup(item);
              const hasOverlap = group.length > 1;
              const left = 32 + (start - layout.dayStart) * MOBILE_PX_PER_MIN;
              const durationWidth = (end - start) * MOBILE_PX_PER_MIN;
              const width = Math.max(156, Math.min(durationWidth, 238));
              const top = 68 + Math.min(column, 3) * MOBILE_LANE_OFFSET;

              return (
                <div
                  key={event.id}
                  className={`absolute origin-center transition-all duration-200 ${hiddenNow ? 'opacity-35' : ''}`}
                  style={{
                    left,
                    top,
                    width,
                    height: MOBILE_CARD_HEIGHT,
                    zIndex: front ? 90 : priorityZ(effectivePriority) + Math.max(0, 6 - column),
                    transform: front ? 'translateY(-8px) scale(1.025)' : undefined,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setFrontEventId(event.id);
                      setSelected(event);
                    }}
                    className={`absolute inset-0 overflow-hidden rounded-2xl border border-l-4 px-8 py-3 text-left shadow-sm transition ${front ? 'shadow-xl ring-2 ring-blue-500/30' : 'shadow-md'} ${attendanceClass(event.lumaStatus)}`}
                    aria-label={`Open ${event.title}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[10px] font-bold uppercase tracking-wide text-slate-500">{event.start}–{event.end}</span>
                      <span className="shrink-0 rounded-full bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500">{priorityLabels[effectivePriority]}</span>
                    </div>
                    <div className="mt-1 line-clamp-2 text-[13px] font-semibold leading-4 text-slate-950">{event.title}</div>
                    <div className="mt-1 truncate text-[11px] text-slate-500">{event.location}</div>
                  </button>

                  {hasOverlap && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          cycleOverlap(item, -1);
                        }}
                        className="absolute inset-y-0 left-0 z-[100] flex w-8 items-center justify-center rounded-l-2xl bg-white/30 text-slate-500 backdrop-blur-[1px] active:bg-white/80"
                        aria-label={`Show previous overlapping event near ${event.start}`}
                      >
                        <ChevronLeft size={17} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          cycleOverlap(item, 1);
                        }}
                        className="absolute inset-y-0 right-0 z-[100] flex w-8 items-center justify-center rounded-r-2xl bg-white/30 text-slate-500 backdrop-blur-[1px] active:bg-white/80"
                        aria-label={`Show next overlapping event near ${event.start}`}
                      >
                        <ChevronRight size={17} />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400">
          <span>← swipe time →</span>
          <span>edge tap switches overlap</span>
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
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

          <div className="absolute bottom-0 left-[70px] top-0 w-px bg-slate-300" />

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
                style={{ top: top + 3, height: height - 6, left, width, zIndex: priorityZ(effectivePriority) }}
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
          <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-3xl sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-200 sm:hidden" />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{priorityLabels[priorities[selected.id] ?? selected.priority]}</span>
                  {selected.lumaStatus && <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">{lumaStatusLabels[selected.lumaStatus]}</span>}
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">{selected.title}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{selected.host}</p>
              </div>
              <button onClick={() => setSelected(null)} className="shrink-0 rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="Close details"><X size={20} /></button>
            </div>

            <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-2">
              <div><span className="font-semibold">Time:</span> {selected.start}–{selected.end}</div>
              <a href={googleMapsUrl(selected)} target="_blank" rel="noreferrer" className="group flex items-start gap-2 rounded-xl -m-2 p-2 hover:bg-blue-50" aria-label={`Open ${selected.location} in Google Maps`}>
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

            <div className="mt-5 grid gap-2 sm:flex sm:flex-wrap sm:items-center">
              <select value={priorities[selected.id] ?? selected.priority} onChange={(e) => setPriority(selected.id, e.target.value as Priority)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium sm:w-auto">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="third">3rd option</option>
              </select>
              <button onClick={() => toggleHidden(selected.id)} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium hover:bg-slate-50 sm:w-auto">
                {hidden.includes(selected.id) ? <Eye size={16} /> : <EyeOff size={16} />} {hidden.includes(selected.id) ? 'Show event' : 'Hide event'}
              </button>
              {selected.luma && <a href={selected.luma} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white sm:w-auto">Luma <ExternalLink size={15} /></a>}
              {selected.source && <a href={selected.source} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium sm:w-auto">Event source <ExternalLink size={15} /></a>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
