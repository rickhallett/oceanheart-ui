import Link from "next/link";

const data = [
  { task: "Re-draft customer email", old: 25, now: 15, study: "~55% faster" },
  { task: "Find decisions in Slack", old: 20, now: 3, study: "30-40% reading saved" },
  { task: "Boilerplate coding", old: 45, now: 20, study: "55% faster" },
];

const KnowledgeGapSection = () => (
  <section className="bg-base-200 overflow-hidden px-0 md:px-24 py-24" id="gold-gap">
    <div className="px-8 max-w-7xl mx-auto">
      {/* 1. Map metaphor */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl lg:text-6xl font-bold mb-12  tracking-tight">
          What <span className="text-red-500">Unconscious</span> AI Integration is Really <span className="text-yellow-500">Costing You</span>
        </h2>
        <h2 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight">
          Paper Maps ➜ Pocket GPS ➜ <span className="text-primary">Next?</span>
        </h2>
        <p className="text-lg lg:text-xl text-base-content/80 max-w-3xl mx-auto">
          In 2005 you needed an A–Z and ten spare minutes to navigate London. Today one tap does the work.
          The <span className="font-semibold">next ten-minute tax</span> is hiding in your workflow—and AI can erase it.
        </p>
      </div>

      {/* 2. Task comparison table */}
      <div className="mb-20 rounded-xl p-8 bg-secondary/5 shadow-lg border-l-4 border-secondary relative overflow-hidden max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
        <div className="absolute inset-0 bg-secondary/3 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.02)_25%,rgba(68,64,60,0.02)_50%,transparent_50%,transparent_75%,rgba(68,64,60,0.02)_75%)]" style={{ backgroundSize: "10px 10px" }}></div>
        <div className="relative z-10">
          <div className="overflow-x-auto bg-base-100 rounded-lg shadow-inner mb-4">
            <table className="table table-zebra text-sm md:text-base w-full">
              <thead>
                <tr>
                  <th className="bg-secondary/15 font-bold">Task</th>
                  <th className="bg-secondary/15 text-center font-bold">Yesterday</th>
                  <th className="bg-secondary/15 text-center font-bold">Early-Adopter Now</th>
                  <th className="bg-secondary/15 text-center font-bold">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.task}>
                    <td>{row.task}</td>
                    <td className="text-center">{row.old} min</td>
                    <td className="text-center">{row.now} min</td>
                    <td className="text-center font-semibold">{row.study}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-right text-base-content/60">
            Source: Accenture, McKinsey & GitHub pilot studies 2024.
          </p>
        </div>
      </div>

      {/* 3. Quiet compounding effect - 250-Hour Snowball */}
      <div className="max-w-4xl mx-auto mb-16 bg-base-100 rounded-xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-primary/0 rounded-full -ml-5 -mb-5 blur-lg"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-secondary/10 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">The 250-Hour Snowball</h3>
          </div>

          <div className="pl-4 border-l-2 border-secondary/30">
            <p className="text-lg text-base-content/80">
              Conservatively, those 5 saved hours each week add up to <span className="font-semibold text-secondary-focus">≈250 hours a year</span>—
              a whole work-month. Early adopters reinvest that dividend back into smarter systems, so the gap widens itself
              without extra effort.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-base-200/50 p-4 rounded-lg border-t-2 border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-bold">Year 1</span>
              </div>
              <p className="text-base-content/80">250 free hours → one extra side-project shipped.</p>
            </div>
            <div className="bg-base-200/50 p-4 rounded-lg border-t-2 border-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-secondary/10 text-secondary-focus px-2 py-1 rounded text-sm font-bold">Year 2</span>
              </div>
              <p className="text-base-content/80">That project is half-automated → two upgrades shipped.</p>
            </div>
            <div className="bg-base-200/50 p-4 rounded-lg border-t-2 border-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-accent/10 text-accent-focus px-2 py-1 rounded text-sm font-bold">Year 3</span>
              </div>
              <p className="text-base-content/80">Their velocity is a quarter ahead while you&apos;re treading water.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Gentle warning + CTA - Infographic style */}
      <div className="max-w-4xl mx-auto rounded-xl bg-base-100 shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 bg-primary p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-content opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="mt-2 text-4xl font-bold text-primary-content">5 Hours</div>
                <div className="text-sm text-primary-content/80">Lost Every Week</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-content/90 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>260 hours yearly</span>
                </div>
                <div className="flex items-center gap-2 text-primary-content/90 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>6.5 work weeks</span>
                </div>
                <div className="flex items-center gap-2 text-primary-content/90 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>£13,000+ value</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Every week you delay costs you time that never returns</h3>
            <p className="text-base-content/80 mb-6">
              The tools to reclaim your time are here; the map just isn&apos;t labelled for <em>your</em> specific terrain yet.
              Let me create your custom integration map.
            </p>
            <Link href="#pricing" className="btn btn-secondary shadow-md hover:shadow-lg transition-all">
              See Your Map Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default KnowledgeGapSection;
