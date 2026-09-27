export type MediaLinks = {
  website?: string;
  linkedin?: string;
  x?: string;
  telegram?: string;
  luma?: string;
};

export type PublicCalendarEvent = {
  id: string;
  name: string;
  url: string;
  location: string;
  geo?: { lat: number; lng: number };
  hosts: string[];
  tags: string[];
  goingCount?: number;
  visiblePeople?: string[];
};

export type OrganizationProfile = {
  id: string;
  name: string;
  services: string[];
  location?: string;
  eventPresence: string[];
  eventIds: string[];
  media: MediaLinks;
};

export type ParticipantProfile = {
  id: string;
  name: string;
  role?: string;
  specialty: string[];
  company?: string;
  location?: string;
  eventIds: string[];
  media: MediaLinks;
  relation: 'host' | 'speaker' | 'public-attendee';
};

export const publicCalendarEvents: PublicCalendarEvent[] = [
  { id: 'pre-token-ai-mixers', name: 'Pre Token 2049 Web3 Ai : Mixers', url: 'https://luma.com/rweo2o60', location: 'Singapore', geo: { lat: 1.3521, lng: 103.8198 }, hosts: ['Asia Web3 Ai Association (AWAA)', 'Insight Genesis'], tags: ['AI', 'Crypto', 'Networking'] },
  { id: '0g-dev-day', name: '0G Dev Day: ZERO TO INFINITY', url: 'https://luma.com/0g-devday-2026', location: 'National Gallery Singapore', geo: { lat: 1.2906, lng: 103.8519 }, hosts: ['0G Foundation'], tags: ['AI', 'Crypto', 'Infrastructure'], goingCount: 1692, visiblePeople: ['Ash', 'Brandon S. | Blockworks'] },
  { id: 'dealflow-sg', name: 'THE DEALFLOW SINGAPORE - INVESTOR BRUNCH', url: 'https://luma.com/dealflowsg', location: 'Singapore', geo: { lat: 1.2903, lng: 103.8519 }, hosts: ['UVECON.VC', 'Joao Raza'], tags: ['Investing', 'RWA', 'Networking'] },
  { id: 'rwa-capital-forum', name: 'RWA Capital Forum', url: 'https://luma.com/ydaq5h18', location: 'Downtown Core', geo: { lat: 1.2868, lng: 103.8530 }, hosts: ['Raphael | Taisu Ventures'], tags: ['Investing', 'Tokenization', 'RWA'] },
  { id: 'blockchain-impact', name: 'Blockchain Impact Singapore', url: 'https://luma.com/y6nco425', location: 'One Marina Boulevard', geo: { lat: 1.2824, lng: 103.8549 }, hosts: ['Eric ALEXANDRE', 'Cecilia Wong'], tags: ['Crypto', 'Blockchain'], goingCount: 114, visiblePeople: ['Manav Goyal', 'Darenfoo | OneCloud'] },
  { id: 'risky-business', name: "Risky Business - Singapore '26", url: 'https://luma.com/dupkf78j', location: 'Downtown Core', geo: { lat: 1.2868, lng: 103.8530 }, hosts: ['Lu Li'], tags: ['Builders', 'DeFi', 'Security'], goingCount: 64, visiblePeople: ['Nathaly Diniz', 'Ben Lakoff'] },
  { id: 'grayscale-gfi', name: 'Grayscale x Global Fintech Institute: Privacy, Proof and the Regulatory Perimeter', url: 'https://luma.com/y362597j', location: 'Tanjong Pagar', geo: { lat: 1.2764, lng: 103.8459 }, hosts: ['Global Fintech Institute', 'Grayscale', 'Hui Yi HO'], tags: ['Regulation', 'Privacy', 'Crypto'] },
  { id: 'grade-alliance', name: 'GRADE Alliance: Composable, Compliant, Trusted', url: 'https://luma.com/fh6aggg8', location: 'Central Area', geo: { lat: 1.2900, lng: 103.8520 }, hosts: ['Trina Gan', 'Mark Tang | Hydra X', 'Hui Ying'], tags: ['Tokenization', 'Compliance', 'Cross-border'] },
  { id: 'roundtable', name: 'Roundtable during TOKEN2049 week in Singapore', url: 'https://luma.com/oyun7q74', location: 'Central Area', geo: { lat: 1.2900, lng: 103.8520 }, hosts: ['Anna Gates', 'Lucas Nicolet-Serra', 'Jussi AITTOLA'], tags: ['Legal', 'Regulation', 'Payments', 'Web3'] },
  { id: 'haruko-kalshi', name: 'Haruko and Kalshi Present: More than a million', url: 'https://luma.com/zsgdwcee', location: 'Downtown Core', geo: { lat: 1.2868, lng: 103.8530 }, hosts: ['Adrian Rymill', 'Daniel Holmes', 'Elyse Quek', 'Andy Ross', 'ico beast', 'Kalshi'], tags: ['Markets', 'Networking', 'Crypto'] },
  { id: 'nodexx-pool', name: 'SPLASH! NODEXX PRIVATE POOL PARTY', url: 'https://luma.com/qlijhogl', location: 'Bukit Timah', geo: { lat: 1.3294, lng: 103.8021 }, hosts: ['NodeXX'], tags: ['Investing', 'Parties', 'Tokenization'] },
  { id: 'afterdark', name: 'The Best Event: AFTERDARK', url: 'https://luma.com/tbe-afterdark', location: 'Singapore', geo: { lat: 1.3521, lng: 103.8198 }, hosts: ['Tobias Bauer', 'Brent Fulfer', 'Mihir Odhrani'], tags: ['Arts & Culture', 'Crypto', 'Parties'], goingCount: 1788, visiblePeople: ['Jawahar Subramanian', 'Brandon S. | Blockworks'] },
  { id: 'fastx-yacht', name: 'FastX Yacht Party', url: 'https://luma.com/3uhh0ixb', location: 'Southern Islands', geo: { lat: 1.2244, lng: 103.8370 }, hosts: ['FastX Exchange'], tags: ['Crypto', 'Networking'] },
  { id: 'bullish-bitgo', name: 'Bullish & BitGo VIP Reception', url: 'https://luma.com/mt2t442r', location: 'Downtown Core', geo: { lat: 1.2868, lng: 103.8530 }, hosts: ['Bullish Events', 'BitGo Events'], tags: ['Digital assets', 'Institutional'] },
  { id: '0g-vip', name: '0G Dev Day VIP Reception Dinner', url: 'https://luma.com/0g-VIP-reception', location: 'Central Area', geo: { lat: 1.2900, lng: 103.8520 }, hosts: ['0G Foundation'], tags: ['AI', 'Crypto', 'Networking'], goingCount: 5, visiblePeople: ['Dany Vaiman', 'George V'] },
  { id: 'skyline-social', name: 'Skyline Social Singapore', url: 'https://luma.com/q22mvxx7', location: 'Downtown Core', geo: { lat: 1.2868, lng: 103.8530 }, hosts: ['Raphael | Taisu Ventures'], tags: ['Dining', 'Parties', 'Investing'] },
  { id: 'makebanc-vip', name: 'Allocators | Managers | Providers | VIP Drinks', url: 'https://luma.com/a7awb2po', location: 'Outram', geo: { lat: 1.2819, lng: 103.8390 }, hosts: ['Chris Mihos | MakeBanc', 'Alex Zonneveld | MakeBanc'], tags: ['Allocators', 'Asset management', 'Infrastructure'] },
  { id: 'run-the-bay', name: 'Run the Bay: Crypto Whales Edition', url: 'https://luma.com/cja6d4ku', location: 'Downtown Core', geo: { lat: 1.2868, lng: 103.8530 }, hosts: ['A36 Labs'], tags: ['Builders', 'Investing', 'Sports'], goingCount: 55, visiblePeople: ['BT Yap', 'Ren crypto'] },
  { id: 'utila-run', name: 'Utila Run Club: TOKEN2049', url: 'https://luma.com/utila-run-club', location: 'Marina South', geo: { lat: 1.2709, lng: 103.8632 }, hosts: ['Utila .io', 'Paz'], tags: ['Crypto', 'Fitness', 'Running'] },
];

export const organizations: OrganizationProfile[] = [
  { id: 'awaa', name: 'Asia Web3 Ai Association (AWAA)', services: ['Web3 ecosystem', 'AI ecosystem', 'RWA community'], eventPresence: ['Singapore'], eventIds: ['pre-token-ai-mixers'], media: { website: 'https://asiaweb3aiassociation.org', linkedin: 'https://www.linkedin.com/company/asia-web3-ai-association', x: 'https://x.com/AsiaWeb3Ai', telegram: 'https://t.me/AsiaBlockchainEvents', luma: 'https://luma.com/rweo2o60' } },
  { id: 'insight-genesis', name: 'Insight Genesis', services: ['AI assessment', 'Web3 platform'], eventPresence: ['Singapore'], eventIds: ['pre-token-ai-mixers'], media: { website: 'https://insightgenesis.ai', x: 'https://x.com/genesis_insight', telegram: 'https://t.me/InsightGenesis', luma: 'https://luma.com/rweo2o60' } },
  { id: '0g', name: '0G Foundation / 0G Labs', services: ['Decentralized AI infrastructure', 'Compute', 'Storage', 'Data availability'], eventPresence: ['National Gallery Singapore', 'Central Area'], eventIds: ['0g-dev-day', '0g-vip'], media: { website: 'https://0g.ai', x: 'https://x.com/0G_labs', telegram: 'https://t.me/web3_0glabs', luma: 'https://luma.com/0g-devday-2026' } },
  { id: 'uvecon', name: 'UVECON.VC', services: ['Venture capital', 'Investor networking'], eventPresence: ['Singapore'], eventIds: ['dealflow-sg'], media: { website: 'https://uvecon.vc', luma: 'https://luma.com/dealflowsg' } },
  { id: 'taisu', name: 'Taisu Ventures', services: ['Venture capital', 'Digital assets', 'RWA investing'], eventPresence: ['Downtown Core'], eventIds: ['rwa-capital-forum', 'skyline-social'], media: { luma: 'https://luma.com/ydaq5h18' } },
  { id: 'grego', name: 'Grego AI', services: ['AI security', 'Smart-contract security', 'Bug bounty'], eventPresence: ['Downtown Core'], eventIds: ['risky-business'], media: { luma: 'https://luma.com/dupkf78j' } },
  { id: 'gfi', name: 'Global Fintech Institute', services: ['Fintech education', 'Accreditation', 'Responsible innovation'], eventPresence: ['Tanjong Pagar'], eventIds: ['grayscale-gfi'], media: { website: 'https://linktr.ee/GlobalFintechInstitute', luma: 'https://luma.com/y362597j' } },
  { id: 'grayscale', name: 'Grayscale', services: ['Digital asset investment products'], eventPresence: ['Tanjong Pagar'], eventIds: ['grayscale-gfi'], media: { website: 'https://grayscale.com', luma: 'https://luma.com/y362597j' } },
  { id: 'grade', name: 'GRADE Alliance', services: ['Tokenized assets', 'Cross-border listings', 'Regulated market infrastructure'], eventPresence: ['Central Area'], eventIds: ['grade-alliance'], media: { website: 'https://gradealliance.xyz', luma: 'https://luma.com/fh6aggg8' } },
  { id: 'hydrax', name: 'Hydra X', services: ['Digital asset infrastructure', 'Tokenization'], eventPresence: ['Central Area'], eventIds: ['grade-alliance'], media: { luma: 'https://luma.com/fh6aggg8' } },
  { id: 'klgates', name: 'K&L Gates', services: ['Legal services', 'Digital asset regulation'], eventPresence: ['Central Area'], eventIds: ['roundtable'], media: { website: 'https://www.klgates.com', luma: 'https://luma.com/oyun7q74' } },
  { id: 'alixpartners', name: 'AlixPartners', services: ['Consulting', 'Digital assets'], eventPresence: ['Central Area'], eventIds: ['roundtable'], media: { website: 'https://www.alixpartners.com', luma: 'https://luma.com/oyun7q74' } },
  { id: 'xcollective', name: 'xcollective_', services: ['Web3 advisory', 'Ecosystem'], eventPresence: ['Central Area'], eventIds: ['roundtable'], media: { website: 'https://xcollective.global', luma: 'https://luma.com/oyun7q74' } },
  { id: 'sphere-state', name: 'Sphere State Group', services: ['Advisory', 'Digital assets'], eventPresence: ['Central Area'], eventIds: ['roundtable'], media: { website: 'https://spherestate.com', luma: 'https://luma.com/oyun7q74' } },
  { id: 'blf', name: 'Blockchain Lawyers Forum', services: ['Legal network', 'Blockchain regulation'], eventPresence: ['Central Area'], eventIds: ['roundtable'], media: { website: 'https://blf.io', luma: 'https://luma.com/oyun7q74' } },
  { id: 'haruko', name: 'Haruko', services: ['Digital asset operations', 'Institutional crypto'], eventPresence: ['Downtown Core'], eventIds: ['haruko-kalshi'], media: { luma: 'https://luma.com/zsgdwcee' } },
  { id: 'kalshi', name: 'Kalshi', services: ['Prediction markets'], eventPresence: ['Downtown Core'], eventIds: ['haruko-kalshi'], media: { website: 'https://kalshi.com', luma: 'https://luma.com/zsgdwcee' } },
  { id: 'nodexx', name: 'NodeXX', services: ['Multi-asset trading', 'Wallets', 'Financial products'], eventPresence: ['Bukit Timah'], eventIds: ['nodexx-pool'], media: { website: 'https://www.nodexx.co/en', luma: 'https://luma.com/qlijhogl' } },
  { id: 'best-event', name: 'The Best Event', services: ['Web3 events', 'Community', 'Culture'], eventPresence: ['Singapore'], eventIds: ['afterdark'], media: { luma: 'https://luma.com/tbe-afterdark' } },
  { id: 'fastx', name: 'FastX Exchange', services: ['Crypto exchange', 'Digital assets'], eventPresence: ['Southern Islands'], eventIds: ['fastx-yacht'], media: { website: 'https://fastx.co', luma: 'https://luma.com/3uhh0ixb' } },
  { id: 'bullish', name: 'Bullish', services: ['Digital asset exchange', 'Institutional markets'], eventPresence: ['Downtown Core'], eventIds: ['bullish-bitgo'], media: { luma: 'https://luma.com/mt2t442r' } },
  { id: 'bitgo', name: 'BitGo', services: ['Digital asset custody', 'Wallet infrastructure'], eventPresence: ['Downtown Core'], eventIds: ['bullish-bitgo'], media: { website: 'https://www.bitgo.com', luma: 'https://luma.com/mt2t442r' } },
  { id: 'makebanc', name: 'MakeBanc', services: ['Capital markets network', 'Asset management ecosystem'], eventPresence: ['Outram'], eventIds: ['makebanc-vip'], media: { luma: 'https://luma.com/a7awb2po' } },
  { id: 'a36', name: 'A36 Labs', services: ['AI/Web3 ecosystem', 'Founder programs', 'Investor community'], eventPresence: ['Downtown Core'], eventIds: ['run-the-bay'], media: { luma: 'https://luma.com/cja6d4ku' } },
  { id: 'utila', name: 'Utila', services: ['Stablecoin infrastructure', 'Digital asset operations', 'Enterprise wallets'], eventPresence: ['Marina South'], eventIds: ['utila-run'], media: { website: 'https://utila.io', luma: 'https://luma.com/utila-run-club' } },
];

export const participants: ParticipantProfile[] = [
  { id: 'joao-raza', name: 'Joao Raza', specialty: ['Investing', 'RWA'], company: 'UVECON.VC', eventIds: ['dealflow-sg'], media: { luma: 'https://luma.com/dealflowsg' }, relation: 'host' },
  { id: 'raphael-taisu', name: 'Raphael', specialty: ['Venture capital', 'RWA'], company: 'Taisu Ventures', eventIds: ['rwa-capital-forum', 'skyline-social'], media: { luma: 'https://luma.com/ydaq5h18' }, relation: 'host' },
  { id: 'lu-li', name: 'Lu Li', specialty: ['Security', 'AI'], company: 'Grego AI', eventIds: ['risky-business'], media: { luma: 'https://luma.com/dupkf78j' }, relation: 'host' },
  { id: 'hui-yi-ho', name: 'Hui Yi HO', specialty: ['Fintech', 'Regulation'], eventIds: ['grayscale-gfi'], media: { luma: 'https://luma.com/y362597j' }, relation: 'host' },
  { id: 'trina-gan', name: 'Trina Gan', specialty: ['Tokenization', 'Compliance'], eventIds: ['grade-alliance'], media: { luma: 'https://luma.com/fh6aggg8' }, relation: 'host' },
  { id: 'mark-tang', name: 'Mark Tang', specialty: ['Tokenization', 'Market infrastructure'], company: 'Hydra X', eventIds: ['grade-alliance'], media: { luma: 'https://luma.com/fh6aggg8' }, relation: 'host' },
  { id: 'anna-gates', name: 'Anna Gates', specialty: ['Legal', 'Digital assets'], eventIds: ['roundtable'], media: { luma: 'https://luma.com/oyun7q74' }, relation: 'host' },
  { id: 'lucas-nicolet', name: 'Lucas Nicolet-Serra', specialty: ['Legal', 'Digital assets'], eventIds: ['roundtable'], media: { luma: 'https://luma.com/oyun7q74' }, relation: 'host' },
  { id: 'jussi-aittola', name: 'Jussi AITTOLA', specialty: ['Legal', 'Digital assets'], eventIds: ['roundtable'], media: { luma: 'https://luma.com/oyun7q74' }, relation: 'host' },
  { id: 'adrian-rymill', name: 'Adrian Rymill', specialty: ['Institutional crypto', 'Markets'], company: 'Haruko', eventIds: ['haruko-kalshi'], media: { luma: 'https://luma.com/zsgdwcee' }, relation: 'host' },
  { id: 'daniel-holmes', name: 'Daniel Holmes', specialty: ['Institutional crypto', 'Markets'], company: 'Haruko', eventIds: ['haruko-kalshi'], media: { luma: 'https://luma.com/zsgdwcee' }, relation: 'host' },
  { id: 'tobias-bauer', name: 'Tobias Bauer', specialty: ['Web3', 'Community'], company: 'The Best Event', eventIds: ['afterdark'], media: { luma: 'https://luma.com/tbe-afterdark' }, relation: 'host' },
  { id: 'brent-fulfer', name: 'Brent Fulfer', specialty: ['Web3', 'Community'], company: 'The Best Event', eventIds: ['afterdark'], media: { luma: 'https://luma.com/tbe-afterdark' }, relation: 'host' },
  { id: 'mihir-odhrani', name: 'Mihir Odhrani', specialty: ['Web3', 'Community'], company: 'The Best Event', eventIds: ['afterdark'], media: { luma: 'https://luma.com/tbe-afterdark' }, relation: 'host' },
  { id: 'chris-mihos', name: 'Chris Mihos', specialty: ['Allocators', 'Asset management'], company: 'MakeBanc', eventIds: ['makebanc-vip'], media: { luma: 'https://luma.com/a7awb2po' }, relation: 'host' },
  { id: 'alex-zonneveld', name: 'Alex Zonneveld', specialty: ['Allocators', 'Asset management'], company: 'MakeBanc', eventIds: ['makebanc-vip'], media: { luma: 'https://luma.com/a7awb2po' }, relation: 'host' },
  { id: 'paz-utila', name: 'Paz', specialty: ['Digital assets', 'Stablecoins'], company: 'Utila', eventIds: ['utila-run'], media: { luma: 'https://luma.com/utila-run-club' }, relation: 'host' },
  { id: 'michael-heinrich', name: 'Michael Heinrich', role: 'CEO & Co-Founder', specialty: ['AI infrastructure', 'Web3'], company: '0G Labs', eventIds: ['0g-dev-day'], media: { luma: 'https://luma.com/0g-devday-2026' }, relation: 'speaker' },
  { id: 'weisi-yuen', name: 'Weisi Yuen', role: 'CSO', specialty: ['AI infrastructure', 'Strategy'], company: '0G', eventIds: ['0g-dev-day'], media: { luma: 'https://luma.com/0g-devday-2026' }, relation: 'speaker' },
  { id: 'taweh-beysolow', name: 'Taweh Beysolow II', role: 'CEO', specialty: ['DeFi', 'AI'], company: 'BOND Labs', eventIds: ['0g-dev-day'], media: { luma: 'https://luma.com/0g-devday-2026' }, relation: 'speaker' },
  { id: 'aytunc-yildizli', name: 'Aytunc Yildizli', role: 'Chief Ecosystem Growth Officer', specialty: ['Ecosystem growth', 'AI'], company: '0G Foundation', eventIds: ['0g-dev-day'], media: { luma: 'https://luma.com/0g-devday-2026' }, relation: 'speaker' },
  { id: 'will-riches', name: 'Will Riches', role: 'Head of DevRel', specialty: ['Developer relations', 'AI'], company: '0G Labs', eventIds: ['0g-dev-day'], media: { luma: 'https://luma.com/0g-devday-2026' }, relation: 'speaker' },
  { id: 'michal-pospieszalski', name: 'Michal “Mehow” Pospieszalski', role: 'CEO', specialty: ['AI', 'Security'], company: 'American Fortress', eventIds: ['0g-dev-day'], media: { luma: 'https://luma.com/0g-devday-2026' }, relation: 'speaker' },
  { id: 'tan-kiat-how', name: 'Tan Kiat How', role: 'Senior Minister of State', specialty: ['Digital development', 'Public policy'], company: 'Singapore Government', location: 'Singapore', eventIds: ['0g-dev-day'], media: { luma: 'https://luma.com/0g-devday-2026' }, relation: 'speaker' },
  { id: 'brandon-blockworks', name: 'Brandon S.', specialty: ['Media', 'Crypto'], company: 'Blockworks', eventIds: ['0g-dev-day', 'afterdark'], media: {}, relation: 'public-attendee' },
  { id: 'manav-goyal', name: 'Manav Goyal', specialty: ['Blockchain'], eventIds: ['blockchain-impact'], media: {}, relation: 'public-attendee' },
  { id: 'darenfoo', name: 'Darenfoo', specialty: ['Cloud', 'Blockchain'], company: 'OneCloud', eventIds: ['blockchain-impact'], media: {}, relation: 'public-attendee' },
  { id: 'nathaly-diniz', name: 'Nathaly Diniz', specialty: ['Crypto'], eventIds: ['risky-business'], media: {}, relation: 'public-attendee' },
  { id: 'ben-lakoff', name: 'Ben Lakoff', specialty: ['Crypto'], eventIds: ['risky-business'], media: {}, relation: 'public-attendee' },
  { id: 'jawahar', name: 'Jawahar Subramanian', specialty: ['Crypto'], eventIds: ['afterdark'], media: {}, relation: 'public-attendee' },
  { id: 'dany-vaiman', name: 'Dany Vaiman', specialty: ['AI', 'Crypto'], eventIds: ['0g-vip'], media: {}, relation: 'public-attendee' },
  { id: 'george-v', name: 'George V', specialty: ['AI', 'Crypto'], eventIds: ['0g-vip'], media: {}, relation: 'public-attendee' },
  { id: 'bt-yap', name: 'BT Yap', specialty: ['Crypto', 'Investing'], eventIds: ['run-the-bay'], media: {}, relation: 'public-attendee' },
  { id: 'ren-crypto', name: 'Ren crypto', specialty: ['Crypto'], eventIds: ['run-the-bay'], media: {}, relation: 'public-attendee' },
];

export const analyticsSnapshot = {
  calendarName: 'TOKEN2049 Singapore',
  calendarUrl: 'https://luma.com/token2049',
  capturedAt: '2026-09-27',
  coverage: 'Public calendar listings and public event pages only. Full attendee rosters are not public and require event-manager access on Luma. Participant analytics therefore covers publicly visible hosts, speakers, and named attendee samples only.',
};
