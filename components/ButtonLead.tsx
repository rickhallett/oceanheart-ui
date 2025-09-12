// Contact-focused component - no data collection
const ButtonLead = ({ extraStyle }: { extraStyle?: string }) => {
  return (
    <div className={`w-full max-w-xs space-y-3 text-center ${extraStyle ? extraStyle : ""}`}>
      <p className="text-sm text-gray-600 mb-3">
        Ready to explore conscious AI integration?
      </p>
      <a 
        href="mailto:kai@oceanheart.ai?subject=Interested in AI Coaching Services"
        className="btn btn-primary btn-block"
      >
        Contact Kai
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M3 4a2 2 0 0 1 2-2h1.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 0 .707.293h3.172a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 1 17 8.828V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4Z" />
        </svg>
      </a>
    </div>
  );
};

export default ButtonLead;
