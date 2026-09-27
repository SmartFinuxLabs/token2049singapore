'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CalendarDays, ExternalLink, Eye, EyeOff, GripVertical, MapPin, MessageCircle, Route, Share2 } from 'lucide-react';
import { events, priorityLabels, type EventItem, type Priority } from '@/lib/events';
import { useItineraryStore } from '@/lib/store';

const RouteMap = dynamic(() => import('@/components/RouteMap'), { ssr: false });

const priorityRank: Record<Priority, number> = { primary: 0, secondary: 1, third: 2 };

function prettyDate(value: string) {
  return new Intl.DateTimeFormat('en-SG', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Asia/Singapore' }).format(new Date(`${value}T12:00:00+08:00`));
}

function EventCard({ event }: { event: EventItem }) {
  const { hidden, priorities, toggleHidden, setPriority } = useItineraryStore();
  const hiddenNow = hidden.includes(event.id);
  const priority = priorities[event.id] ?? event.priority;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: event.id });

  return (
    <article
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-3xl border bg-white p-5 shadow-card transition ${isDragging ? 'scale-[1.01] border-slate-400 opacity-90' : 'border-slate-200'} ${hiddenNow ? 'opacity-45' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button aria-label="Drag event" className="mt-1 cursor-grab rounded-xl p-2 text-slate-400 hover:bg-slate-100" {...attributes} {...listeners}>
          <GripVertical size={18} />
        </button>
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priority === 'primary' ? 'bg-slate-950 text-white' : priority === 'secondary' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
              {priorityLabels[priority]}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{event.status}</span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">{event.title}</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{event.host}</p>

          <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <div className="flex items-center gap-2"><CalendarDays size={16} /> {prettyDate(event.date)} · {event.start}–{event.end}</div>
            <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> <span>{event.location}{event.address ? ` · ${event.address}` : ''}</span></div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {event.tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-600">{tag}</span>)}
          </div>

          <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">
            <span className="font-semibold">Route suggestion:</span> {event.routeHint}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <select
              aria-label="Event priority"
              value={priority}
              onChange={(e) => setPriority(event.id, e.target.value as Priority)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="third">3rd option</option>
            </select>
            <button onClick={() => toggleHidden(event.id)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
              {hiddenNow ? <Eye size={16} /> : <EyeOff size={16} />} {hiddenNow ? 'Show' : 'Hide'}
            </button>
            {event.luma && (
              <a href={event.luma} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Luma quick check <ExternalLink size={15} />
              </a>
            )}
            {event.source && (
              <a href={event.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-50">
                Event source <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const { hidden, priorities, comments, addComment } = useItineraryStore();
  const [items, setItems] = useState(events.map((e) => e.id));
  const [showHidden, setShowHidden] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const orderedEvents = useMemo(() => {
    const byId = new Map(events.map((e) => [e.id, e]));
    return items
      .map((id) => byId.get(id))
      .filter((e): e is EventItem => Boolean(e))
      .filter((e) => showHidden || !hidden.includes(e.id));
  }, [items, hidden, showHidden]);

  const days = useMemo(() => {
    const grouped = new Map<string, EventItem[]>();
    for (const event of orderedEvents) {
      if (!grouped.has(event.date)) grouped.set(event.date, []);
      grouped.get(event.date)!.push(event);
    }
    return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [orderedEvents]);

  const suggested = useMemo(() => {
    return events
      .filter((e) => !hidden.includes(e.id))
      .map((e) => ({ ...e, effectivePriority: priorities[e.id] ?? e.priority }))
      .sort((a, b) => a.date.localeCompare(b.date) || priorityRank[a.effectivePriority] - priorityRank[b.effectivePriority] || a.start.localeCompare(b.start));
  }, [hidden, priorities]);

  function onDragEnd(evt: DragEndEvent) {
    const { active, over } = evt;
    if (!over || active.id === over.id) return;
    setItems((current) => {
      const oldIndex = current.indexOf(String(active.id));
      const newIndex = current.indexOf(String(over.id));
      return arrayMove(current, oldIndex, newIndex);
    });
  }

  async function share() {
    const data = { title: 'Connextium · TOKEN2049 Singapore itinerary', text: 'My dynamic TOKEN2049 Singapore 2026 itinerary.', url: window.location.href };
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
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">Switch overlapping events between Primary, Secondary and 3rd option, hide low-value sessions, drag to reorder, check Luma instantly, and keep the plan usable on mobile.</p>
            </div>
            <button onClick={share} className="inline-flex w-fit items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-card hover:bg-blue-500">
              <Share2 size={17} /> Share itinerary
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Oct 6–9', 'Core itinerary'],
              [`${events.length}`, 'Tracked events'],
              [`${events.filter((e) => e.priority === 'primary').length}`, 'Primary defaults'],
              [`${hidden.length}`, 'Hidden by you'],
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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Dynamic agenda</h2>
            <p className="mt-1 text-sm text-slate-500">Drag cards to reorder your working plan. Preference changes persist in this browser.</p>
          </div>
          <button onClick={() => setShowHidden((x) => !x)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
            {showHidden ? <EyeOff size={16} /> : <Eye size={16} />} {showHidden ? 'Hide excluded events' : 'Show excluded events'}
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={orderedEvents.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-10">
              {days.map(([date, dayEvents]) => (
                <section key={date}>
                  <div className="sticky top-0 z-10 mb-4 border-y border-slate-200 bg-[#f7f8fb]/95 py-3 backdrop-blur">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{prettyDate(date)}</h3>
                  </div>
                  <div className="grid gap-4">{dayEvents.map((event) => <EventCard key={event.id} event={event} />)}</div>
                </section>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2 text-blue-600"><Route size={20} /><span className="text-sm font-semibold uppercase tracking-[0.15em]">Suggested route</span></div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Minimize travel; maximize confirmed conversations.</h2>
            <div className="mt-6 space-y-3">
              {suggested.filter((e) => e.effectivePriority === 'primary').slice(0, 8).map((event, index) => (
                <div key={event.id} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">{index + 1}</div>
                  <div>
                    <div className="font-semibold">{prettyDate(event.date)} · {event.start} · {event.title}</div>
                    <div className="mt-1 text-sm text-slate-500">{event.location}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-500">Routing rule: confirmed pitch/demo slot &gt; confirmed investor meeting &gt; curated institutional session &gt; passive networking. Verify final venue and approval status in Luma before departure.</p>
          </div>
          <RouteMap />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2 text-blue-600"><MessageCircle size={20} /><span className="text-sm font-semibold uppercase tracking-[0.15em]">Comments</span></div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Working notes and social feedback.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">No database is used. Comments are stored only in the current browser/device, so they are suitable for personal planning but not shared persistence.</p>
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
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-slate-500 sm:px-8">Connextium · TOKEN2049 Singapore 2026 · Event details can change. Re-check Luma / organizer pages before travel.</div>
      </footer>
    </main>
  );
}
