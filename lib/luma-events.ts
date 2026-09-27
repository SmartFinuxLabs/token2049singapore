export type RawLumaStatus = 'approved' | 'pending_approval' | 'waitlist' | 'invited';

export type RawLumaEvent = {
  id: string;
  title: string;
  host: string;
  date: string;
  start: string;
  end: string;
  location: string;
  address?: string;
  status: RawLumaStatus;
  url: string;
};

const L = (id: string, title: string, host: string, date: string, start: string, end: string, location: string, status: RawLumaStatus, url: string, address?: string): RawLumaEvent => ({ id, title, host, date, start, end, location, address, status, url });

export const lumaEvents: RawLumaEvent[] = [
L('opening-mixer','TOKEN2049 Singapore — Opening Mixer 🇸🇬','Tim Kinslow + partners','2026-10-04','15:00','18:00','Barouv Rooftop Bar','approved','https://luma.com/bae06r0t','33 Erskine Rd, Level 4 Scarlet Hotel, Singapore 069333'),
L('rwa-capital-forum','RWA Capital Forum','Taisu Ventures','2026-10-05','11:30','15:00','21 Collyer Quay','approved','https://luma.com/ydaq5h18','21 Collyer Quay, Singapore 049320'),
L('risky-business','Risky Business - Singapore ’26','Grego AI Events','2026-10-05','15:00','19:00','Singapore · Downtown Core','pending_approval','https://luma.com/dupkf78j'),
L('alix-roundtable','Roundtable during TOKEN2049 week in Singapore','AlixPartners','2026-10-05','16:30','19:00','Singapore · Central Area','pending_approval','https://luma.com/oyun7q74'),
L('haruko-kalshi','Haruko and Kalshi Present: More than a million','Haruko + Kalshi','2026-10-05','17:00','21:30','Singapore · Downtown Core','pending_approval','https://luma.com/zsgdwcee'),
L('best-event-afterdark','The Best Event: AFTERDARK','The Best Event','2026-10-05','18:00','02:00','Singapore','approved','https://luma.com/tbe-afterdark'),
L('skyline-social','Skyline Social Singapore','Taisu Ventures','2026-10-05','18:30','22:00','Red Dot Design Museum','approved','https://luma.com/q22mvxx7','11 Marina Blvd, Singapore 018940'),

L('gamma-prime','Gamma Prime Investing Summit 2026 Singapore 🇸🇬','Gamma Prime + Sui + DFG','2026-10-06','08:30','20:00','The Fullerton Hotel Singapore','approved','https://luma.com/investingsummit2026Singapore','1 Fullerton Sq, Singapore 049178'),
L('ai-formal-verification','AI & Formal Verification for Onchain Finance','QuillAudits','2026-10-06','09:00','12:00','Singapore','pending_approval','https://luma.com/craugplf'),
L('open-monad','Open','Monad Foundation','2026-10-06','09:00','17:00','Jiak Kim House','approved','https://luma.com/open-2026','5 Jiak Kim St, #01–17, Singapore 169425'),
L('web3-devs-underground','Web3 Devs Underground | Singapore Edition','Masterkey.vc + Web3 Devs Underground','2026-10-06','09:00','21:00','The Fullerton Hotel Singapore','pending_approval','https://luma.com/web3devs-1xx2','1 Fullerton Sq, Singapore 049178'),
L('sh3-coffee','SH3 Connects Coffee Meetup Singapore Edition Token2049','EvolvH3R + partners','2026-10-06','09:30','11:00','Singapore River','pending_approval','https://luma.com/bbstr33c'),
L('agentic-finance-payments','Agentic Finance & Payments Summit @ Token2049','Reap + Payward + Visa','2026-10-06','10:00','14:00','Singapore · Central Area','pending_approval','https://luma.com/gbn6o60s'),
L('deltav-demo','DeltaV Demo Day','Monad Foundation','2026-10-06','10:00','12:00','Singapore River','pending_approval','https://luma.com/deltav-demo-day-open26'),
L('cross-border-brunch','Cross-Border Brunch by Kanga Global','Kanga Global','2026-10-06','11:00','14:00','Singapore · Central Area','pending_approval','https://luma.com/8z12z1is'),
L('founder-vc-day1','Founder x VC Summit | Day 1 - Demo Day 🇸🇬','BackersStage Capital + AWS Web3','2026-10-06','11:00','17:00','Furama RiverFront','pending_approval','https://luma.com/gdqakgz3','405 Havelock Rd, Singapore 169633'),
L('walletconnect-pulse','WalletConnect Pulse at Token 2049','WalletConnect + partners','2026-10-06','11:00','14:00','Sospiri','pending_approval','https://luma.com/partnerbrunch_tokensg','2 Central Blvd, #07-02, Singapore 018916'),
L('ai-agent-summit','AI AGENT SUMMIT','Noos Network + TechubNews + 0G Foundation','2026-10-06','12:00','18:00','Suntec Singapore Convention & Exhibition Centre','approved','https://luma.com/dktmv7d2','1 Raffles Blvd, Singapore 039593'),
L('global-onchain-summit','Global Onchain Summit Singapore 2026','Coingape Events','2026-10-06','12:00','17:00','Singapore · Central Area','pending_approval','https://luma.com/5c8pnpl2'),
L('animoca-portfolio-day','Animoca Portfolio Day — GTM in the Agentic Era','Animoca Brands + AWS Startups','2026-10-06','12:30','17:00','Singapore','pending_approval','https://luma.com/portfolioday2026'),
L('mantle-rwa','Mantle RWA Day (Token2049 SG Edition)','Mantle','2026-10-06','12:30','17:00','The Exchange (Singapore Land Tower)','pending_approval','https://luma.com/mantle-2pek','50 Raffles Pl, Level 4, Singapore 048623'),
L('institutional-onchain','Institutional Onchain Finance Summit 2026','Cregis IO + FOMO Pay + partners','2026-10-06','13:00','17:00','Conrad Singapore Marina Bay','approved','https://luma.com/lnga4ied','2 Temasek Blvd, Singapore 038982'),
L('stablecoin-funds-flow','STABLECOIN & PAYMENTS: FUNDS FLOW','WasabiCard','2026-10-06','13:00','17:00','Raffles Singapore','approved','https://luma.com/gj0iv2kk','1 Beach Rd, Singapore 189673'),
L('agentic-money','Agentic Money 2026','LongTree Labs + Money in Motion + OSL Group','2026-10-06','13:30','18:00','Guoco Midtown Network Hub','approved','https://luma.com/97p1rzs3','126 Beach Rd, Singapore 189773'),
L('arthur-hayes','Fireside Chat with Arthur Hayes and CNBC 🇸🇬','Gamma Prime','2026-10-06','13:30','14:45','The Fullerton Hotel Singapore','approved','https://luma.com/ArthurHayes','1 Fullerton Sq, Singapore 049178'),
L('merkle-science','Merkle Science Meet Singapore: Shaping the Future of Digital Asset Compliance','Merkle Science + partners','2026-10-06','13:30','18:30','Singapore · Central Area','pending_approval','https://luma.com/pgh8dk05'),
L('ethena-padel','Ethena Padel & Wellness Singapore','Ethena Labs + MoonPay + Jupiter','2026-10-06','14:00','20:00','Prime Padel Dempsey','approved','https://luma.com/qim2vicq','9A Sherwood Rd, Singapore 249450'),
L('banking-agent-economy','Banking the Agent Economy - Token 2049','Aaron','2026-10-06','14:30','17:30','Estonian Business Hub - Singapore','pending_approval','https://luma.com/3cvlquah','18 Robinson Rd, #21-03, Singapore 048547'),
L('quants-lab','Quants Lab by Quants.Space x POD','Quants.Space + POD','2026-10-06','15:00','19:00','Singapore River','pending_approval','https://luma.com/qhsp0ynh'),
L('onchain-at-scale','Onchain at Scale — IBM × Optimism','Optimism Events','2026-10-06','15:30','17:00','Singapore · Downtown Core','pending_approval','https://luma.com/r6tsx6hr'),
L('tokenised-vip','TOKENISED SINGAPORE VIP EVENT','UVECON.VC + TRM Labs','2026-10-06','16:00','20:00','Singapore · Downtown Core','pending_approval','https://luma.com/tokenised'),
L('tokenize-this','TokenizeThis 2026 by RedStone Singapore','TokenizeThis + RedStone + Alchemy','2026-10-06','16:00','22:00','The Masons Table','pending_approval','https://luma.com/sk9weqs5','23A Coleman St, Singapore 179806'),
L('near-happy-hour','NEAR Happy Hour @ Token2049 SG','NEAR Foundation','2026-10-06','16:30','19:00','Singapore · Outram','pending_approval','https://luma.com/yvo094xl'),
L('burning-mon','Burning Mon','Monad Foundation','2026-10-06','17:00','20:00','Jiak Kim House','approved','https://luma.com/burningmon','5 Jiak Kim St, #01–17, Singapore 169425'),
L('network-chill','Network & Chill: Good Vibes. No fluff.','ALL THINGS BLOCKCHAIN + partners','2026-10-06','17:00','20:00','Singapore · Central Area','pending_approval','https://luma.com/e3eezvfe'),
L('above-the-bay','Above the Bay: Backing the Next Trillion','Flare + Firelight Protocol','2026-10-06','18:00','21:00','Singapore · Downtown Core','pending_approval','https://luma.com/sybtczzh'),
L('trust-wallet-house','Beyond 9-Year Anniversary | Trust Wallet House @Token2049','Trust Wallet','2026-10-06','18:00','22:00','HighHouse','approved','https://luma.com/8x8fhfoz','1 Raffles Pl, L61-62, Singapore 048616'),
L('digital-assets-skyline','Digital Assets Skyline','Hacken','2026-10-06','18:00','23:00','Singapore · Chinatown','pending_approval','https://luma.com/hacken-qhdh'),
L('dwf-labs-haus','DWF Labs Haus: TOKEN2049 Singapore','DWF Labs','2026-10-06','18:00','22:00','Singapore','pending_approval','https://luma.com/DWFLabsHaus-SG2026'),
L('money-in-motion','Money in Motion: TOKEN2049','APA','2026-10-06','18:00','22:00','AP House Singapore','pending_approval','https://luma.com/mzjn1yn4','1 Beach Rd, Singapore 189673'),
L('clearing-house','The Clearing House II: Singapore','Midas RWA + The Clearing House','2026-10-06','18:00','21:00','Singapore · Downtown Core','pending_approval','https://luma.com/nz1g1prw'),
L('open-board','TOKEN2049 Open Board: Founders & VC’s / Singapore','Sal’Ad Labs + partners','2026-10-06','18:00','22:00','Singapore · Downtown Core','pending_approval','https://luma.com/3ebl12gl'),
L('in-transit','In Transit: Happy Hour by Across, Paxos Labs, and Quicknode','Across + Paxos Labs + Quicknode','2026-10-06','18:30','20:30','Singapore · Downtown Core','pending_approval','https://luma.com/hubdiz3j'),
L('stablecoins-rails-debate','Stablecoins: from Tokens to Rails. A debate','Fintech Guild + M0','2026-10-06','18:30','21:30','Singapore · Central Area','pending_approval','https://luma.com/f0zs81q0'),
L('future-money-payments','The Future of Money & Payments','Taisu Ventures','2026-10-06','18:30','22:00','33Club','approved','https://luma.com/l4ewl7tf','22 Malacca St, #01-02, Singapore 048980'),
L('vip-trust-dinner','VIP Dinner: Building the Next Decade of Trust','WIDTH','2026-10-06','18:30','21:00','Andaz Singapore','pending_approval','https://luma.com/prrgkui8','5 Fraser St, Singapore 189354'),
L('bing-bong','BING BONG TOKEN2049 SINGAPORE powered by PHANTOM','Bing Bong','2026-10-06','19:00','00:00','Singapore · Tanjong Pagar','pending_approval','https://luma.com/mklcgofo'),
L('off-menu-rwa','OFF MENU 2049: RWA, DeFi and Whiskey night','SPICE','2026-10-06','19:00','22:00','Singapore · Central Area','pending_approval','https://luma.com/51wblzso'),
L('ault-society','The AULT Society','Aultmarkets + INPUT Global Events','2026-10-06','19:00','23:00','MO BAR','pending_approval','https://luma.com/AULTSociety','5 Raffles Ave., Floor 3, Singapore 039797'),
L('onchain-lounge','The Onchain Lounge','OpenEden + Utila + Blockaid','2026-10-06','19:00','22:00','Milli - Rooftop Dining & Bar','pending_approval','https://luma.com/g9ajr0gx','National Gallery Singapore, 1 St Andrew’s Rd, Singapore 178957'),
L('stablecoin-happy-hour','Stablecoin Happy Hour - Hosted by Codex and Infinite','Codex + Infinite','2026-10-06','19:30','22:30','Mandala Club','approved','https://luma.com/lcv40t0m','31 Bukit Pasoh Rd, Singapore 089845'),
L('flow-state','FLOW STATE — Sui, Capital & the People Building It','Comma3 Ventures + Sui','2026-10-06','20:00','22:30','RASA Space','pending_approval','https://luma.com/3efqkffc','9 Raffles Place #02-01, Singapore 048619'),
L('institutional-ark','The Institutional Ark: Anchoring the Next Era of Digital Asset Growth','ChainUp','2026-10-06','20:00','23:00','Monti At 1-Pavilion','approved','https://luma.com/xn1chytf','82 Collyer Quay, Singapore 049327'),
L('liquid-hours','Liquid Hours by Libeara, BNY Investments, Certik & Utila','Libeara + partners','2026-10-06','20:30','23:30','Vatos Kitchen & Bar','waitlist','https://luma.com/jdkbue3v','36 Robinson Rd, Singapore 068877'),

L('neobankers-brunch','Neobankers Brunch by Wirex, Rigid.fi, and Cardify Crypto','Wirex + RigidFi + partners','2026-10-07','10:00','12:00','Brunetti Oro 6 Battery Road','approved','https://luma.com/vzpoa3ni','6 Battery Rd, Singapore 049909'),
L('stablecoin-sessions','Stablecoin Sessions @ Token2049 Singapore','Hack VC + partners','2026-10-07','10:00','12:00','Foreword Coffee @ Esplanade Mall','approved','https://luma.com/2m5vkueq','8 Raffles Ave., #03-02, Singapore 039802'),
L('payments-stablecoins-cafe','Payments and Stablecoins Cafe in MBS w/ Monad Foundation and StraitsX','Monad Foundation + StraitsX','2026-10-07','10:30','17:00','PS.Cafe Marina Bay Sands','approved','https://luma.com/monad-straitsx','10 Bayfront Ave, B2-119-120A, Singapore 018956'),
L('sui-basecamp','Sui Basecamp 2026','Sui','2026-10-07','11:00','17:00','Marina Bay Sands Singapore','approved','https://luma.com/SuiBasecamp2026','10 Bayfront Ave, Singapore 018956'),
L('best-event-peak','The Best Event: The Peak','The Best Event','2026-10-07','11:00','14:00','Singapore · Downtown Core','pending_approval','https://luma.com/TBE-ThePeak'),
L('thought-leaders','THOUGHT LEADERS SUMMIT','Spartan Group Events','2026-10-07','14:00','18:00','Singapore · Downtown Core','pending_approval','https://luma.com/h0vfc5sy'),
L('dcs-osl','DCS x OSL Beyond Borders','OSL Group + Eddid Financial','2026-10-07','17:00','20:00','Singapore · Kampong Glam','pending_approval','https://luma.com/rm4z8e9j'),
L('ripple-citadel','Ripple & Citadel Securities: TOKEN2049 Sundown Mixer','Ripple','2026-10-07','17:00','20:00','Singapore · Downtown Core','pending_approval','https://luma.com/njvq6kz0'),
L('ultra-connect','Ultra Connect Singapore','Ultra Web3 Festival + partners','2026-10-07','17:00','22:00','Tono Izakaya Singapore','approved','https://luma.com/rwa4g698','8A Marina Blvd, Singapore 018984'),
L('pionex-dinner','Pionex Private Dinner · Singapore 2049','Pionex.com','2026-10-07','18:00','22:00','Singapore · Downtown Core','pending_approval','https://luma.com/b1g00l5o'),
L('stablecon-salon','Stablecon Salon Happy Hour: Singapore vol 3','Stablecon + OpenFX + Faction','2026-10-07','18:00','21:00','Singapore · Marina South','pending_approval','https://luma.com/j8huihey'),
L('utxo-pitch','Rooftop UTXO Pitch Night','Cardano Events + partners','2026-10-07','18:30','23:00','LAVO, Marina Bay Sands','approved','https://luma.com/utxopitchnight','10 Bayfront Avenue, Level 57 Tower 1, Singapore 018956'),
L('cross-chain-hh','Cross-Chain Networking Happy Hour During Token2049','n.exchange + partners','2026-10-07','19:00','23:00','Singapore · Downtown Core','pending_approval','https://luma.com/2mg13vuz'),
L('crossing-trust','The Crossing: Engineering Trust in Institutional Digital Finance','Safeheron + partners','2026-10-07','19:00','22:00','Cook & Brew','pending_approval','https://luma.com/mxehdkuq','12 Marina View, Level 33, Singapore 018961'),

L('onchain-horizons','On-Chain Horizons: Founders x Funders','SC Ventures + partners','2026-10-08','08:00','11:00','WeWork - 21 Collyer Quay','pending_approval','https://luma.com/ixmrhvtm','21 Collyer Quay, Singapore 049320'),
L('payments-treasury-tokenization','Payments, Treasury and Tokenization Summit 2026','8 Circle + XDC + PwC + Microsoft','2026-10-08','08:30','12:00','PwC Singapore','waitlist','https://luma.com/dnonqx1u','7 Straits View, Marina One, Singapore 018936'),
L('hsc-asset-management','HSC Asset Management Singapore','Metaverse Post + Trezor + Stellar','2026-10-08','09:00','18:00','Fairmont Singapore','approved','https://luma.com/HSC_Singapore','80 Bras Basah Rd, Singapore 189560'),
L('agent-ready-usdc','Agent-Ready USDC: Building on CCTP','Sui','2026-10-08','15:30','16:30','Marina Bay Sands Expo & Convention','approved','https://luma.com/jip2jcsu','10 Bayfront Ave, Singapore 018956'),
L('treasury-table','The Treasury Table: A Gathering on Stablecoins, Payments, and the Future of Business Banking','Locus','2026-10-08','15:30','18:30','Singapore · Downtown Core','pending_approval','https://luma.com/k8jylkcm'),
L('garden-room','The Garden Room','INPUT Global Events + PAYBIS + ChangeNOW','2026-10-08','18:30','22:30','Marguerite','pending_approval','https://luma.com/TheGardenRoom','18 Marina Gardens Dr, #01-09 Flower Dome, Singapore 018953'),

L('dat-summit','DAT SUMMIT - TRACKSIDE EDITION','Luna PR','2026-10-09','09:00','17:00','Singapore · Downtown Core','pending_approval','https://luma.com/a19msg9w'),
L('network-state','Network State Conference: Singapore Oct 9, 2026','Network School + Balaji + Zcash','2026-10-09','09:00','20:00','Sands Expo & Convention Centre','approved','https://luma.com/ns2026','10 Bayfront Ave, Singapore 018956'),
L('rwa-summit','RWA SUMMIT SINGAPORE','UVECON.VC','2026-10-09','10:00','17:00','Marina One West Tower','approved','https://luma.com/rwasummit','9 Straits View, Singapore 018937'),
L('sony-taisu','Sony Ventures x Taisu Innovation Summit','Sony Group + Taisu Ventures + Soneium','2026-10-09','10:00','14:00','Singapore · Central Area','pending_approval','https://luma.com/w2vo3svp'),
L('bitangels','BitAngels Singapore 2026','BitAngels + partners','2026-10-09','10:45','14:30','Singapore · Downtown Core','pending_approval','https://luma.com/1dk27l6a'),
L('cointelegraph-connect','CONNECT by Cointelegraph: Singapore Edition','Cointelegraph Accelerator + Cointelegraph','2026-10-09','12:00','18:00','Singapore · Central Area','pending_approval','https://luma.com/q23fn0vw'),
L('founder-vc-day2','Founder x VC Summit | Day 2 - Happy Hour 🇸🇬','BackersStage Capital','2026-10-09','18:00','22:00','Singapore River','pending_approval','https://luma.com/4lzbeit3'),
L('proof-liquidity','Proof Of Liquidity: VIP Dinner','Yield Network + Ink + RockawayX + Nexus Mutual','2026-10-09','19:00','22:00','Singapore','pending_approval','https://luma.com/kh3uenfj'),

L('penthouse-trackside','The Penthouse: Trackside','The Best Event + partners','2026-10-10','11:00','14:00','Singapore · Downtown Core','pending_approval','https://luma.com/TBE-Elevation'),
L('rwa-paddock','The Best Event: The RWA Paddock with Brickken','The Best Event + Brickken','2026-10-10','15:30','18:30','Singapore · Downtown Core','pending_approval','https://luma.com/TBE-ThePaddock')
];
