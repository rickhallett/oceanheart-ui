import config from "@/config";
import ButtonCheckout from "@/components/ButtonCheckout";
import Link from "next/link";

// Format price with thousand separators (e.g., 1000 -> 1,000)
const formatPrice = (price: number): string =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const Pricing = () => {
  return (
    <section id="pricing" className="bg-base-200 overflow-hidden px-0 md:px-24">
      <div className="py-24 px-8 max-w-7xl mx-auto">
        {/* Offerings header */}
        <div className="flex flex-col text-center w-full mb-12">
          <p className="font-medium text-primary mb-4 text-lg">Synai Coaching Tiers</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            Your <span className="text-primary font-extrabold">Personal AI Coach</span>: Choose Your <span className="text-secondary font-extrabold">Journey</span>
          </h2>
          <p className="text-xl text-base-content/70 mt-6 max-w-3xl mx-auto leading-relaxed">
            From <span className="text-primary font-semibold">clinical assessment</span> to ongoing <span className="text-secondary font-semibold">mastery</span> - each tier builds on comprehensive psychological profiling to create your unique AI coaching experience.
          </p>
        </div>

        {/* Synai Introduction */}
        <div className="mb-16 rounded-2xl p-8 shadow-2xl bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">
              Introducing <span className="text-white font-extrabold">Synai</span>: Your Personal AI Coach
            </h3>
            <p className="max-w-3xl text-lg text-white/95 leading-relaxed">
              Unlike generic AI that gives one-size-fits-all advice, <span className="text-white font-semibold">Synai</span> is built from your unique clinical assessment. 
              Each tier includes comprehensive psychological profiling with Kai to create an AI coach that truly understands 
              your patterns, values, and goals.
            </p>
            <Link href="/synai" className="btn btn-white text-primary btn-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold border-2 border-white/20">
              Learn More About Synai
            </Link>
          </div>
        </div>

        {/* ⏳ Time-Warp Lens */}
        {/* <div className="mb-20 rounded-xl p-8 bg-secondary/10 shadow-lg border-l-4 border-secondary relative overflow-hidden max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
          <div className="absolute inset-0 bg-secondary/5 bg-[linear-gradient(45deg,transparent_25%,rgba(68,64,60,0.05)_25%,rgba(68,64,60,0.05)_50%,transparent_50%,transparent_75%,rgba(68,64,60,0.05)_75%)]" style={{ backgroundSize: "10px 10px" }}></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-center md:text-left flex items-center gap-2">
              <span className="inline-block transform -rotate-12">⏳</span>
              From Paper Maps to Pocket GPS — What About Your Workflow?
            </h3>
            <p className="mb-6 text-center md:text-left text-base-content/90 text-lg">
              Remember hunting street names in an A–Z atlas? Smartphones turned that 10-minute ritual into one tap.
              The <span className="font-semibold text-secondary-focus">next leap</span> is quietly forming around AI-assisted work.
            </p>
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-inner">
              <table className="table table-zebra text-sm w-full">
                <thead>
                  <tr>
                    <th className="bg-secondary/20 font-bold" />
                    <th className="bg-secondary/20 text-center font-bold">2005</th>
                    <th className="bg-secondary/20 text-center font-bold">2025</th>
                    <th className="bg-secondary/20 text-center font-bold">Tomorrow</th>
                    <th className="bg-secondary/20 text-center font-bold">Hours / yr*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Find lunch spot</td>
                    <td className="text-center">15 min</td>
                    <td className="text-center">3 min</td>
                    <td className="text-center">30 sec</td>
                    <td className="text-center font-semibold">≈30</td>
                  </tr>
                  <tr>
                    <td>Draft client email</td>
                    <td className="text-center">25 min</td>
                    <td className="text-center">15 min</td>
                    <td className="text-center">4 min</td>
                    <td className="text-center font-semibold">≈55</td>
                  </tr>
                  <tr>
                    <td>Brainstorm slides</td>
                    <td className="text-center">40 min</td>
                    <td className="text-center">25 min</td>
                    <td className="text-center">6 min</td>
                    <td className="text-center font-semibold">≈80</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm md:text-base text-right">
              *Two occurrences per week → <span className="font-semibold text-secondary-focus">165+ hours</span> quietly reclaimed each year.
            </p>
          </div>
        </div> */}

        {/* Pricing cards */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8 justify-center">
          {config.stripe.plans.map((plan) => (
            <div key={plan.priceId} className="relative w-full max-w-lg">
              {plan.isFeatured && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content px-6 py-2 rounded-full shadow-lg font-bold text-sm uppercase tracking-wider border-2 border-white">
                      ⭐ Most Popular
                    </div>
                  </div>
                  <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-secondary to-secondary-focus z-10 shadow-xl" />
                </>
              )}

              <div className={`relative z-20 h-full p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${plan.isFeatured ? 'bg-base-100 mt-4' : 'bg-base-100'}`} style={{display: 'grid', gridTemplateRows: 'auto auto auto 1fr auto'}}>
                
                {/* Row 1: Title - Fixed Height */}
                <div className="h-16 flex items-center mb-4">
                  <p className="text-xl lg:text-2xl font-bold">
                    <span className="text-secondary">Synai</span> <span className="text-primary">{plan.name.replace('Synai ', '')}</span>
                  </p>
                </div>

                {/* Row 2: Description - Fixed Height */}
                <div className="h-20 flex items-center mb-6">
                  {plan.description && (
                    <p className="text-base-content/80 leading-relaxed text-base">{plan.description}</p>
                  )}
                </div>

                {/* Row 3: Price - Fixed Height */}
                <div className="h-24 flex items-end mb-6">
                  <div className="flex items-end gap-2">
                    {plan.priceAnchor && (
                      <span className="relative text-lg text-base-content/80 mr-1">
                        <span className="absolute inset-x-0 top-1/2 h-[1.5px] bg-base-content" />
                        £{formatPrice(plan.priceAnchor)}
                      </span>
                    )}
                    <p className="text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      £{formatPrice(plan.price)}
                    </p>
                    {plan.frequency && (
                      <span className="text-sm text-base-content/70 mb-2 font-medium">{plan.frequency}</span>
                    )}
                  </div>
                </div>

                {/* Row 4: Features - Flexible Height (fills remaining space) */}
                {plan.features && (
                  <div className="mb-6">
                    <ul className="space-y-3 leading-relaxed text-base">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shrink-0 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-3 h-3 text-white"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-600 font-medium">{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Row 5: CTA - Fixed Height */}
                <div className="space-y-2">
                  {plan.cta ? (
                    <Link href={plan.ctaUrl || "#"} className="btn btn-primary w-full">
                      {plan.cta}
                    </Link>
                  ) : (
                    <ButtonCheckout
                      priceId={plan.priceId}
                      mode="payment"
                      monzoLink={plan.monzoLink}
                      inDevelopment={plan.inDevelopment}
                    />
                  )}
                </div>

                {/* badges */}
                {(plan.inDevelopment || plan.limitedTo) && (
                  <div className="flex flex-col gap-2">
                    {plan.inDevelopment && (
                      <p className="text-xs text-center text-base-content/80">Coming soon – join the waitlist</p>
                    )}
                    {plan.limitedTo && (
                      <p className="text-xs text-center text-orange-700 font-medium">
                        {plan.remaining} of {plan.limitedTo} spaces remaining
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
