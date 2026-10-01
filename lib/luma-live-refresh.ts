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

// Connected-Luma refresh for TOKEN2049 Singapore week.
// Retrieved from the signed-in Luma account; refreshed on 2026-10-01 and intentionally
// limited to Singapore / TOKEN2049-week events. These records override older
// snapshots in luma-events.ts and luma-latest.ts by stable itinerary id.
export const liveLumaEvents: RawLumaEvent[] = [
  L('opening-mixer', 'TOKEN2049 Singapore — Opening Mixer 🇸🇬', 'CoinEasy + BTSE Enterprise Solutions + Singapore Blockchain Week + partners', '2026-10-04', '15:00', '18:00', 'Barouv Rooftop Bar', 'approved', 'https://luma.com/bae06r0t', '33 Erskine Rd, Level 4 Scarlet Hotel, Singapore 069333'),
  L('rwa-capital-forum', 'RWA Capital Forum', 'Taisu Ventures', '2026-10-05', '11:30', '15:00', '21 Collyer Quay', 'approved', 'https://luma.com/ydaq5h18', '21 Collyer Quay, Singapore 049320'),
  L('best-event-afterdark', 'The Best Event: AFTERDARK', 'The Best Event', '2026-10-05', '18:00', '02:00', 'Singapore', 'approved', 'https://luma.com/tbe-afterdark'),
  L('skyline-social', 'Skyline Social Singapore', 'Taisu Ventures', '2026-10-05', '18:30', '22:00', 'Red Dot Design Museum', 'approved', 'https://luma.com/q22mvxx7', '11 Marina Blvd, Red Dot Design, Singapore 018940'),

  L('gamma-prime', 'Gamma Prime Investing Summit 2026 Singapore 🇸🇬 (Speakers: Arthur Hayes, Yat Siu & Haseeb Qureshi)', 'Gamma Prime + Sui + DFG', '2026-10-06', '08:30', '20:00', 'The Fullerton Hotel Singapore', 'approved', 'https://luma.com/investingsummit2026Singapore', '1 Fullerton Sq, Singapore 049178'),
  L('open-monad', 'Open', 'Monad Foundation', '2026-10-06', '09:00', '17:00', 'Jiak Kim House', 'approved', 'https://luma.com/open-2026', '5 Jiak Kim St, #01–17, Singapore 169425'),
  L('founder-vc-day1', 'Founder x VC Summit | Day 1 - Demo Day 🇸🇬', 'BackersStage Capital + Amazon Web Services Web3', '2026-10-06', '11:00', '17:00', 'Furama RiverFront', 'pending_approval', 'https://luma.com/gdqakgz3', '405 Havelock Rd, Singapore 169633'),
  L('ai-agent-summit', 'AI AGENT SUMMIT', 'Noos Network + TechubNews + 0G Foundation', '2026-10-06', '12:00', '18:00', 'Suntec Singapore Convention & Exhibition Centre', 'approved', 'https://luma.com/dktmv7d2', '1 Raffles Blvd, Singapore 039593'),
  L('institutional-onchain', 'Institutional Onchain Finance Summit 2026', 'Cregis IO + FOMO Pay + Futurecloud + partners', '2026-10-06', '13:00', '17:00', 'Conrad Singapore Marina Bay', 'approved', 'https://luma.com/lnga4ied', '2 Temasek Blvd, Singapore 038982'),
  L('stablecoin-funds-flow', 'STABLECOIN & PAYMENTS: FUNDS FLOW', 'WasabiCard', '2026-10-06', '13:00', '17:00', 'Raffles Singapore', 'approved', 'https://luma.com/gj0iv2kk', '1 Beach Rd, Singapore 189673'),
  L('agentic-money', 'Agentic Money 2026', 'LongTree Labs + Money in Motion + OSL Group', '2026-10-06', '13:30', '18:00', 'Guoco Midtown Network Hub', 'approved', 'https://luma.com/97p1rzs3', '126 Beach Rd, Singapore 189773'),
  L('arthur-hayes', 'Fireside Chat with Arthur Hayes and CNBC 🇸🇬 (In Person)', 'Gamma Prime', '2026-10-06', '13:30', '14:45', 'The Fullerton Hotel Singapore', 'approved', 'https://luma.com/ArthurHayes', '1 Fullerton Sq, Singapore 049178'),
  L('ethena-padel', 'Ethena Padel & Wellness Singapore', 'Ethena Labs + MoonPay + Jupiter', '2026-10-06', '14:00', '20:00', 'Prime Padel Dempsey', 'approved', 'https://luma.com/qim2vicq', '9A Sherwood Rd, Singapore 249450'),
  L('burning-mon', 'Burning Mon', 'Monad Foundation', '2026-10-06', '17:00', '20:00', 'Jiak Kim House', 'approved', 'https://luma.com/burningmon', '5 Jiak Kim St, #01–17, Singapore 169425'),
  L('trust-wallet-house', 'Beyond 9-Year Anniversary | Trust Wallet House @Token2049', 'TrustWalletEvent', '2026-10-06', '18:00', '22:00', 'HighHouse', 'approved', 'https://luma.com/8x8fhfoz', '1 Raffles Pl, L61-62, Singapore 048616'),
  L('future-money-payments', 'The Future of Money & Payments', 'Taisu Ventures', '2026-10-06', '18:30', '22:00', '33Club - Private Members Club Singapore', 'approved', 'https://luma.com/l4ewl7tf', '22 Malacca St, #01-02 Royal Brothers Building, Singapore 048980'),
  L('onchain-lounge', 'The Onchain Lounge', 'OpenEden + Utila + Blockaid + United Stables + partners', '2026-10-06', '19:00', '22:00', 'Milli - Rooftop Dining & Bar | Club Lounge', 'approved', 'https://luma.com/g9ajr0gx', "1 St Andrew's Rd, #05-02, #06-01 National Gallery Singapore, Singapore 178957"),
  L('stablecoin-happy-hour', 'Stablecoin Happy Hour - Hosted by Codex, Infinite & Interlace', 'Codex + Infinite + Interlace', '2026-10-06', '19:30', '22:30', 'Mandala Club', 'approved', 'https://luma.com/lcv40t0m', '31 Bukit Pasoh Rd, Singapore 089845'),
  L('institutional-ark', 'The Institutional Ark: Anchoring the Next Era of Digital Asset Growth', 'ChainUp', '2026-10-06', '20:00', '23:00', 'Monti At 1-Pavilion Italian Restaurant', 'approved', 'https://luma.com/xn1chytf', '82 Collyer Quay, Singapore 049327'),

  L('neobankers-brunch', 'Neobankers Brunch by Wirex, Rigid.fi, and Cardify Crypto', 'Wirex + RigidFi + partners', '2026-10-07', '10:00', '12:00', 'Brunetti Oro 6 Battery Road', 'approved', 'https://luma.com/vzpoa3ni', '6 Battery Rd, Singapore 049909'),
  L('stablecoin-sessions', 'Stablecoin Sessions @ Token2049 Singapore', 'Hack VC + Theoriq + Pharos Network + partners', '2026-10-07', '10:00', '12:00', 'Foreword Coffee @ Esplanade Mall', 'approved', 'https://luma.com/2m5vkueq', '8 Raffles Ave., #03-02, Singapore 039802'),
  L('payments-stablecoins-cafe', 'Payments and Stablecoins Cafe in MBS w/ Monad Foundation and StraitsX', 'Monad Foundation + StraitsX', '2026-10-07', '10:30', '17:00', 'PS.Cafe Marina Bay Sands', 'approved', 'https://luma.com/monad-straitsx', '10 Bayfront Ave, B2-119-120A, Singapore 018956'),
  L('sui-basecamp', 'Sui Basecamp 2026', 'Sui', '2026-10-07', '11:00', '17:00', 'Marina Bay Sands Singapore', 'approved', 'https://luma.com/SuiBasecamp2026', '10 Bayfront Ave, Singapore 018956'),
  L('cdd-jap-aws', 'CDD JAP × AWS Side Event @ TOKEN2049 Week -- AI × Web3 × Stablecoin: Infrastructure for the New Internet Economy', 'CDD JAP + AWS', '2026-10-07', '15:00', '18:00', 'Singapore', 'approved', 'https://luma.com/hdb1pfca', 'Singapore 018916'),
  L('ultra-connect', 'Ultra Connect Singapore', 'Ultra Web3 Festival 2026 + EMERGE GROUP + Web3Labs', '2026-10-07', '17:00', '22:00', 'Tono Izakaya Singapore', 'approved', 'https://luma.com/rwa4g698', '8A Marina Blvd, Singapore 018984'),
  L('utxo-pitch', 'Rooftop UTXO Pitch Night', 'Cardano Events + partners', '2026-10-07', '18:30', '23:00', 'LAVO Italian Restaurant And Rooftop Bar', 'approved', 'https://luma.com/utxopitchnight', '10 Bayfront Avenue, Marina Bay Sands, Level 57 Tower 1, Singapore 018956'),

  L('payments-treasury-tokenization', 'Payments, Treasury and Tokenization Summit 2026 by 8 Circle, XDC, PWC and Microsoft', '8 Circle + XDC Network + PwC + Microsoft', '2026-10-08', '08:30', '12:00', 'PwC Singapore', 'waitlist', 'https://luma.com/dnonqx1u', '7 Straits View, Marina One, Singapore 018936'),
  L('hsc-asset-management', 'HSC Asset Management Singapore', 'Metaverse Post + Trezor + Stellar Development Foundation', '2026-10-08', '09:00', '18:00', 'Fairmont Singapore', 'approved', 'https://luma.com/HSC_Singapore', '80 Bras Basah Rd, Singapore 189560'),
  L('midnight-cafe', 'Midnight Cafe with Midnight @ TOKEN2049 Singapore', 'Midnight', '2026-10-08', '10:30', '17:30', 'Maison Boulud', 'approved', 'https://luma.com/rvb1kraj', '10 Bayfront Ave, B1-15 & #01-83 The Shoppes, Marina Bay Sands, Singapore 018956'),
  L('onchain-mixer', 'The Onchain Mixer @ Token2049', 'ScalingX + partners', '2026-10-08', '11:00', '14:00', 'Roberta’s Marina Bay Sands', 'approved', 'https://luma.com/oknedt0y', '2 Bayfront Ave, B1-45, Singapore 018972'),
  L('venture-connect', 'Venture Connect: Projects, Investors & Strategic Partners', 'Venture Connect', '2026-10-08', '12:30', '19:30', 'Marina Bay Sands Singapore', 'approved', 'https://luma.com/6xwygcun', '10 Bayfront Ave, Singapore 018956'),
  L('privacy-pitched', 'Privacy Pitched with Midnight @ TOKEN2049 Singapore', 'Midnight', '2026-10-08', '13:00', '16:00', 'Maison Boulud', 'approved', 'https://luma.com/vxg0nlpp', '10 Bayfront Ave, B1-15 & #01-83 The Shoppes, Marina Bay Sands, Singapore 018956'),
  L('ai-emerging-onchain', 'AI & Emerging Onchain Assets-TOKEN 2049', 'BiXin Ventures + Principia Labs', '2026-10-08', '13:30', '17:30', 'Linson Customized Furniture', 'approved', 'https://luma.com/09pd8o7a', '70 Bendemeer Rd, #01-02 Luzerne building, Singapore 339940'),
  L('global-capital-onchain', 'GLOBAL CAPITAL, ONCHAIN', 'Solv Protocol + Stellar Development Foundation', '2026-10-08', '14:00', '18:00', 'ANTI:DOTE · Fairmont Hotel Singapore', 'approved', 'https://luma.com/8rpp0jks', '80 Bras Basah Rd, Level 1 Fairmont, Singapore 189560'),
  L('next-gen-payments-apac', 'The Next Generation of Payments in APAC', 'ODIG + Sunrate + Google Cloud', '2026-10-08', '14:00', '18:00', 'Guoco Midtown Network Hub', 'approved', 'https://luma.com/jecn61cf', '126 Beach Rd, Singapore 189773'),
  L('agent-ready-usdc', 'Agent-Ready USDC: Building on CCTP', 'Sui', '2026-10-08', '15:30', '16:30', 'Marina Bay Sands Expo & Convention', 'approved', 'https://luma.com/jip2jcsu', '10 Bayfront Ave, Singapore 018956'),
  L('btse-cocktail', 'BTSE Cocktail Party', 'BTSE Enterprise Solutions', '2026-10-08', '17:00', '20:00', 'Dallas Cafe & Bar (MBS)', 'approved', 'https://luma.com/7ny8uxph', '2 Bayfront Ave, #01-85 The Shoppes at Marina Bay Sands, Singapore 018972'),
  L('best-event-above-rails', 'The Best Event: Above the Rails with Kredete', 'The Best Event + Kredete + partners', '2026-10-08', '20:00', '23:00', 'Mandarin Oriental, Singapore', 'approved', 'https://luma.com/TBE-TheZenith', '5 Raffles Ave., Singapore 039797'),
  L('momentum', 'MOMENTUM', 'Axel Blaize + Cecilia Wong + Eric Alexandre + partners', '2026-10-08', '21:00', '02:00', 'Autobahn Motors', 'approved', 'https://luma.com/t9z9tqd5', '20 Jln Kilang, #02-00, Singapore 159418'),

  L('network-state', 'Network State Conference: Singapore Oct 9, 2026', 'Network School + Balaji + Zcash', '2026-10-09', '09:00', '20:00', 'Sands Expo & Convention Centre', 'approved', 'https://luma.com/ns2026', '10 Bayfront Ave, Singapore 018956'),
  L('finality-forum', 'Finality Forum @ Token2049 SG 2026', 'Ethene Labs + Four Pillars + Mira', '2026-10-09', '10:00', '18:00', 'The Exchange (Singapore Land Tower)', 'approved', 'https://luma.com/g2lg0htf', '50 Raffles Pl, Level 4 Singapore Land Tower, Singapore 048623'),
  L('rwa-summit', 'RWA SUMMIT SINGAPORE', 'UVECON.VC + Theoriq', '2026-10-09', '10:00', '17:00', 'Marina One West Tower', 'approved', 'https://luma.com/rwasummit', '9 Straits View, Singapore 018937'),
  L('agentic-finance-summit', 'Agentic Finance Summit + The Odds: Prediction Markets Live', 'More & More + etoro Events + Alpaca + partners', '2026-10-08', '14:00', '20:00', 'Suntec Singapore Convention & Exhibition Centre', 'approved', 'https://luma.com/8oxs8lco', '1 Raffles Blvd, #326, Singapore 039593'),
  L('sparky-game-on', 'SPARKY: GAME ON! 🎮', 'Sparky + MiniApps Store', '2026-10-09', '19:00', '02:00', 'Singapore', 'approved', 'https://luma.com/rruavcge', 'Singapore'),
  L('chinese-night', 'Chinese Night: AI & Token Era for Chinese Founders Going Global', 'UniqueBloom + Master Concept', '2026-10-09', '19:30', '22:00', 'Google Singapore', 'approved', 'https://luma.com/token2026', '70 Pasir Panjang Rd, #03-71, Singapore 117371'),
  L('digital-assets-tokenization-trackside', 'DIGITAL ASSETS & TOKENIZATION SUMMIT - TRACKSIDE EDITION', 'Luna PR', '2026-10-09', '09:00', '17:00', 'Singapore', 'pending_approval', 'https://luma.com/a19msg9w'),
];
