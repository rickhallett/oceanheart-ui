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
        {/* Services header */}
        <div className="flex flex-col text-center w-full mb-12">
          <p className="font-medium text-primary mb-4 text-lg">AI Coaching Services</p>
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
            Your <span className="text-primary font-extrabold">Personal AI Coach</span>: Choose Your <span className="text-secondary font-extrabold">Journey</span>
          </h2>
          <p className="text-xl text-base-content/70 mt-6 max-w-3xl mx-auto leading-relaxed">
            From <span className="text-primary font-semibold">clinical assessment</span> to ongoing <span className="text-secondary font-semibold">mastery</span> - each service builds on comprehensive psychological profiling to create your unique AI coaching experience.
          </p>
        </div>

        {/* AI Introduction */}
        <div className="mb-16 rounded-2xl p-8 shadow-2xl bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">
              Your Personal AI Coach Journey
            </h3>
            <p className="max-w-3xl text-lg text-white/95 leading-relaxed">
              Unlike generic AI that gives one-size-fits-all advice, your personal AI coach is built from your unique clinical assessment. 
              Each service includes comprehensive psychological profiling with Kai to create an AI coach that truly understands 
              your patterns, values, and goals.
            </p>
            <a 
              href="mailto:kai@oceanheart.ai?subject=Tell me more about AI Coaching"
              className="btn btn-white text-primary btn-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold border-2 border-white/20"
            >
              Learn More About AI Coaching
            </a>
          </div>
        </div>

        {/* Service offerings */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8 justify-center">
          {config.services.offerings.map((service, index) => (
            <div key={index} className="relative w-full max-w-lg">
              {service.isFeatured && (
                <>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content px-6 py-2 rounded-full shadow-lg font-bold text-sm uppercase tracking-wider border-2 border-white">
                      ⭐ Most Popular
                    </div>
                  </div>
                  <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-br from-secondary to-secondary-focus z-10 shadow-xl" />
                </>
              )}

              <div className={`relative z-20 h-full p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${service.isFeatured ? 'bg-base-100 mt-4' : 'bg-base-100'}`} style={{display: 'grid', gridTemplateRows: 'auto auto auto 1fr auto'}}>
                
                {/* Row 1: Title - Fixed Height */}
                <div className="h-16 flex items-center mb-4">
                  <p className="text-xl lg:text-2xl font-bold">
                    <span className="text-primary">{service.name}</span>
                  </p>
                </div>

                {/* Row 2: Description - Fixed Height */}
                <div className="h-20 flex items-center mb-6">
                  {service.description && (
                    <p className="text-base-content/80 leading-relaxed text-base">{service.description}</p>
                  )}
                </div>

                {/* Row 3: Price & Duration - Fixed Height */}
                <div className="h-24 flex items-end mb-6">
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-end gap-2">
                      <p className="text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        £{formatPrice(service.price)}
                      </p>
                    </div>
                    <p className="text-sm text-base-content/70 font-medium">
                      {service.duration}
                    </p>
                  </div>
                </div>

                {/* Row 4: Features List - Flexible Height */}
                <div className="flex-1 mb-8">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-secondary to-secondary-focus rounded-full flex items-center justify-center mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-base-content/90 text-sm leading-relaxed">{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Row 5: CTA Button - Fixed Height */}
                <div className="h-16 flex items-end">
                  <ButtonCheckout 
                    priceId="consultation"
                    mode="payment"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact footer */}
        <div className="mt-16 text-center">
          <p className="text-base-content/70 mb-6">
            Have questions about which service is right for you?
          </p>
          <a 
            href="mailto:kai@oceanheart.ai?subject=Questions about AI Coaching Services"
            className="btn btn-outline btn-primary btn-lg"
          >
            Ask Kai Directly
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;