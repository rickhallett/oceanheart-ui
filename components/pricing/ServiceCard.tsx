import ButtonCheckout from "@/components/ButtonCheckout";
import FeatureList from "./FeatureList";

// Format price with thousand separators (e.g., 1000 -> 1,000)
const formatPrice = (price: number): string =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

interface Feature {
  name: string;
}

interface Service {
  name: string;
  description?: string;
  price: number;
  duration: string;
  features: Feature[];
  isFeatured?: boolean;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="relative w-full max-w-lg">
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
        <FeatureList features={service.features} />

        {/* Row 5: CTA Button - Fixed Height */}
        <div className="h-16 flex items-end">
          <ButtonCheckout 
            priceId="consultation"
            mode="payment"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
