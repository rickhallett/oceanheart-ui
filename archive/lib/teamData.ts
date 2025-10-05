import { type } from "os";

// --- Interfaces ---
export interface RoleDetail {
  id: string; // Unique identifier for the role (e.g., 'eng-lead')
  acronym?: string; // <-- Add acronym field
  title?: string;
  advisorTitle?: string;
  description: string;
  advisorDescription?: string;
  background?: string; // <-- Add background field
  isPureAdvisor?: boolean;
  isAlliance?: boolean;
  reportsTo?: string[]; // IDs of roles this role reports to
  memberName?: string; // e.g., "Pete 'Maverick' Mitchell"
  avatarUrl?: string; // URL to avatar image
  socialXUrl?: string;
  socialInstagramUrl?: string;
  socialYouTubeUrl?: string;
  socialLinkedInUrl?: string; // <-- Add LinkedIn URL
  websiteUrl?: string;
}

export interface Section {
  level: string;
  description?: string;
  roles: RoleDetail[];
  id: string;
}

// --- Placeholder Avatar ---
export const placeholderAvatar = "/api/placeholder/80/80"; // Simple placeholder URL

// --- Updated Data Structure with Mock Names/Avatars ---
export const leadershipStructure: Section[] = [
  {
    id: 'leadership',
    level: 'Leadership & Strategy',
    roles: [
      {
        id: 'ceo',
        acronym: 'CEO',
        reportsTo: [],
        title: 'Chief Executive Officer',
        memberName: "Rick ('Kai') Hallett PGDip PGCert BSc (Hons) BABCP", avatarUrl: "/images/kai_profile.jpeg",
        advisorTitle: 'Director & Founder',
        description: 'Leads overall vision, strategy, and execution. Represents the company, drives growth, and fosters culture.',
        advisorDescription: 'Merging advice and direction from all our advisors, Kai is the driving force behind OceanHeart.ai and it\'s key aim: to piece together the rosetta stone of human-AI interaction, evolving alongside the "Science, Story and Spirit" of the human experience.',
        background: 'Kai merges 15 years as a psychotherapist (specializing in ACT, Somatic Release, and Meditative Transformation) with practical experience as a self-taught, full-stack software engineer working in enterprise big data environments since 2019. Driven by a deep exploration of AI\'s impact on human wellbeing, he founded Oceanheart.ai in 2024.',
        socialInstagramUrl: "https://www.instagram.com/oceanheart.ai",
        socialXUrl: "https://x.com/oceanheart_ai",
        socialLinkedInUrl: "https://www.linkedin.com/in/richardhallett86/",
        websiteUrl: "https://www.oceanheart.blog/book",
      },
      {
        id: 'cxo',
        acronym: 'CXO',
        title: 'Chief Experience Officer',
        memberName: "Ayse Ibrahim BSc (Hons) OstMed",
        avatarUrl: "/images/ayse_profile.png",
        reportsTo: ['ceo'],
        advisorTitle: 'Founding Executive',
        description: 'Takes a holistic view of all key stakeholder experiences, often encompassing customer (CX), employee (EX), and user (UX) experience design and strategy. ',
        background: 'Ayse joined the team in 2025 as a founding member, herself the founder of THE BACKBONE, Principle Osteopath, & Women’s Health expert, NLP Master Practitioner and Yoga Therapy teacher',
        advisorDescription: 'Provides perspective on how different aspects of the business impact the overall experience for customers, users, and employees. Encourages a people-centered view, grounded in years of immersion in the healing arts.',
        websiteUrl: "https://thebackbone.co.uk/ayshe-ibrahim/",
        socialLinkedInUrl: "https://www.linkedin.com/in/ayshe-ibrahim-10a2b825/",
        socialInstagramUrl: "https://www.instagram.com/thebackboneosteopathy",
        socialXUrl: "https://x.com/BackboneOsteo",
      },
      { id: 'cmo', acronym: 'CMO', title: 'Chief Marketing Officer', reportsTo: ['cxo'], advisorTitle: 'Senior Advisor (Marketing & Brand Strategy)', avatarUrl: "/images/neal_profile.jpeg", memberName: "Neal Brown", description: 'Leads marketing, branding, and communication efforts.', advisorDescription: 'Strategic integration of AI and predictive analytics into marketing to achieve measurable, data-driven growth and optimize customer journeys, keeping the BigHeart in BigTech', background: 'Digital Marketing Strategist (6+ years) specializing in AI-driven campaigns for measurable impact (proven traffic, sales, social growth). Integrates AI, predictive analytics, and content strategies to optimize customer journeys and conversions. Dedicated to simplifying AI and staying current with its rapid evolution for smarter, impactful, human-centric marketing.', socialLinkedInUrl: "https://www.linkedin.com/in/nealbrown77/" },
    ],
  },
  {
    id: 'operations',
    level: 'Core Operations & Execution',
    roles: [
      { id: 'coo', acronym: 'COO', title: 'Chief Operating Officer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['ceo'], advisorTitle: 'Senior Advisor (Operational Efficiency)', description: 'Oversees daily operations, ensuring efficiency and execution.', advisorDescription: 'Shares insights on improving processes and efficiency.' },
      { id: 'cfo', acronym: 'CFO', title: 'Chief Financial Officer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['ceo'], advisorTitle: 'Senior Advisor (Financial Perspective)', description: 'Manages financial strategy, planning, reporting, and risk.', advisorDescription: 'Lends financial acumen, offering perspective on fiscal matters.' },
      { id: 'cto', acronym: 'CTO', title: 'Chief Technology Officer', memberName: "Rick ('Kai') Hallett PGDip PGCert BSc (Hons) BABCP", avatarUrl: "/images/kai_profile.jpeg", reportsTo: ['ceo'], advisorTitle: 'Software Architect', description: 'Drives technology strategy, innovation, and development.', advisorDescription: 'Responsible for high-level architecture and design of all software and systems.', websiteUrl: "https://www.oceanheart.ai", socialXUrl: "https://x.com/oceanheart_ai", socialLinkedInUrl: "https://www.linkedin.com/in/richardhallett86/", socialInstagramUrl: "https://www.instagram.com/oceanheart.ai" },
      { id: 'ciso', acronym: 'CSO', title: 'Chief Security Officer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['cto'], advisorTitle: 'Senior Advisor (Info Security Insight)', description: 'Leads cybersecurity strategy and protects information assets.', advisorDescription: 'Helps consider best practices for protecting information.' },
      { id: 'cpo-prod', acronym: 'CPO', title: 'Chief Product Officer', memberName: "Rick ('Kai') Hallett PGDip PGCert BSc (Hons) BABCP", avatarUrl: "/images/kai_profile.jpeg", reportsTo: ['ceo'], advisorTitle: 'Advisor (Product Strategy)', description: 'Owns product vision, strategy, and roadmap.', advisorDescription: 'Provides perspective on user needs, market fit, and product direction.', websiteUrl: "https://www.oceanheart.ai", socialXUrl: "https://x.com/oceanheart_ai", socialLinkedInUrl: "https://www.linkedin.com/in/richardhallett86/", socialInstagramUrl: "https://www.instagram.com/oceanheart.ai" },
      { id: 'cro-cgo', acronym: 'CGO', title: 'Chief Growth Officer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['ceo'], advisorTitle: 'Advisor (Revenue Growth Perspective)', description: 'Oversees revenue generation, aligning sales, marketing, etc.', advisorDescription: 'Shares insights on growth strategies and market opportunities.' },
      { id: 'clo-learn', acronym: 'CLO', title: 'Chief Learning Officer', reportsTo: ['cxo'], avatarUrl: placeholderAvatar, memberName: "Position Available", advisorTitle: 'Advisor (Learning & Development)', description: 'Leads strategy for employee learning and skills development.', advisorDescription: 'Shares insights on effective training and continuous learning.' },
      { id: 'clo-legal', acronym: 'CCO', title: 'Chief Legal Officer', avatarUrl: placeholderAvatar, memberName: "Position Available", reportsTo: ['ceo'], advisorTitle: 'Senior Advisor (Legal Perspective)', description: 'Manages legal affairs, compliance, and risk.', advisorDescription: 'Draws upon legal experience to offer perspective on potential legal considerations.' },

      { id: 'chro-people', acronym: 'CPO', title: 'Chief People Officer', reportsTo: ['coo'], advisorTitle: 'Advisor (People & Culture)', description: 'Oversees HR, talent, culture, and employee experience.', advisorDescription: 'Shares wisdom on fostering a positive workplace culture.', avatarUrl: placeholderAvatar, memberName: "Position Available" },
    ],
  },
  {
    id: 'specialized',
    level: 'Specialized Functions & Expertise',
    roles: [
      { id: 'eng-lead', title: 'Lead Engineer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['cto'], description: 'Oversees the engineering team, ensuring technical excellence and project delivery.', advisorDescription: 'Provides technical guidance and mentorship.' },
      { id: 'frontend-dev', title: 'Frontend Developer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['eng-lead'], description: 'Builds the user interface using modern web technologies.', advisorDescription: 'Focuses on usability and performance.' },
      { id: 'backend-dev', title: 'Backend Developer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['eng-lead'], description: 'Manages server-side logic, APIs, and database interactions.', advisorDescription: 'Ensures scalability and security.' },
      { id: 'qa-engineer', title: 'QA Engineer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['eng-lead'], description: 'Ensures software quality through rigorous testing procedures.', advisorDescription: 'Champions quality across the development lifecycle.' },
      { id: 'ux-designer', title: 'UX/UI Designer', memberName: "Position Available", avatarUrl: placeholderAvatar, reportsTo: ['cxo'], description: 'Designs intuitive and visually appealing user experiences.', advisorDescription: 'Advocates for user-centered design principles.' },





    ],
  },
  {
    id: 'advisory',
    level: 'Senior Advisory Circle',
    description: 'Individuals primarily offering perspective and guidance based on deep experience, often with less operational involvement.',
    roles: [
      {
        id: 'advisor-legal',
        memberName: "Position Available", avatarUrl: placeholderAvatar,
        advisorTitle: 'Senior Advisor (Legal Perspective)',
        description: 'Draws upon decades of invaluable experience as a solicitor, providing seasoned guidance and perspective to the team. Helps us navigate considerations with thoughtfulness and care.',
        isPureAdvisor: true
      },
      {
        id: 'advisor-growth',
        memberName: "Aureliana Enache",
        avatarUrl: "/images/aura_profile.png",
        advisorTitle: 'Senior Advisor (Growth Strategies)',
        description: 'Shares experience and insights on different approaches to expanding the business and reaching new audiences or markets. Offers perspective on growth opportunities.',
        isPureAdvisor: true,
        // --- Add Mock Social/Website URLs ---
        // socialXUrl: "https://x.com/placeholder_stinger",
        socialInstagramUrl: "https://www.instagram.com/aureliana.enache",
        // socialYouTubeUrl: "https://youtube.com/placeholder_stinger", // Example: Omit one
        websiteUrl: "https://www.aureliana-therapies.com?ref=oceanheart.ai"
      },
    ],
  },
  {
    id: 'alliance',
    level: 'OceanHeart Wellbeing Alliance',
    description: 'A network of external professionals and ambassadors aligned with our mission, equipped through training to support and advocate for our human-centered approach. Everyone in the alliance has lifetime access to all oceanheart.ai software, courses, events and resources.',
    roles: [
      {
        id: 'alliance-member',
        title: 'Wellbeing Alliance Ambassador',
        memberName: "Aureliana Enache",
        avatarUrl: "/images/aura_profile.png", // Assuming a real image path for Penny too
        description: 'Our founding ambassador, Aureliana Enache, actively promotes and organises the activity of the OceanHeart Wellbeing Alliance through her company Aureliana Therapies and her ongoing immersion into the healing arts',
        isAlliance: true,
        // --- Add Mock Social/Website URLs ---
        // socialXUrl: "https://x.com/placeholder_penny",
        // websiteUrl: "https://example.com/penny-site"
      },
      {
        id: 'alliance-member',
        title: 'Wellbeing Alliance Ambassador',
        memberName: "Position Available",
        // avatarUrl: "/images/team/penny.jpg", // Assuming a real image path for Penny too
        description: 'Actively promotes and organises the activity of the OceanHeart Wellbeing Alliance. Free access to all oceanheart.ai software, courses, events and resources.',
        isAlliance: true,
        // --- Add Mock Social/Website URLs ---
        // socialXUrl: "https://x.com/placeholder_penny",
        // websiteUrl: "https://example.com/penny-site"
      },
      {
        id: 'alliance-member',
        title: 'Wellbeing Alliance Member',
        memberName: "Position Available",
        // avatarUrl: "/images/team/penny.jpg", // Assuming a real image path for Penny too
        description: 'Joins a community dedicated to advancing human-centered approaches to wellbeing in the age of AI. Members support our mission and champion effective and ethical human-AI interaction, empowered by free access to all oceanheart.ai software, courses, events and resources.',
        isAlliance: true,
        // --- Add Mock Social/Website URLs ---
        // socialXUrl: "https://x.com/placeholder_penny",
        // websiteUrl: "https://example.com/penny-site"
      },
    ],
  },
];

// Helper to flatten roles for easier lookup
export const allRoles = leadershipStructure.flatMap(section => section.roles);
export const rolesById = new Map(allRoles.map(role => [role.id, role])); 