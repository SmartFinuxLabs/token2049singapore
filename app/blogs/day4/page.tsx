import Link from 'next/link';
import type { Metadata } from 'next';
import report from './report.json';

export const metadata: Metadata = {
  title: `Day 4: ${report.title} · TOKEN2049 Singapore`,
  description: report.tldr,
};

function ResearchParagraph({ text }: { text: string }) {
  return <p className="leading-8">{text.split(/(\[\d+\])/g).map((part, index) => {
    const match = /^\[(\d+)\]$/.exec(part);
    if (!match) return part;
    const source = report.references.find((item) => item.number === Number(match[1]));
    return source ? <sup key={index}><a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`Research source ${source.number}`} className="ml-1 text-emerald-800 underline underline-offset-2">[{source.number}]</a></sup> : part;
  })}</p>;
}

export default function Day4Blog() {
  return (
    <div className="min-h-screen bg-slate-50 px-5 pb-20 text-slate-800 sm:px-8">
      <main className="mx-auto max-w-3xl py-12">
        <Link href="/blogs" className="text-sm font-semibold text-emerald-800 hover:underline">← All blogs</Link>
        <article className="mt-8">
          <header>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">TOKEN2049 Singapore · Day 4 · October 8, 2026</p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{report.title}</h1>
            <p className="mt-5 text-sm text-slate-500">By Terence · Research and arguments</p>
          </header>
          <section aria-labelledby="day4-tldr" className="mt-8 border-y border-slate-200 py-6">
            <h2 id="day4-tldr" className="text-lg font-bold text-slate-950">TL;DR</h2>
            <p className="mt-3 leading-8">{report.tldr}</p>
          </section>
          <div className="mt-10 space-y-10 text-base sm:text-lg">
            {report.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id} className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-6">
                  {section.paragraphs.map((text, index) => <ResearchParagraph key={index} text={text} />)}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-8 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-500">Based on Day 4 discussions and published research. Arguments and inferences express the author’s interpretation; speakers and participating institutions are anonymized. Numbered links identify the research supporting the relevant passages.</p>
          <nav aria-label="Adjacent blog reports" className="mt-8">
            <Link href="/blogs/day3" className="text-sm font-semibold text-emerald-800 hover:underline">← Day 3: Stablecoin Rails, Local Trust and the Business of Payments</Link>
          </nav>
        </article>
      </main>
    </div>
  );
}
