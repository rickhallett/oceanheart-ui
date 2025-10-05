import themes from "daisyui/src/theming/themes";

const config = {
  // REQUIRED
  appName: "Oceanheart.ai - Human-Centred Transformation",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Human-centric AI: master AI with heart, clarity, and purpose using 'The Art of Personal AI' framework",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "oceanheart.ai",
  
  // Contact information for consultation-driven model
  contact: {
    email: "kai@oceanheart.ai",
    subject: "Interested in AI Coaching Services",
    calendly: "", // Add if using scheduling service
  },
  
  crisp: {
    // Crisp website ID for public support chat
    id: "",
    // Show on all routes for general inquiries
    onlyShowOnRoutes: [] as string[],
  },
  
  // Service offerings for informational display (no self-service checkout)
  services: {
    // Consultation-based service tiers
    offerings: [
      {
        name: "AI-Led Foundation",
        description: "AI-powered assessment → professional review → custom AI coach creation.",
        price: 99,
        type: "consultation",
        features: [
          { name: "AI-Powered Assessment" },
          { name: "Professional Review & Blueprint by Kai" },
          { name: "Custom AI Coach Creation" },
          { name: "ACT-based therapeutic framework foundation" }
        ],
        duration: "Initial consultation + follow-up",
      },
      {
        name: "Core Integration",
        description: "1:1 professional assessment → AI coach creation → integration support.",
        price: 299,
        type: "consultation",
        features: [
          { name: "Personalized Professional Assessment with Kai (90 min)" },
          { name: "Custom AI Coach Creation" },
          { name: "90-minute Follow-up Session (Optimization & Integration)" },
          { name: "Personal psychological profile integration" }
        ],
        duration: "2-session package",
        isFeatured: true,
      },
      {
        name: "Deep Integration",
        description: "Comprehensive 1:1 assessment → AI coach creation → 3-month support.",
        price: 549,
        type: "consultation",
        features: [
          { name: "Personalized Professional Assessment with Kai (90 min)" },
          { name: "Advanced Custom AI Coach (Deep Integration)" },
          { name: "Three Monthly 90-minute Sessions" },
          { name: "Conscious AI Methodology Integration" }
        ],
        duration: "3-month engagement",
        
      },
      // {
      //   name: "Transformation Program",
      //   description: "8-week AI intensive: assessment, coaching, and complete AI integration mastery.",
      //   price: 2199,
      //   type: "consultation",
      //   features: [
      //     { name: "Comprehensive Professional Assessment with Kai (90 min)" },
      //     { name: "Custom AI Coach Creation" },
      //     { name: "8 Weekly 90-minute Intensive Coaching Sessions" },
      //     { name: "Personalized Conscious AI Workflow Development" },
      //     { name: "Complete AI Integration Mastery" }
      //   ],
      //   duration: "8-week intensive program",
      // }
    ]
  },
  
  aws: {
    // If you use AWS S3/Cloudfront for static assets
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  
  resend: {
    // Email configuration for contact forms (if needed)
    fromNoReply: `Oceanheart.ai <noreply@oceanheart.ai>`,
    fromAdmin: `Kai at Oceanheart.ai <kai@oceanheart.ai>`,
    supportEmail: "kai@oceanheart.ai",
  },
  
  colors: {
    // REQUIRED — The DaisyUI theme to use
    theme: "synthwave",
    // REQUIRED — This color will be reflected on the whole app outside of the document
    main: themes["light"]["primary"],
  },
};

export default config;