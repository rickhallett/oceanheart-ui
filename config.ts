import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "Oceanheart.ai - Conscious AI Integration",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Human-centric AI coaching with Kai. Master AI with heart, clarity, and purpose using 'The Art of Personal AI' framework. Integrate Story, Spirit, and Science.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "oceanheart.ai",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Synai Personalized AI Coaching Tiers
    plans: [
      {
        priceId: "price_1RRzzLRVLr5O3VRE5yZYNd5u", // New unique Price ID
        name: "Synai AI-Led Foundation",
        description: "AI-powered assessment -> pro review -> custom Synai AI coach.",
        price: 199, // Scaled from $150 base
        frequency: "one-time",
        features: [
          { name: "AI-Powered Synai Assessment" },
          { name: "Professional Review & Synai Blueprint by Kai" },
          { name: "Custom Synai AI Coach Creation" },
          { name: "ACT-based therapeutic framework foundation" } // Keeping this as a core element
        ],
        disabled: false,
      },
      {
        priceId: "price_1RRzzqRVLr5O3VREwOFUX7M0", // New unique Price ID
        name: "Synai Core",
        description: "1:1 pro assessment -> Synai creation -> follow-up integration.",
        price: 499, // Scaled from $400 base
        frequency: "one-time",
        features: [
          { name: "Personalized Professional Assessment with Kai (90 min)" },
          { name: "Custom Synai AI Coach Creation" },
          { name: "One 90-minute Follow-up Session (Optimization & Integration)" },
          { name: "Personal psychological profile integration" }
        ],
        disabled: false,
      },
      {
        priceId: "price_1RS01PRVLr5O3VREMLZQlizL", // New unique Price ID
        name: "Synai Deep Integration",
        description: "1:1 pro assessment -> Synai creation -> 3x 90-min sessions.",
        price: 997, // Scaled from $750 base
        frequency: "3-month engagement", // Package price, sessions unfold monthly
        features: [
          { name: "Personalized Professional Assessment with Kai (90 min)" },
          { name: "Advanced Custom Synai AI Coach (Deep Psychotherapeutic Integration)" },
          { name: "Three Monthly 90-minute " },
          { name: "Conscious AI Methodology Integration" }
        ],
        isFeatured: true, // This is a substantial offering.
        disabled: false,
      },
      {
        priceId: "price_1RS02qRVLr5O3VRE0uRCrWkc", // New unique Price ID
        name: "Synai Transformation Program",
        description: "8-week AI intensive: assessment, Synai, weekly coaching, psychotherapeutic integration, and Conscious AI Mastery.",
        price: 2199, // Scaled from $1450 base
        frequency: "8-week program",
        features: [
          { name: "Comprehensive Professional Assessment with Kai (90 min)" },
          { name: "Custom Synai AI Coach Creation" },
          { name: "8 Weekly 90-minute Intensive Coaching & Psychotherapeutic Sessions" },
          { name: "Personalized Conscious AI Workflow Development" },
          { name: "Synai MAX - Your Personalized AI Integration Coach" }
        ],
        disabled: false,
      }
    ]
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Oceanheart.ai <noreply@oceanheart.ai>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Kai at Oceanheart.ai <kai@oceanheart.ai>`,
    // Email shown to customer if they need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "kai@oceanheart.ai",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you use any theme other than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "synthwave",
    // ARCHIVED: saigoTheme was used for the now-archived Saigo feature
    // saigoTheme: "synthwave",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users to after a successful login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
    // ARCHIVED: Saigo auth configuration - kept commented for reference
    // saigo: {
    //   loginUrl: "/saigo/signin",
    //   callbackUrl: "/saigo/username"
    // }
  },
} as ConfigProps;

export default config;