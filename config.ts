import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "Oceanheart.ai",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Human-Centred AI Guidance for Wellbeing Professionals. Integrating Science, Story & Spirit.",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "oceanheart.ai",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // 🚨 MAJOR UPDATE NEEDED HERE 🚨
    // These plans now reflect the NEW service structure (1:1, Workshop, Course).
    // Replace placeholders with your actual offerings, pricing, and Stripe IDs IF using Stripe checkout directly.
    // 1:1 guidance might use a different onboarding flow (e.g., application/call).
    plans: [
      {
        // Option 2: Representing a Workshop
        // Replace with actual Price ID if applicable
        priceId: "price_workshop_conversations_ai", // EXAMPLE placeholder
        name: "Conversations with AI: Feel the AI", // UPDATED
        description: "Experiential group learning for safe & insightful AI use.", // UPDATED
        price: 95, // EXAMPLE price - set based on your strategy
        frequency: "per workshop", // UPDATED
        features: [
          { name: "2x live guided sessions (online/in-person)" },
          { name: "Practice AI interaction using your core skills" },
          { name: "Learn organically" },
          { name: "Stand together - connect with peers" },
          { name: "Identify ethical considerations" },
          { name: "Includes workbook/resources" },
        ],
        isFeatured: true, // Highlight workshop as a good entry point
        monzoLink: "https://monzo.com/pay/r/oceanheartai-ltd_0Tl8iggjemzSXq"
      },
      {
        // Option 1: Representing an Online Course / Digital Product
        // Replace with actual Price ID if applicable
        priceId: "price_course_humanos_foundations", // EXAMPLE placeholder
        name: "HumanOS Foundations Course", // UPDATED
        description: "Self-paced learning for mindful, effective AI engagement.", // UPDATED
        price: 199, // EXAMPLE price - set based on your strategy
        frequency: "one-time", // UPDATED (or /month if subscription)
        features: [
          { name: "Core principles of Science, Story & Spirit" },
          { name: "Practical exercises for safe AI interaction" },
          { name: "Understand AI risks & potentials" },
          { name: "Lifetime access to course materials" },
          { name: "Learn with others: Oceanheart.ai community" },
        ],
        monzoLink: "https://monzo.com/pay/r/oceanheartai-ltd_4RBZXMqYRMfBgb"
      },
      {
        // Option 3: AI Recovery Therapy
        priceId: "price_package_ai_recovery_therapy", // EXAMPLE placeholder
        name: "AI Recovery: Therapy 2.0", // UPDATED
        description: "Confused? Need help? Your AI journey is as unique as your mental health. Let's chat.", // UPDATED
        price: 640, // EXAMPLE price - set based on your strategy
        frequency: "one-time", // UPDATED
        features: [
          { name: "120 min clinical consultation" },
          { name: "6 x 90 min treatment sessions" },
          { name: "CBT, ACT, somatic release & mindfulness based psychotherapy" },
          { name: "Deeply experiential and designed for you" },
          { name: "Advanced analytics" },
          { name: "Bespoke materials" },
        ],
        monzoLink: "https://monzo.com/pay/r/oceanheartai-ltd_koKjOdUifKfCmu"

      },
      {
        // Option 3: Representing Premium 1:1 Package (May not use direct checkout)
        // Price ID might be irrelevant if using an application/call flow
        priceId: "price_package_premium_3mo", // EXAMPLE placeholder
        name: "Navigator: 3-Month Masterclass", // UPDATED
        description: "For health & wellbeing leaders who want to navigate AI with confidence.", // UPDATED
        price: 2400, // EXAMPLE price - set based on your strategy (£800/mo)
        frequency: "total package", // UPDATED
        features: [
          { name: "Deeply personalised strategy, coaching & partnership" },
          { name: "6 x 90 min one-to-one consultations" },
          { name: "Dissolve boundaries and preserve what is most human" },
          { name: "Between-session support: this is a lasting partnership" },
          { name: "Find your edge, free up your time" },
        ],
        monzoLink: "https://monzo.com/pay/r/oceanheartai-ltd_uku1DkkJjLypsD"
        // Might add a CTA like "Book a Discovery Call" instead of direct checkout
        // cta: "Book a Discovery Call",
        // ctaUrl: "https://calendar.app.google/your-booking-link" // EXAMPLE
      },
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
