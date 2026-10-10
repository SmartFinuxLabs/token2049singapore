import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Gallery from './Gallery';
import { photos } from './photos';
import { events } from './report';

export const metadata: Metadata = {
  title: 'Day 3: Stablecoin Rails, Local Trust & the Business of Payments · TOKEN2049 Singapore',
  description: 'October 7 field log: Neobankers Brunch, Sui Basecamp, Stablecon Salon and UNPROMPTED, with original photos, company ecosystem research and corridor operating insights.',
};

const layers = [
  ['Technical level', 'Chains, stablecoin interfaces, wallets, custody, signing controls, screening, ledgers and APIs.', 'Move and safeguard value, enforce authorization, expose reliable transaction evidence.'],
  ['Business level', 'Payment and treasury brands, banks, card programs, FX providers and local payout partners.', 'Connect infrastructure to customers, market access, liquidity, service agreements and recipient delivery.'],
];

const corridor = [
  ['Customer instruction', 'Identify the payer, beneficiary, amount, currency, invoice and accepted delivery endpoint.'],
  ['Funding and authorization', 'Confirm available funds, screening outcomes, wallet policy and permitted counterparties.'],
  ['Stablecoin movement', 'Track the agreed issuer and chain, fees, confirmations and the destination’s acceptance.'],
  ['Local conversion and payout', 'Use an eligible partner for FX and local delivery where required; distinguish partner acceptance from recipient credit.'],
  ['Completion and reconciliation', 'Match evidence to the obligation, post fees and FX correctly, and resolve rejected or incomplete payments.'],
];

export default function Day3Blog() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800">
      <header className="border-b border-slate-200 bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link href="/blogs" className="text-sm font-semibold text-emerald-700 hover:underline">← All field reports</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-700">TOKEN2049 Singapore · Day 3 · October 7, 2026</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Stablecoin rails, local trust and the business of payments</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">A relaxed day of conversations, meeting people and getting to know the industry’s approach to stablecoin adoption — from café networking to an evening overlooking Marina Bay.</p>
          <p className="mt-5 text-sm text-slate-500">By Terence · Connextium field notes · Singapore time (UTC+8) · 4 event groups · 14 original photos</p>
          <figure className="mt-8">
            <Image src={photos.IMG_2647.image} alt={photos.IMG_2647.caption} priority sizes="(max-width: 1024px) 100vw, 1024px" placeholder="blur" className="max-h-[600px] w-full rounded-2xl bg-slate-950 object-contain" />
            <figcaption className="mt-2 text-xs text-slate-500">Sui Basecamp at Marina Bay Sands: the stage, audience and on-chain finance presentation. Original Day 3 photograph.</figcaption>
          </figure>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-5 py-10 sm:px-8">
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8" aria-labelledby="day-thread">
          <h2 id="day-thread" className="text-2xl font-bold text-slate-950">The thread through the day</h2>
          <p className="mt-4 leading-relaxed">Day 3 was a day for leisurely conversation and making connections. I spent time meeting people, listening to their experiences and developing a better understanding of how the industry is adopting stablecoins. The reflections below grew out of those informal exchanges, with company research added afterward to give them context.</p>
          <p className="mt-4 leading-relaxed">Stablecoin infrastructure is becoming a dense ecosystem. Some providers are unfamiliar outside technical circles, yet their work supports the brands that enterprises recognize. Today’s conversations suggested a useful model: a technical level that enables movement and control, and a business level that turns those capabilities into trusted services for institutions and customers.</p>
          <p className="mt-4 leading-relaxed">A wallet-to-wallet transfer can look like a direct remittance. For a business paying across regions, the destination may still be a local bank account, a different currency or a recipient with specific acceptance requirements. Trusted partners in the receiving market remain central to many such flows.</p>
          <p className="mt-4 text-sm leading-relaxed text-emerald-900">Field observations and our analysis are labeled separately from researched product descriptions. Event order follows the supplied notes; published windows do not establish exact arrival times. Company sources describe their own capabilities.</p>
        </section>

        <nav aria-label="Day 3 report contents" className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-950">Follow the event log</h2>
          <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {events.map((event, index) => <li key={event.id}><a href={`#${event.id}`} className="text-emerald-800 hover:underline">{String(index + 1).padStart(2, '0')} · {event.title}</a></li>)}
          </ol>
          <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-sm font-semibold text-emerald-800">
            <a href="#operating-model" className="hover:underline">Technical and business levels</a>
            <a href="#corridors" className="hover:underline">Corridors and automation</a>
            <a href="#connextium-research" className="hover:underline">Connextium.xyz research direction</a>
            <a href="#connections" className="hover:underline">Connections and follow-ups</a>
          </div>
        </nav>

        {events.map((event, index) => <article key={event.id} id={event.id} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Event {String(index + 1).padStart(2, '0')}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{event.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{event.host}<br />{event.venue}<br />{event.time}</p>
          <a href={event.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-emerald-800 underline">Event page ↗</a>
          <p className="mt-5 leading-relaxed">{event.introduction}</p>
          {event.photos.length > 0 && <Gallery ids={event.photos} label={event.title} />}
          <h3 className="mt-7 text-lg font-bold text-slate-950">Field observation</h3>
          <p className="mt-3 leading-relaxed">{event.observation}</p>
          <h3 className="mt-7 text-lg font-bold text-slate-950">Hosts and speaker context</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{event.people}</p>
          <h3 className="mt-7 text-lg font-bold text-slate-950">Company ecosystem · researched context</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {event.ecosystem.map(([name, role, detail]) => <div key={name} className="rounded-xl bg-slate-50 p-5">
              <h4 className="font-bold text-slate-950">{name}</h4>
              <p className="mt-1 text-xs font-semibold text-emerald-800">{role}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{detail}</p>
            </div>)}
          </div>
          <div className="mt-6 rounded-xl border-l-4 border-emerald-600 bg-emerald-50 p-5">
            <h3 className="text-sm font-bold text-emerald-900">Connextium interpretation</h3>
            <p className="mt-2 text-sm leading-relaxed">{event.analysis}</p>
          </div>
          <p className="mt-5 text-xs text-slate-500">Sources · checked October 7, 2026</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-emerald-800">{event.sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{label} ↗</a></li>)}</ul>
        </article>)}

        <section id="operating-model" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Working model from the field notes</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Two levels, with shared responsibilities</h2>
          <p className="mt-4 leading-relaxed">The distinction helps explain why a technically strong ecosystem can remain relatively invisible to the end customer. It also explains why enterprises in Singapore may adopt new rails through an established service relationship. The financial brand packages access, accountability and support alongside the technology.</p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[600px] text-left text-sm">
              <caption className="sr-only">Technical and business responsibilities in a stablecoin payment ecosystem</caption>
              <thead className="bg-slate-50"><tr><th scope="col" className="p-4">Level</th><th scope="col" className="p-4">Capabilities</th><th scope="col" className="p-4">Purpose</th></tr></thead>
              <tbody>{layers.map(([level, capabilities, purpose]) => <tr key={level} className="border-t border-slate-200"><th scope="row" className="p-4 text-emerald-800">{level}</th><td className="p-4 leading-relaxed">{capabilities}</td><td className="p-4 leading-relaxed">{purpose}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="mt-5 leading-relaxed">Cobo illustrates why these levels overlap: wallet infrastructure is itself sold as an institutional service. Sunrate illustrates the value of connecting products to local payment networks and treasury needs. The model describes responsibilities; it does not assign every company to a single fixed layer.</p>
          <p className="mt-4 leading-relaxed">My market hypothesis is that mature payment companies can find further growth through new corridors, business use cases and greater transaction volume within existing relationships. Stablecoins could improve the economics of some routes. Each opportunity still needs evidence of demand, liquidity, recipient acceptance and an attractive all-in cost.</p>
        </section>

        <section id="corridors" className="scroll-mt-24 rounded-2xl bg-slate-950 p-6 text-slate-200 sm:p-8">
          <h2 className="text-3xl font-bold text-white">The transfer is fast. Building the corridor takes more.</h2>
          <p className="mt-5 leading-relaxed">Direct wallet delivery is useful when both parties accept the same asset and can operate the required wallets. A cross-region business payment may require local currency, banking access and regulated services in the destination market. Licensing and ongoing operations carry costs, making partnership a practical route for many providers.</p>
          <p className="mt-4 leading-relaxed">Singapore’s MAS licensing guidance includes capital, local presence, compliance and audit requirements for payment institutions. This is a concrete example of the operating commitments behind market access. The applicable obligations depend on the activity and jurisdiction; partnering does not automatically remove a provider’s own responsibilities.</p>
          <p className="mt-3 text-xs text-emerald-300"><a href="https://www.mas.gov.sg/regulation/payments/licensing-for-payment-service-providers" target="_blank" rel="noopener noreferrer" className="underline">MAS: payment service provider licensing ↗</a></p>
          <h3 className="mt-8 text-xl font-bold text-white">What automation needs to connect</h3>
          <p className="mt-4 leading-relaxed">My notes emphasize that manual operations remain a challenge in remittance. This is a field observation, not a measured industry-wide manual-processing rate. Cobo’s published settlement-network description independently identifies fund-status checks and record stitching as operational work it aims to reduce.</p>
          <p className="mt-3 text-xs text-emerald-300"><a href="https://website.cobo.com/post/cobo-settlement-network-launch" target="_blank" rel="noopener noreferrer" className="underline">Cobo: settlement execution and manual workflows ↗</a></p>
          <ol className="mt-5 space-y-4">{corridor.map(([step, detail], index) => <li key={step} className="rounded-xl border border-slate-700 p-4"><h4 className="font-semibold text-emerald-300">{index + 1}. {step}</h4><p className="mt-2 text-sm leading-relaxed">{detail}</p></li>)}</ol>
          <p className="mt-4 leading-relaxed">A useful pilot would measure recipient-credit time, total fees and FX spread, prefunded capital, manual interventions and exception recovery. That would show whether a stablecoin corridor improves the service the customer actually receives.</p>
        </section>

        <section id="connextium-research" className="scroll-mt-24 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Connextium.xyz · proposed research direction</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Distributed inter-ledger settlement and clearing</h2>
          <p className="mt-5 leading-relaxed">These conversations inform the solution we are researching at Connextium.xyz: stablecoin payment infrastructure built as a distributed platform for settlement and clearing between ledgers. A portal or app can provide the customer interface, while the operational foundation connects the independent books and payment systems of businesses, payment providers and their partners across regions.</p>
          <p className="mt-4 leading-relaxed">Participants would retain their own ledgers and local operating responsibilities. The platform would coordinate agreed payment obligations, funding availability, clearing positions and settlement evidence across those boundaries. Stablecoin rails would be one means of moving value alongside bank and local payout rails, with the route selected for the recipient’s requirements and the corridor’s operational constraints.</p>
          <h3 className="mt-6 text-lg font-bold text-slate-950">What the proposed platform needs to coordinate</h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed">
            <li><strong>Obligations and clearing:</strong> preserve invoice and payment references, match what parties owe and, where agreed, calculate bilateral or multilateral net positions before settlement.</li>
            <li><strong>Regional execution:</strong> connect authorized partners, liquidity and payout services, with clear responsibility for each leg of the payment.</li>
            <li><strong>Inter-ledger evidence:</strong> distinguish a source debit, token confirmation, partner receipt and final beneficiary credit, then reconcile the corresponding entries in each participant’s books.</li>
            <li><strong>Operational recovery:</strong> prevent duplicate payments during retries, identify incomplete legs and assign exception handling to the responsible operator.</li>
          </ul>
          <p className="mt-5 leading-relaxed">The intended outcome is more efficient cross-region operation: less repeated manual checking, clearer settlement positions and better traceability from instruction to accounting completion. Distributed coordination still needs agreed rules, trusted evidence and explicit failure handling. These are research and design objectives to validate with partners and a focused pilot.</p>
        </section>

        <section id="connections" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">Connections and next conversations</h2>
          <h3 className="mt-6 text-lg font-bold text-slate-950">Rcar · an invitation to the Midnight ecosystem</h3>
          <p className="mt-3 leading-relaxed">Rcar was happy to share an invitation code to help with approval for <a href="https://luma.com/vxg0nlpp" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-800 underline">Privacy Pitched with Midnight @ TOKEN2049 Singapore</a>. It was a warm example of how informal connections can open the door to another community and a better understanding of what its teams are building.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">The organizer lists the event for October 8 at Maison Boulud, Marina Bay Sands. Its program includes a keynote and live demonstrations covering privacy-preserving identity, collateral and DeFi infrastructure, and cross-chain interoperability, followed by questions from investors and ecosystem leaders. This entry records the invitation received on Day 3, rather than attendance at the following day’s event.</p>
          <h3 className="mt-7 text-lg font-bold text-slate-950">Aik Wee · a path toward Singapore FinTech Festival</h3>
          <p className="mt-3 leading-relaxed">At UNPROMPTED, Aik Wee, a GFTN representative, enthusiastically encouraged me to attend Singapore FinTech Festival 2026 and explore pitching with a view to raising funds for Connextium.xyz. The conversation gave our networking a concrete next direction: bring the distributed inter-ledger settlement and clearing proposal to a broader financial industry audience, and explore investor and partner interest.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">This is a personal invitation and a fundraising intention. The appropriate pitch program, eligibility and participation arrangements remain to be confirmed with GFTN.</p>
          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <h4 className="font-bold text-slate-950">Background · Singapore FinTech Festival 2026</h4>
            <p className="mt-3 text-sm leading-relaxed">SFF takes place on November 18–20, 2026 at Singapore EXPO. It is organized by the Monetary Authority of Singapore (MAS) and the Global Finance & Technology Network (GFTN), in collaboration with the Association of Banks in Singapore. The gathering connects financial institutions, technology companies, regulators, investors and entrepreneurs.</p>
            <p className="mt-3 text-sm leading-relaxed">The 2026 program examines five forces reshaping finance: technology, geoeconomics, capital, talent and policy. Its focus on new economic corridors, financial networks and governance makes it relevant to Connextium.xyz’s research into cross-region payment operations.</p>
            <p className="mt-3 text-sm leading-relaxed">For founders, Investor Hours offers matched one-to-one investor meetings; the Founders Stage covers capital and company-building decisions; and SFF MeetUp supports meetings agreed by both participants. The Global FinTech Hackcelerator also has a selected-finalist Demo Day on November 18. Its 2026 applications have closed, so Aik Wee’s invitation should be followed up to establish which available pitching or investor-engagement route fits Connextium.xyz.</p>
            <p className="mt-3 text-sm leading-relaxed">Our proposed follow-up is to confirm the route with Aik Wee, prepare a concise pitch and identify investors and operating partners interested in distributed clearing, settlement evidence and regional delivery.</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-emerald-800">
            <li><a className="underline" href="https://luma.com/vxg0nlpp" target="_blank" rel="noopener noreferrer">Midnight event program ↗</a></li>
            <li><a className="underline" href="https://www.fintechfestival.sg/" target="_blank" rel="noopener noreferrer">SFF dates and venue ↗</a></li>
            <li><a className="underline" href="https://gftn.co/press/singapore-fintech-festival-2026-to-explore-the-five-forces-rewiring-global-finance" target="_blank" rel="noopener noreferrer">MAS/GFTN festival announcement ↗</a></li>
            <li><a className="underline" href="https://www.fintechfestival.sg/themes/capital" target="_blank" rel="noopener noreferrer">SFF capital and founder programs ↗</a></li>
            <li><a className="underline" href="https://www.fintechfestival.sg/global-fintech-hackcelerator" target="_blank" rel="noopener noreferrer">Hackcelerator participation status ↗</a></li>
          </ul>
          <h3 className="mt-7 text-lg font-bold text-slate-950">Other Day 3 connections</h3>
          <p className="mt-4 leading-relaxed">The Day 3 business-card notes record You Dan Cao, Head of Revenue Strategy at Xenith (formerly XPAY), and Monica Lim, Analyst at Citi Private Bank in Singapore. The exact event where each connection was made remains unconfirmed.</p>
          <p className="mt-4 leading-relaxed">For the next conversation, I would explore corridor economics and customer needs with the payment operators, and how institutional clients assess access, controls and treasury use cases. These are proposed discussion topics, rather than claims about the contacts’ personal mandates.</p>
          <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed">
            <li>Compare one corridor’s current payment journey with a stablecoin-assisted route.</li>
            <li>Identify which partner owns recipient delivery and which team handles exceptions.</li>
            <li>Prepare a separate Sui edition covering the community, ecosystem and practical payment integrations.</li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-slate-500">Photo provenance: fourteen original event photographs were inspected and converted to WebP, with orientation corrected and metadata removed. All are retained under this route’s photos directory; photo-manifest.json records source names, dimensions and hashes. The business-card image is not reproduced with personal contact details. The three Sui Basecamp photos include the stage, a projected tool interface and an on-chain finance stack slide. Research adds company context to field observations; it does not imply an endorsement.</p>
          <div className="mt-8 border-t border-slate-200 pt-5"><Link href="/blogs/day2" className="text-sm font-semibold text-emerald-800 hover:underline">← Day 2: Stablecoins, Fragmentation and the Generalayer Thesis</Link></div>
        </section>
      </main>
    </div>
  );
}
