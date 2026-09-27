'use client';

import { useMemo } from 'react';
import type { EventItem, LumaStatus } from '@/lib/events';
import { lumaStatusLabels } from '@/lib/events';

type StatusFilter = 'all' | LumaStatus;

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

function toHour(value: string) {
  const [h = '0', m = '0'] = value.split(':');
  return Number(h) + Number(m) / 60;
}

export default function EventStatusChart({ events, statusFilter, onStatusChange }: Props) {
  const chart = useMemo(() => {
    const normalized = events.map((event) => {
      const start = toHour(event.start);
      let end = toHour(event.end);
      if (end <= start) end += 24;
      return { ...event, startHour: start, endHour: end };
    });

    if (normalized.length === 0) {
      return { hours: [] as number[], rows: [] as Array<{ hour: number; counts: Record<LumaStatus, number>; total: number }>, maxTotal: 0 };
    }

    const minStart = Math.max(0, Math.floor(Math.min(...normalized.map((e) => e.startHour))));
    const maxEnd = Math.min(30, Math.ceil(Math.max(...normalized.map((e) => e.endHour))));
    const hours = Array.from({ length: Math.max(1, maxEnd - minStart) }, (_, index) => minStart + index);

    const rows = hours.map((hour) => {
      const counts = Object.fromEntries(statuses.map((status) => [status, 0])) as Record<LumaStatus, number>;
      for (const event of normalized) {
        const status = event.lumaStatus ?? 'external';
        if (event.startHour < hour + 1 && event.endHour > hour) counts[status] += 1;
      }
      const total = statuses.reduce((sum, status) => {
        if (statusFilter !== 'all' && status !== statusFilter) return sum;
        return sum + counts[status];
      }, 0);
      return { hour, counts, total };
    });

    return {
      hours,
      rows,
      maxTotal: Math.max(1, ...rows.map((row) => row.total)),
    };
  }, [events, statusFilter]);

  const visibleStatuses = statusFilter === 'all' ? statuses : [statusFilter];

  return (
    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Event density</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Events by time and registration status</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Each bar represents one Singapore-time hour. Height is the number of overlapping events; colors stack by registration status. The chart follows the selected day and hidden-event filters.</p>
        </div>
        <div className="text-sm text-slate-500">{events.length} events in scope</div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Filter chart by registration status">
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

      {chart.rows.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">No events are available for the current filters.</div>
      ) : (
        <div className="mt-6 overflow-x-auto pb-2">
          <div className="min-w-[760px]">
            <div className="relative h-[240px] border-b border-slate-300">
              <div className="absolute inset-x-0 bottom-1/4 border-t border-dashed border-slate-200" />
              <div className="absolute inset-x-0 bottom-2/4 border-t border-dashed border-slate-200" />
              <div className="absolute inset-x-0 bottom-3/4 border-t border-dashed border-slate-200" />

              <div className="absolute inset-0 flex items-end gap-1.5 px-1">
                {chart.rows.map((row) => (
                  <div key={row.hour} className="flex h-full min-w-0 flex-1 items-end justify-center">
                    <div
                      className="group relative flex w-full max-w-[48px] flex-col-reverse overflow-hidden rounded-t-md bg-slate-100 transition hover:ring-2 hover:ring-blue-300"
                      style={{ height: `${Math.max(row.total > 0 ? 8 : 2, (row.total / chart.maxTotal) * 100)}%` }}
                      title={`${String(row.hour % 24).padStart(2, '0')}:00–${String((row.hour + 1) % 24).padStart(2, '0')}:00 · ${row.total} event${row.total === 1 ? '' : 's'}`}
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

            <div className="mt-2 flex gap-1.5 px-1">
              {chart.hours.map((hour) => (
                <div key={hour} className="min-w-0 flex-1 text-center text-[10px] font-medium tabular-nums text-slate-500">
                  {String(hour % 24).padStart(2, '0')}:00
                </div>
              ))}
            </div>
            <div className="mt-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Singapore time</div>
          </div>
        </div>
      )}
    </section>
  );
}
