import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "oceanheart.ai",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Welcome to Therapy 2.0",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "oceanheart.ai",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1QuuhBRVLr5O3VREdupRdEst"
            : "price_1QuuhBRVLr5O3VREdupRdEst",
        name: "Toolkit & Setup",
        description: "One-time payment for the basic Data Angel toolkit",
        price: 250,
        features: [
          { name: "Portable AI Toolkit" },
          { name: "100% Offline Processing" },
          { name: "Custom Templates" },
          { name: "Built for Compliance" },
          { name: "Initial Setup Support" }
        ],
        isFeatured: true,
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1QtHiIRVLr5O3VREAZkhQyuH"
            : "price_1Qu12HRVLr5O3VRE4uM5HmP6",
        name: "Future Features",
        description: "Monthly access to all new features as they're released",
        price: 10,
        features: [
          { name: "Access to All Future Updates" },
          { name: "Priority Support" },
          { name: "Monthly Webinars" },
          { name: "Community Access" }
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        name: "On-Device Data Cleaning",
        description: "Add-on for using cloud AI safely",
        price: 100,
        features: [
          { name: "Scrub Identifiable Data" },
          { name: "Use Any Cloud AI Model" },
          { name: "Stay Compliant" },
          { name: "Save on Cloud Costs" }
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        name: "Premium Desktop App",
        description: "Elevate your practice",
        price: 100,
        features: [
          { name: "Polished, Intuitive Interface" },
          { name: "Customize to Match Your Brand" },
          { name: "Dedicated Application Experience" },
          { name: "Professional Integration" }
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        name: "Your Digital Clone",
        description: "AI trained on your expertise",
        price: 100,
        features: [
          { name: "Fine-tuned to Your Style" },
          { name: "Authentic-Sounding Notes" },
          { name: "Capture Your Unique Value" },
          { name: "Save Hours of Documentation Time" }
        ],
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
    fromNoReply: `oceanheart <noreply@oceanheart.ai>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    // fromAdmin: `Kai at oceanheart <kai@oceanheart.ai>`,
    fromAdmin: `updates@oceanheart.ai`,
    // Email shown to customer if they need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "kai@oceanheart.ai",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you use any theme other than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "cyberpunk",
    saigoTheme: "synthwave",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users to after a successful login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
    saigo: {
      loginUrl: "/saigo/signin",
      callbackUrl: "/saigo/username"
    }
  },
} as ConfigProps;

export default config;
