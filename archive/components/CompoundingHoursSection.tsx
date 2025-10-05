import Link from "next/link";

const rows = [
  {
    year: "Year 1",
    weekly: "≈ 12 h/wk avg",
    annual: "≈ 630 h",
    eq: "~1 extra work-month",
  },
  {
    year: "Year 2",
    weekly: "≈ 38 h/wk avg*",
    annual: "≈ 2 000 h",
    eq: "~1 work-year",
  },
  {
    year: "Year 3",
    weekly: "Capped at 40 h/wk",
    annual: "≈ 2 100 h",
    eq: "another work-year",
  },
];

const CompoundingHoursSection = () => (
  <section className="bg-base-200 overflow-hidden px-0 md:px-24 py-24" id="compounding">
    <div className="px-8 max-w-7xl mx-auto">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight">
          When Five Hours <span className="text-primary">Doubles Every Five Months</span>
        </h2>
        <p className="text-lg lg:text-xl text-base-content/80 max-w-3xl mx-auto">
          Analysts track AI capability roughly <span className="font-semibold">doubling every 4.9 months</span>.
          Start by freeing just <span className="font-semibold">5 hours a week</span> today—and watch what happens
          when that dividend compounds over a three-year window.
        </p>
      </div>

      {/* Compounding hours table */}
      <div className="mb-20 rounded-xl p-8 bg-secondary/5 shadow-lg border-l-4 border-secondary relative overflow-hidden max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
        <div className="absolute inset-0 bg-secondary/3 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.02)_25%,rgba(68,64,60,0.02)_50%,transparent_50%,transparent_75%,rgba(68,64,60,0.02)_75%)]" style={{ backgroundSize: "10px 10px" }}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-secondary/10 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Compounding Efficiency Growth</h3>
          </div>

          <div className="overflow-x-auto bg-base-100 rounded-lg shadow-inner mb-4">
            <table className="table table-zebra text-sm md:text-base w-full">
              <thead>
                <tr>
                  <th className="bg-secondary/15 font-bold text-center">Calendar</th>
                  <th className="bg-secondary/15 font-bold text-center">Avg. Weekly Hours Freed</th>
                  <th className="bg-secondary/15 font-bold text-center">Total That Year</th>
                  <th className="bg-secondary/15 font-bold text-center">Rough Equivalent</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.year}>
                    <td className="font-semibold text-center md:text-left">{r.year}</td>
                    <td className="text-center">{r.weekly}</td>
                    <td className="text-center">{r.annual}</td>
                    <td className="text-center font-semibold">{r.eq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-right text-base-content/60">
            *Weekly savings plateau at 40 h/w because that&apos;s the full work-week.
          </p>
        </div>
      </div>

      {/* CTA - Infographic style */}
      <div className="max-w-4xl mx-auto rounded-xl bg-base-100 shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 bg-primary p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="flex flex-col items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-content opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div className="mt-2 text-4xl font-bold text-primary-content">6 Months</div>
                <div className="text-sm text-primary-content/80">Of Compounding Lost</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-content/90 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>≈ 130 hours wasted</span>
                </div>
                <div className="flex items-center gap-2 text-primary-content/90 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>≈ £6,500 value lost</span>
                </div>
                <div className="flex items-center gap-2 text-primary-content/90 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Doubling efficiency</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4">Wait Six Months, Lose Half a Year of Compounding</h3>
            <p className="text-base-content/80 mb-6">
              Tools that save you five hours a week today will save forty within a year. Wait six months and you
              don&apos;t miss five hours—you miss the first half-year of compounding that follows.
            </p>
            <Link href="#pricing" className="btn btn-secondary shadow-md hover:shadow-lg transition-all">
              Get Your Hours Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CompoundingHoursSection;
