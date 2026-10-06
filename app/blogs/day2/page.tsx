import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Gallery from './Gallery';
import { photos } from './photos';
import { events, fragmentation, noteLedger } from './report';

export const metadata: Metadata = {
  title: 'Day 2: Stablecoins, Fragmentation & Generalayer · TOKEN2049 Singapore · Connextium',
  description: 'October 6 field report: eight Singapore events, speaker and company maps, six Voicenotes, original photos, and Connextium’s Generalayer settlement thesis.',
};

export default function Day2Blog() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800">
      <header className="border-b border-slate-200 bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link href="/blogs" className="text-sm font-semibold text-emerald-700 hover:underline">← All field reports</Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-emerald-700">TOKEN2049 Singapore · Day 2 · October 6, 2026</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Stablecoins are becoming infrastructure. Fragmentation is becoming the operating problem.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">From agent ownership at Gamma Prime to banking, cards, tokenized assets and institutional infrastructure: a field log of the day, and what it suggests for Connextium’s proposed Generalayer.</p>
          <p className="mt-5 text-sm text-slate-500">Connextium field report · Singapore time (UTC+8) · 8 event groups · 6 imported note records</p>
          <figure className="mt-8">
            <Image src={photos.IMG_2640.image} alt={photos.IMG_2640.caption} priority sizes="(max-width: 1024px) 100vw, 1024px" placeholder="blur" className="max-h-[520px] w-full rounded-2xl object-cover" />
            <figcaption className="mt-2 text-xs text-slate-500">The waterfront close at ChainUp’s Institutional Ark, with Marina Bay beyond. Original Day 2 photograph.</figcaption>
          </figure>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-5 py-10 sm:px-8">
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8" aria-labelledby="day-reading">
          <h2 id="day-reading" className="text-2xl font-bold text-slate-950">The thread through the day</h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            <p>The notes point to a practical shift: banks can use stablecoin rails, businesses can accept them without holding them, and tokenized assets become useful when they fit an ordinary financial workflow. The photo log broadens that picture to wallets, card networks, custody, asset managers and infrastructure operators.</p>
            <p>Our interpretation is that a successful transfer is only one part of a successful payment. The harder question is whether the right recipient received an accepted asset, the business obligation was discharged, and the books can be reconciled. That is the problem Connextium proposes to address with Generalayer.</p>
            <p className="text-sm text-emerald-900">Generalayer is Connextium’s proposed solution in this report. Its capabilities below are design objectives, not verified production performance or claims of endorsement by the photographed companies.</p>
          </div>
        </section>

        <nav aria-label="Day 2 report contents" className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-950">Follow the event log</h2>
          <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {events.map((event, index) => <li key={event.id}><a href={`#${event.id}`} className="text-emerald-800 hover:underline">{String(index + 1).padStart(2, '0')} · {event.title}</a></li>)}
          </ol>
          <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-sm font-semibold text-emerald-800">
            <a href="#unassigned-clips" className="hover:underline">Unassigned audio clips</a><a href="#generalayer" className="hover:underline">Fragmentation & Generalayer</a><a href="#source-notes" className="hover:underline">Imported note ledger</a>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">Ordered by the field-log sequence. Published event windows overlap and do not establish exact arrival or departure times. Coverage combines recorded observations, stage photos and linked research; it is not a transcript of every event.</p>
        </nav>

        {events.map((event, index) => <article key={event.id} id={event.id} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Event {String(index + 1).padStart(2, '0')} · {event.time}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{event.title}</h2>
          <p className="mt-3 text-sm font-medium text-slate-600">{event.host}<br />{event.venue}</p>
          <p className="mt-5 leading-relaxed">{event.introduction}</p>
          <Gallery ids={event.photos} label={event.title} />
          <h3 className="mt-7 text-lg font-bold text-slate-950">Speakers and companies</h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">{event.title} speaker roster and attribution</caption>
              <thead className="bg-slate-50 text-slate-600"><tr><th scope="col" className="p-3">Speaker</th><th scope="col" className="p-3">Company</th><th scope="col" className="p-3">Role / evidence</th></tr></thead>
              <tbody>{event.speakers.map(speaker => <tr key={speaker.name} className="border-t border-slate-100"><th scope="row" className="p-3 font-semibold text-slate-900">{speaker.name}</th><td className="p-3">{speaker.company}</td><td className="p-3 text-slate-600">{speaker.role}</td></tr>)}</tbody>
            </table>
          </div>
          {event.evidence && <p className="mt-3 text-xs leading-relaxed text-slate-500">Attribution note: {event.evidence}</p>}
          <h3 className="mt-7 text-lg font-bold text-slate-950">Session evidence and notes</h3>
          <ul className="mt-3 list-disc space-y-3 pl-5 leading-relaxed">{event.notes.map(note => <li key={note}>{note}</li>)}</ul>
          <h3 className="mt-7 text-lg font-bold text-slate-950">Ecosystem map · researched context</h3>
          <div className="mt-3 space-y-3">{event.ecosystem.map(layer => <div key={layer.layer} className="rounded-xl bg-slate-50 p-4"><h4 className="text-sm font-bold text-slate-950">{layer.layer}</h4><p className="mt-1 text-sm font-semibold text-emerald-800">{layer.companies}</p><p className="mt-2 text-sm leading-relaxed text-slate-600">{layer.significance}</p></div>)}</div>
          <div className="mt-6 rounded-xl border-l-4 border-emerald-600 bg-emerald-50 p-5"><h3 className="text-sm font-bold text-emerald-900">Connextium / Generalayer analysis</h3><p className="mt-2 text-sm leading-relaxed">{event.analysis}</p></div>
          <p className="mt-5 text-xs leading-relaxed text-slate-500">Research sources · checked October 6, 2026</p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-emerald-800">{event.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{source.label} ↗</a></li>)}</ul>
          {event.contextPhotos && <details className="mt-6 border-t border-slate-200 pt-4"><summary className="cursor-pointer text-sm font-semibold text-emerald-800">More photos · venue, slides and alternate views ({event.contextPhotos.length})</summary><Gallery ids={event.contextPhotos} label={`${event.title} · more photos`} /></details>}
        </article>)}

        <section id="unassigned-clips" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">Two useful clips, with event attribution still open</h2>
          <p className="mt-4 leading-relaxed">The 14:15 and 14:31 recordings discuss tokenized assets. They may belong to the afternoon capital-markets program, but timing and transcribed names alone are insufficient to identify a panel or speaker. They remain part of Day 2 without a fabricated event attribution.</p>
          <h3 className="mt-6 text-lg font-bold">14:15 SGT · What rights does a token carry?</h3>
          <p className="mt-3 leading-relaxed">The speaker says simpler bonds and notes can be easier to tokenize, then emphasizes the combination of yield and risk. The clip questions whether synthetic stock exposure is equivalent to direct share issuance. Robinhood’s own Classic Stock Tokens terms describe derivative contracts tracking stock prices. That supports the distinction, but does not verify every statement in the recording about SEC actions or a specific total-return-swap structure.</p>
          <p className="mt-3 text-sm"><a className="text-emerald-800 underline" href="https://robinhood.com/eu/en/support/articles/about-stock-tokens/" target="_blank" rel="noopener noreferrer">Robinhood’s instrument description ↗</a></p>
          <h3 className="mt-6 text-lg font-bold">14:31 SGT · When “tokenized” becomes invisible</h3>
          <p className="mt-3 leading-relaxed">The discussion uses banking as an analogy: technology adoption becomes ordinary when customers ask for a money market fund, equity or banking service without foregrounding the delivery technology. Our interpretation is a UX test, not a measured adoption milestone. The platform still has to preserve the instrument’s rights and operating controls even when it hides chain mechanics.</p>
        </section>

        <section id="generalayer" className="scroll-mt-24 rounded-2xl bg-slate-950 p-6 text-slate-200 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">Connextium thesis · proposed solution</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Thinking about stablecoin fragmentation — and Generalayer</h2>
          <p className="mt-5 leading-relaxed">The industry is already working on interoperability. Circle’s CCTP provides supported cross-chain transfer mechanisms; Chainlink CCIP carries tokens and instructions; Visa supports multiple chains for institutional settlement. Generalayer should be evaluated alongside these existing capabilities. The proposed distinction is coordination of the business obligation across rails, rather than another assertion that token movement alone solves payments.</p>
          <p className="mt-4 leading-relaxed">The BIS explicitly discusses fragmentation across issuers and blockchains. Our working model adds the operational layers visible in this day’s bank, card, custody and asset-management ecosystem:</p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-slate-700"><table className="w-full min-w-[680px] text-left text-sm"><caption className="sr-only">Five forms of stablecoin fragmentation and Generalayer design objectives</caption><thead className="bg-slate-800 text-white"><tr><th scope="col" className="p-4">Fragmentation</th><th scope="col" className="p-4">The practical gap</th><th scope="col" className="p-4">Proposed coordination requirement</th></tr></thead><tbody>{fragmentation.map(row => <tr key={row[0]} className="border-t border-slate-700"><th scope="row" className="p-4 font-semibold text-emerald-300">{row[0]}</th><td className="p-4 leading-relaxed">{row[1]}</td><td className="p-4 leading-relaxed">{row[2]}</td></tr>)}</tbody></table></div>
          <h3 className="mt-8 text-xl font-bold text-white">Start with the obligation, then choose the rail</h3>
          <p className="mt-4 leading-relaxed">Consider a USD 1,000 supplier invoice. The payer holds issuer A’s token on chain X; the supplier accepts issuer B on chain Y, or a credit to its bank account. A bridge can address one transfer boundary. It does not automatically obtain recipient acceptance, execute the required conversion, guarantee local credit, allocate fees or mark the invoice paid.</p>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-relaxed">
            <li><strong className="text-white">Define the payment instruction.</strong> Tie the amount, parties, invoice reference, accepted assets and recipient endpoint to one obligation.</li>
            <li><strong className="text-white">Authorize and select a route.</strong> Apply issuer, custody, compliance, liquidity and fee constraints. Where an agent acts, bind it to an explicit mandate and limits.</li>
            <li><strong className="text-white">Track execution across boundaries.</strong> Keep source-chain confirmation, cross-chain completion and recipient credit as separate states. Prevent retries from paying the same obligation twice.</li>
            <li><strong className="text-white">Reconcile and resolve exceptions.</strong> Attach authoritative evidence, post the right accounting entries, and route incomplete or failed legs for recovery.</li>
          </ol>
          <p className="mt-5 leading-relaxed">These are design objectives. Generalayer cannot make different issuer claims identical, remove credit or FX risk, override recipient eligibility, or create atomic settlement across unrelated systems by declaration. Its value would need to be demonstrated through working integrations, failure recovery and auditable completion.</p>
          <h3 className="mt-8 text-xl font-bold text-white">What the day says about industry awareness</h3>
          <p className="mt-4 leading-relaxed">The notes show awareness of market-infrastructure connectivity, accept-versus-hold behavior and ordinary product UX. The researched products show active work on multiple rails. This supports our inference that the problem is understood in parts. It does not establish industry-wide agreement on one architecture, nor recognition or endorsement of Generalayer.</p>
          <p className="mt-4 leading-relaxed">A useful awareness program is an operator conversation around one corridor: which assets can the recipient accept, where does liquidity come from, what evidence marks completion, and who resolves a partial failure? The next step is a narrow pilot with an agreed baseline: all-in fees, recipient-credit time, pre-funded capital, reconciliation effort, and exception recovery. Those measurements would make the Generalayer thesis testable.</p>
          <ul className="mt-6 flex flex-wrap gap-4 text-xs text-emerald-300">
            <li><a className="underline" href="https://www.bis.org/speeches/20260420-stablecoins-framing-debate" target="_blank" rel="noopener noreferrer">BIS: framing stablecoin fragmentation ↗</a></li>
            <li><a className="underline" href="https://www.circle.com/cross-chain-transfer-protocol" target="_blank" rel="noopener noreferrer">Circle CCTP ↗</a></li>
            <li><a className="underline" href="https://docs.chain.link/ccip/overview" target="_blank" rel="noopener noreferrer">Chainlink CCIP ↗</a></li>
            <li><a className="underline" href="https://investor.visa.com/news/news-details/2026/Visa-Accelerates-Stablecoin-Momentum-Adding-Five-Blockchains-for-Settlement/" target="_blank" rel="noopener noreferrer">Visa settlement pilot ↗</a></li>
          </ul>
        </section>

        <section id="source-notes" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">Imported Voicenotes and source notes</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">All six note records returned for October 6 in Singapore time were retrieved and synthesized: five audio recordings and one existing derivative summary. Times below are UTC+8, converted from note timestamps. Raw automatic transcripts contain name errors and unverified claims; this ledger preserves the editorial treatment and every note’s substantive contribution.</p>
          <div className="mt-5 space-y-4">{noteLedger.map(note => <details key={note.id} className="rounded-xl border border-slate-200 p-4"><summary className="cursor-pointer text-sm font-semibold text-slate-950">{note.time} · {note.title}</summary><p className="mt-3 text-xs text-slate-500">Source ID: {note.id} · {note.duration} · {note.event}</p><p className="mt-3 text-sm leading-relaxed">{note.summary}</p><p className="mt-3 text-xs leading-relaxed text-slate-500">Editorial treatment: {note.treatment}</p></details>)}</div>
          <p className="mt-6 text-xs leading-relaxed text-slate-500">Photo provenance: all 33 unique supplied images are retained in this route’s photos directory as metadata-stripped WebP files; duplicate uploads are merged. Session and roster evidence is shown first; venue context and alternate views are expandable. The adjacent photo-manifest.json records filenames, dimensions, hashes and duplicate mappings. No photos were generated. Public organizer and company sources were checked on October 6, 2026; product descriptions are self-descriptions, not independent validation of marketing performance.</p>
          <div className="mt-8 border-t border-slate-200 pt-5"><Link href="/blogs/day1" className="text-sm font-semibold text-emerald-800 hover:underline">← Read Day 1: From Tokenization to the Infrastructure Underneath It</Link></div>
        </section>
      </main>
    </div>
  );
}
