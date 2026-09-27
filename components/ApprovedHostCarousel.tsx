import { organizations } from '@/lib/analytics-profile-data';
import { events } from '@/lib/events';

function initials(name: string) {
  const parts = name
    .replace(/[\/|<>]/g, ' ')
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return '•';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

const approvedEventIds = new Set(
  events.filter((event) => event.lumaStatus === 'approved').map((event) => event.id),
);

const approvedHosts = organizations
  .filter((organization) => organization.eventIds.some((eventId) => approvedEventIds.has(eventId)))
  .sort((a, b) => a.name.localeCompare(b.name));

function HostGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 gap-4 pr-4" aria-hidden={duplicate || undefined}>
      {approvedHosts.map((host) => (
        <div
          key={`${duplicate ? 'duplicate-' : ''}${host.id}`}
          className="flex h-28 w-36 shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm sm:h-32 sm:w-40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-950 text-sm font-semibold tracking-wide text-white shadow-sm sm:h-14 sm:w-14 sm:text-base">
            {initials(host.name)}
          </div>
          <div className="mt-2 line-clamp-2 text-xs font-semibold leading-4 text-slate-800 sm:text-sm sm:leading-5">
            {host.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ApprovedHostCarousel() {
  if (approvedHosts.length === 0) return null;

  return (
    <section className="w-full overflow-hidden border-b border-slate-200 bg-white py-5 sm:py-6" aria-labelledby="approved-hosts-title">
      <div className="mb-4 px-5 sm:px-8">
        <h2 id="approved-hosts-title" className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
          Hosts of events you’re in
        </h2>
      </div>
      <div className="host-marquee overflow-hidden">
        <div className="host-marquee-track flex w-max">
          <HostGroup />
          <HostGroup duplicate />
        </div>
      </div>
    </section>
  );
}
