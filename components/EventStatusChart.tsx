'use client';

import { useMemo, useState } from 'react';
import type { EventItem, LumaStatus } from '@/lib/events';
import { lumaStatusLabels } from '@/lib/events';

type StatusFilter = 'all' | LumaStatus;
type CountMode = 'starts' | 'concurrent';

type Props = {
  events: EventItem[];
  statusFilter: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
};

const statuses: LumaStatus[] = [
  'approved',
  'pending_approval',
  'waitlist',
  'invited',
  'not_found',
  'external',
];

const statusStyles: Record<LumaStatus, { bar: string; chip: string; dot: string }> = {
  approved: {
    bar: 'bg-emerald-500',
    chip: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    dot: 'bg-emerald-500',
  },
  pending_approval: {
    bar: 'bg-amber-400',
    chip: 'border-amber-200 bg-amber-50 text-amber-800',
    dot: 'bg-amber-400',
  },
  waitlist: {
    bar: 'bg-violet-500',
    chip: 'border-violet-200 bg-violet-50 text-violet-800',
    dot: 'bg-violet-500',
  },
  invited: {
    bar: 'bg-cyan-500',
    chip: 'border-cyan-200 bg-cyan-50 text-cyan-800',
    dot: 'bg-cyan-500',
  },
  not_found: {
    bar: 'bg-slate-400',
    chip: 'border-slate-200 bg-slate-50 text-slate-700',
    dot: 'bg-slate-400',
  },
  external: {
    bar: 'bg-blue-500',
    chip: 'border-blue-200 bg-blue-50 text-blue-800',
    dot: 'bg-blue-500',
  },
};

function toMinutes(value: string) {
  const [h = '0', m = '0'] = value.split(':');
  return Number(h) * 60 + Number(m);
}

function dayIndex(date: string, baseDate: string) {
  const start = new Date(`${baseDate}T00:00:00+08:00`).getTime();
  const current = new Date(`${date}T00:00:00+08:00`).getTime();
  return Math.round((current - start) / 86_400_000);
}

function shortDate(date: string) {
  return new Intl.DateTimeFormat('en-SG', {
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Singapore',
  }).format(new Date(`${date}T12:00:00+08:00`));
}

function singaporeParts(timestamp: number) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    timeZone: 'Asia/Singapore',
  }).formatToParts(new Date(timestamp));
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    hour: Number(get('hour')) % 24,
  };
}

export default function EventStatusChart({ events, statusFilter, onStatusChange }: Props) {
  const [countMode, setCountMode] = useState<CountMode>('starts');

  const chart = useMemo(() => {
    if (events.length === 0) {
      return {
        rows: [] as Array<{
          slot: number;
          date: string;
          hour: number;
          startCounts: Record<LumaStatus, number>;
          activeCounts: Record<LumaStatus, number>;
          startTotal: number;
          activeTotal: number;
          total: number;
          counts: Record<LumaStatus, number>;
        }>,
        maxTotal: 0,
        spans: [] as Array<{
          id: string;
          title: string;
          status: LumaStatus;
          startMinute: number;
          endMinute: number;
          date: string;
          start: string;
          end: string;
          lane: number;
        }>,
        laneCount: 0,
        rangeStart: 0,
        rangeEnd: 0,
      };
    }

    const orderedDates = [...new Set(events.map((event) => event.date))].sort();
    const baseDate = orderedDates[0];

    const normalized = events
      .map((event) => {
        const day = dayIndex(event.date, baseDate);
        const start = day * 1440 + toMinutes(event.start);
        let end = day * 1440 + toMinutes(event.end);
        if (end <= start) end += 1440;
        return {
          ...event,
          status: event.lumaStatus ?? 'external',
          startMinute: start,
          endMinute: end,
        };
      })
      .sort((a, b) => a.startMinute - b.startMinute || a.endMinute - b.endMinute);

    const minSlot = Math.floor(Math.min(...normalized.map((event) => event.startMinute)) / 60);
    const maxSlot = Math.ceil(Math.max(...normalized.map((event) => event.endMinute)) / 60);
    const rangeStart = minSlot * 60;
    const rangeEnd = maxSlot * 60;
    const baseTimestamp = new Date(`${baseDate}T00:00:00+08:00`).getTime();

    const rows = Array.from({ length: Math.max(1, maxSlot - minSlot) }, (_, index) => {
      const slot = minSlot + index;
      const slotStart = slot * 60;
      const slotEnd = slotStart + 60;
      const startCounts = Object.fromEntries(statuses.map((status) => [status, 0])) as Record<LumaStatus, number>;
      const activeCounts = Object.fromEntries(statuses.map((status) => [status, 0])) as Record<LumaStatus, number>;

      for (const event of normalized) {
        if (event.startMinute >= slotStart && event.startMinute < slotEnd) startCounts[event.status] += 1;
        if (event.startMinute < slotEnd && event.endMinute > slotStart) activeCounts[event.status] += 1;
      }

      const startTotal = statuses.reduce((sum, status) => {
        if (statusFilter !== 'all' && status !== statusFilter) return sum;
        return sum + startCounts[status];
      }, 0);
      const activeTotal = statuses.reduce((sum, status) => {
        if (statusFilter !== 'all' && status !== statusFilter) return sum;
        return sum + activeCounts[status];
      }, 0);
      const counts = countMode === 'starts' ? startCounts : activeCounts;
      const total = countMode === 'starts' ? startTotal : activeTotal;
      const dt = singaporeParts(baseTimestamp + slot * 60 * 60 * 1000);

      return { slot, date: dt.date, hour: dt.hour, startCounts, activeCounts, startTotal, activeTotal, counts, total };
    });

    const visibleSpans = normalized.filter((event) => statusFilter === 'all' || event.status === statusFilter);
    const laneEnds: number[] = [];
    const spans = visibleSpans.map((event) => {
      let lane = laneEnds.findIndex((end) => end <= event.startMinute);
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(event.endMinute);
      } else {
        laneEnds[lane] = event.endMinute;
      }
      return { ...event, lane };
    });

    return {
      rows,
      maxTotal: Math.max(1, ...rows.map((row) => row.total)),
      spans,
      laneCount: laneEnds.length,
      rangeStart,
      rangeEnd,
    };
  }, [events, statusFilter, countMode]);

  const visibleStatuses = statusFilter === 'all' ? statuses : [statusFilter];
  const rangeMinutes = Math.max(1, chart.rangeEnd - chart.rangeStart);

  return (
    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Event density</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Events by date, time and registration status</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">By default, each event is counted once in the hour it starts. The duration band below the bars shows how long events continue. Switch to Concurrent to inspect scheduling conflicts and active load.</p>
        </div>
        <div className="text-sm text-slate-500">{events.length} events in scope</div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" aria-label="Filter chart by registration status">
          <button
            type="button"
            onClick={() => onStatusChange('all')}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${statusFilter === 'all' ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            All statuses
          </button>
          {statuses.map((status) => {
            const selected = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => onStatusChange(status)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${selected ? 'ring-2 ring-slate-900 ring-offset-1' : ''} ${statusStyles[status].chip}`}
              >
                <span className={`h-2 w-2 rounded-full ${statusStyles[status].dot}`} />
                {lumaStatusLabels[status]}
              </button>
            );
          })}
        </div>

        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1" aria-label="Choose chart count mode">
          <button
            type="button"
            onClick={() => setCountMode('starts')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${countMode === 'starts' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Starts
          </button>
          <button
            type="button"
            onClick={() => setCountMode('concurrent')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${countMode === 'concurrent' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Concurrent
          </button>
        </div>
      </div>

      {chart.rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">No events are available for the current filters.</div>
      ) : (
        <div className="mt-6 overflow-x-auto pb-2">
          <div style={{ minWidth: `${Math.max(900, chart.rows.length * 42)}px` }}>
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
              <span>{countMode === 'starts' ? 'Bar height = distinct events starting in each hour' : 'Bar height = events active during each hour'}</span>
              <span>Hover a bar for starts vs active counts</span>
            </div>

            <div className="relative h-[240px] border-b border-slate-300">
              <div className="absolute inset-x-0 bottom-1/4 border-t border-dashed border-slate-200" />
              <div className="absolute inset-x-0 bottom-2/4 border-t border-dashed border-slate-200" />
              <div className="absolute inset-x-0 bottom-3/4 border-t border-dashed border-slate-200" />

              <div className="absolute inset-0 flex items-end gap-1 px-1">
                {chart.rows.map((row) => (
                  <div key={row.slot} className="flex h-full min-w-0 flex-1 items-end justify-center">
                    <div
                      className="group relative flex w-full max-w-[36px] flex-col-reverse overflow-hidden rounded-t-md bg-slate-100 transition hover:ring-2 hover:ring-blue-300"
                      style={{ height: `${Math.max(row.total > 0 ? 8 : 2, (row.total / chart.maxTotal) * 100)}%` }}
                      title={`${shortDate(row.date)} ${String(row.hour).padStart(2, '0')}:00–${String((row.hour + 1) % 24).padStart(2, '0')}:00 · ${row.startTotal} start${row.startTotal === 1 ? '' : 's'} · ${row.activeTotal} active`}
                    >
                      {visibleStatuses.map((status) => {
                        const count = row.counts[status];
                        if (count === 0 || row.total === 0) return null;
                        return (
                          <div
                            key={status}
                            className={`${statusStyles[status].bar} min-h-[3px] transition-opacity group-hover:opacity-90`}
                            style={{ height: `${(count / row.total) * 100}%` }}
                            title={`${lumaStatusLabels[status]}: ${count}`}
                          />
                        );
                      })}
                      {row.total > 0 && (
                        <span className="pointer-events-none absolute inset-x-0 top-1 text-center text-[10px] font-bold text-slate-900 drop-shadow-sm">{row.total}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/70 px-1 py-2">
              <div className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Duration spans</div>
              <div className="relative" style={{ height: `${Math.max(18, chart.laneCount * 8)}px` }}>
                {chart.spans.map((span) => {
                  const left = ((span.startMinute - chart.rangeStart) / rangeMinutes) * 100;
                  const width = Math.max(0.18, ((span.endMinute - span.startMinute) / rangeMinutes) * 100);
                  return (
                    <div
                      key={span.id}
                      className={`absolute h-[5px] rounded-full ${statusStyles[span.status].bar} opacity-75 transition hover:h-[7px] hover:opacity-100`}
                      style={{ left: `${left}%`, width: `${width}%`, top: `${span.lane * 8}px` }}
                      title={`${span.title} · ${shortDate(span.date)} ${span.start}–${span.end} · ${lumaStatusLabels[span.status]}`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-2 flex gap-1 px-1">
              {chart.rows.map((row, index) => {
                const previous = chart.rows[index - 1];
                const showDate = index === 0 || previous?.date !== row.date;
                const showHour = row.hour % 3 === 0 || showDate;
                return (
                  <div key={row.slot} className="min-w-0 flex-1 text-center text-[10px] font-medium tabular-nums text-slate-500">
                    {showDate && <div className="font-semibold text-slate-700">{shortDate(row.date)}</div>}
                    {showHour && <div>{String(row.hour).padStart(2, '0')}:00</div>}
                  </div>
                );
              })}
            </div>
            <div className="mt-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Singapore date &amp; time</div>
          </div>
        </div>
      )}
    </section>
  );
}
