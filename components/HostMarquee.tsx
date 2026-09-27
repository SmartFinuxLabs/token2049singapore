import { events } from '@/lib/events';

type NetworkHost = {
  id: string;
  name: string;
  events: Array<{ id: string; title: string; luma?: string }>;
  avatarUrl?: string;
};

const lumaAvatarHosts = new Set([
  'Gamma Prime',
  'Sui',
  'DFG',
  'Taisu Ventures',
  'Monad Foundation',
  'Noos Network',
  'Trust Wallet',
  'TrustWalletEvent',
  'Codex',
]);

// Public hosts currently surfaced by the TOKEN2049 Singapore Luma calendar.
// The app also merges hosts from every tracked Luma event below so the marquee
// is not limited to events where the current user is approved.
const token2049CalendarHosts = [
  'Asia Web3 Ai Association (AWAA)',
  'Insight Genesis',
  'CoinFerenceX',
  'The Best Event',
  '0G Foundation',
  'UVECON.VC',
  'Joao Raza',
  'Raphael | Taisu Ventures',
  'Eric ALEXANDRE',
  'Cecilia Wong',
  'yourPRstrategist',
  'Lu Li',
  'Global Fintech Institute',
  'Grayscale',
  'Hui Yi HO',
  'Trina Gan',
  'Mark Tang | Hydra X',
  'Hydra X',
  'Hui Ying',
  'Nadine Wilke',
  'Scarlett Ho',
  'Andrew',
  'Anna Gates',
  'Lucas Nicolet-Serra',
  'Jussi AITTOLA',
  'Adrian Rymill',
  'Daniel Holmes',
  'Elyse Quek',
  'Andy Ross',
  'ico beast',
  'Kalshi',
  'NodeXX',
  'Tobias Bauer',
  'Brent Fulfer',
  'Mihir Odhrani',
  'FastX Exchange',
  'Bullish Events',
  'BitGo Events',
  'Chris Mihos | MakeBanc',
  'Alex Zonneveld | MakeBanc',
  'A36 Labs',
  'Utila .io',
  'Paz',
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitHosts(value: string) {
  return value
    .split(/\s+\+\s+|\s+·\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !/^partners?$/i.test(part));
}

const trackedLumaEvents = events.filter((event) => Boolean(event.luma));

const networkHosts: NetworkHost[] = (() => {
  const byName = new Map<string, NetworkHost>();

  const upsert = (name: string, eventRef: { id: string; title: string; luma?: string }) => {
    const key = name.toLowerCase();
    const existing = byName.get(key);

    if (existing) {
      if (!existing.events.some((item) => item.id === eventRef.id)) existing.events.push(eventRef);
      return;
    }

    byName.set(key, {
      id: slugify(name) || `host-${byName.size + 1}`,
      name,
      events: [eventRef],
      avatarUrl: lumaAvatarHosts.has(name) ? `/api/luma-avatar?host=${encodeURIComponent(name)}` : undefined,
    });
  };

  token2049CalendarHosts.forEach((name) => {
    upsert(name, {
      id: `token2049-calendar-${slugify(name)}`,
      title: 'TOKEN2049 Singapore calendar',
      luma: 'https://luma.com/token2049',
    });
  });

  trackedLumaEvents.forEach((event) => {
    splitHosts(event.host).forEach((name) => {
      upsert(name, { id: event.id, title: event.title, luma: event.luma });
    });
  });

  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
})();

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function HostCard({ host }: { host: NetworkHost }) {
  const eventNames = host.events.map((event) => event.title);

  return (
    <article className="w-[164px] shrink-0 rounded-3xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm sm:w-[184px]">
      <div className="mx-auto h-12 w-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">
        {host.avatarUrl ? (
          <img src={host.avatarUrl} alt={`${host.name} Luma avatar`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold tracking-wide text-white">
            {initials(host.name) || '•'}
          </div>
        )}
      </div>
      <div className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-slate-950">{host.name}</div>
      <div className="mt-2 line-clamp-2 min-h-[2.25rem] text-[11px] leading-[1.125rem] text-slate-500" title={eventNames.join(' · ')}>
        {eventNames.join(' · ')}
      </div>
    </article>
  );
}

export default function HostMarquee() {
  if (networkHosts.length === 0) return null;

  return (
    <section className="w-full overflow-hidden border-b border-slate-200 bg-white py-6 sm:py-8" aria-label="Network and organizations from the TOKEN2049 Singapore Luma calendar">
      <div className="mb-4 flex items-end justify-between gap-4 px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Network &amp; Organization</p>
        <span className="text-xs text-slate-400">{networkHosts.length} hosts</span>
      </div>
      <div className="host-marquee overflow-hidden">
        <div className="host-marquee-track">
          <div className="host-marquee-group" aria-hidden="false">
            {networkHosts.map((host) => <HostCard key={`a-${host.id}`} host={host} />)}
          </div>
          <div className="host-marquee-group" aria-hidden="true">
            {networkHosts.map((host) => <HostCard key={`b-${host.id}`} host={host} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
