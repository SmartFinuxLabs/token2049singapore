'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Building2, ExternalLink, Globe2, MapPin, Search, Users } from 'lucide-react';
import {
  analyticsSnapshot,
  organizations,
  participants,
  publicCalendarEvents,
  type MediaLinks,
} from '@/lib/token2049-public-data';

const AnalyticsGeoMap = dynamic(() => import('@/components/AnalyticsGeoMap'), { ssr: false });

type AnalyticsTab = 'organizations' | 'participants';

function mediaEntries(media: MediaLinks) {
  return Object.entries(media).filter(([, value]) => Boolean(value)) as Array<[string, string]>;
}

function titleCase(value: string) {
  return value.replace(/(^|[-_])(\w)/g, (_, prefix, letter) => `${prefix ? ' ' : ''}${letter.toUpperCase()}`);
}

function distribution(values: string[]) {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export default function AnalyticsDashboard() {
  const [tab, setTab] = useState<AnalyticsTab>('organizations');
  const [query, setQuery] = useState('');
  const [dimensionFilter, setDimensionFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const eventById = useMemo(() => new Map(publicCalendarEvents.map((event) => [event.id, event])), []);

  const dimensionOptions = useMemo(() => {
    const values = tab === 'organizations'
      ? organizations.flatMap((org) => org.services)
      : participants.flatMap((person) => person.specialty);
    return [...new Set(values)].sort();
  }, [tab]);

  const locationOptions = useMemo(() => {
    const values = tab === 'organizations'
      ? organizations.flatMap((org) => org.eventPresence)
      : participants.flatMap((person) => person.eventIds.map((id) => eventById.get(id)?.location).filter(Boolean) as string[]);
    return [...new Set(values)].sort();
  }, [eventById, tab]);

  const filteredOrganizations = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return organizations.filter((org) => {
      const searchable = [org.name, ...org.services, ...org.eventPresence].join(' ').toLowerCase();
      const matchesQuery = !needle || searchable.includes(needle);
      const matchesDimension = dimensionFilter === 'all' || org.services.includes(dimensionFilter);
      const matchesLocation = locationFilter === 'all' || org.eventPresence.includes(locationFilter);
      return matchesQuery && matchesDimension && matchesLocation;
    });
  }, [dimensionFilter, locationFilter, query]);

  const filteredParticipants = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return participants.filter((person) => {
      const eventLocations = person.eventIds.map((id) => eventById.get(id)?.location).filter(Boolean) as string[];
      const searchable = [person.name, person.role, person.company, person.location, ...person.specialty, ...eventLocations]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesQuery = !needle || searchable.includes(needle);
      const matchesDimension = dimensionFilter === 'all' || person.specialty.includes(dimensionFilter);
      const matchesLocation = locationFilter === 'all' || eventLocations.includes(locationFilter) || person.location === locationFilter;
      return matchesQuery && matchesDimension && matchesLocation;
    });
  }, [dimensionFilter, eventById, locationFilter, query]);

  const records = tab === 'organizations' ? filteredOrganizations : filteredParticipants;

  const dimensionDistribution = useMemo(() => {
    return tab === 'organizations'
      ? distribution(filteredOrganizations.flatMap((org) => org.services))
      : distribution(filteredParticipants.flatMap((person) => person.specialty));
  }, [filteredOrganizations, filteredParticipants, tab]);

  const locationDistribution = useMemo(() => {
    if (tab === 'organizations') return distribution(filteredOrganizations.flatMap((org) => org.eventPresence));
    return distribution(filteredParticipants.flatMap((person) => person.eventIds.map((id) => eventById.get(id)?.location).filter(Boolean) as string[]));
  }, [eventById, filteredOrganizations, filteredParticipants, tab]);

  const geoPoints = useMemo(() => {
    const counts = new Map<string, { lat: number; lng: number; count: number; names: Set<string> }>();
    const source = tab === 'organizations' ? filteredOrganizations : filteredParticipants;
    source.forEach((record) => {
      record.eventIds.forEach((eventId) => {
        const event = eventById.get(eventId);
        if (!event?.geo) return;
        const key = `${event.location}|${event.geo.lat}|${event.geo.lng}`;
        const current = counts.get(key) ?? { ...event.geo, count: 0, names: new Set<string>() };
        current.count += 1;
        current.names.add(record.name);
        counts.set(key, current);
      });
    });
    return [...counts.entries()].map(([key, value]) => {
      const [location] = key.split('|');
      return {
        id: key,
        label: location,
        location,
        lat: value.lat,
        lng: value.lng,
        count: value.count,
        detail: [...value.names].slice(0, 5).join(', '),
      };
    });
  }, [eventById, filteredOrganizations, filteredParticipants, tab]);

  const mediaCoverage = records.length === 0 ? 0 : Math.round((records.filter((record) => mediaEntries(record.media).length > 0).length / records.length) * 100);
  const linkedEvents = new Set(records.flatMap((record) => record.eventIds)).size;
  const knownCompanies = tab === 'participants' ? new Set(filteredParticipants.map((person) => person.company).filter(Boolean)).size : filteredOrganizations.length;
  const publicGoing = publicCalendarEvents.reduce((sum, event) => sum + (event.goingCount ?? 0), 0);

  const topDimensionMax = Math.max(1, ...(dimensionDistribution.slice(0, 8).map(([, count]) => count)));
  const topLocationMax = Math.max(1, ...(locationDistribution.slice(0, 8).map(([, count]) => count)));

  function changeTab(next: AnalyticsTab) {
    setTab(next);
    setDimensionFilter('all');
    setLocationFilter('all');
    setQuery('');
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Network intelligence</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">TOKEN2049 ecosystem analytics</h1>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">Analyze organizations and publicly visible people across the public TOKEN2049 Singapore Luma calendar. The dataset is stored locally in the app so the dashboard is independent from your personal registration list.</p>
          </div>
          <a href={analyticsSnapshot.calendarUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Source calendar <ExternalLink size={15} />
          </a>
        </div>
        <div className="mt-5 rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">{analyticsSnapshot.coverage} Snapshot: {analyticsSnapshot.capturedAt}.</div>
      </div>

      <div className="mt-6 inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        <button onClick={() => changeTab('organizations')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tab === 'organizations' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Building2 size={16} /> Organizations</button>
        <button onClick={() => changeTab('participants')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tab === 'participants' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Users size={16} /> Participants</button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [String(records.length), tab === 'organizations' ? 'Organizations in view' : 'Public people in view'],
          [String(linkedEvents), 'Linked public events'],
          [tab === 'organizations' ? String(filteredOrganizations.length) : String(knownCompanies), tab === 'organizations' ? 'Organization profiles' : 'Known companies'],
          [`${mediaCoverage}%`, 'Profiles with media links'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-2xl font-semibold text-slate-950">{value}</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <label className="text-sm font-medium text-slate-700">
          Search
          <div className="relative mt-2">
            <Search className="absolute left-3 top-3 text-slate-400" size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tab === 'organizations' ? 'Company, service, location…' : 'Name, title, specialty, company…'} className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-400" />
          </div>
        </label>
        <label className="text-sm font-medium text-slate-700">
          {tab === 'organizations' ? 'Service' : 'Specialty'}
          <select value={dimensionFilter} onChange={(event) => setDimensionFilter(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
            <option value="all">All {tab === 'organizations' ? 'services' : 'specialties'}</option>
            {dimensionOptions.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <label className="text-sm font-medium text-slate-700">
          Event presence
          <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm">
            <option value="all">All locations</option>
            {locationOptions.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <AnalyticsGeoMap points={geoPoints} />
        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Top {tab === 'organizations' ? 'services' : 'specialties'}</div>
            <div className="mt-4 space-y-3">
              {dimensionDistribution.slice(0, 8).map(([label, count]) => (
                <div key={label}>
                  <div className="flex items-center justify-between gap-3 text-xs"><span className="truncate font-medium text-slate-700">{label}</span><span className="tabular-nums text-slate-500">{count}</span></div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${(count / topDimensionMax) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Event-presence geography</div>
            <div className="mt-4 space-y-3">
              {locationDistribution.slice(0, 8).map(([label, count]) => (
                <div key={label}>
                  <div className="flex items-center justify-between gap-3 text-xs"><span className="truncate font-medium text-slate-700">{label}</span><span className="tabular-nums text-slate-500">{count}</span></div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-900" style={{ width: `${(count / topLocationMax) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Public calendar events</div><div className="mt-2 text-2xl font-semibold">{publicCalendarEvents.length}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Public “going” counts visible</div><div className="mt-2 text-2xl font-semibold">{publicGoing.toLocaleString()}</div><div className="mt-1 text-xs text-slate-500">Only events exposing a public count.</div></div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Named people captured</div><div className="mt-2 text-2xl font-semibold">{participants.length}</div><div className="mt-1 text-xs text-slate-500">Hosts, speakers and visible attendee samples.</div></div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">{tab === 'organizations' ? 'Organization directory' : 'Participant directory'}</h2>
          <p className="mt-1 text-xs text-slate-500">{records.length} records after filters.</p>
        </div>
        <div className="max-h-[760px] divide-y divide-slate-100 overflow-y-auto">
          {records.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No analytics records match the current filters.</div>}
          {tab === 'organizations' ? filteredOrganizations.map((org) => (
            <div key={org.id} className="grid gap-4 p-5 lg:grid-cols-[1.1fr_1.2fr_0.8fr]">
              <div>
                <div className="flex items-center gap-2"><Building2 size={16} className="text-blue-600" /><h3 className="font-semibold text-slate-950">{org.name}</h3></div>
                <div className="mt-2 flex flex-wrap gap-1.5">{org.services.map((service) => <span key={service} className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-800">{service}</span>)}</div>
              </div>
              <div className="text-sm text-slate-600">
                <div className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /><span>{org.eventPresence.join(', ')} <span className="text-slate-400">(event presence)</span></span></div>
                <div className="mt-2">{org.eventIds.length} linked event{org.eventIds.length === 1 ? '' : 's'}</div>
              </div>
              <div className="flex flex-wrap content-start gap-2">
                {mediaEntries(org.media).map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"><Globe2 size={12} />{titleCase(label)}</a>)}
              </div>
            </div>
          )) : filteredParticipants.map((person) => (
            <div key={person.id} className="grid gap-4 p-5 lg:grid-cols-[1.1fr_1.2fr_0.8fr]">
              <div>
                <div className="flex items-center gap-2"><Users size={16} className="text-blue-600" /><h3 className="font-semibold text-slate-950">{person.name}</h3></div>
                <div className="mt-1 text-sm text-slate-500">{person.role ?? titleCase(person.relation)}{person.company ? ` · ${person.company}` : ''}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">{person.specialty.map((specialty) => <span key={specialty} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">{specialty}</span>)}</div>
              </div>
              <div className="text-sm text-slate-600">
                <div>{person.eventIds.length} linked event{person.eventIds.length === 1 ? '' : 's'}</div>
                <div className="mt-2 flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /><span>{person.location ?? 'Personal location not public'} </span></div>
              </div>
              <div className="flex flex-wrap content-start gap-2">
                {mediaEntries(person.media).length === 0 ? <span className="text-xs text-slate-400">No public media link captured</span> : mediaEntries(person.media).map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"><Globe2 size={12} />{titleCase(label)}</a>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
