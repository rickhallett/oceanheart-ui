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
    // These plans reflect "The Art of Personal AI" service offerings
    plans: [
      {
        priceId: "price_founder_sprint_beta",
        name: "Founding Sprint (Beta)",
        description:
          "6-week 1:1 install of The Art of Personal AI. Get ahead. Stay ahead.",
        price: 1800,          // full price, shown as “£3 000 – 100 % off with code”
        frequency: "one-time",
        features: [
          { name: "Personal readiness audit - find your gap" },
          { name: "Custom AI-workflow builds" },
          { name: "6 live intensives" },
          { name: "Unlimited async support" }
        ],
        cta: "Apply for Beta",
        ctaUrl: "/founder-sprint",
        disabled: false,
      }
      ,
      // {
      //   priceId: "price_executive_guidance",
      //   name: "Executive Guidance Partnership",
      //   description: "1:1 strategic partnership for wellbeing leaders.",
      //   price: 1200,
      //   frequency: "per month",
      //   features: [
      //     { name: "Personalized AI strategy" },
      //     { name: "Ethical framework integration" },
      //     { name: "Transformative coaching" },
      //     { name: "Between-session support" },
      //     { name: "Human-centered approach to AI" },
      //     { name: "Strategic implementation guidance" }
      //   ],
      //   cta: "Book a Discovery Call",
      //   ctaUrl: "https://calendar.app.google/85ZdaqYK5vfNk4aH9",
      //   isFeatured: false,
      //   disabled: true
      // },
      // {
      //   priceId: "price_bridging_worlds_workshop",
      //   name: "'Bridging Worlds' Workshop",
      //   description: "Immersive group learning for AI discernment.",
      //   price: 197,
      //   frequency: "per workshop",
      //   features: [
      //     { name: "Integrate tech & wisdom" },
      //     { name: "Build confidence" },
      //     { name: "Connect with peers" },
      //     { name: "Practical exercises" },
      //     { name: "Ethical considerations" },
      //     { name: "Take-home resources" }
      //   ],
      //   monzoLink: "https://monzo.com/pay/r/oceanheartai-ltd_0Tl8iggjemzSXq",
      //   inDevelopment: true,
      //   disabled: true
      // },
      {
        priceId: "price_first_principles_course",
        name: "First Principles AI Course",
        description: "Self-paced foundational AI learning.",
        price: 299,
        frequency: "one-time",
        features: [
          { name: "Core Integration concepts" },
          { name: "Lifetime access" },
          { name: "Practical application guides" },
          { name: "Community discussions" }
        ],
        monzoLink: "https://monzo.com/pay/r/oceanheartai-ltd_4RBZXMqYRMfBgb",
        disabled: true
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
