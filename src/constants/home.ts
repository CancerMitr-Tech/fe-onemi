// ── Types ──
export interface StepProgram {
  title: string;
  subtitle: string;
  href: string;
}

export interface StepData {
  step: string;
  title: string;
  highlight: string;
  subtitle: string;
  items: string[];
  tagline: string;
  image: string;
  programs?: StepProgram[];
}

export const HERO = {
  heading1: "India's first AI-powered",
  heading2: "Health Management Platform.",
  subtitle1: "Empowering health with clinical insights,",
  subtitle2: "curated solutions & personalised care.",
  cta: "Download Now",
};

export const ROTATING_PILLS = [
  "Mental Health",
  "Organ Health",
  "Advanced Diagnostics",
  "Treatment Centers",
  "Doctor Consult",
];

export const STATS = [
  { value: "500+", label: "OneMi Programs" },
  { value: "100+", label: "Biomarkers" },
  { value: "1,000+", label: "Health Products" },
  { value: "1,000,000+", label: "Data Points" },
];

export const PROBLEM = {
  heading: "Struggling to manage your",
  highlight: "health in one place?",
  subtitle:
    "Health management feels scattered. OneMi brings clarity, continuity, and control.",
};

export const HOW_IT_WORKS: StepData[] = [
  {
    step: "Step 1:",
    title: "Assess your",
    highlight: "Health",
    subtitle: "Clarity before care.",
    items: [
      "Symptom Tracker",
      "100+ biomarkers",
      "Gene Mapping",
      "MRI, CT, PET and other scans",
    ],
    tagline: "See patterns throughout — not isolated reports.",
    image: "/images/Lstep1.png",
  },
  {
    step: "Step 2:",
    title: "Understand your",
    highlight: "Health",
    subtitle: "Insights are more grounded in our past than our present.",
    items: [
      "Risk analysis",
      "Health mapping",
      "Pattern recognition",
      "Report interpretation",
    ],
    tagline: "So you don't treat symptoms or conditions blindly.",
    image: "/images/step-2-landing.png",
  },
  {
    step: "Step 3:",
    title: "Elevate your",
    highlight: "functional Health",
    subtitle: "Address the root cause.",
    items: [
      "Data backed assessment",
      "Clinical consult",
      "Weekly check ins",
      "Progress report",
      "24/7 Dedicated Concierge & Care",
    ],
    tagline:
      "Personalised programs to restore metabolic health, chronic conditions, cancer.",
    image: "/images/lstep3.png",
    programs: [
      {
        title: "My Metabolic Detox",
        subtitle: "Reset your system in 21 days",
        href: "/programs/my-metabolic-detox",
      },
      {
        title: "My Health Recharge",
        subtitle: "Restore your health in 90 days",
        href: "/programs/my-health-recharge",
      },
    ],
  },
  {
    step: "Step 4:",
    title: "Buy",
    highlight: "Health Products",
    subtitle: "Healthy choices handpicked for your needs",
    items: [
      "Certified supplements",
      "Healthy nuts and seeds",
      "Nutrients, mixes & herbs",
      "Protein powders",
      "Comfort care & supportive aids",
      "Tests at home",
    ],
    tagline: "So you choose with confidence.",
    image: "/images/step-4-landing.png",
  },
  {
    step: "Step 5:",
    title: "Manage your",
    highlight: "Health Tasks",
    subtitle: "Task management made easy",
    items: [
      "Bookings and appointments",
      "Health expenses",
      "Secure locker for health documents",
      "Reminders, notifications, alarms",
    ],
    tagline: "You save time and energy.",
    image: "/images/lstep4.png",
  },
  {
    step: "Step 6:",
    title: "Let Data drive your",
    highlight: "Decisions",
    subtitle: "Precision insights & outcomes",
    items: [
      "Longitudinal health progress",
      "Biomarker & risk analysis",
      "Lifestyle changes & impact",
      "Expenses and savings",
      "Milestones and adherence",
    ],
    tagline: "So outcome is measured, not assumed.",
    image: "/images/step6.png",
  },
];

export const YELLOW_BANNER =
  "OneMi unifies health data, AI driven insights, curated health marketplace and longitudinal care into one powerful experience.";

export const TICKER_ITEMS = [
  "Gut & immunity",
  "Nutrient levels",
  "Lifestyle impact",
  "Health trends",
  "Risk signals",
  "Symptom recovery",
  "Treatment visits",
  "Health spending",
  "Cost savings",
  "Preventive alerts",
  "Outcome tracking",
  "Care coordination",
];

export const MEMBERSHIP = {
  heading: "OneMi Pro - Membership",
  subheading: "Continuity of Care",
  body: "Health, without gaps. Care that keeps up with you.",
  cta: "Know more",
};

export const MEMBERSHIP_FEATURES = [
  {
    title: "Om — Your AI Health Assistant",
    caption: "Plan, book, & track with guidance.",
    image: "/images/membership-om-ai.png",
  },
  {
    title: "Data-Driven Health Dashboards",
    caption: "One place for health, care & costs.",
    image: "/images/membership-dashboards.webp",
  },
  {
    title: "Functional Health Programs",
    caption: "Recharge health with personalized plans.",
    image: "/images/membership-programs.webp",
  },
  {
    title: "Priority Care Concierge",
    caption: "Faster responses, instant support.",
    image: "/images/membership-concierge.webp",
  },
  {
    title: "Shop Health Products",
    caption: "Curated products, and other essentials.",
    image: "/images/membership-shop.webp",
  },
  {
    title: "Book Health Services",
    caption: "Diagnostics and treatment solutions.",
    image: "/images/membership-services.webp",
  },
];

export const PRICING_FEATURES = [
  "Expert Consultation",
  "AI credits/month",
  "Savings & Discounts",
  "Priority Appointments & Instant Bookings",
  "Secure Health Record Management",
  "Dedicated Care Expert",
  "24/7 Medical Assistance & Care Support",
];

export const PRICING_PLANS = [
  { name: "Monthly", price: "₹599/-", note: "180 AI credits/month", badge: "" },
  {
    name: "Quarterly",
    price: "₹1,599/-",
    note: "Extra credits 10%, Savings ~10%",
    badge: "",
  },
  {
    name: "Annual",
    price: "₹4,999/-",
    note: "Extra credits 15%, Savings 30%",
    badge: "Best Value",
  },
];

export const TRUST_CARDS = [
  "Privacy-first architecture",
  "Secure encryption",
  "Controlled access",
  "AI guardrails",
  "Human escalation",
  "Clinical governance",
];

export const TESTIMONIALS = [
  {
    name: "Megha",
    age: 34,
    text: "I had all my reports but no idea what they actually meant. OneMi explained everything in simple language and told me what I should focus on. That itself reduced so much anxiety.",
  },
  {
    name: "Rohit",
    age: 41,
    text: "Earlier I would Google everything and get scared. With OneMi, I get clear answers and guidance on what to do next. It feels much more reassuring.",
  },
  {
    name: "Anita",
    age: 38,
    text: "Instead of treating each test separately, OneMi helped me see patterns over time. I finally feel like I'm managing my health, not just reacting to problems.",
  },
  {
    name: "Suresh",
    age: 52,
    text: "All my answers, document storage, symptoms, appointments, everything is in one app. I don't have to search through files anymore before every doctor visit.",
  },
  {
    name: "Kunal",
    age: 45,
    text: "When my mother was diagnosed, we didn't know where to start. OneMi helped us understand reports and plan the next steps. That guidance meant everything to us.",
  },
  {
    name: "Preeti",
    age: 36,
    text: "Doctors are great, but you don't see them every day. OneMi supported me between visits when small questions kept coming up.",
  },
];

export const FAQ = [
  {
    q: "Is Om a doctor replacement?",
    a: "No. Om does not replace doctors. It supports you between visits by organizing information, explaining reports, tracking progress, and helps you make informed decisions with your medical team.",
  },
  {
    q: "What is the OneMi Patient Dashboard?",
    a: `The Patient Dashboard is your personal health command center.
        It gives you:
        - A snapshot of your health status
        - Trends over time (symptoms, tests, treatments)
        - Upcoming actions, reminders, and alerts
        - Health locker`,
  },
  {
    q: "Is my data safe?",
    a: `Yes. OneMi uses:
        - Secure encryption
        - Controlled access
        - Privacy-first architecture
        Your data is never shared without your permission.`,
  },
  {
    q: "What do I get with the OneMi Pro Membership?",
    a: `- Continuous AI analysis
        - Unlimited data storage
        - Ongoing health insights (Coming soon)
        - Priority concierge support
        - Cost benefits on products and services`,
  },
  {
    q: "Can I use OneMi without membership?",
    a: `Yes, limited features may be available.
        Membership unlocks the full, long-term health management experience.`,
  },
];

// ── Partners Section ──
export const PARTNERS_ROW_1 = [
  "Carbamide Forte",
  "Wellbeing Nutrition",
  "Cannazo India",
  "ZeroHarm Sciences",
  "Hugg Beverages",
  "Pure Nutrition",
  "Bold care",
  "Nucgnex Life Sciences",
  "Canfem",
  "FM Nutrition",
  "Salt Oral Care",
  "Neodocs",
];

export const PARTNERS_ROW_2 = [
  "New Empire Pharmacy",
  "Kanari Nutrition Private Limited",
  "Frido",
  "Madhya Earth",
  "Kankesh Pharmacy",
  "Elixir Wellness",
  "AutoimmunityCare",
  "Clinical Nutrition",
  "Nut Set Go",
  "Seth Sons India",
  "Pilcraft Healthcare Private Limited",
  "Neodocs",
];