// Brand configuration — update this file to rebrand CreatorOS
export const siteConfig = {
  name: "CreatorOS",
  tagline: "The Operating System for the Creator Economy",
  description:
    "Manage creator collaborations, payments, campaigns, and brand deals — all in one place.",
  ctaPrimary: "Get Started Free",
  ctaSecondary: "Explore Marketplace",
  ctaDemo: "Book a Demo",
  nav: [
    { label: "Features", href: "#features" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "#why" },
    { label: "Contact", href: "#contact" },
  ],
  joinLinks: {
    creator: "/register?role=creator",
    brand: "/register?role=brand",
    agency: "/register?role=agency",
  },
  social: {
    twitter: "https://twitter.com/creatoroshq",
    linkedin: "https://linkedin.com/company/creatoroshq",
    instagram: "https://instagram.com/creatoroshq",
  },
  stats: [
    { value: "25K+", label: "Creator Collaborations" },
    { value: "₹18Cr+", label: "Campaign Value Processed" },
    { value: "8K+", label: "Active Creators" },
    { value: "1.2K+", label: "Brands Onboarded" },
  ],
};
