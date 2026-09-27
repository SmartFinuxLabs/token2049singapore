import { organizations } from '@/lib/analytics-profile-data';
import { lumaEvents } from '@/lib/luma-events';

const approvedByUrl = new Map(
  lumaEvents
    .filter((event) => event.status === 'approved')
    .map((event) => [event.url, event] as const),
);

const joinedHosts = organizations
  .map((organization) => {
    const joinedEvents = organization.provenance
      .filter((source) => source.sourceType === 'luma')
      .map((source) => approvedByUrl.get(source.sourceUrl))
      .filter((event): event is NonNullable<typeof event> => Boolean(event));

    const uniqueEvents = [...new Map(joinedEvents.map((event) => [event.id, event])).values()];

    return {
      id: organization.id,
      name: organization.name,
      events: uniqueEvents,
    };
  })
  .filter((host) => host.events.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name));

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function HostCard({ host }: { host: (typeof joinedHosts)[number] }) {
  const eventNames = host.events.map((event) => event.title);

  return (
    <article className="w-[176px] shrink-0 rounded-3xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm sm:w-[196px]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-950 text-sm font-bold tracking-wide text-white shadow-sm">
        {initials(host.name) || '•'}
      </div>
      <div className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-slate-950">{host.name}</div>
      <div className="mt-2 line-clamp-2 min-h-[2.25rem] text-[11px] leading-[1.125rem] text-slate-500" title={eventNames.join(' · ')}>
        {eventNames.join(' · ')}
      </div>
    </article>
  );
}

export default function HostMarquee() {
  if (joinedHosts.length === 0) return null;

  return (
    <section className="w-full overflow-hidden border-b border-slate-200 bg-white py-6 sm:py-8" aria-label="Hosts of joined Luma events">
      <div className="mb-4 px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Hosts · You’re in</p>
      </div>
      <div className="host-marquee overflow-hidden">
        <div className="host-marquee-track">
          <div className="host-marquee-group" aria-hidden="false">
            {joinedHosts.map((host) => <HostCard key={`a-${host.id}`} host={host} />)}
          </div>
          <div className="host-marquee-group" aria-hidden="true">
            {joinedHosts.map((host) => <HostCard key={`b-${host.id}`} host={host} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
