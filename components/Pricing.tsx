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
          <p className="font-medium text-primary mb-4">Offerings</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            Conscious AI Integration: Choose Your Path
          </h2>
        </div>

        {/* ⚡ Founding Sprint banner */}
        <div className="mb-16 rounded-xl p-8 shadow-xl bg-gradient-to-r from-primary to-primary-focus text-primary-content relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-content/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h3 className="text-2xl md:text-3xl font-bold text-center">
              ⚡ Founding Sprint (14-Day Application Window) –
              <span className="underline ml-1 text-secondary">Apply by 27 May 2025</span>
            </h3>
            <p className="max-w-2xl text-center text-white text-lg">
              I&apos;m opening <span className="font-bold">4 free seats</span> for the Integration Sprint beta.
              Use coupon <span className="font-mono bg-black text-yellow-500 px-3 py-1 rounded-md mx-1">FOUNDER100</span>
              to drop the fee to £0. Every week you wait is five hours lost to workaround tasks—keep that time instead.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="https://forms.gle/your-google-form" className="btn btn-secondary btn-lg shadow-md hover:shadow-lg transition-all">
                Apply via Google Form
              </Link>
              <Link href="/blog/founding-sprint" className="btn btn-outline btn-lg btn-primary-content hover:bg-primary-content/10">
                Live Updates & Resources
              </Link>
            </div>
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
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <span className="badge text-xs font-semibold border-0 bg-secondary text-secondary-content">
                      RECOMMENDED
                    </span>
                  </div>
                  <div className="absolute -inset-[1px] rounded-[9px] bg-secondary z-10" />
                </>
              )}

              <div className="relative z-20 flex flex-col h-full gap-6 bg-base-100 p-8 rounded-lg">
                {/* plan name & desc */}
                <div>
                  <p className="text-lg lg:text-xl font-bold">{plan.name}</p>
                  {plan.description && (
                    <p className="text-base-content/80 mt-2">{plan.description}</p>
                  )}
                </div>

                {/* price */}
                <div className="flex items-end gap-2">
                  {plan.priceAnchor && (
                    <span className="relative text-lg text-base-content/80 mr-1">
                      <span className="absolute inset-x-0 top-1/2 h-[1.5px] bg-base-content" />
                      £{formatPrice(plan.priceAnchor)}
                    </span>
                  )}
                  <p className="text-5xl font-extrabold tracking-tight">
                    £{formatPrice(plan.price)}
                  </p>
                  {plan.frequency && (
                    <span className="text-xs text-base-content/60 mb-1">{plan.frequency}</span>
                  )}
                </div>

                {/* features */}
                {plan.features && (
                  <ul className="flex-1 space-y-2.5 leading-relaxed text-base">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 opacity-80 shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
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
