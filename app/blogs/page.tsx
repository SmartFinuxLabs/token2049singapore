import Link from 'next/link';
import day2Hero from './day2/photos/IMG_2640.webp';
import day3Hero from './day3/photos/IMG_2647.webp';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TOKEN2049 Singapore Field Reports & Blogs · Connextium',
  description: 'Executive conference field reports, ecosystem takeaways, and institutional infrastructure insights from TOKEN2049 Singapore.',
};

const blogPosts = [
  {
    day: 'Day 3',
    date: 'October 7, 2026',
    slug: 'day3',
    title: 'Stablecoin Rails, Local Trust and the Business of Payments',
    summary: 'Neobankers Brunch, Sui Basecamp, Stablecon Salon and UNPROMPTED: original photos and ecosystem research on how technical infrastructure becomes trusted business payments.',
    image: day3Hero.src,
    tags: ['Stablecoins', 'Payments', 'Treasury', 'Sui', 'Infrastructure'],
    highlights: [
      'Four event groups and fourteen original photographs',
      'Cobo, Sunrate, OpenFX and the technical and business levels of payments',
      'Local partners, corridor economics and the remaining automation challenge',
    ],
  },
  {
    day: 'Day 2',
    date: 'October 6, 2026',
    slug: 'day2',
    title: 'Stablecoins, Fragmentation and the Generalayer Thesis',
    summary: 'Eight Singapore event groups, six imported Voicenotes and original photos: banks, cards, tokenized assets, agent ownership and Connextium’s proposed coordination of settlement across rails.',
    image: day2Hero.src,
    tags: ['Stablecoins', 'Generalayer', 'Payments', 'Tokenization', 'Agents'],
    highlights: [
      'Event-by-event speaker and company ecosystem maps',
      'Bank acceptance, issuer connectivity and the accept-versus-hold distinction',
      'Generalayer: from payment instruction to recipient credit and reconciliation',
    ],
  },
  {
    day: 'Day 1',
    date: 'October 5, 2026',
    slug: 'day1',
    title: 'From Tokenization to the Infrastructure Underneath It',
    summary:
      'Coverage of RWA Capital Forum (Taisu Ventures), Risky Business – Singapore \'26 (Grego AI at CALI), Skyline Social Downtown networking, and key infrastructure conversations across Swiss capital markets, Brickken, enterprise treasury, and protocol risk.',
    image: '/blogs/day1/singapore-conference-skyline-recap.png',
    tags: ['RWA', 'Infrastructure', 'Treasury', 'DeFi Risk', 'Settlement'],
    highlights: [
      'RWA Capital Forum: The complete tokenization lifecycle beyond issuance',
      'Risky Business: Dependency visibility as core financial risk modeling',
      'High-impact connections: Lili Zhao (MoneyOS), Aldiyar Bogenbayev (Brickken)',
    ],
  },
];

export default function BlogsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Hero Header */}
      <section className="border-b border-slate-200 bg-white py-12 px-5 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2">
            <Sparkles size={14} className="text-emerald-500" />
            TOKEN2049 Singapore Edition
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
            Conference Blogs & Field Reports
          </h1>
          <p className="text-slate-600 max-w-2xl text-base leading-relaxed">
            Daily intelligence, executive synthesis, onchain asset tokenization trends, and strategic takeaways from
            the week of TOKEN2049 Singapore.
          </p>
        </div>
      </section>

      {/* Main List */}
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-lg"
            >
              <div className="grid md:grid-cols-12 gap-0">
                {/* Image side */}
                <div className="md:col-span-5 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4 sm:p-6 border-b md:border-b-0 md:border-r border-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded-xl shadow-xs transition duration-300 group-hover:scale-[1.02] max-h-64 w-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                      {post.day}
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <MapPin size={13} className="text-emerald-600" /> Singapore
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <Calendar size={13} className="text-sky-600" /> {post.date}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-slate-950 group-hover:text-emerald-800 transition mb-3">
                      <Link href={`/blogs/${post.slug}`}>
                        {post.day}: {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm leading-relaxed text-slate-600 mb-4">{post.summary}</p>

                    <div className="mb-5 space-y-1.5 rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Key Session Highlights
                      </div>
                      {post.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition"
                    >
                      Read Full {post.day} Field Report <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

