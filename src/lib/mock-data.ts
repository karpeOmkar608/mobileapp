// Mock data for all landing page sections

export const testimonials = [
  {
    name: "Priya Sharma",
    handle: "@priyacreates",
    role: "Lifestyle Creator • 1.2M followers",
    avatar: "PS",
    color: "from-violet-500 to-purple-600",
    quote:
      "CreatorOS completely changed how I run my creator business. I used to track everything in a Google Sheet — now I close deals 3x faster and never miss a payment.",
    type: "creator",
  },
  {
    name: "Arjun Mehta",
    handle: "@arjunfitness",
    role: "Fitness Creator • 800K followers",
    avatar: "AM",
    color: "from-rose-500 to-pink-600",
    quote:
      "The contract vault alone is worth it. No more WhatsApp back-and-forth. Everything is documented, signed, and stored — brands love working with me now.",
    type: "creator",
  },
  {
    name: "Riya Kapoor",
    handle: "@riyatech",
    role: "Tech Creator • 2.1M followers",
    avatar: "RK",
    color: "from-amber-500 to-orange-600",
    quote:
      "I manage 15+ brand deals a month. Before CreatorOS, I missed 2-3 deadlines every month. Now I haven't missed one in 6 months.",
    type: "creator",
  },
  {
    name: "Zara Collective",
    handle: "Brand Manager",
    role: "Fashion Brand • D2C",
    avatar: "ZC",
    color: "from-emerald-500 to-teal-600",
    quote:
      "Finding the right creators used to take weeks. With CreatorOS's discovery tool, we shortlist and onboard a creator in 48 hours. Campaign ROI is up 40%.",
    type: "brand",
  },
  {
    name: "Boost Sports",
    handle: "Marketing Lead",
    role: "Sports & Energy Brand",
    avatar: "BS",
    color: "from-sky-500 to-blue-600",
    quote:
      "We run 20+ micro-campaigns simultaneously. CreatorOS's campaign dashboard gives us complete visibility. Our team reduced reporting time by 70%.",
    type: "brand",
  },
  {
    name: "InfluenceHub Agency",
    handle: "Agency Director",
    role: "Creator Management Agency",
    avatar: "IH",
    color: "from-violet-600 to-indigo-600",
    quote:
      "We manage 120 creators across 15 brands. Without CreatorOS, this would need a team of 10. With it, our team of 3 handles everything seamlessly.",
    type: "agency",
  },
];

export const features = {
  creator: [
    {
      icon: "Briefcase",
      title: "Deal CRM",
      description: "Track every brand deal from first outreach to final payment. Never lose a conversation again.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: "CreditCard",
      title: "Payment Tracking",
      description: "Know exactly what you're owed and when. Get automated reminders for overdue payments.",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      icon: "FileText",
      title: "Invoice Generator",
      description: "Create professional invoices in seconds. Auto-fill from deal details, send with one click.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: "Clock",
      title: "Deadline Manager",
      description: "Visual timeline for all deliverables. Smart reminders so you never miss a content deadline.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      icon: "Shield",
      title: "Contract Vault",
      description: "Store, sign, and manage all brand contracts in one secure place. E-sign included.",
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
  ],
  brand: [
    {
      icon: "Search",
      title: "Creator Discovery",
      description: "Find creators by niche, audience, engagement rate, and location. AI-matched suggestions.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: "Megaphone",
      title: "Campaign Management",
      description: "Launch, track, and optimize campaigns end-to-end from one dashboard.",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      icon: "LineChart",
      title: "Creator Analytics",
      description: "Deep audience insights, engagement metrics, and campaign performance tracking.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      icon: "GitMerge",
      title: "Collaboration Tracking",
      description: "Real-time visibility into deliverables, approvals, and content status for every creator.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ],
  agency: [
    {
      icon: "Users",
      title: "Multi-Creator Roster",
      description: "Manage your entire creator roster from one place. Portfolio views, deal pipelines, and payments.",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: "Workflow",
      title: "Team Workflows",
      description: "Assign tasks, set approvals, and collaborate with your team on every campaign.",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      icon: "BarChart3",
      title: "Portfolio Analytics",
      description: "Aggregate performance data across all creators and campaigns. Impress clients with reports.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ],
};

export const problems = {
  creator: [
    { icon: "AlertCircle", title: "Missed Payments", desc: "Chasing brands on WhatsApp for payments that are weeks overdue", color: "text-rose-400" },
    { icon: "Grid", title: "Spreadsheet Chaos", desc: "Managing 20 brand deals across 10 different Google Sheets", color: "text-amber-400" },
    { icon: "MessageSquare", title: "WhatsApp Overload", desc: "Important deal details buried in hundreds of chat messages", color: "text-violet-400" },
    { icon: "Calendar", title: "Missed Deadlines", desc: "Forgetting content submission dates and losing future deals", color: "text-rose-400" },
  ],
  brand: [
    { icon: "Search", title: "Discovery is Hard", desc: "Spending weeks manually vetting creators with no reliable data", color: "text-violet-400" },
    { icon: "BarChart2", title: "No Visibility", desc: "Zero insight into campaign progress until content goes live", color: "text-amber-400" },
    { icon: "MessageSquare", title: "Scattered Comms", desc: "Coordinating with 10+ creators across email, DMs, and WhatsApp", color: "text-rose-400" },
    { icon: "FileX", title: "Contract Risks", desc: "No standard contracts, no digital signatures, no paper trail", color: "text-emerald-400" },
  ],
};

export const pricing = [
  {
    name: "Creator",
    price: "₹999",
    period: "/month",
    description: "Everything a solo creator needs to run their brand deal business professionally.",
    badge: "Most Popular",
    badgeColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    highlight: true,
    features: [
      "Deal CRM (unlimited deals)",
      "Invoice Generator",
      "Payment Tracking",
      "Contract Vault (10 contracts)",
      "Deadline Manager",
      "Email support",
    ],
  },
  {
    name: "Brand",
    price: "₹4,999",
    period: "/month",
    description: "For brands running creator campaigns and needing full collaboration management.",
    badge: "Early Access",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    highlight: false,
    features: [
      "Creator Discovery (AI-matched)",
      "Campaign Management",
      "Collaboration Tracking",
      "Creator Analytics",
      "Unlimited contracts",
      "Priority support",
    ],
  },
  {
    name: "Agency",
    price: "Custom",
    period: "",
    description: "For agencies managing multiple creators and running brand campaigns at scale.",
    badge: "Enterprise",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    highlight: false,
    features: [
      "Everything in Brand",
      "Multi-creator roster",
      "Team workflows & roles",
      "Portfolio analytics",
      "White-label reports",
      "Dedicated account manager",
    ],
  },
];

export const whyItems = [
  {
    icon: "Layers",
    title: "All-in-One Ecosystem",
    description: "No more switching between 6 tools. CRM, payments, contracts, campaigns — everything in one place.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: "Heart",
    title: "Creator-First Workflows",
    description: "Built by understanding how creators actually work — not retrofitted from generic project management tools.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: "Store",
    title: "Marketplace + CRM",
    description: "The only platform where creators discover brands AND manage the entire collaboration lifecycle.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: "TrendingUp",
    title: "Built for Scale",
    description: "Whether you're a solo creator or a 100-creator agency, CreatorOS grows with your business.",
    color: "from-emerald-500 to-teal-600",
  },
];

export const dashboardCampaigns = [
  { brand: "Nike India", type: "Fitness", value: "₹2,40,000", status: "Active", progress: 68, statusColor: "text-emerald-400", dot: "bg-emerald-400" },
  { brand: "Boat Lifestyle", type: "Tech", value: "₹85,000", status: "Review", progress: 90, statusColor: "text-amber-400", dot: "bg-amber-400" },
  { brand: "Nykaa Beauty", type: "Beauty", value: "₹1,20,000", status: "Active", progress: 45, statusColor: "text-emerald-400", dot: "bg-emerald-400" },
  { brand: "Zomato", type: "Food", value: "₹60,000", status: "Pending", progress: 15, statusColor: "text-violet-400", dot: "bg-violet-400" },
];
