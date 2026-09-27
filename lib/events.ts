export type Priority = 'primary' | 'secondary' | 'third';
export type LumaStatus = 'approved' | 'pending_approval' | 'waitlist' | 'not_found' | 'external';

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

export const events: EventItem[] = [
  {
    id: 'rwa-capital-forum',
    title: 'RWA Capital Forum',
    host: 'Taisu Ventures',
    date: '2026-10-05',
    start: '11:30',
    end: '15:00',
    location: '21 Collyer Quay',
    address: '21 Collyer Quay, Singapore 049320',
    priority: 'primary',
    status: 'Approval required',
    lumaStatus: 'approved',
    tags: ['High Priority', 'RWA', 'Family Offices', 'Institutional Investors', 'Capital'],
    luma: 'https://luma.com/ydaq5h18',
    routeHint: 'You are approved. Use as the opening fundraising event of the week; focus on capital providers and RWA infrastructure conversations.'
  },
  {
    id: 'open-monad',
    title: 'Open',
    host: 'Monad Foundation',
    date: '2026-10-06',
    start: '09:00',
    end: '17:00',
    location: 'Jiak Kim House',
    address: '5 Jiak Kim St, #01–17, Singapore 169425',
    priority: 'primary',
    status: 'Approval required · Reserve Access available',
    lumaStatus: 'approved',
    tags: ['High Priority', 'VC', 'Institutions', 'Payments', 'RWA', 'Infrastructure'],
    luma: 'https://luma.com/open-2026?lm_source=embed&tk=gDMQbC',
    source: 'https://media-grill.com/event/open/',
    routeHint: 'You are approved. Use as the Oct 6 morning anchor; Reserve Access is especially valuable for partner and investor conversations.'
  },
  {
    id: 'founder-vc-day1',
    title: 'Founder × VC Summit · Day 1 Demo Day',
    host: 'BackersStage Capital + AWS Web3',
    date: '2026-10-06',
    start: '11:00',
    end: '17:00',
    location: 'Furama RiverFront',
    address: '405 Havelock Rd, Singapore 169633',
    priority: 'secondary',
    status: 'Founder Pass sold out · pitching slot approval available',
    lumaStatus: 'pending_approval',
    tags: ['High Priority if pitch confirmed', 'Fundraising', 'VC', 'Pitch', 'Stablecoins', 'AI'],
    luma: 'https://luma.com/gdqakgz3?tk=2ClOHT',
    routeHint: 'Pending approval. Promote to primary if a pitching slot or pre-arranged investor meetings are confirmed.'
  },
  {
    id: 'ai-founders-investors',
    title: 'AI Founders & Investors Forum',
    host: 'Taisu Ventures ecosystem',
    date: '2026-10-06',
    start: '11:30',
    end: '15:00',
    location: 'Singapore · verify venue in registration page',
    priority: 'third',
    status: 'Registration required',
    lumaStatus: 'not_found',
    tags: ['AI', 'VC', 'Founders', 'Agentic Finance'],
    source: 'https://media-grill.com/event/ai-founders-investors-forum/',
    routeHint: 'No matching registration was found in your connected Luma account. Use if Open/Founder × VC access is not confirmed.'
  },
  {
    id: 'mantle-rwa',
    title: 'Mantle RWA Day · TOKEN2049 SG Edition',
    host: 'Mantle',
    date: '2026-10-06',
    start: '12:30',
    end: '17:00',
    location: 'The Exchange · Singapore Land Tower',
    address: '50 Raffles Pl, Level 4 Singapore Land Tower, Singapore 048623',
    priority: 'secondary',
    status: 'Free · approval required',
    lumaStatus: 'pending_approval',
    tags: ['RWA', 'Stablecoins', 'Treasury', 'Institutional Finance'],
    luma: 'https://luma.com/mantle-2pek',
    source: 'https://media-grill.com/token2049/',
    routeHint: 'Pending approval. Strong afternoon alternative in the CBD/Marina Bay institutional cluster.'
  },
  {
    id: 'institutional-onchain',
    title: 'Institutional Onchain Finance Summit 2026',
    host: 'Cregis · FOMO Pay · Stable · Width',
    date: '2026-10-06',
    start: '13:00',
    end: '17:00',
    location: 'Conrad Singapore Marina Bay',
    address: '2 Temasek Blvd, Singapore 038982',
    priority: 'primary',
    status: 'Private · curated · approval required',
    lumaStatus: 'approved',
    tags: ['High Priority', 'Banks', 'Stablecoins', 'Payments', 'Investment', 'Infrastructure'],
    luma: 'https://luma.com/lnga4ied?lm_source=embed&tk=FtO4gG',
    routeHint: 'You are approved. Counted as a high-priority institutional event and a strong Oct 6 afternoon anchor.'
  },
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
    tags: ['Core Conference', 'Investors', 'Infrastructure'],
    source: 'https://www.token2049.com/singapore/agenda',
    routeHint: 'Main conference access is not represented by your Luma guest status. Stay at MBS unless a confirmed investor meeting provides higher value.'
  },
  {
    id: 'investor-hours',
    title: 'TOKEN2049 Investor Hours',
    host: 'TOKEN2049 Week',
    date: '2026-10-07',
    start: '14:00',
    end: '17:00',
    location: 'Singapore · verify registration details',
    priority: 'primary',
    status: 'Featured event · free registration',
    lumaStatus: 'not_found',
    tags: ['High Priority', 'VC', 'Investors', 'Fundraising'],
    source: 'https://week.token2049.com/',
    routeHint: 'No matching Luma registration was found. Treat as a high-priority fundraising block if you register or confirm access.'
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
    tags: ['Core Conference', 'Institutions', 'VC'],
    source: 'https://www.token2049.com/singapore/agenda',
    routeHint: 'Main conference access is not represented by your Luma guest status. Use MBS as the base for Oct 8.'
  },
  {
    id: 'stablecoin-summit',
    title: 'Stablecoin Summit 2026',
    host: 'TOKEN2049 Week ecosystem',
    date: '2026-10-08',
    start: '09:00',
    end: '18:00',
    location: 'Singapore · verify venue before travel',
    priority: 'secondary',
    status: 'Registration required',
    lumaStatus: 'not_found',
    tags: ['Stablecoins', 'Payments', 'Treasury'],
    source: 'https://media-grill.com/token2049/',
    routeHint: 'No matching Luma registration was found. Use for targeted stablecoin/payment meetings rather than all-day attendance.'
  },
  {
    id: 'treasury-table',
    title: 'The Treasury Table',
    host: 'Locus',
    date: '2026-10-08',
    start: '15:30',
    end: '18:30',
    location: 'Singapore · address shared upon approval',
    priority: 'primary',
    status: 'Closed-door · approval required',
    lumaStatus: 'pending_approval',
    tags: ['High Priority', 'Treasury', 'Stablecoins', 'Payments', 'Business Banking'],
    luma: 'https://luma.com/k8jylkcm',
    routeHint: 'Pending approval. One of the strongest Connextium-fit sessions; prioritize immediately if approved.'
  },
  {
    id: 'finality-forum',
    title: 'Finality Forum',
    host: 'TOKEN2049 Week ecosystem',
    date: '2026-10-09',
    start: '10:00',
    end: '18:00',
    location: 'Singapore · verify venue before travel',
    priority: 'primary',
    status: 'Registration required',
    lumaStatus: 'not_found',
    tags: ['High Priority', 'Settlement', 'Finality', 'Infrastructure'],
    source: 'https://media-grill.com/token2049/',
    routeHint: 'No matching Luma registration was found. Best technical fit for T0 settlement/finality if access is confirmed.'
  },
  {
    id: 'rwa-summit',
    title: 'RWA Summit Singapore',
    host: 'RWA WEEK · UVECON.VC',
    date: '2026-10-09',
    start: '10:00',
    end: '17:00',
    location: 'Marina One West Tower',
    address: '9 Straits View, Singapore 018937',
    priority: 'secondary',
    status: 'Approval required',
    lumaStatus: 'approved',
    tags: ['RWA', 'Capital', 'Institutional Finance'],
    luma: 'https://luma.com/rwasummit',
    source: 'https://media-grill.com/token2049/',
    routeHint: 'You are approved. Strong RWA/capital option on Oct 9; promote if investor meetings are arranged around it.'
  },
  {
    id: 'founder-vc-day2',
    title: 'Founder × VC Summit · Day 2 Happy Hour',
    host: 'BackersStage Capital',
    date: '2026-10-09',
    start: '18:00',
    end: '22:00',
    location: 'Singapore · exact venue after approval',
    priority: 'secondary',
    status: 'Separate Day 2 RSVP · approval required',
    lumaStatus: 'pending_approval',
    tags: ['VC', 'Founders', 'Networking'],
    luma: 'https://luma.com/4lzbeit3',
    routeHint: 'Pending approval. Good fundraising follow-up after a daytime institutional or RWA event.'
  }
];

export const priorityLabels: Record<Priority, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  third: '3rd option',
};

export const lumaStatusLabels: Record<LumaStatus, string> = {
  approved: "You're in",
  pending_approval: 'Pending approval',
  waitlist: 'Waitlist',
  not_found: 'Not in Luma',
  external: 'External pass',
};
