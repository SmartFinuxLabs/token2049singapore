import { events } from '@/lib/events';

type NetworkHost = {
  id: string;
  name: string;
  events: Array<{ id: string; title: string; luma?: string }>;
  avatarUrl?: string;
};

const lumaAvatarByName: Record<string, string> = {
  'Gamma Prime': 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/rb/c175fce3-cf8b-4f44-89f5-2d4533cde929.jpg',
  Sui: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars/85/b6ee92f8-f6dd-4609-8a95-513bd808a6cc.png',
  DFG: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars/u3/3d6713e6-4f01-4288-b45c-52267c2b50dc',
  'Taisu Ventures': 'https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/avatars-default/community_avatar_20.png',
  'Monad Foundation': 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/calendars/qd/1da73c96-6e00-4f31-be74-961c9307bcee.png',
  'Noos Network': 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/12/5d8d51f1-d2da-4de3-a649-1328d0cccb52.png',
  'Trust Wallet': 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/lz/4c1b47af-e236-46da-a3ea-0455f3a4e044.png',
  TrustWalletEvent: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/lz/4c1b47af-e236-46da-a3ea-0455f3a4e044.png',
  Codex: 'https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=112,height=112/uploads/ka/78b84d52-ac6e-4bb9-9aeb-138ee8737cae.png',
};

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

const approvedEvents = events.filter((event) => event.lumaStatus === 'approved');

const networkHosts: NetworkHost[] = (() => {
  const byName = new Map<string, NetworkHost>();

  approvedEvents.forEach((event) => {
    splitHosts(event.host).forEach((name) => {
      const key = name.toLowerCase();
      const existing = byName.get(key);
      const eventRef = { id: event.id, title: event.title, luma: event.luma };

      if (existing) {
        if (!existing.events.some((item) => item.id === event.id)) existing.events.push(eventRef);
        return;
      }

      byName.set(key, {
        id: slugify(name) || `host-${byName.size + 1}`,
        name,
        events: [eventRef],
        avatarUrl: lumaAvatarByName[name],
      });
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
          <img src={host.avatarUrl} alt={`${host.name} Luma avatar`} className="h-full w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
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
    <section className="w-full overflow-hidden border-b border-slate-200 bg-white py-6 sm:py-8" aria-label="Network and organizations from approved Luma events">
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
