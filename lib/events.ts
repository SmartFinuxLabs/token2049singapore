export type Priority = 'primary' | 'secondary' | 'third';

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
  tags: string[];
  luma?: string;
  source?: string;
  routeHint: string;
};

export const events: EventItem[] = [
  {
    id: 'open-monad',
    title: 'Open',
    host: 'Monad Foundation',
    date: '2026-10-06',
    start: '09:00',
    end: '17:00',
    location: 'Singapore · exact venue revealed after approval',
    priority: 'primary',
    status: 'Approval required · Reserve Access available',
    tags: ['VC', 'Institutions', 'Payments', 'RWA', 'Infrastructure'],
    luma: 'https://luma.com/open-2026?lm_source=embed&tk=gDMQbC',
    source: 'https://media-grill.com/event/open/',
    routeHint: 'Use as the anchor event for Oct 6 morning. Leave only for a confirmed pitch or investor meeting.'
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
    tags: ['Fundraising', 'VC', 'Pitch', 'Stablecoins', 'AI'],
    luma: 'https://luma.com/gdqakgz3?tk=2ClOHT',
    routeHint: 'Promote to primary if a pitching slot or pre-arranged investor meetings are confirmed.'
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
    tags: ['AI', 'VC', 'Founders', 'Agentic Finance'],
    source: 'https://media-grill.com/event/ai-founders-investors-forum/',
    routeHint: 'Use if Open/Founder × VC access is not confirmed, or for a targeted investor introduction.'
  },
  {
    id: 'mantle-rwa',
    title: 'Mantle RWA Day · TOKEN2049 SG Edition',
    host: 'Mantle',
    date: '2026-10-06',
    start: '12:30',
    end: '17:00',
    location: 'The Exchange · Singapore Land Tower',
    address: '50 Raffles Pl, Level 4, Singapore 048623',
    priority: 'secondary',
    status: 'Free · approval required',
    tags: ['RWA', 'Stablecoins', 'Treasury', 'Institutional Finance'],
    source: 'https://media-grill.com/token2049/',
    routeHint: 'Strong afternoon alternative; geographically convenient for the CBD/Marina Bay institutional cluster.'
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
    tags: ['Banks', 'Stablecoins', 'Payments', 'Investment', 'Infrastructure'],
    luma: 'https://luma.com/lnga4ied?lm_source=embed&tk=FtO4gG',
    routeHint: 'Highest-value institutional alternative to Open in the afternoon; prioritize if approved and meetings are pre-booked.'
  },
  {
    id: 'token-main-day1',
    title: 'TOKEN2049 Singapore · Main Conference Day 1',
    host: 'TOKEN2049',
    date: '2026-10-07',
    start: '09:00',
    end: '18:00',
    location: 'Marina Bay Sands',
    address: '10 Bayfront Ave, Singapore 018956',
    priority: 'primary',
    status: 'Conference pass required',
    tags: ['Main Conference', 'Investors', 'Infrastructure'],
    source: 'https://www.token2049.com/singapore/agenda',
    routeHint: 'Stay at Marina Bay Sands unless a confirmed investor meeting provides higher value.'
  },
  {
    id: 'token-main-day2',
    title: 'TOKEN2049 Singapore · Main Conference Day 2',
    host: 'TOKEN2049',
    date: '2026-10-08',
    start: '09:00',
    end: '18:00',
    location: 'Marina Bay Sands',
    address: '10 Bayfront Ave, Singapore 018956',
    priority: 'primary',
    status: 'Conference pass required',
    tags: ['Main Conference', 'Institutions', 'VC'],
    source: 'https://www.token2049.com/singapore/agenda',
    routeHint: 'Use MBS as the base; leave for Treasury / stablecoin / investor sessions only when access is confirmed.'
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
    tags: ['Stablecoins', 'Payments', 'Treasury'],
    source: 'https://media-grill.com/token2049/',
    routeHint: 'Use for targeted stablecoin/payment meetings rather than all-day attendance.'
  },
  {
    id: 'founder-vc-day2',
    title: 'Founder × VC Summit · Happy Hour',
    host: 'BackersStage Capital',
    date: '2026-10-09',
    start: '17:00',
    end: '20:00',
    location: 'Singapore · separate RSVP',
    priority: 'secondary',
    status: 'Separate Day 2 RSVP',
    tags: ['VC', 'Founders', 'Networking'],
    luma: 'https://luma.com/gdqakgz3?tk=2ClOHT',
    routeHint: 'Good late-day fundraising follow-up after a daytime institutional summit.'
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
    tags: ['Settlement', 'Finality', 'Infrastructure'],
    source: 'https://media-grill.com/token2049/',
    routeHint: 'Best technical fit for T0 settlement/finality; pair with an investor networking event later in the day.'
  },
  {
    id: 'rwa-summit',
    title: 'RWA Summit Singapore',
    host: 'TOKEN2049 Week ecosystem',
    date: '2026-10-09',
    start: '10:00',
    end: '17:00',
    location: 'Singapore · verify venue before travel',
    priority: 'secondary',
    status: 'Registration required',
    tags: ['RWA', 'Capital', 'Institutional Finance'],
    source: 'https://media-grill.com/token2049/',
    routeHint: 'Secondary to Finality Forum unless investor meetings are specifically arranged around RWA capital.'
  }
];

export const priorityLabels: Record<Priority, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  third: '3rd option',
};
