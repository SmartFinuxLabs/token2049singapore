export type ResearchBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'table'; caption: string; columns: string[]; rows: string[][] }
  | { type: 'callout'; title: string; text: string };

export type ResearchSection = {
  id: string;
  title: string;
  blocks: ResearchBlock[];
};

export const afterword = {
  title: 'Building the Complete Capital Cycle',
  date: 'October 18, 2026',
  dateTime: '2026-10-18',
  updated: 'October 27, 2026',
  updatedTime: '2026-10-27',
  description: 'A TOKEN2049 afterword connecting institutional onchain finance, Bitcoin capital, tokenized assets and financial agents—from capital formation to servicing and investor returns.',
  tldr: 'Across three TOKEN2049 side events, a common product challenge emerges: attract capital, move it, deploy it into an asset or strategy, service the position, and return proceeds to investors. The opportunity is to connect these stages through clear rights, usable liquidity, bounded authority and reconciled accounting.',
  methodology: 'Research checked on October 18, 2026. Event and speaker details come from published organizer programs; listings establish advertised participation, not confirmation of attendance or a transcript of remarks. Product descriptions reflect provider documentation. Ecosystem connections and product conclusions are the author’s interpretation, not evidence of a joint integration or independently verified performance.',
};

export const capitalCycle = [
  { id: 'attract-capital', label: 'Attract', detail: 'Define the claim and investment mandate' },
  { id: 'move-capital', label: 'Move', detail: 'Deliver usable, reconciled funds' },
  { id: 'deploy-capital', label: 'Deploy', detail: 'Acquire the authorized exposure' },
  { id: 'service-positions', label: 'Service', detail: 'Maintain positions and collect cash flows' },
  { id: 'return-proceeds', label: 'Return', detail: 'Distribute proceeds and honor exits' },
];

export const references = [
  { number: 1, title: 'Institutional Onchain Finance Summit 2026 — event program', publisher: 'Luma / organizers', url: 'https://luma.com/lnga4ied' },
  { number: 2, title: 'Institutional Onchain Finance Summit — host announcement and panel roster', publisher: 'Cregis', url: 'https://www.cregis.com/blog/cregis-to-co-host-institutional-onchain-finance-summit-2026-in-singapore' },
  { number: 3, title: 'Enterprise digital-asset infrastructure', publisher: 'Cregis', url: 'https://www.cregis.com/' },
  { number: 4, title: 'Payments, business accounts and treasury services', publisher: 'FOMO Pay', url: 'https://www.fomopay.com/' },
  { number: 5, title: 'StableChain whitepaper, version 2', publisher: 'Stable', url: 'https://www.stable.xyz/whitepaper.pdf' },
  { number: 6, title: 'Compliance and risk intelligence platform', publisher: 'WIDTH', url: 'https://www.width.com/' },
  { number: 7, title: 'GLOBAL CAPITAL, ONCHAIN — agenda and co-host descriptions', publisher: 'Luma / organizers', url: 'https://luma.com/8rpp0jks' },
  { number: 8, title: 'Introduction to the Bitcoin reserve and yield architecture', publisher: 'Solv Protocol', url: 'https://docs.solv.finance/welcome-to-solv/introduction' },
  { number: 9, title: 'Anchors and interoperability standards', publisher: 'Stellar developer documentation', url: 'https://developers.stellar.org/docs/learn/fundamentals/anchors' },
  { number: 10, title: 'Paragon.xyz — public company description', publisher: 'Paragon', url: 'https://www.linkedin.com/company/paragon-xyz/' },
  { number: 11, title: 'Agentic Finance Summit + The Odds — advertised speakers and hosts', publisher: 'Luma / organizers', url: 'https://luma.com/8oxs8lco' },
  { number: 12, title: 'Agentic Finance — detailed October 8 program', publisher: 'More & More', url: 'https://mnm.live/agentic-finance/agenda' },
  { number: 13, title: 'Trading, brokerage and clearing infrastructure', publisher: 'Alpaca', url: 'https://alpaca.markets/' },
  { number: 14, title: 'Curated vaults and the division of responsibility between curators and AI', publisher: 'Theoriq', url: 'https://www.theoriq.ai/' },
  { number: 15, title: 'Visa Intelligent Commerce', publisher: 'Visa', url: 'https://www.visa.com/en-us/solutions/intelligent-commerce' },
  { number: 16, title: 'The Odds — scope and previous-speaker labeling', publisher: 'More & More', url: 'https://mnm.live/theodds/t2049singapore' },
  { number: 17, title: 'Tokenisation in financial services — pathways to scale', publisher: 'MAS speech published by BIS', url: 'https://www.bis.org/speeches/20241104-tokenisation-financial-services-pathways-scale' },
  { number: 18, title: 'Benji investment platform and digital transfer-agent infrastructure', publisher: 'Franklin Templeton', url: 'https://digitalassets.franklintempleton.com/benji/' },
  { number: 19, title: 'On the future of securities settlement', publisher: 'BIS', url: 'https://www.bis.org/publications/future-securities-settlement' },
  { number: 20, title: 'The next-generation monetary and financial system', publisher: 'BIS Annual Economic Report 2025', url: 'https://www.bis.org/publications/aer-2025/next-generation-monetary-financial-system' },
  { number: 21, title: 'xSolvBTC instant redemption', publisher: 'Solv Protocol', url: 'https://docs.solv.finance/key-products/xsolvbtc/xsolvbtc-instant-redemption' },
  { number: 22, title: 'BTC+ minting and redemption', publisher: 'Solv Protocol', url: 'https://docs.solv.finance/key-products/btc+/minting-and-redemption' },
  { number: 23, title: 'Financial stability implications of tokenisation — executive summary', publisher: 'BIS summary of the FSB report', url: 'https://www.bis.org/publications/fsi-summary-financial-stability-implications-tokenisation-executive-summary' },
];

export const sections: ResearchSection[] = [
  {
    id: 'the-capital-cycle',
    title: 'From individual rails to a complete financial lifecycle',
    blocks: [
      { type: 'paragraph', text: 'TOKEN2049’s infrastructure discussions become more useful when viewed through the life of capital. Money enters a relationship, moves to a destination, acquires an exposure, produces or loses value, and eventually returns to its owner. Each transition carries a question about rights, authority, liquidity or evidence.' },
      { type: 'paragraph', text: 'Three events brought complementary parts of that lifecycle into focus. Institutional Onchain Finance examined the controls around digital money. GLOBAL CAPITAL, ONCHAIN connected movement with investment deployment. Agentic Finance asked how software may act across these activities. Together, their published programs suggest an ecosystem direction; they do not establish that the participating companies already operate one integrated system. [1][7][11]' },
      { type: 'paragraph', text: 'The resulting thesis is practical: connect capital formation, settlement, deployment, servicing and investor returns. Issuance and transfer are important milestones, but a financial product must also maintain its obligations after the transaction. A MAS speech published by BIS identifies liquidity, infrastructure, standards and common settlement assets as prerequisites for scaling tokenization, including frameworks covering the fund lifecycle and asset servicing. [17]' },
    ],
  },
  {
    id: 'institutional-onchain-finance',
    title: 'Institutional Onchain Finance: making digital money operational',
    blocks: [
      { type: 'paragraph', text: 'The Institutional Onchain Finance Summit was scheduled for October 6 at Conrad Singapore Marina Bay, co-hosted by Cregis, FOMO Pay, Stable and WIDTH. The keynote roster listed Jason Ma, COO of Cregis; Chye Kit Chionh, CEO and co-founder of WIDTH; Brian Mehler, CEO of Stable; and Eric Chen, CEO and co-founder of Injective. [1][2]' },
      { type: 'table', caption: 'Published panel roster', columns: ['Discussion', 'Advertised participants'], rows: [
        ['Stablecoins, banks, businesses and the wider economy', 'Zack Yang — co-founder, FOMO Pay; Eddie Hui — co-president and COO, MetaComp; Andres Kim — regional expansion lead, Tether; Leandro Noel — founder and COO, Avenia. Moderator: Chiara Munaretto — co-founder, Stablecoin Insider.'],
        ['Evolving digital-asset security', 'Michael Chen — non-executive director, 1exchange; Jason Jiang — CBO, CertiK; Dmytro Matviiv — CEO, HackenProof; Alexandra Wang — head of partnership, ZAN. Moderator: Alevtina Labyuk — chief strategic partnerships officer, BeInCrypto.'],
      ] },
      { type: 'paragraph', text: 'The roster comes from Cregis’s announcement. Its security framing extends beyond code to signing systems, dependencies and everyday operational workflows. [2]' },
      { type: 'table', caption: 'Host products and their place in the cycle', columns: ['Host', 'Published product focus', 'Capital-cycle interpretation'], rows: [
        ['Cregis [3]', 'Enterprise wallets, payment orchestration and custody capabilities.', 'Control asset access, approvals and fund movements.'],
        ['FOMO Pay [4]', 'Merchant payments, business transaction services, multicurrency accounts and treasury access.', 'Connect capital with collection, payout and operating cash.'],
        ['Stable [5]', 'A stablecoin-settlement blockchain using USDT for transaction fees.', 'Reduce the extra operating currency needed to use the payment rail.'],
        ['WIDTH [6]', 'Customer and business onboarding, monitoring, fraud detection and compliance case management.', 'Establish transaction eligibility and preserve decision evidence.'],
      ] },
      { type: 'paragraph', text: 'My reading is that these products address the operating foundation of institutional capital. A treasury team needs to know who owns an asset, who may move it, why the payment is permitted and how exceptions will be handled. A transfer becomes useful when it fits those responsibilities and reconciles to the institution’s records.' },
    ],
  },
  {
    id: 'global-capital-onchain',
    title: 'GLOBAL CAPITAL, ONCHAIN: from settlement to productive exposure',
    blocks: [
      { type: 'paragraph', text: 'Co-hosted by Solv Protocol, Stellar and Paragon, GLOBAL CAPITAL, ONCHAIN explicitly connected capital formation, cross-border settlement, real-world deployment, liquidity management and institutional distribution. Its agenda provides the clearest expression of the complete-capital-cycle thesis. [7]' },
      { type: 'table', caption: 'Published agenda · Singapore time', columns: ['Time', 'Session'], rows: [
        ['14:30', 'Solv keynote on connecting fragmented finance'],
        ['14:45', 'Paragon keynote on tokenized-asset infrastructure'],
        ['15:00', 'Cross-border payments and stablecoins panel'],
        ['15:45', 'Stellar keynote on onchain global capital'],
        ['16:10', 'Institutional real-world assets and yield panel'],
        ['17:00', 'Convergence-layer panel'],
      ] },
      { type: 'callout', title: 'Speaker-list boundary', text: 'The accessible event text verifies these sessions and hosts, but does not identify their individual panelists. A reliable named panel roster could not be established from the retrieved material. No speaker names or quotations have been inferred. [7]' },
      { type: 'paragraph', text: 'Solv addresses the mobilization of Bitcoin capital. Its documentation describes SolvBTC as a standardized reserve representation and separates reserve architecture from yield execution, including staking-related and delta-neutral strategies. Representing Bitcoin and earning a return on it introduce different dependencies, which should be evaluated separately. [8]' },
      { type: 'paragraph', text: 'Stellar addresses the interfaces between assets, payment networks and financial service providers. Its anchor standards cover deposits, withdrawals, cross-border payments, customer information and FX quotations. These are the operating connections that allow a token transfer to become an accessible financial service. [9]' },
      { type: 'paragraph', text: 'Paragon is positioned by the event and its public company profile as an onchain capital layer for real-world finance. That identifies its intended role in deployment and liquidity infrastructure. The accessible materials do not establish its detailed legal structures, servicing model or redemption maturity, so a stronger implementation claim would exceed the evidence. [7][10]' },
      { type: 'paragraph', text: 'The combination suggests a potential architecture: mobilize capital, connect it to usable payment rails, then deploy it into defined investments. The next question is whether the operating and contractual links remain dependable through collection, valuation and exit.' },
    ],
  },
  {
    id: 'agentic-finance',
    title: 'Agentic Finance: defining who may act on capital',
    blocks: [
      { type: 'paragraph', text: 'Agentic Finance Summit + The Odds was advertised for October 8 at Suntec, produced by More & More, with eToro and Alpaca among the Luma hosts. Tal Mor led the organizer’s detailed program. Its central product question is delegated authority: what may software do with someone else’s assets, under which limits, and with what evidence afterward? [11][12]' },
      { type: 'table', caption: 'Selected named sessions from the organizer’s program', columns: ['Session', 'Advertised participants'], rows: [
        ['Agentic wallets', 'Jacquelyn Melinek — StrataMedia; Stani Kulechov — Aave Labs; Omri Ross — eToro; Johann Eid — Chainlink Labs; Ido Ben Natan — Blockaid.'],
        ['Broker-to-agent keynote', 'Yoni Assia — eToro; Jacquelyn Melinek — StrataMedia.'],
        ['Agentic payments', 'Joanna Ossinger — CNBC; Xen Baynham-Herd — Base; Itai Turbahn — Fireblocks; Dan Sun — Alchemy; Leo Li — AEON.'],
        ['Agentic trading', 'Joanna Ossinger — CNBC; Yoshi Yokokawa — Alpaca; Franklyn Wang — Liquid; Pei Chen — Theoriq; CJ Hetherington — Limitless Labs.'],
        ['Agentic capital', 'Henri Arslanian — ACX Compliance; Reza Bundy — Atlas Capital Team; Scott Lawin — Pantera; Dean Tribble — Agoric; Omar-Shakeeb Zahir — SecondLane.'],
      ] },
      { type: 'paragraph', text: 'These names reflect the published program rather than verified delivery of the sessions. [12]' },
      { type: 'paragraph', text: 'Alpaca makes execution concrete through trading and brokerage APIs backed by clearing and custody operations. Its ecosystem supplies capabilities that software can invoke; the surrounding application must still establish an appropriate mandate and controls. [13]' },
      { type: 'paragraph', text: 'Theoriq offers an especially useful division of responsibility. Its website says curators set strategies and approve positions, while automation monitors markets, validates execution and performs defensive risk responses within defined rules. This describes bounded automation rather than unlimited investment discretion. [14]' },
      { type: 'paragraph', text: 'Visa’s Intelligent Commerce addresses payment credentials, controls and authentication for AI-initiated purchases. Manideep “Mani” Gupta appears on the broader Luma speaker list; that listing alone does not establish a particular session contribution. The product’s relevance is the connection between consent and execution. [11][15]' },
      { type: 'paragraph', text: 'The Odds extends the discussion into prediction-market formation, liquidity and outcome resolution. Its site describes platforms, market makers, oracles and legal participants, but labels much of its speaker gallery as previous-edition speakers. Those names should not be treated as a confirmed Singapore roster. [16]' },
    ],
  },
  {
    id: 'attract-capital',
    title: 'Attract: establish a credible investment relationship',
    blocks: [
      { type: 'paragraph', text: 'Capital formation begins with a defined claim and a credible route to value. An investor needs to know whether the instrument represents a fund share, debt claim, beneficial interest or contractual strategy entitlement. Investor eligibility, management authority, valuation and exit terms belong to that relationship.' },
      { type: 'paragraph', text: 'Franklin Templeton’s Benji platform is a useful comparison within this broader ecosystem. Its published architecture includes a digital transfer agent, a digital-asset management system and wallet infrastructure. Blockchain records participate in an investment operating model. [18]' },
      { type: 'paragraph', text: 'The analytical implication is that distribution requires more than connecting a wallet. A subscription must become a recorded ownership interest with an investment mandate, understandable reporting and a process for future changes. Successful fundraising is the start of the capital cycle.' },
    ],
  },
  {
    id: 'move-capital',
    title: 'Move: deliver usable funds and reconcile the obligation',
    blocks: [
      { type: 'paragraph', text: 'A transfer can be final on a blockchain while the commercial workflow remains unfinished. A beneficiary may still need screening, conversion, bank payout or allocation against an invoice. Stellar’s deposit, withdrawal and cross-border standards help explain why these interfaces are part of the product. [9]' },
      { type: 'table', caption: 'Three meanings of completion', columns: ['Layer', 'Completion condition'], rows: [
        ['Network', 'The ledger accepts and finalizes the transfer.'],
        ['Financial', 'The intended recipient receives the required usable asset or currency.'],
        ['Business', 'The obligation and accounting records correctly reflect the payment.'],
      ] },
      { type: 'paragraph', text: 'For enterprise users, time to usable, reconciled funds can be a more meaningful measure than block time. Funding efficiency also matters: BIS research notes that separate cash tokens across ledgers can increase aggregate liquidity requirements. Fast transfers do not automatically reduce pre-positioned capital. [19]' },
    ],
  },
  {
    id: 'deploy-capital',
    title: 'Deploy: follow the economic source of return',
    blocks: [
      { type: 'paragraph', text: 'A useful investment analysis follows the underlying cash flow. Tokenization changes representation, access and operations; the source of return must still be identified. Different strategies create different exposures, even when their receipt tokens look similar.' },
      { type: 'table', caption: 'Analytical comparison of return sources', columns: ['Deployment', 'Economic source', 'Critical question'], rows: [
        ['Receivable financing', 'Discount or financing charge recovered through collection.', 'Is the claim valid, and will the debtor pay?'],
        ['Government-security fund', 'Income on underlying securities.', 'How do valuation and redemption operate?'],
        ['Lending', 'Borrower interest.', 'What absorbs default and collateral losses?'],
        ['Carry or basis strategy', 'Funding, price or term differentials.', 'What happens when spreads reverse or funding disappears?'],
        ['Liquidity provision', 'Trading fees and potentially incentives.', 'Do revenues compensate for inventory and market exposure?'],
      ] },
      { type: 'paragraph', text: 'Theoriq’s ETH vault describes carry trades, funding-rate spreads and term yield; its gold vault describes strategies involving tokenized gold collateral. In both cases, the financial activity explains the proposed return. The asset’s representation alone does not. [14]' },
      { type: 'paragraph', text: 'Solv’s separation of reserve representation and yield execution reinforces the same analytical task: assess the backing mechanism, then assess the additional strategy exposures. Neither step substitutes for the other. [8]' },
    ],
  },
  {
    id: 'service-positions',
    title: 'Service: keep ownership, obligations and reality aligned',
    blocks: [
      { type: 'paragraph', text: 'Servicing is the sustained work after capital is deployed. Someone must maintain balances, calculate income and fees, update valuations, collect payments, monitor collateral, process ownership changes and resolve discrepancies. These functions determine whether the position remains explainable throughout its life.' },
      { type: 'paragraph', text: 'For a receivable, that includes disputes, credit notes, partial payments and overdue collection. For a fund, it includes subscriptions, distributions and redemption liabilities. For a leveraged strategy, it includes financing costs, margin requirements and deleveraging. BIS observes that asset-servicing functions may remain embedded in existing infrastructure when financial claims become tokenized. [20]' },
      { type: 'callout', title: 'An operating identity', text: 'Closing position = opening position + additions − withdrawals + income − expenses ± valuation changes. Every movement should have an attributable source, an effective date and an accountable owner.' },
      { type: 'paragraph', text: 'My product conclusion is that servicing can create a durable competitive advantage. A platform that explains balance changes, reconciles external cash flows and manages exceptions earns relevance throughout the investment’s life. This is also where accounting-ledger semantics become especially useful: they preserve the distinction between cash, assets, income and amounts still owed.' },
    ],
  },
  {
    id: 'return-proceeds',
    title: 'Return: examine the exit asset and its funding source',
    blocks: [
      { type: 'paragraph', text: 'Solv’s documentation illustrates why product-specific exit analysis matters. Its xSolvBTC instant-redemption page describes conversion into SolvBTC, supported by liquidity buffers. That is a defined conversion between products. It does not establish immediate delivery of fiat to a bank account. [21]' },
      { type: 'paragraph', text: 'The separate BTC+ documentation describes scheduled standard withdrawals and a fee-bearing instant route. At the research date, its instant-redemption table lists a 0.5 BTC aggregate daily limit, while the FAQ refers to 10 BTC. The operative limit requires clarification before using either figure for capacity planning. Product terms can change, and the discrepancy should not be resolved by assuming the larger number. [22]' },
      { type: 'table', caption: 'Different mechanisms provide different kinds of liquidity', columns: ['Mechanism', 'Source of proceeds', 'What it establishes'], rows: [
        ['Income distribution', 'Cash generated by underlying assets or activities.', 'The investment has produced distributable income.'],
        ['Redemption', 'Vehicle cash, asset sales or other permitted funding.', 'The investor exits under the vehicle’s terms.'],
        ['Secondary sale', 'Another investor purchases the position.', 'Ownership changes at an available price.'],
        ['Borrowing against a position', 'A lender advances funds.', 'Liquidity is created alongside a repayment obligation.'],
      ] },
      { type: 'paragraph', text: 'An individual investor may exit through a secondary sale without the underlying investment returning its capital. Borrowing may supply cash while retaining the original exposure and adding debt. These mechanisms have different implications for the completeness and resilience of the cycle.' },
      { type: 'paragraph', text: 'The FSB’s tokenization analysis, summarized by BIS, identifies liquidity and maturity mismatch as vulnerabilities when tokens are perceived as more liquid than their underlying assets. A credible exit design therefore identifies the payout asset, processing conditions and funding source, including what happens under stress. [23]' },
    ],
  },
  {
    id: 'worked-capital-cycle',
    title: 'One position, from subscription to investor proceeds',
    blocks: [
      { type: 'paragraph', text: 'Consider a deliberately simplified receivable purchase. All amounts are illustrative US dollars, with no FX movement, tax or token-price change. One investor contributes $98,000 to purchase a verified $100,000 receivable due in 90 days. The agreed servicing fee is $500, payable only from a full collection in this example. This is a workflow illustration, not a quoted product, forecast or investment recommendation.' },
      { type: 'table', caption: 'A worked example of the five capital-cycle handoffs', columns: ['Stage', 'Cash and position', 'Evidence needed to continue'], rows: [
        ['Attract', 'Investor subscribes $98,000 under an agreed mandate.', 'Accepted subscription, investor eligibility, ownership record and agreed distribution terms.'],
        ['Move', 'The $98,000 subscription reaches the designated account or wallet.', 'Receipt matched to the investor; settlement asset, custody and conversion responsibilities identified.'],
        ['Deploy', '$98,000 is paid to acquire the $100,000 receivable; available cash becomes an investment position.', 'Verified claim, purchase agreement, assignment and confirmed seller credit.'],
        ['Service', 'The position remains outstanding until collection; its face amount is not cash available for payout.', 'Maturity tracking, valuation, debtor notices, dispute handling and collection records.'],
        ['Return', 'On full collection, $100,000 funds a $500 fee and $99,500 investor payout.', 'Collection reconciled, contractual allocation approved, payout confirmed and position closed.'],
      ] },
      { type: 'callout', title: 'Reconcile cash, principal and income separately', text: 'Full collection: $100,000 = $98,000 returned principal + $1,500 investor income + $500 servicing fee. The investor receives $99,500 in total, of which $1,500 is gain: approximately 1.53% of the original $98,000 over the assumed 90 days, before any excluded costs or taxes. Issuing or transferring a receipt token creates no additional income in this example.' },
      { type: 'paragraph', text: 'Now suppose only $60,000 arrives at maturity. Before fees or distributions, $40,000 of the face claim remains uncollected. That outstanding claim is not evidence that the remaining cash will arrive. The operator must reconcile the partial collection, assess recovery and valuation, apply the actual contractual priorities, and report what remains exposed. A payout funded by a new subscription or a loan must be identified as such; it does not establish that the debtor paid.' },
      { type: 'paragraph', text: 'This example links the five stages through one position and its records. The acceptance test is whether an investor can trace subscribed funds into a valid asset, understand its ongoing condition, and reconcile the final payment to principal, income, fees and any loss. The same questions apply when the deployment is a fund, a lending position or an automated strategy.' },
    ],
  },
  {
    id: 'enterprise-opportunity',
    title: 'The enterprise opportunity: connect the handoffs',
    blocks: [
      { type: 'paragraph', text: 'For Connextium/Connexis, my interpretation is that the most concrete product opportunity lies in connecting verified obligations, financing, settlement and servicing. Supply-chain finance provides a focused way to test that proposition because every advance should connect to a claim, a collection process and an allocation of proceeds.' },
      { type: 'table', caption: 'An illustrative receivable-financing lifecycle—not a claim of a live integration', columns: ['Step', 'Required outcome'], rows: [
        ['Verify', 'Establish the invoice, buyer acceptance, ownership and financing eligibility.'],
        ['Fund', 'Record investor commitments and allocate capital to the approved obligation.'],
        ['Pay', 'Deliver funds through an authorized rail and confirm recipient credit.'],
        ['Service', 'Track maturity, amendments, disputes, collections and investor entitlements.'],
        ['Distribute', 'Allocate collected cash according to contractual priorities and reconcile the books.'],
      ] },
      { type: 'paragraph', text: 'An AI agent could assist with document checks, funding comparisons, payment preparation, monitoring and reconciliation. Its permissions should identify allowed counterparties, instruments, amounts and escalation conditions. Decisions and actions need enough evidence to reconstruct what happened and why.' },
      { type: 'paragraph', text: 'The useful acceptance test is an imperfect transaction: a partial payment, a disputed receivable, an unavailable provider or a growing redemption queue. Can the system preserve ownership, track what remains owed, recover an interrupted process and explain the result?' },
      { type: 'callout', title: 'The question to carry forward', text: 'Can the ecosystem carry capital through its entire life—and explain the rights, risks and cash flows at every handoff?' },
    ],
  },
];
