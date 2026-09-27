'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Building2, ExternalLink, MapPin, Search, ShieldCheck, Users } from 'lucide-react';
import {
  analyticsSnapshot,
  organizations,
  participants,
  publicCalendarEvents,
  type AnalyticsOrganization,
  type AnalyticsParticipant,
} from '@/lib/analytics-profile-data';
import type { MediaLinks } from '@/lib/token2049-public-data';

const AnalyticsGeoMap = dynamic(() => import('@/components/AnalyticsGeoMap'), { ssr: false });

type AnalyticsTab = 'organizations' | 'participants';

function mediaEntries(media: MediaLinks) {
  return Object.entries(media).filter(([, value]) => Boolean(value)) as Array<[string, string]>;
}

function distribution(values: string[]) {
  const counts = new Map<string, number>();
  values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function locationLabel(record: AnalyticsOrganization | AnalyticsParticipant) {
  return record.profileLocation?.display ?? 'Unknown / not yet verified';
}

function sourceLabel(type?: string) {
  if (!type) return '';
  return type.replaceAll('-', ' ');
}

export default function AnalyticsDashboard() {
  const [tab, setTab] = useState<AnalyticsTab>('organizations');
  const [query, setQuery] = useState('');
  const [dimensionFilter, setDimensionFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const eventById = useMemo(() => new Map(publicCalendarEvents.map((event) => [event.id, event])), []);

  const dimensionOptions = useMemo(() => {
    const values = tab === 'organizations'
      ? organizations.flatMap((org) => org.services)
      : participants.flatMap((person) => person.specialty);
    return [...new Set(values)].sort();
  }, [tab]);

  const locationOptions = useMemo(() => {
    const source = tab === 'organizations' ? organizations : participants;
    return [...new Set(source.map((record) => record.profileLocation?.display).filter(Boolean) as string[])].sort();
  }, [tab]);

  const filteredOrganizations = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return organizations.filter((org) => {
      const searchable = [org.name, ...org.services, org.profileLocation?.display, ...org.eventPresence].filter(Boolean).join(' ').toLowerCase();
      return (!needle || searchable.includes(needle))
        && (dimensionFilter === 'all' || org.services.includes(dimensionFilter))
        && (locationFilter === 'all' || org.profileLocation?.display === locationFilter)
        && (!verifiedOnly || Boolean(org.profileLocation));
    });
  }, [dimensionFilter, locationFilter, query, verifiedOnly]);

  const filteredParticipants = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return participants.filter((person) => {
      const searchable = [person.name, person.role, person.company, person.profileLocation?.display, ...person.specialty].filter(Boolean).join(' ').toLowerCase();
      return (!needle || searchable.includes(needle))
        && (dimensionFilter === 'all' || person.specialty.includes(dimensionFilter))
        && (locationFilter === 'all' || person.profileLocation?.display === locationFilter)
        && (!verifiedOnly || Boolean(person.profileLocation));
    });
  }, [dimensionFilter, locationFilter, query, verifiedOnly]);

  const records = tab === 'organizations' ? filteredOrganizations : filteredParticipants;

  const dimensionDistribution = useMemo(() => tab === 'organizations'
    ? distribution(filteredOrganizations.flatMap((org) => org.services))
    : distribution(filteredParticipants.flatMap((person) => person.specialty)),
  [filteredOrganizations, filteredParticipants, tab]);

  const locationDistribution = useMemo(() => distribution(records.map((record) => record.profileLocation?.display).filter(Boolean) as string[]), [records]);

  const geoPoints = useMemo(() => {
    const buckets = new Map<string, { lat: number; lng: number; count: number; names: string[]; sourceUrl?: string; sourceType?: string }>();
    records.forEach((record) => {
      const loc = record.profileLocation;
      if (!loc) return;
      const key = `${loc.display}|${loc.lat}|${loc.lng}`;
      const current = buckets.get(key) ?? { lat: loc.lat, lng: loc.lng, count: 0, names: [], sourceUrl: loc.sourceUrl, sourceType: loc.sourceType };
      current.count += 1;
      if (current.names.length < 6) current.names.push(record.name);
      buckets.set(key, current);
    });
    return [...buckets.entries()].map(([key, value]) => ({
      id: key,
      label: key.split('|')[0],
      location: key.split('|')[0],
      lat: value.lat,
      lng: value.lng,
      count: value.count,
      detail: value.names.join(', '),
      sourceUrl: value.sourceUrl,
      sourceType: value.sourceType,
    }));
  }, [records]);

  const verifiedLocationCount = records.filter((record) => Boolean(record.profileLocation)).length;
  const mediaCoverage = records.length === 0 ? 0 : Math.round(records.filter((record) => mediaEntries(record.media).length > 0).length / records.length * 100);
  const linkedEvents = new Set(records.flatMap((record) => record.eventIds)).size;
  const publicGoing = publicCalendarEvents.reduce((sum, event) => sum + (event.goingCount ?? 0), 0);
  const topDimensionMax = Math.max(1, ...dimensionDistribution.slice(0, 8).map(([, count]) => count));
  const topLocationMax = Math.max(1, ...locationDistribution.slice(0, 8).map(([, count]) => count));

  function changeTab(next: AnalyticsTab) {
    setTab(next);
    setQuery('');
    setDimensionFilter('all');
    setLocationFilter('all');
    setVerifiedOnly(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Network intelligence</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">TOKEN2049 ecosystem analytics</h1>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-600">Organizations and participants are separated from event-venue geography. Company locations must be verified from a company profile; participant locations must be verified from that person’s own professional/public profile. Event attendance is never used as a location proxy.</p>
          </div>
          <a href={analyticsSnapshot.calendarUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Source calendar <ExternalLink size={15} /></a>
        </div>
        <div className="mt-5 rounded-2xl bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-900"><ShieldCheck className="mr-1 inline" size={14} /> Profile-location mode enabled. Unverified locations remain unknown and are excluded from geo analytics. Snapshot: {analyticsSnapshot.capturedAt}.</div>
      </div>

      <div className="mt-6 inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
        <button onClick={() => changeTab('organizations')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tab === 'organizations' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Building2 size={16} /> Organizations</button>
        <button onClick={() => changeTab('participants')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${tab === 'participants' ? 'bg-slate-950 text-white' : 'text-slate-600 hover:bg-slate-50'}`}><Users size={16} /> Participants</button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [String(records.length), tab === 'organizations' ? 'Organizations in view' : 'Participants in view'],
          [String(verifiedLocationCount), 'Verified profile locations'],
          [String(linkedEvents), 'Linked events'],
          [`${mediaCoverage}%`, 'Profiles with media links'],
        ].map(([value, label]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="text-2xl font-semibold text-slate-950">{value}</div><div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div></div>)}
      </div>

      <div className="mt-6 grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <label className="text-sm font-medium text-slate-700">Search<div className="relative mt-2"><Search className="absolute left-3 top-3 text-slate-400" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tab === 'organizations' ? 'Company, service…' : 'Name, title, company…'} className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-400" /></div></label>
        <label className="text-sm font-medium text-slate-700">{tab === 'organizations' ? 'Service' : 'Specialty'}<select value={dimensionFilter} onChange={(event) => setDimensionFilter(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All</option>{dimensionOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="text-sm font-medium text-slate-700">Verified profile location<select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="all">All verified locations</option>{locationOptions.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="flex items-end"><button type="button" onClick={() => setVerifiedOnly((value) => !value)} className={`w-full rounded-xl border px-4 py-2.5 text-sm font-semibold ${verifiedOnly ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700'}`}>{verifiedOnly ? 'Verified only' : 'Include unknown location'}</button></label>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <AnalyticsGeoMap points={geoPoints} />
        <div className="grid gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Top {tab === 'organizations' ? 'services' : 'specialties'}</div><div className="mt-4 space-y-3">{dimensionDistribution.slice(0, 8).map(([label, count]) => <div key={label}><div className="flex items-center justify-between gap-3 text-xs"><span className="truncate font-medium text-slate-700">{label}</span><span>{count}</span></div><div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${count / topDimensionMax * 100}%` }} /></div></div>)}</div></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Verified profile geography</div><div className="mt-4 space-y-3">{locationDistribution.length === 0 && <div className="text-sm text-slate-500">No verified profile locations have been loaded yet.</div>}{locationDistribution.slice(0, 8).map(([label, count]) => <div key={label}><div className="flex items-center justify-between gap-3 text-xs"><span className="truncate font-medium text-slate-700">{label}</span><span>{count}</span></div><div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-900" style={{ width: `${count / topLocationMax * 100}%` }} /></div></div>)}</div></div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Public calendar events</div><div className="mt-2 text-2xl font-semibold">{publicCalendarEvents.length}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Public “going” counts visible</div><div className="mt-2 text-2xl font-semibold">{publicGoing.toLocaleString()}</div></div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Location completeness</div><div className="mt-2 text-2xl font-semibold">{records.length ? Math.round(verifiedLocationCount / records.length * 100) : 0}%</div><div className="mt-1 text-xs text-slate-500">Only source-backed profile locations.</div></div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4"><h2 className="text-lg font-semibold text-slate-950">{tab === 'organizations' ? 'Organization directory' : 'Participant directory'}</h2><p className="mt-1 text-xs text-slate-500">{records.length} records after filters. Event venue is shown only as event context, never as profile location.</p></div>
        <div className="max-h-[760px] divide-y divide-slate-100 overflow-y-auto">
          {records.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No analytics records match the current filters.</div>}
          {tab === 'organizations' ? filteredOrganizations.map((org) => (
            <div key={org.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_1fr_0.9fr]">
              <div><div className="flex items-center gap-2"><Building2 size={16} className="text-blue-600" /><h3 className="font-semibold text-slate-950">{org.name}</h3></div><div className="mt-2 flex flex-wrap gap-1.5">{org.services.map((service) => <span key={service} className="rounded-full bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700">{service}</span>)}</div></div>
              <div><div className="flex items-start gap-2 text-sm text-slate-700"><MapPin size={15} className="mt-0.5 text-slate-400" /><div><div className="font-medium">{locationLabel(org)}</div>{org.profileLocation && <div className="mt-1 text-xs text-slate-500">Source: {sourceLabel(org.profileLocation.sourceType)} · {org.profileLocation.confidence} confidence</div>}</div></div><div className="mt-3 text-xs text-slate-500">Event presence: {org.eventPresence.join(', ') || 'None captured'}</div></div>
              <div><div className="flex flex-wrap gap-2">{mediaEntries(org.media).map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">{label}</a>)}</div>{org.profileLocation?.sourceUrl && <a href={org.profileLocation.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">Verify location <ExternalLink size={12} /></a>}</div>
            </div>
          )) : filteredParticipants.map((person) => (
            <div key={person.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_1fr_0.9fr]">
              <div><div className="flex items-center gap-2"><Users size={16} className="text-blue-600" /><h3 className="font-semibold text-slate-950">{person.name}</h3></div><div className="mt-1 text-sm text-slate-600">{[person.role, person.company].filter(Boolean).join(' · ') || 'Role/company not yet verified'}</div><div className="mt-2 flex flex-wrap gap-1.5">{person.specialty.map((item) => <span key={item} className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">{item}</span>)}</div></div>
              <div><div className="flex items-start gap-2 text-sm text-slate-700"><MapPin size={15} className="mt-0.5 text-slate-400" /><div><div className="font-medium">{locationLabel(person)}</div>{person.profileLocation && <div className="mt-1 text-xs text-slate-500">Source: {sourceLabel(person.profileLocation.sourceType)} · {person.profileLocation.confidence} confidence</div>}</div></div><div className="mt-3 text-xs text-slate-500">Events: {person.eventIds.map((id) => eventById.get(id)?.name).filter(Boolean).slice(0, 3).join(' · ') || 'None captured'}</div></div>
              <div><div className="flex flex-wrap gap-2">{mediaEntries(person.media).map(([label, url]) => <a key={label} href={url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50">{label}</a>)}</div>{person.profileLocation?.sourceUrl && <a href={person.profileLocation.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">Verify location <ExternalLink size={12} /></a>}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
