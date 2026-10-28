import Link from 'next/link';
import type { Metadata } from 'next';
import { afterword, capitalCycle, references, sections } from './report';

export const metadata: Metadata = {
  title: `TOKEN2049 Afterword: ${afterword.title} · Connextium`,
  description: afterword.description,
  openGraph: {
    type: 'article',
    title: `TOKEN2049 Afterword: ${afterword.title}`,
    description: afterword.description,
    publishedTime: afterword.dateTime,
    authors: ['Terence Heju'],
    modifiedTime: afterword.updatedTime,
  },
};

const sources = new Map(references.map((source) => [source.number, source]));

function CitedText({ text }: { text: string }) {
  return <>{text.split(/(\[\d+\])/g).map((part, index) => {
    const match = /^\[(\d+)\]$/.exec(part);
    const source = match ? sources.get(Number(match[1])) : undefined;
    return source ? (
      <sup key={index}>
        <a
          href={`#source-${source.number}`}
          aria-label={`Source ${source.number}: ${source.publisher}, ${source.title}`}
          className="ml-1 rounded text-emerald-800 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
        >[{source.number}]</a>
      </sup>
    ) : part;
  })}</>;
}

export default function AfterwordBlog() {
  return (
    <div className="min-h-screen bg-slate-50 px-5 pb-20 text-slate-800 sm:px-8">
      <main className="mx-auto max-w-4xl py-10 sm:py-12">
        <Link href="/blogs" className="text-sm font-semibold text-emerald-800 hover:underline">← All blogs</Link>
        <article className="mt-8">
          <header className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">TOKEN2049 Singapore · Afterword</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{afterword.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">From institutional onchain finance to productive capital and financial agents.</p>
            <p className="mt-4 text-sm text-slate-500">By Terence Heju · <time dateTime={afterword.dateTime}>{afterword.date}</time> · Updated <time dateTime={afterword.updatedTime}>{afterword.updated}</time> · Research and ecosystem analysis</p>
          </header>

          <section aria-labelledby="afterword-tldr" className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
            <h2 id="afterword-tldr" className="text-lg font-bold text-slate-950">TL;DR</h2>
            <p className="mt-3 leading-8">{afterword.tldr}</p>
          </section>

          <section aria-labelledby="capital-cycle-overview" className="mt-8">
            <h2 id="capital-cycle-overview" className="text-xs font-bold uppercase tracking-widest text-slate-500">The complete capital cycle</h2>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {capitalCycle.map((stage, index) => (
                <li key={stage.label} className="rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-xs font-bold text-emerald-700">0{index + 1}</span>
                  <a href={`#${stage.id}`} className="mt-2 inline-block font-bold text-emerald-800 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600">{stage.label}</a>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stage.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <p className="mt-7 text-sm leading-7 text-slate-500">{afterword.methodology}</p>

          <nav aria-label="Afterword contents" className="mt-8 border-y border-slate-200 py-6">
            <h2 className="font-semibold text-slate-950">In this afterword</h2>
            <ol className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {sections.map((section, index) => (
                <li key={section.id} className="text-sm leading-6">
                  <a href={`#${section.id}`} className="text-emerald-800 hover:underline">{index + 1}. {section.title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 space-y-12">
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id} className="scroll-mt-28 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-6">
                  {section.blocks.map((block, index) => {
                    if (block.type === 'paragraph') {
                      return <p key={index} className="max-w-3xl leading-8"><CitedText text={block.text} /></p>;
                    }
                    if (block.type === 'callout') {
                      return (
                        <aside key={index} className="rounded-xl border-l-4 border-emerald-600 bg-white p-5 sm:p-6">
                          <h3 className="font-bold text-slate-950">{block.title}</h3>
                          <p className="mt-3 leading-8"><CitedText text={block.text} /></p>
                        </aside>
                      );
                    }
                    return (
                      <div key={index} role="region" aria-label={block.caption} tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600">
                        <table className="w-full min-w-[36rem] border-collapse text-left text-sm leading-7">
                          <caption className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">{block.caption}</caption>
                          <thead className="border-y border-slate-200 bg-slate-100">
                            <tr>{block.columns.map((column) => <th key={column} scope="col" className="px-5 py-3 font-semibold text-slate-950">{column}</th>)}</tr>
                          </thead>
                          <tbody>
                            {block.rows.map((row) => (
                              <tr key={row[0]} className="border-b border-slate-100 last:border-0">
                                {row.map((cell, cellIndex) => cellIndex === 0 ? (
                                  <th key={cellIndex} scope="row" className="px-5 py-4 align-top font-semibold text-slate-900"><CitedText text={cell} /></th>
                                ) : (
                                  <td key={cellIndex} className="px-5 py-4 align-top"><CitedText text={cell} /></td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <section aria-labelledby="afterword-sources" className="mt-12 border-t border-slate-200 pt-8">
            <h2 id="afterword-sources" className="scroll-mt-28 text-2xl font-bold text-slate-950">Sources and further reading</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">Primary organizer and provider materials, plus institutional research. Documentation and product terms may change after the research date.</p>
            <ol className="mt-5 space-y-4 text-sm leading-6">
              {references.map((source) => (
                <li key={source.number} id={`source-${source.number}`} className="flex scroll-mt-28 items-start gap-3 rounded-lg target:bg-emerald-50">
                  <span className="w-8 shrink-0 font-semibold text-emerald-800">[{source.number}]</span>
                  <div className="min-w-0">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="break-words text-emerald-800 underline underline-offset-2">{source.title}</a>
                    <p className="text-slate-500">{source.publisher}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <footer className="mt-10 border-t border-slate-200 pt-6 text-sm leading-7 text-slate-600">
            <p className="font-semibold text-slate-950">Terence Heju · R&amp;D at FinuxLabs · Founder of Connextium.xyz</p>
            <p className="mt-2">Researching payment infrastructure, accounting-ledger systems and enterprise integration, with a focus on settlement, reconciliation and the lifecycle of financial obligations.</p>
            <nav aria-label="Related blog reports" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-semibold text-emerald-800">
              <Link href="/blogs/day4" className="hover:underline">← Day 4: Tokenization and stablecoins</Link>
              <Link href="/blogs" className="hover:underline">All field reports →</Link>
            </nav>
          </footer>
        </article>
      </main>
    </div>
  );
}
