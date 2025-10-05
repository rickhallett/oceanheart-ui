interface Feature {
  name: string;
}

interface FeatureListProps {
  features: Feature[];
}

const FeatureList = ({ features }: FeatureListProps) => {
  return (
    <div className="flex-1 mb-8">
      <ul className="space-y-3">
        {features.map((feature, featureIndex) => (
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
  );
};

export default FeatureList;
