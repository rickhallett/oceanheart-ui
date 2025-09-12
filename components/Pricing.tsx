import config from "@/config";
import PricingHeader from "./pricing/PricingHeader";
import AICoachIntroduction from "./pricing/AICoachIntroduction";
import ServiceCard from "./pricing/ServiceCard";
import PricingFooter from "./pricing/PricingFooter";

const Pricing = () => {
  return (
    <section id="pricing" className="bg-base-200 overflow-hidden px-0 md:px-24">
      <div className="py-24 px-8 max-w-7xl mx-auto">
        {/* <PricingHeader /> */}
        {/* <AICoachIntroduction /> */}

        {/* Service offerings */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8 justify-center">
          {config.services.offerings.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        <PricingFooter />
      </div>
    </section>
  );
};

export default Pricing;