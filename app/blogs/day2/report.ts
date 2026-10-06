export type Source = { label: string; url: string };
export type Speaker = { name: string; company: string; role: string };
export type Ecosystem = { layer: string; companies: string; significance: string };
export type EventReport = {
  id: string; title: string; host: string; venue: string; time: string;
  introduction: string; speakers: Speaker[]; evidence?: string;
  notes: string[]; ecosystem: Ecosystem[]; analysis: string; sources: Source[];
  photos: string[]; contextPhotos?: string[];
};

export const events: EventReport[] = [
  {
    id: 'gamma-prime', title: 'Gamma Prime Investing Summit', host: 'Gamma Prime · stage partnership with Fenbushi Capital',
    venue: 'The Fullerton Hotel Singapore', time: 'Morning · summit scheduled throughout the day',
    introduction: 'The morning moved between investment conversations and the infrastructure needed to make AI agents trustworthy economic actors. The photos document Spartan Capital, Dragonfly and Animoca Brands firesides, plus the Trust at Scale panel. These are distinct sessions within one summit; the available audio covers the agent-ownership discussion, rather than every photographed fireside.',
    speakers: [
      { name: 'Evan Szu', company: 'Gamma Prime', role: 'Fireside host, stage listing' },
      { name: 'Melody He', company: 'Spartan Capital', role: 'Spartan Capital Fireside Chat' },
      { name: 'Haseeb Qureshi', company: 'Dragonfly', role: 'Fireside guest' },
      { name: 'Yat Siu', company: 'Animoca Brands', role: 'Fireside guest' },
      { name: 'Hayk Azaryan', company: 'AIBC World', role: 'Trust at Scale panel' },
      { name: 'Leo Fan', company: 'Cysic', role: 'Trust at Scale panel' },
      { name: 'Margarita Kadochnikova', company: 'CertiK', role: 'Trust at Scale panel' },
      { name: 'David Gogel', company: 'Arcus', role: 'Trust at Scale panel' },
      { name: 'Ash Datsiuk', company: 'Theoriq', role: 'Trust at Scale panel' },
      { name: 'Cris Blanco', company: 'Beldex', role: 'Trust at Scale panel' },
      { name: 'Anbu Kannappan', company: 'Byzanlink', role: 'Trust at Scale; affiliation cross-checked with founder profile' },
    ],
    evidence: 'Stage names come from the supplied photos. Voicenote W6bkOTlQ (10:45 SGT) and its existing summary QkkzzPkW (10:48 SGT) appear to match the Yat Siu fireside by topic and timing. The transcript labels only Speaker 1 and Speaker 2; individual remarks remain unattributed. No transcript was supplied for the other firesides or Trust at Scale.',
    notes: [
      'The recording contrasts local agent hosting with a mass-market model that preserves user ownership without making everyone operate their own server. Cryptographic keys are presented as a way to retain control.',
      'Agents need identity, reputation and evidence that a counterparty can rely on them. Zero-knowledge proofs are discussed as a way to verify transactions while limiting disclosure. The user experience should hide unnecessary blockchain complexity.',
      'The existing imported summary connects this to Cortex: delegated authority, transaction limits, auditable actions and privacy-aware verification. That is a Connextium reflection, not an attributed speaker recommendation.',
    ],
    ecosystem: [
      { layer: 'Capital and distribution', companies: 'Gamma Prime · Fenbushi Capital · Spartan Capital · Dragonfly', significance: 'An alternative-investment marketplace and crypto investment firms connect infrastructure builders with capital and market access. Sharing the stage is not evidence of a commercial partnership between every participant.' },
      { layer: 'Identity and ownership', companies: 'Animoca Brands · Moca Network', significance: 'Animoca identifies Moca as decentralized identity infrastructure. Agent ownership therefore raises both credential design and usable account recovery questions.' },
      { layer: 'Verification, security and privacy', companies: 'Cysic · CertiK · Beldex', significance: 'The panel brings compute, security assurance and privacy-oriented infrastructure into the same trust discussion. CertiK documents audits and formal verification; Beldex describes its privacy ecosystem.' },
      { layer: 'Agents and asset operations', companies: 'Theoriq · Byzanlink · Arcus · AIBC World', significance: 'Theoriq describes agent-driven asset curation; Byzanlink documents issuance, policy and reporting infrastructure. Arcus and AIBC World are retained as photographed participants, without inferring an integration.' },
    ],
    analysis: 'Our reading: an agent identity proves who is acting; it does not, by itself, prove permission to pay an invoice or discharge a liability. For Generalayer, the useful bridge is from agent credentials to an explicit payment mandate, accepted assets, limits and settlement evidence. Privacy and accounting evidence have to be designed together.',
    sources: [
      { label: 'Summit listing', url: 'https://luma.com/investingsummit2026Singapore' },
      { label: 'Gamma Prime', url: 'https://gammaprime.com/' },
      { label: 'Animoca ecosystem', url: 'https://www.animocabrands.com/who-we-are' },
      { label: 'CertiK security', url: 'https://www.certik.com/' },
      { label: 'Beldex', url: 'https://www.beldex.io/' },
      { label: 'Theoriq', url: 'https://www.theoriq.ai/about-us' },
      { label: 'Byzanlink', url: 'https://byzanlink.com/' },
    ],
    photos: ['IMG_2586', 'IMG_2577', 'IMG_2580', 'IMG_2582'], contextPhotos: ['IMG_2579'],
  },
  {
    id: 'cross-border-brunch', title: 'Cross-Border Brunch: How Value Moves Across High-Growth Markets',
    host: 'Kanga Global · Tevau · SCRYPT · Lion’s Den Holdings', venue: 'Social Bar & Bistro · Singapore CBD', time: 'Late morning / lunch · scheduled 11:00–14:00 SGT',
    introduction: 'This room brought the payment journey into focus: acquiring digital assets, accessing liquidity, spending through cards and reaching a local payout endpoint. The photographed panel and organizer description emphasize high-growth corridors, including ASEAN and LATAM. There is no corresponding audio recording among the six imported notes.',
    speakers: [
      { name: 'Bruce Kurtz', company: 'Kanga Global', role: 'CMO, photographed panel listing' },
      { name: 'Elizabeth Zhao / Elizabeth Chiu', company: 'Tevau', role: 'Senior BDM; stage and company announcement use different surnames' },
      { name: 'Adam Wasserman', company: 'Lion’s Den Holdings', role: 'Co-founder, photographed panel listing' },
      { name: 'Adam Parnell', company: 'SCRYPT', role: 'VP of Growth; company announcement corroborates the name' },
    ],
    evidence: 'The stage reads Elizabeth Zhao; Tevau’s public announcement names Elizabeth Chiu. Both are recorded here rather than silently treating them as a verified identity match.',
    notes: [
      'Photo evidence records the panel and networking room. The organizer frames the event around stablecoins, card programs and on/off-ramps; specific statements by these speakers are not recoverable from the supplied notes.',
    ],
    ecosystem: [
      { layer: 'Acquisition and spending', companies: 'Kanga Global · Tevau', significance: 'Kanga provides exchange access; Tevau describes a digital-asset spending and investing application. Their user-facing products depend on liquidity, card acceptance and compliant onboarding behind the interface.' },
      { layer: 'Institutional execution', companies: 'SCRYPT', significance: 'SCRYPT documents trading, custody, stablecoin and treasury services. Its ecosystem shows why a corridor needs reliable counterparties and banking endpoints as well as token transfer.' },
      { layer: 'Operating-company network', companies: 'Lion’s Den Holdings', significance: 'The organizer describes a network of operating businesses, founders and investors. This supplies a business-use-case lens rather than evidence of a new settlement protocol.' },
    ],
    analysis: 'Our reading: fragmentation is experienced at the corridor level. A globally available token still needs an accepted recipient asset, local currency liquidity and an operating payout partner. Generalayer should select routes against those constraints and measure receipt and reconciliation, rather than presenting chain coverage as a proxy for payment completion.',
    sources: [
      { label: 'Brunch organizer', url: 'https://luma.com/8z12z1is' },
      { label: 'Tevau product', url: 'https://tevau.io/en/' },
      { label: 'Tevau speaker announcement', url: 'https://hk.linkedin.com/company/tevau' },
      { label: 'SCRYPT ecosystem', url: 'https://scrypt.swiss/' },
      { label: 'SCRYPT Adam Parnell announcement', url: 'https://www.linkedin.com/posts/scrypt-swiss_adam-parnell-has-joined-scrypt-as-vice-president-activity-7488185187500212224-BREc' },
    ], photos: ['IMG_2589'], contextPhotos: ['IMG_2588'],
  },
  {
    id: 'founder-vc', title: 'Founder × VC Summit: Wall Street On-Chain',
    host: 'BackersStage Capital · AWS Web3', venue: 'Furama RiverFront', time: 'Midday visit · event scheduled 11:00–17:00 SGT',
    introduction: 'The panel title asks whether institutional capital is adopting crypto or taking it over. The photo documents a mix of custody, asset management, brokerage and interoperability companies. The event itself is named Day 1 – Demo Day; it belongs here because October 6 is Day 2 of this field log.',
    speakers: [
      { name: 'Sumit', company: 'WIZZ', role: 'Co-founder · moderator; surname not shown' },
      { name: 'Zahid Mustafa', company: 'State Street', role: 'Managing Director, Head of Digital Custody' },
      { name: 'Chetan Karkhanis', company: 'Franklin Templeton', role: 'Senior Vice President, Digital Assets' },
      { name: 'Nicola White', company: 'Robinhood', role: 'Vice President, Institutional Crypto & EU, stage listing' },
      { name: 'Andrew McCormick', company: 'Chainlink', role: 'Head of Digital Assets & Market Development, stage listing' },
    ],
    notes: ['The supplied photos establish the panel roster and topic. No imported recording is confidently assigned to this panel; the ecosystem observations below come from first-party research, not reconstructed remarks.'],
    ecosystem: [
      { layer: 'Custody and servicing', companies: 'State Street', significance: 'Its digital-asset platform announcement connects tokenization ambitions with institutional controls and servicing. Holding an asset and administering its lifecycle remain separate jobs.' },
      { layer: 'Fund ownership records', companies: 'Franklin Templeton · Benji', significance: 'Benji uses blockchain-integrated share recordkeeping. A fund register supplies a useful example of the authoritative ownership record that a payment workflow must reconcile with.' },
      { layer: 'Distribution and instrument design', companies: 'Robinhood', significance: 'Robinhood’s Classic Stock Tokens documentation describes derivatives, rather than ownership of the referenced shares. Tokenized instruments must be evaluated by their actual rights, not their label.' },
      { layer: 'Interoperability and data', companies: 'Chainlink · AWS · BackersStage · WIZZ', significance: 'Chainlink CCIP transports tokens and instructions across chains. AWS and BackersStage supply the founder/infrastructure setting; WIZZ is the photographed moderator affiliation. These roles are complementary, not evidence of one jointly deployed stack.' },
    ],
    analysis: 'Our reading: institutional adoption adds requirements to the operating model. Who maintains the legal register? Who confirms custody? Which data is authoritative after a corporate action? Generalayer’s settlement record should preserve these boundaries instead of collapsing every successful chain transaction into “settled.”',
    sources: [
      { label: 'Founder × VC organizer', url: 'https://luma.com/gdqakgz3' },
      { label: 'State Street platform announcement', url: 'https://investors.statestreet.com/investor-news-events/press-releases/news-details/2026/State-Street-Launches-Digital-Asset-Platform-to-Power-Tokenized-Finance/' },
      { label: 'Franklin Templeton technology', url: 'https://www.franklintempleton.com/about-us/digital-assets/digital-assets-technology' },
      { label: 'Robinhood instrument terms', url: 'https://robinhood.com/eu/en/support/articles/about-stock-tokens/' },
      { label: 'Chainlink CCIP documentation', url: 'https://docs.chain.link/ccip/overview' },
    ], photos: ['IMG_2591'], contextPhotos: ['IMG_2590'],
  },
  {
    id: 'global-onchain', title: 'Global Onchain Summit: The Stablecoin Century', host: 'CoinGape Events',
    venue: 'Pullman Singapore Hill Street', time: 'Early afternoon · published panel 13:15–13:40 SGT',
    introduction: 'This was the clearest recorded discussion of the relationship between banks, stablecoin issuers and payment businesses. Two clips cover banking utility and closing predictions. Their content matches the photographed panel, although the second clip’s 13:43 timestamp is slightly later than the published slot.',
    speakers: [
      { name: 'Andrew O’Neill', company: 'S&P Global', role: 'Managing Director, Analytical Lead on Digital Assets · moderator' },
      { name: 'Eric Barbier', company: 'Triple-A', role: 'CEO' },
      { name: 'Steven Hu', company: 'OCBC', role: 'Head of Digital Assets, Global Markets' },
      { name: 'Justin Kugel', company: 'World Liberty Financial (WLFI)', role: 'Executive Vice President, Growth' },
    ],
    evidence: 'Voicenotes 0LpXVo0q (13:37 SGT) and y20kiFvy (13:43 SGT) are grouped here by the panel photo, agenda and matching bank/issuer discussion. Speaker-by-speaker attribution is not verified. Transcription errors in bank names and geography are not repeated as facts.',
    notes: [
      'The banking clip argues that stablecoin rails can improve dollar settlement speed, cost and capital efficiency when risk is controlled. Banks also provide lending, wealth and advisory services, so the discussion rejects a purely zero-sum view of stablecoins versus deposits.',
      'The closing clip predicts more issuers and wider bank acceptance, with connections to existing market infrastructure becoming a differentiator. It also distinguishes accepting stablecoins from retaining them in a multinational’s treasury.',
      'One speaker forecasts 5–10% of emerging-market cross-border business using stablecoins within a few years; another predicts a challenger to leading issuers within 12 months. These are unattributed forecasts, not measured market shares or guaranteed outcomes.',
      'The banking clip mentions GOLDX. OCBC’s own announcement confirms the OCBC–Lion Global–DigiFT gold-fund token on Ethereum and Solana and eligible investor subscriptions in stablecoins or fiat. The official launch date is April 20, 2026, correcting the clip’s reference to May.',
    ],
    ecosystem: [
      { layer: 'Payment acceptance and payout', companies: 'Triple-A', significance: 'Triple-A’s Circle Payments Network announcement links backend USDC settlement to local-currency delivery. That is a concrete example of customers using stablecoin infrastructure without retaining the token.' },
      { layer: 'Bank and asset access', companies: 'OCBC · Lion Global Investors · DigiFT', significance: 'GOLDX combines bank-led structuring, fund governance and digital distribution. Subscription, wallet delivery and redemption have their own controls and records.' },
      { layer: 'Issuance and risk analysis', companies: 'WLFI / USD1 · S&P Global', significance: 'WLFI supplies an issuer perspective; S&P Global supplies the panel’s analytical moderation. An issuer’s dollar peg does not establish equivalence with another issuer’s claim or redemption process.' },
    ],
    analysis: 'Our reading: the bank discussion and accept-versus-hold distinction point toward a coordination problem. Businesses want the right balance credited at the right endpoint; they do not necessarily want exposure to every intermediary stablecoin. For Generalayer, issuer acceptance and recipient credit must be explicit policy decisions, with the full fee and liquidity path visible.',
    sources: [
      { label: 'Official summit agenda and roster', url: 'https://globalonchainsummit.com/' },
      { label: 'OCBC GOLDX announcement', url: 'https://www.ocbc.com/group/media/release/2026/ocbc-lion-global-investors-and-digifit-launches-southeast-asia-first-onchain-tokenised-gold-fund.page' },
      { label: 'Triple-A and Circle Payments Network', url: 'https://www.triple-a.io/newsroom/triplea-circle-payments-network-integration' },
      { label: 'WLFI USD1', url: 'https://worldlibertyfinancial.com/usd1' },
    ], photos: ['IMG_2595'],
  },
  {
    id: 'funds-flow', title: 'Stablecoin & Payments: Funds Flow', host: 'WasabiCard', venue: 'Raffles Singapore · East India Room, Level 1', time: 'Afternoon · published program starts 13:00 SGT',
    introduction: 'Funds Flow gathered issuance, card networks, RWA infrastructure, cross-border payments, enterprise users and custody. The published program separates tokenized capital markets at 14:00 from real-world payments at 15:00. The stage roster photos provide the strongest evidence for names and roles on the day.',
    speakers: [
      { name: 'Fire Liu', company: 'WasabiCard', role: 'Co-founder, stage roster' },
      { name: 'Komil Desai', company: 'Visa', role: 'US Head of Crypto Partnerships' },
      { name: 'Vidit Agrawal', company: 'Circle', role: 'VP, Partnerships & BD, APAC' },
      { name: 'Shukyee Ma', company: 'Plume', role: 'CSO, stage roster' },
      { name: 'Richard Lau', company: 'Mirae Asset Securities', role: 'Head of Digital Asset Strategy, stage roster' },
      { name: 'Chye Kit', company: 'WIDTH', role: 'CEO, stage roster' },
      { name: 'Yogesh Sangle', company: 'Nium', role: 'EVP APAC' },
      { name: 'Daxue Wang', company: 'Lotus / Lotus Tech', role: 'CFO' },
      { name: 'David Sung', company: 'AWS', role: 'Web3 Senior Solutions Architect' },
      { name: 'Yifan Zhang', company: 'Safeheron', role: 'General Manager, Southeast Asia' },
    ],
    evidence: 'The public organizer roster also names Ray Yang and Kelly Sohn, and describes Shukyee as co-founder. The photographed roster instead names Fire Liu and Richard Lau and lists Shukyee Ma as CSO. These are source differences; the table preserves the photographed roster without claiming every listed person spoke in every panel.',
    notes: [
      'The photographs capture the room, both roster slides and the venue directory. Two 14:15 and 14:31 audio clips align with the broad subject matter, but lack reliable event identification. Their complete editorial summaries appear in the unassigned-clips section below rather than being attributed to this panel.',
    ],
    ecosystem: [
      { layer: 'Issuance and card settlement', companies: 'Circle · Visa · WasabiCard', significance: 'Circle’s CCTP documents native burn-and-mint transfers across supported chains. Visa operates a multichain stablecoin settlement pilot. WasabiCard describes card issuing, settlement, payouts and API infrastructure.' },
      { layer: 'Asset and investor lifecycle', companies: 'Plume · Mirae Asset Securities', significance: 'Plume describes an RWA-focused blockchain ecosystem. Alongside an institutional securities business, this raises subscription, investor eligibility and redemption questions beyond token issuance.' },
      { layer: 'Payment operations and enterprise demand', companies: 'Nium · WIDTH · Lotus Tech', significance: 'Visa confirms Nium’s participation in its stablecoin settlement pilot. WIDTH and Lotus Tech appear on the roster, bringing a payments/enterprise operating perspective; no joint implementation is asserted.' },
      { layer: 'Custody and infrastructure', companies: 'Safeheron · AWS', significance: 'Safeheron’s own event notice emphasizes secure custody and compliant payment infrastructure. AWS is listed as a Web3 architecture participant. Custody authorization and infrastructure resilience are dependencies of a payment route.' },
    ],
    analysis: 'Our reading: this roster exposes several forms of fragmentation in one room. A cross-chain transfer utility, an issuer, a card network, a custody provider and a payout business each solve a different part. Generalayer’s proposed role is to coordinate obligations and evidence across these services, integrating established rails rather than assuming a new token removes their responsibilities.',
    sources: [
      { label: 'Funds Flow program', url: 'https://luma.com/gj0iv2kk' },
      { label: 'Safeheron event notice', url: 'https://safeheron.com/blog/join-safeheron-at-token2049-singapore-2026/' },
      { label: 'Circle CCTP', url: 'https://www.circle.com/cross-chain-transfer-protocol' },
      { label: 'Visa multichain settlement', url: 'https://investor.visa.com/news/news-details/2026/Visa-Accelerates-Stablecoin-Momentum-Adding-Five-Blockchains-for-Settlement/' },
      { label: 'Visa and Nium', url: 'https://www.visa.com.sg/about-visa/newsroom/press-releases/nium-to-join-visas-stablecoin-settlement-pilot-to-support-its-cross-border-payments.html' },
      { label: 'Plume official organization', url: 'https://github.com/plumenetwork' },
    ], photos: ['IMG_2606', 'IMG_2609', 'IMG_2604'], contextPhotos: ['IMG_2600', 'IMG_2601', 'IMG_2602', 'IMG_2603', 'IMG_2607'],
  },
  {
    id: 'taisu', title: 'The Future of Money & Payments', host: 'Taisu Ventures', venue: '33Club · 22 Malacca Street', time: 'Evening · scheduled 18:30–22:00 SGT',
    introduction: 'The opening and sector slides positioned payments alongside infrastructure, DeFi, AI and consumer platforms. The photographed financial-infrastructure panel put stablecoins, tokenized assets and onchain finance in the same operating conversation. The venue is 33Club, as confirmed by the organizer and the room photograph.',
    speakers: [
      { name: 'Takashi Hayashida', company: 'Taisu Ventures', role: 'Managing Partner · opening speech' },
      { name: 'Ben Prentice', company: 'Zoth', role: 'Head of BD · panel moderator' },
      { name: 'Pritam Dutta', company: 'Zoth', role: 'Founder & CEO' },
      { name: 'Pablo Che Leon', company: 'Reap', role: 'Head of Customer Growth' },
      { name: 'Paul Rejin', company: 'Spout Finance', role: 'Co-founder & General Counsel' },
      { name: 'Alessandro Cordano', company: 'TruMarket', role: 'Director of Operations' },
    ],
    notes: [
      'Taisu’s sector slide groups infrastructure and tooling, DeFi, AI × blockchain, and consumer platforms. Stablecoins and payment rails sit alongside RWA tokenization, yield infrastructure, verifiable compute, identity and digital ownership.',
      'The company slide describes an early-stage, chain-agnostic Web3 investor launched in November 2023. Portfolio metrics on that slide are self-reported and are not treated here as independently audited performance.',
      'The available Voicenotes contain no evening recording. The panel’s topic and roster are photo evidence; company product descriptions below are subsequent research.',
    ],
    ecosystem: [
      { layer: 'Investment and financial products', companies: 'Taisu Ventures · Zoth', significance: 'Taisu documents an early-stage Web3 mandate. Zoth describes a stablecoin finance ecosystem and tokenization infrastructure, linking payment utility with access to yield and assets.' },
      { layer: 'Business payments and agent spending', companies: 'Reap', significance: 'Reap documents business accounts, embedded finance and policy-bounded agent card credentials. Spend authorization is a useful complement to settlement and reconciliation.' },
      { layer: 'Collateral and productive assets', companies: 'Spout Finance · TruMarket', significance: 'Spout describes borrowing against tokenized equities; TruMarket focuses on agricultural trade finance. Both connect onchain capital to a distinct underlying economic activity and risk model.' },
    ],
    analysis: 'Our reading: payments are part of a wider treasury lifecycle. An invoice, a financing drawdown and an investment redemption may all create cash movements, but their accounting meaning differs. Generalayer needs to carry that purpose through authorization, route selection, execution and reconciliation. Product promises about yield or speed should not substitute for evidence of the underlying obligation being discharged.',
    sources: [
      { label: 'Taisu event and venue', url: 'https://luma.com/l4ewl7tf' },
      { label: 'Taisu investment mandate', url: 'https://www.taisu.io/' },
      { label: 'Zoth ecosystem', url: 'https://docs.zoth.io/zoth' },
      { label: 'Reap infrastructure', url: 'https://reap.global/' },
      { label: 'Reap agentic payments', url: 'https://reap.global/products/agentic-payments' },
      { label: 'Spout documentation', url: 'https://spout.finance/docs/getting-started/' },
      { label: 'TruMarket', url: 'https://www.trumarket.tech/' },
    ], photos: ['IMG_2612', 'IMG_2615', 'IMG_2616'], contextPhotos: ['IMG_2613', 'IMG_2617'],
  },
  {
    id: 'trust-wallet', title: 'Beyond 9YA: Trust Wallet House', host: 'Trust Wallet · ecosystem partners', venue: 'HighHouse · One Raffles Place, Levels 61–62', time: 'Evening · scheduled 18:00–22:00 SGT; visits overlap other event programs',
    introduction: 'The wallet gathering brought the user-facing side of this infrastructure into view: onboarding, fiat access, yield, cards and agent-related services. Photos establish the event branding and partner presentations, but do not establish the identity of every person on stage or a full transcript of their remarks.',
    speakers: [{ name: 'Felix', company: 'Trust Wallet', role: 'CEO keynote announced at 19:00 by organizer; attendance at that keynote not confirmed by the supplied notes' }],
    notes: [
      'The event screen and organizer list Mercuryo, Yield.xyz, AWS, Transak, Rain, Banxa, Tronify, B.AI and Ave.ai. A Transak presentation and a slide about an intelligence settlement layer are photographed. The latter slide’s speaker/product attribution is not legible enough to establish from the photo alone.',
    ],
    ecosystem: [
      { layer: 'Wallet distribution and funding', companies: 'Trust Wallet · Mercuryo · Transak · Banxa', significance: 'Wallet distribution and fiat-access partners turn infrastructure into usable entry and exit points. Transak’s organizer description includes ramps, virtual accounts, KYC and risk services.' },
      { layer: 'Additional services', companies: 'Yield.xyz · Rain · Tronify · B.AI · Ave.ai · AWS', significance: 'The listed partners place onchain finance, payment services, AI and cloud infrastructure around a wallet interface. A sponsor logo establishes participation, not product integration or interoperability.' },
    ],
    analysis: 'Our reading: hiding technical details can improve adoption while moving more responsibility to the service layer. Generalayer awareness should begin with a concrete operational question: can a wallet-originated payment arrive at the accepted business endpoint with an invoice reference and reliable evidence? Branding around a “settlement layer” is not proof that this business workflow has been solved.',
    sources: [{ label: 'Trust Wallet program and partners', url: 'https://luma.com/8x8fhfoz' }],
    photos: ['IMG_2630', 'IMG_2627', 'IMG_2618'], contextPhotos: ['IMG_2626', 'IMG_2619', 'IMG_2628', 'IMG_2637'],
  },
  {
    id: 'institutional-ark', title: 'The Institutional Ark: Anchoring the Next Era of Digital Asset Growth', host: 'ChainUp · ninth-anniversary institutional gathering', venue: 'Monti at 1-Pavilion · 82 Collyer Quay', time: 'Night · scheduled 20:00–23:00 SGT',
    introduction: 'The day ended in an institutional infrastructure setting overlooking Marina Bay. ChainUp’s organizer listing and the waterfront installation identify the host. The supplied photos show welcome remarks and networking; no named speaker can be reliably recovered from the stage image.',
    speakers: [{ name: 'Welcome-remarks speaker', company: 'ChainUp-hosted event', role: 'Name unverified in supplied photo; no named attribution' }],
    notes: ['The photos document the welcome-remarks setting and waterfront networking. They do not establish conversations, introductions or commercial commitments with the people present. No imported Voicenote is assigned to this event.'],
    ecosystem: [
      { layer: 'Institutional operating stack', companies: 'ChainUp', significance: 'The organizer describes exchange, liquidity, MPC wallet, KYT, tokenization, cards, staking and API services. These illustrate several technical and operational dependencies around digital-asset businesses.' },
      { layer: 'Risk, infrastructure and institutional network', companies: 'B² Network · CZR · Sumsub · AWS / eCloudrover · Cloudflare / Agile · Coincall · DBS Private Bank · PayFun · Staynex · Singapore FinTech Association', significance: 'Listed sponsors, partners and supporters span infrastructure and institutional networks. Inclusion here follows the event page; it is not evidence that they endorse Generalayer or share a deployed settlement system.' },
    ],
    analysis: 'Our reading: the institutional stack is already broad. The opportunity for Generalayer should be tested at the seams between services: payment-state handoffs, authoritative evidence, exception recovery and accounting reconciliation. Awareness should be measured through operator feedback and pilots, not inferred from networking attendance.',
    sources: [{ label: 'ChainUp event, venue and partners', url: 'https://luma.com/xn1chytf' }],
    photos: ['IMG_2639', 'IMG_2640'], contextPhotos: ['IMG_2638'],
  },
];

export const fragmentation = [
  ['Issuer and claim', 'A dollar peg does not make different issuers’ tokens the same legal claim.', 'Accepted issuers, redemption eligibility, reserve and counterparty constraints.'],
  ['Chain and representation', 'Native, wrapped and bridged assets may have different dependencies and transfer paths.', 'Supported representations, chain finality and cross-chain failure handling.'],
  ['Liquidity and corridor', 'A transferable token may still lack a liquid conversion or local payout endpoint.', 'Quotes, fees, FX exposure, available liquidity and recipient-rail support.'],
  ['Policy and authorization', 'Sender, custodian and recipient may accept different assets or require different controls.', 'Entity eligibility, compliance decisions, custody approvals and agent mandates.'],
  ['Business and accounting state', 'A confirmed transaction is not automatically proof an invoice was paid and reconciled.', 'Obligation reference, evidence of receipt, fee allocation, ledger posting and exceptions.'],
];

export const noteLedger = [
  { id: 'W6bkOTlQ', time: '10:45 SGT', title: 'Scaling AI agent ownership with blockchain identity and privacy', duration: '3m 25s', event: 'Gamma Prime — likely Yat Siu fireside', summary: 'Accessible ownership, agent keys, identity and reputation, zero-knowledge verification, simple UX and privacy of personal agent interactions.', treatment: 'Primary audio. Speaker labels are anonymous. Unverified OpenAI usage figures and claims about company motives are excluded.' },
  { id: 'QkkzzPkW', time: '10:48 SGT', title: 'TOKEN2049 Singapore Day 2: Yat Siu on AI agent ownership, identity and privacy', duration: 'Written summary', event: 'Gamma Prime — derivative of W6bkOTlQ', summary: 'Existing summary of agent ownership and a Cortex reflection on delegated authority, limits, auditing and privacy.', treatment: 'Imported and synthesized, not counted as independent corroboration.' },
  { id: '0LpXVo0q', time: '13:37 SGT', title: 'Banks leveraging stablecoin rails for faster USD settlement and token subscriptions', duration: '2m 25s', event: 'Global Onchain — likely Stablecoin Century', summary: 'Banks can use risk-managed stablecoin rails to improve dollar settlement and customer relationships; lending, wealth and investment subscriptions may benefit.', treatment: 'Bank names corrected against context; GOLDX details verified against OCBC. Official April launch date replaces the audio’s May reference.' },
  { id: 'y20kiFvy', time: '13:43 SGT', title: 'Predictions for stablecoin issuers, bank adoption, and tokenized equities growth', duration: '2m 36s', event: 'Global Onchain — likely closing discussion', summary: 'Predictions of issuer competition and bank adoption; infrastructure connectivity as a differentiator; accept-versus-hold distinction; corporate onchain liquidity.', treatment: 'Forecasts remain labelled forecasts. Timestamp is just after the published panel slot; no individual attribution.' },
  { id: 'fx3l0HJC', time: '14:15 SGT', title: 'Tokenization ease: bonds vs tokenized stocks and TRS-linked securities', duration: '1m', event: 'Event unconfirmed', summary: 'Simple bonds and notes can be easier to tokenize; yield and risk matter. The speaker questions whether synthetic equity exposure is equivalent to direct share issuance.', treatment: 'Not assigned by timing alone. Robinhood derivative characterization checked against its own Classic Stock Tokens terms; specific SEC/TRS claims not presented as verified.' },
  { id: 'Q36q1XCd', time: '14:31 SGT', title: 'Tokenized assets adoption signaled by dropping “tokenized” from product names', duration: '1m', event: 'Event unconfirmed', summary: 'Adoption becomes ordinary when users focus on the fund, equity or banking service rather than the tokenization technology, analogous to dropping “online” from banking.', treatment: 'Unclear transcribed personal names are not matched to photographed speakers. Included as an unattributed Day 2 product-design observation.' },
];
