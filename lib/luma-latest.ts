import type { RawLumaEvent } from './luma-events';

const L = (
  id: string,
  title: string,
  host: string,
  date: string,
  start: string,
  end: string,
  location: string,
  status: RawLumaEvent['status'],
  url: string,
  address?: string,
): RawLumaEvent => ({ id, title, host, date, start, end, location, address, status, url });

// Latest sync from the connected Luma account for TOKEN2049 Singapore week.
// Entries here override same-id records in luma-events.ts and add newly registered events.
export const latestLumaEvents: RawLumaEvent[] = [
  L('payments-treasury-tokenization', 'Payments, Treasury and Tokenization Summit 2026 by 8 Circle, XDC, PWC and Microsoft', '8 Circle + XDC + PwC + Microsoft', '2026-10-08', '08:30', '12:00', 'PwC Singapore', 'waitlist', 'https://luma.com/dnonqx1u', '7 Straits View, Marina One, Singapore 018936'),
  L('venture-connect', 'Venture Connect: Projects, Investors & Strategic Partners', 'Venture Connect', '2026-10-08', '12:30', '19:30', 'Marina Bay Sands Singapore', 'approved', 'https://luma.com/6xwygcun', '10 Bayfront Ave, Singapore 018956'),
  L('agentic-finance-summit-odds', 'Agentic Finance Summit + The Odds: Prediction Markets Live', 'More & More Events + partners', '2026-10-08', '14:00', '20:00', 'Suntec Singapore Convention & Exhibition Centre', 'pending_approval', 'https://luma.com/8oxs8lco', '1 Raffles Blvd, Singapore 039593'),
  L('next-gen-payments-apac', 'The Next Generation of Payments in APAC', 'ODIG + Sunrate + Google Cloud', '2026-10-08', '14:00', '18:00', 'Guoco Midtown Network Hub', 'approved', 'https://luma.com/jecn61cf', '126 Beach Rd, Singapore 189773'),
  L('agent-ready-usdc', 'Agent-Ready USDC: Building on CCTP', 'Sui', '2026-10-08', '15:30', '16:30', 'Marina Bay Sands Expo & Convention', 'approved', 'https://luma.com/jip2jcsu', '10 Bayfront Ave, Singapore 018956'),
  L('treasury-table', 'The Treasury Table: A Gathering on Stablecoins, Payments, and the Future of Business Banking', 'Locus', '2026-10-08', '15:30', '18:30', 'Singapore · Downtown Core', 'pending_approval', 'https://luma.com/k8jylkcm'),
  L('onchain-finance-connect', 'Onchain Finance Connect', 'WebX', '2026-10-08', '17:00', '19:30', 'Singapore · Central Area', 'pending_approval', 'https://luma.com/0wq4vmrt'),
  L('investors-institutions-innovators', 'Investors, Institutions and Innovators Night 2026', 'TRIVE Digital + partners', '2026-10-08', '18:00', '21:00', 'Singapore · Central Area', 'pending_approval', 'https://luma.com/a63ces7l'),
  L('finality-forum', 'Finality Forum @ Token2049 SG 2026', 'Ethene Labs + Four Pillars + Mira', '2026-10-09', '10:00', '18:00', 'Singapore · Downtown Core', 'pending_approval', 'https://luma.com/g2lg0htf'),
  L('rwa-summit', 'RWA SUMMIT SINGAPORE', 'RWA WEEK · UVECON.VC', '2026-10-09', '10:00', '17:00', 'Marina One West Tower', 'approved', 'https://luma.com/rwasummit', '9 Straits View, Singapore 018937'),
  L('bitangels', 'BitAngels Singapore 2026', 'BitAngels + partners', '2026-10-09', '10:45', '14:30', 'Singapore · Downtown Core', 'pending_approval', 'https://luma.com/1dk27l6a'),
  L('institutional-table', 'The Institutional Table: Private Dinner on Tokenization, Stablecoins and Security', 'QuillAudits', '2026-10-09', '19:30', '22:30', 'Singapore', 'pending_approval', 'https://luma.com/quilla-00kv'),
  L('founder-vc-day2', 'Founder x VC Summit | Day 2 - Happy Hour 🇸🇬', 'BackersStage Capital', '2026-10-09', '18:00', '22:00', 'Singapore River', 'pending_approval', 'https://luma.com/4lzbeit3'),
  L('penthouse-trackside', 'The Penthouse: Trackside', 'The Best Event + partners', '2026-10-10', '11:00', '14:00', 'Singapore · Downtown Core', 'pending_approval', 'https://luma.com/TBE-Elevation'),
  L('rwa-paddock', 'The Best Event: The RWA Paddock with Brickken', 'The Best Event + Brickken', '2026-10-10', '15:30', '18:30', 'Singapore · Downtown Core', 'pending_approval', 'https://luma.com/TBE-ThePaddock'),
];
