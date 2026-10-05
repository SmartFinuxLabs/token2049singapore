'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  BookOpen,
  ArrowUp,
  ExternalLink,
  ZoomIn,
  X,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const people = [
  {
    name: 'Lili Zhao',
    location: 'Zürich, Switzerland',
    org: 'MoneyOS / digital-asset & capital-market infrastructure',
    desc: 'Spent roughly a decade in digital assets and is now concentrating heavily on the infrastructure beneath tokenization: custody, clearing, settlement, liquidity, banking connectivity and collateral mobility. Her recent work through MoneyOS argues that the industry is entering a phase where the opportunity may increasingly lie in the access layer above fragmented financial infrastructure.',
    url: 'https://ch.linkedin.com/in/lilizhao7?utm_source=chatgpt.com',
    linkText: 'LinkedIn Profile',
  },
  {
    name: 'Aldiyar Bogenbayev',
    location: 'Singapore / Global',
    org: 'Brickken — Head of Partnerships',
    desc: 'Works on strategic partnerships around digital-asset tokenization at Brickken. His recent industry work includes taking tokenized real estate from concept into scalable deployment, assembling the institutional relationships required for real-world adoption.',
    url: 'https://www.brickken.com/about-us?utm_source=chatgpt.com',
    linkText: 'Brickken Overview',
  },
  {
    name: 'Alvin Aldrich Abrogena',
    location: 'Metro Manila, Philippines',
    org: 'DICE205 Digital Corporation',
    desc: 'Brings an enterprise-technology perspective with deep experience in enterprise application development, distributed databases, Salesforce integration, cloud infrastructure, and client project delivery across Southeast Asia.',
    url: 'https://ph.linkedin.com/in/alvin-aldrich-abrogena-a5925629?utm_source=chatgpt.com',
    linkText: 'LinkedIn Profile',
  },
  {
    name: 'Enzzo Cusihuaman',
    location: 'United States',
    org: 'R2 — Co-Founder & CBO',
    desc: 'Focused on institutional-grade yield infrastructure around RWA-powered DeFi vaults, tokenized US Treasuries, private credit structuring, stablecoin liquidity, and building bridges between TradFi and decentralized finance.',
    url: 'https://luma.com/2m1b0w1a?utm_source=chatgpt.com',
    linkText: 'Luma Event Session',
  },
  {
    name: 'Kenneth Hu',
    location: 'Singapore',
    org: 'BlockTec',
    desc: 'Specializes in corporate digital treasury integration, exploring MPC multi-sig wallet architectures, automated ERP reconciliations, AML/KYC compliance automation, and cross-border programmable stablecoin settlements.',
    url: 'https://www.blocktechnology.co/insights/stablecoin-treasury-integration?utm_source=chatgpt.com',
    linkText: 'BlockTec Research',
  },
  {
    name: 'Loïc Giacomini',
    location: 'Geneva, Switzerland',
    org: 'SwissChain Holding — Co-Founder & Infrastructure Architect',
    desc: 'Leads operational and technology architecture spanning institutional trading systems, digital custody integrations, and high-security ecosystem connectivity between Swiss banking networks and digital rails.',
    url: 'https://www.swisschainholding.ch/fr/leadership-institutional-oversight?utm_source=chatgpt.com',
    linkText: 'SwissChain Holding',
  },
  {
    name: 'Arpit Sihra',
    location: 'Rajasthan, India',
    org: 'SETTLD / Entrepreneur',
    desc: 'Founder with strong product execution background across early-stage technology startups, pre-seed capital raising, decentralized product engineering, and developer tooling ecosystems.',
    url: 'https://in.linkedin.com/in/arpitsihra?utm_source=chatgpt.com',
    linkText: 'LinkedIn Profile',
  },
];

export default function Day1BlogPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-slate-200/80 bg-white shadow-xs">
        <div className="mx-auto max-w-4xl px-5 py-3.5 sm:px-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 font-mono uppercase tracking-wider">
            <Link href="/" className="hover:text-emerald-600 transition">
              Dashboard
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <Link href="/blogs" className="hover:text-emerald-600 transition">
              Blogs
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-emerald-700 font-semibold">Day 1 Report</span>
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-5 pt-8 sm:px-8 sm:pt-12">
        {/* Article Header */}
        <header className="border-b border-slate-200 pb-8 mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4 font-medium">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-emerald-800 border border-emerald-200/60 font-mono text-[11px] font-semibold">
              <BookOpen size={13} className="text-emerald-600" /> Field Report
            </span>
            <span className="inline-flex items-center gap-1 text-slate-600">
              <MapPin size={13} className="text-emerald-600" /> Singapore
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-slate-600">
              <Calendar size={13} className="text-sky-600" /> October 5, 2026
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl leading-tight mb-4">
            TOKEN2049 Singapore — Day 1:{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
              From Tokenization to the Infrastructure Underneath It
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Key takeaways from the RWA Capital Forum, Risky Business – Singapore &apos;26 at CALI, Skyline Social in
            Downtown Singapore, and ecosystem infrastructure connections.
          </p>
        </header>

        {/* Diagram / Showcase Frame with Lightbox */}
        <section className="mb-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:shadow-lg hover:border-emerald-200">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sparkles size={14} className="text-emerald-600" />
              Singapore Conference & Skyline Recap
            </div>
            <button
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 transition"
            >
              <ZoomIn size={12} /> Click to Expand
            </button>
          </div>

          <div
            onClick={() => setLightboxOpen(true)}
            className="group relative cursor-zoom-in bg-slate-100/70 p-3 sm:p-4 text-center transition"
          >
            <img
              src="/blogs/day1/singapore-conference-skyline-recap.png"
              alt="Singapore Conference & Skyline Recap — Taisu Ventures RWA Capital Forum, Grego AI Risky Business at CALI by Raffles Place, and Singapore Downtown Skyline"
              className="mx-auto rounded-xl shadow-xs transition duration-300 group-hover:scale-[1.008]"
            />
          </div>

          <div className="border-t border-slate-100 bg-white px-5 py-3.5 text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900">Visual Synthesis: </span>
            <span className="text-slate-500">
              <strong>Top:</strong> Taisu Ventures RWA Capital Forum presentation on Sector Focus (Infrastructure & Tooling, DeFi, AI × Blockchain, Consumer Platforms) & Scale.
              <span className="mx-1.5">|</span>
              <strong>Middle:</strong> Grego AI &ldquo;Risky Business &apos;26&rdquo; curated risk session at CALI by Raffles Place with live performance.
              <span className="mx-1.5">|</span>
              <strong>Bottom:</strong> Singapore Downtown skyline and sunset panorama during evening networking.
            </span>
          </div>
        </section>

        {/* Blog Article Content */}
        <article className="space-y-8 text-base leading-relaxed text-slate-700">
          <p className="border-l-4 border-emerald-500 bg-emerald-50/40 py-3 pl-4 pr-3 text-lg font-medium text-slate-900 rounded-r-xl">
            My first full day around TOKEN2049 Singapore started with a useful reminder: the digital-asset conversation
            is moving beyond the token itself.
          </p>

          <p>
            Across the events I attended and, perhaps more importantly, the people I met, the recurring questions were
            about infrastructure: how institutional capital enters onchain markets, how risk propagates through
            interconnected protocols, how tokenized assets obtain liquidity, and how the new rails connect back to
            custody, settlement, banking and the existing financial system.
          </p>

          {/* Section 1 */}
          <section className="pt-4">
            <h2 className="flex items-center gap-2.5 text-2xl font-bold text-slate-950 mb-4 pb-2 border-b border-slate-100">
              <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500"></span>
              RWA Capital Forum — capital meets onchain infrastructure
            </h2>

            <p className="mb-4">
              The first major stop was the <strong>RWA Capital Forum</strong>, hosted by{' '}
              <a
                href="https://www.taisuventures.com/?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-teal-700 hover:text-emerald-700 underline underline-offset-2 inline-flex items-center gap-0.5"
              >
                Taisu Ventures <ExternalLink size={12} />
              </a>
              .
            </p>

            <p className="mb-4">
              The forum brought together institutional investors, digital-asset funds, family offices, liquidity
              providers and RWA companies around a straightforward question:{' '}
              <strong className="text-slate-900">
                where are the most compelling opportunities emerging in onchain real-world assets?
              </strong>{' '}
              Its scope covered private credit, tokenized assets, institutional yield and next-generation financial
              infrastructure.{' '}
              <a
                href="https://luma.com/ydaq5h18?tk=hogEVV&utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-0.5"
              >
                [Luma <ExternalLink size={11} />]
              </a>
            </p>

            <p className="mb-4">
              One of the Taisu presentations framed the market particularly well. Its investment landscape spans four
              connected areas: infrastructure and tooling; DeFi, including stablecoins, payment rails and RWA
              tokenization; AI × blockchain; and consumer platforms.
            </p>

            <div className="my-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-slate-800">
              <div className="font-semibold text-emerald-950 mb-1 flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-600" />
                The Complete Tokenization Lifecycle
              </div>
              <p className="text-sm leading-relaxed text-emerald-900/90 mb-0">
                Tokenization creates an entire stack of requirements underneath the asset:{' '}
                <strong>
                  issuance, liquidity, custody, settlement, compliance, accounting, interoperability and eventually
                  integration with conventional financial infrastructure.
                </strong>
              </p>
            </div>

            <p className="mb-4">
              That was very close to the questions we have been exploring at Connextium: what happens after an asset or
              payment becomes digital, and how do we build reliable financial infrastructure around the resulting
              transaction?
            </p>

            <p>
              The afternoon therefore felt less like a discussion about a new asset class and more like a discussion
              about the gradual reconstruction of financial-market infrastructure.
            </p>
          </section>

          {/* Section 2 */}
          <section className="pt-4">
            <h2 className="flex items-center gap-2.5 text-2xl font-bold text-slate-950 mb-4 pb-2 border-b border-slate-100">
              <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-teal-500 to-sky-500"></span>
              Risky Business — every dependency becomes part of the risk model
            </h2>

            <p className="mb-4">
              From the RWA forum I moved to <strong>Risky Business – Singapore &apos;26</strong>, organized by{' '}
              <a
                href="https://www.grego.ai/?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-teal-700 hover:text-emerald-700 underline underline-offset-2 inline-flex items-center gap-0.5"
              >
                Grego AI <ExternalLink size={12} />
              </a>
              .
            </p>

            <p className="mb-4">
              This was a very different format and a useful counterpoint to the investment discussion earlier in the
              day.
            </p>

            <p className="mb-4">
              Rather than a conventional conference panel, Grego designed the event as a curated gathering of DeFi
              protocol teams, vault providers, strategy builders, risk curators, investors and allocators. The central
              proposition was simple but important: protocols increasingly depend upon other protocols, lending markets,
              bridges and oracles, and{' '}
              <strong className="text-slate-900">
                every additional dependency creates another surface that can fail
              </strong>
              .{' '}
              <a
                href="https://luma.com/dupkf78j?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-0.5"
              >
                [Luma <ExternalLink size={11} />]
              </a>
            </p>

            <p className="mb-4">
              That idea stayed with me. Distributed financial infrastructure does not eliminate dependencies. It
              redistributes them.
            </p>

            <p className="mb-4">
              As systems become increasingly composable, understanding those dependencies becomes part of understanding
              the financial product itself. Smart-contract security is one layer, but architecture, external
              integrations, liquidity dependencies and operational controls form part of the same risk topology.
            </p>

            <div className="my-6 rounded-xl border-l-4 border-teal-500 border border-slate-200 bg-white p-5 italic text-slate-800 shadow-xs">
              <p className="mb-0 text-base font-medium text-slate-900">
                &ldquo;For an enterprise-oriented DLT architecture, this leads to a broader design principle:{' '}
                <strong className="text-teal-900 not-italic">
                  composability without dependency visibility is not sufficient infrastructure.
                </strong>
                &rdquo;
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="pt-4">
            <h2 className="flex items-center gap-2.5 text-2xl font-bold text-slate-950 mb-4 pb-2 border-b border-slate-100">
              <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-sky-500 to-indigo-500"></span>
              Skyline Social — moving from sessions to relationships
            </h2>

            <p className="mb-4">
              The evening shifted toward networking with <strong>Skyline Social Singapore</strong>, another Taisu
              Ventures gathering in Downtown Singapore. Luma categorizes the event around social and networking rather
              than formal conference programming.{' '}
              <a
                href="https://luma.com/token2049sg2026?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-0.5"
              >
                [Luma <ExternalLink size={11} />]
              </a>
            </p>

            <p>
              That transition was valuable. After a day of discussions around RWA capital and protocol risk,
              conversations became less structured and more exploratory: who is building what, which markets they are
              working in, and where two different pieces of infrastructure might eventually connect.
            </p>
          </section>

          {/* Section 4: People connected */}
          <section className="pt-6">
            <h2 className="flex items-center gap-2.5 text-2xl font-bold text-slate-950 mb-2">
              <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"></span>
              People connected during Day 1
            </h2>
            <p className="text-slate-600 mb-6 text-sm">
              The people I connected with represented a surprisingly broad cross-section of the institutional and digital
              asset ecosystem:
            </p>

            <div className="grid gap-4 sm:grid-cols-1">
              {people.map((person, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-sky-300 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span className="font-bold text-slate-950 text-base">{person.name}</span>
                      <span className="text-xs text-slate-500 font-normal">({person.location})</span>
                    </div>
                    <a
                      href={person.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                    >
                      {person.linkText} <ExternalLink size={11} />
                    </a>
                  </div>
                  <div className="text-xs font-semibold text-emerald-800 mb-2">{person.org}</div>
                  <p className="text-xs leading-relaxed text-slate-600 mb-0">{person.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Takeaway */}
          <section className="pt-4">
            <h2 className="flex items-center gap-2.5 text-2xl font-bold text-slate-950 mb-4 pb-2 border-b border-slate-100">
              <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-emerald-500 to-sky-500"></span>
              Day 1 takeaway: the token is only one layer
            </h2>

            <p className="mb-4">
              The strongest theme I took from Day 1 was not simply &ldquo;RWA,&rdquo; &ldquo;stablecoins,&rdquo;
              &ldquo;AI&rdquo; or &ldquo;DeFi.&rdquo; It was <strong>infrastructure</strong>.
            </p>

            <p className="mb-4">
              The RWA Capital Forum looked at where capital can move onchain. Risky Business examined what happens when
              increasingly interconnected infrastructure introduces new dependencies. Conversations with people working
              across tokenization, treasury, partnerships, security and capital-market infrastructure then filled in the
              space between those two questions.
            </p>

            <p className="mb-6">
              The next phase of digital finance will require more than issuing assets onchain. It will require the less
              visible machinery underneath them:{' '}
              <strong className="text-slate-900">
                risk controls, liquidity, custody, accounting, clearing, settlement, compliance, interoperability and
                connectivity back into the banking system.
              </strong>
            </p>

            {/* Executive Synthesis Banner */}
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8 text-center shadow-md">
              <div className="text-base font-bold text-slate-900 uppercase tracking-wider mb-2">
                Day 1 Executive Synthesis
              </div>
              <div className="inline-block rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-mono text-sm sm:text-base font-bold text-emerald-900 shadow-xs">
                Day 1: capital → tokenization → infrastructure → risk → relationships.
              </div>
              <p className="mt-4 text-xs font-medium text-slate-500 mb-0">A strong start to the week.</p>
            </div>
          </section>
        </article>

        {/* Page Footer Actions */}
        <footer className="mt-14 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <strong>Smart Finux Labs / Connextium</strong> — TOKEN2049 Singapore 2026
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <BookOpen size={13} className="text-emerald-600" /> All Blogs
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
            >
              <ArrowUp size={13} /> Back to Top
            </button>
          </div>
        </footer>
      </main>

      {/* Interactive Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition border border-white/20"
            aria-label="Close enlarged view"
          >
            <X size={20} />
          </button>
          <img
            src="/blogs/day1/singapore-conference-skyline-recap.png"
            alt="Singapore Conference & Skyline Recap Enlarged View"
            className="max-h-[90vh] max-w-[95vw] rounded-xl border border-white/20 shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
