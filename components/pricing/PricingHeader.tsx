const PricingHeader = () => {
  return (
    <div className="flex flex-col text-center w-full mb-12">
      <p className="font-medium text-primary mb-4 text-lg">AI Coaching Services</p>
      <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
        Your <span className="text-primary font-extrabold">Personal AI Coach</span>: Choose Your <span className="text-secondary font-extrabold">Journey</span>
      </h2>
      <p className="text-xl text-base-content/70 mt-6 max-w-3xl mx-auto leading-relaxed">
        From <span className="text-primary font-semibold">clinical assessment</span> to ongoing <span className="text-secondary font-semibold">mastery</span> - each service builds on comprehensive psychological profiling to create your unique AI coaching experience.
      </p>
    </div>
  );
};

export default PricingHeader;
