import { lumaEvents, type RawLumaStatus } from './luma-events';

export type Priority = 'primary' | 'secondary' | 'third';
export type LumaStatus = RawLumaStatus | 'not_found' | 'external';

export type EventItem = {
  id: string;
  title: string;
  host: string;
  date: string;
  start: string;
  end: string;
  location: string;
  address?: string;
  priority: Priority;
  status: string;
  lumaStatus?: LumaStatus;
  tags: string[];
  luma?: string;
  source?: string;
  routeHint: string;
};

const highPriority = new Set([
  'rwa-capital-forum',
  'gamma-prime',
  'open-monad',
  'agentic-finance-payments',
  'founder-vc-day1',
  'institutional-onchain',
  'stablecoin-funds-flow',
  'agentic-money',
  'open-board',
  'institutional-ark',
  'stablecoin-sessions',
  'payments-stablecoins-cafe',
  'onchain-horizons',
  'payments-treasury-tokenization',
  'agent-ready-usdc',
  'treasury-table',
  'dat-summit',
  'rwa-summit',
  'bitangels',
  'founder-vc-day2',
]);

const secondaryPriority = new Set([
  'mantle-rwa', 'ai-agent-summit', 'global-onchain-summit', 'animoca-portfolio-day',
  'future-money-payments', 'stablecoin-happy-hour', 'flow-state', 'network-state',
  'sony-taisu', 'cointelegraph-connect', 'ultra-connect', 'utxo-pitch'
]);

function tagsFor(title: string, priority: Priority): string[] {
  const t = title.toLowerCase();
  const tags: string[] = [];
  if (priority === 'primary') tags.push('High Priority');
  if (t.includes('vc') || t.includes('invest') || t.includes('capital') || t.includes('funders') || t.includes('pitch')) tags.push('VC / Capital');
  if (t.includes('stablecoin') || t.includes('payment') || t.includes('money')) tags.push('Payments / Stablecoins');
  if (t.includes('rwa') || t.includes('tokeniz')) tags.push('RWA / Tokenization');
  if (t.includes('agent') || t.includes('ai')) tags.push('AI / Agentic');
  if (t.includes('institution') || t.includes('bank') || t.includes('treasury')) tags.push('Institutional Finance');
  return tags.length ? tags : ['TOKEN2049 Week'];
}

function routeHintFor(status: LumaStatus, priority: Priority): string {
  if (status === 'approved' && priority === 'primary') return "You're in. Treat this as an anchor event; leave only for a confirmed investor, partner, or pitch meeting with higher value.";
  if (status === 'approved') return "You're in. Keep this available as a confirmed option and use it to fill gaps around higher-priority meetings.";
  if (status === 'pending_approval' && priority === 'primary') return 'Pending approval. Keep this slot protected until the organizer responds; promote immediately when approved.';
  if (status === 'pending_approval') return 'Pending approval. Keep as a flexible alternative until access is confirmed.';
  if (status === 'waitlist') return 'Waitlisted. Do not route around this event unless Luma confirms a place.';
  if (status === 'external') return 'Access is managed outside Luma. Verify the official pass or registration before departure.';
  return 'No matching Luma registration found. Use the event source link to register or verify access.';
}

const lumaMapped: EventItem[] = lumaEvents.map((e) => {
  const priority: Priority = highPriority.has(e.id) ? 'primary' : secondaryPriority.has(e.id) ? 'secondary' : 'third';
  return {
    id: e.id,
    title: e.title,
    host: e.host,
    date: e.date,
    start: e.start,
    end: e.end,
    location: e.location,
    address: e.address,
    priority,
    status: e.status === 'approved' ? 'Luma registration confirmed' : e.status === 'pending_approval' ? 'Luma approval required' : e.status === 'waitlist' ? 'Luma waitlist' : 'Luma invitation',
    lumaStatus: e.status,
    tags: tagsFor(e.title, priority),
    luma: e.url,
    routeHint: routeHintFor(e.status, priority),
  };
});

const externalEvents: EventItem[] = [
  {
    id: 'token-main-day1',
    title: 'TOKEN2049 Singapore · Main Conference Day 1',
    host: 'TOKEN2049',
    date: '2026-10-07',
    start: '07:30',
    end: '18:00',
    location: 'Marina Bay Sands',
    address: '10 Bayfront Ave, Singapore 018956',
    priority: 'primary',
    status: 'Conference pass required',
    lumaStatus: 'external',
    tags: ['High Priority', 'Main Conference', 'Investors', 'Infrastructure'],
    source: 'https://www.token2049.com/singapore/agenda',
    routeHint: routeHintFor('external', 'primary'),
  },
  {
    id: 'investor-hours',
    title: 'TOKEN2049 Investor Hours',
    host: 'TOKEN2049 Week',
    date: '2026-10-07',
    start: '14:00',
    end: '17:00',
    location: 'Singapore · verify official listing',
    priority: 'primary',
    status: 'Featured TOKEN2049 Week event',
    lumaStatus: 'not_found',
    tags: ['High Priority', 'VC / Capital', 'Fundraising'],
    source: 'https://week.token2049.com/',
    routeHint: routeHintFor('not_found', 'primary'),
  },
  {
    id: 'token-main-day2',
    title: 'TOKEN2049 Singapore · Main Conference Day 2',
    host: 'TOKEN2049',
    date: '2026-10-08',
    start: '07:30',
    end: '18:00',
    location: 'Marina Bay Sands',
    address: '10 Bayfront Ave, Singapore 018956',
    priority: 'primary',
    status: 'Conference pass required',
    lumaStatus: 'external',
    tags: ['High Priority', 'Main Conference', 'Institutions', 'VC'],
    source: 'https://www.token2049.com/singapore/agenda',
    routeHint: routeHintFor('external', 'primary'),
  },
  {
    id: 'stablecoin-summit',
    title: 'Stablecoin Summit 2026',
    host: 'XREX',
    date: '2026-10-08',
    start: '09:00',
    end: '18:00',
    location: 'Andaz Singapore',
    address: '5 Fraser St, Singapore 189354',
    priority: 'secondary',
    status: 'External registration',
    lumaStatus: 'not_found',
    tags: ['Payments / Stablecoins', 'Institutional Finance'],
    source: 'https://sg26.stablecoinsummit.com/',
    routeHint: routeHintFor('not_found', 'secondary'),
  },
  {
    id: 'finality-forum',
    title: 'Finality Forum @ Token2049 SG 2026',
    host: 'Ethene Labs + Four Pillars + Mira',
    date: '2026-10-09',
    start: '10:00',
    end: '18:00',
    location: 'Singapore · address after approval',
    priority: 'primary',
    status: 'Approval required',
    lumaStatus: 'not_found',
    tags: ['High Priority', 'Settlement', 'Payments / Stablecoins', 'RWA / Tokenization'],
    source: 'https://luma.com/g2lg0htf',
    routeHint: routeHintFor('not_found', 'primary'),
  },
  {
    id: 'ai-founders-investors',
    title: 'AI Founders & Investors Forum',
    host: 'TOKEN2049 Week ecosystem',
    date: '2026-10-06',
    start: '12:00',
    end: '17:00',
    location: 'Singapore · see event page',
    priority: 'secondary',
    status: 'External registration',
    lumaStatus: 'not_found',
    tags: ['VC / Capital', 'AI / Agentic'],
    source: 'https://media-grill.com/event/ai-founders-investors-forum/',
    routeHint: routeHintFor('not_found', 'secondary'),
  }
];

export const events: EventItem[] = [...lumaMapped, ...externalEvents].sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start));

export const priorityLabels: Record<Priority, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  third: '3rd option',
};

export const lumaStatusLabels: Record<LumaStatus, string> = {
  approved: "You're in",
  pending_approval: 'Pending approval',
  waitlist: 'Waitlist',
  invited: 'Invited',
  not_found: 'Not in Luma',
  external: 'External pass',
};
