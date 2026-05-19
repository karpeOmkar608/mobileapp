"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Zap, CheckCircle2, TrendingUp, DollarSign, Users,
  Sparkles, Building2, Briefcase, MessageSquare, Star
} from "lucide-react";

type DashTab = "creator" | "brand" | "agency";

const floatingCards = [
  {
    side: "left", top: "20%",
    content: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Payment Received</p>
          <p className="text-xs text-white/50">Nike India • ₹2,40,000</p>
        </div>
      </div>
    ),
  },
  {
    side: "left", top: "50%",
    content: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">New Deal Offer</p>
          <p className="text-xs text-white/50">Boat Lifestyle • ₹85K</p>
        </div>
      </div>
    ),
  },
  {
    side: "right", top: "20%",
    content: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Brand Match</p>
          <p className="text-xs text-white/50">12 creators found</p>
        </div>
      </div>
    ),
  },
  {
    side: "right", top: "50%",
    content: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Invoice Sent</p>
          <p className="text-xs text-white/50">Zomato • ₹60,000</p>
        </div>
      </div>
    ),
  },
  {
    side: "left", top: "75%",
    content: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Collaboration Started</p>
          <p className="text-xs text-white/50">Nykaa × Priya Sharma</p>
        </div>
      </div>
    ),
  },
  {
    side: "right", top: "74%",
    content: (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-600 flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Campaign Live</p>
          <p className="text-xs text-white/50">2.4M impressions today</p>
        </div>
      </div>
    ),
  },
];

const dashTabs: { id: DashTab; label: string; icon: React.ElementType; color: string }[] = [
  { id: "creator", label: "Creator", icon: Sparkles, color: "violet" },
  { id: "brand", label: "Brand", icon: Building2, color: "rose" },
  { id: "agency", label: "Agency", icon: Briefcase, color: "amber" },
];

function CreatorDash() {
  return (
    <div className="flex-1 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Active Campaigns", value: "5", change: "+2 this week", pos: true },
          { label: "Revenue This Month", value: "₹5.2L", change: "+24%", pos: true },
          { label: "Pending Invoices", value: "₹1.4L", change: "3 overdue", pos: false },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-white/4 border border-white/6 p-3">
            <p className="text-xs text-white/40 mb-1">{s.label}</p>
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className={`text-xs mt-0.5 ${s.pos ? "text-emerald-400" : "text-rose-400"}`}>{s.change}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/3 border border-white/6 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
          <p className="text-sm font-semibold text-white/80">Active Campaigns</p>
          <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/20">Live</span>
        </div>
        <div className="divide-y divide-white/4">
          {[
            { brand: "Nike India", type: "Fitness", value: "₹2,40,000", status: "Active", progress: 68, color: "bg-emerald-400" },
            { brand: "Boat Lifestyle", type: "Tech", value: "₹85,000", status: "Review", progress: 90, color: "bg-amber-400" },
            { brand: "Nykaa", type: "Beauty", value: "₹1,20,000", status: "Active", progress: 45, color: "bg-emerald-400" },
          ].map((row, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{row.brand}</p>
                <p className="text-xs text-white/40">{row.type}</p>
              </div>
              <div className="hidden sm:flex flex-1 items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/8">
                  <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.progress}%` }} />
                </div>
                <span className="text-xs text-white/40">{row.progress}%</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{row.value}</p>
                <span className={`text-xs ${row.status === "Active" ? "text-emerald-400" : "text-amber-400"}`}>{row.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandDash() {
  return (
    <div className="flex-1 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Active Campaigns", value: "12", change: "+4 this month", pos: true },
          { label: "Creators Engaged", value: "48", change: "+12 new", pos: true },
          { label: "Campaign Spend", value: "₹24L", change: "this quarter", pos: null },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-white/4 border border-white/6 p-3">
            <p className="text-xs text-white/40 mb-1">{s.label}</p>
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className={`text-xs mt-0.5 ${s.pos === true ? "text-emerald-400" : s.pos === false ? "text-rose-400" : "text-white/30"}`}>{s.change}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/3 border border-white/6 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
          <p className="text-sm font-semibold text-white/80">Creator Discovery</p>
          <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/20">48 matched</span>
        </div>
        <div className="divide-y divide-white/4">
          {[
            { name: "Priya Sharma", niche: "Lifestyle", followers: "1.2M", eng: "4.8%", fit: 98 },
            { name: "Riya Kapoor", niche: "Tech", followers: "2.1M", eng: "3.9%", fit: 94 },
            { name: "Arjun Mehta", niche: "Fitness", followers: "800K", eng: "6.2%", fit: 91 },
          ].map((c, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${i === 0 ? "from-violet-500 to-purple-600" : i === 1 ? "from-amber-500 to-orange-600" : "from-rose-500 to-pink-600"} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{c.name}</p>
                <p className="text-xs text-white/40">{c.niche} • {c.followers}</p>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-xs text-white/40">Engagement</p>
                <p className="text-sm font-semibold text-emerald-400">{c.eng}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40">Fit Score</p>
                <p className="text-sm font-bold text-white">{c.fit}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgencyDash() {
  return (
    <div className="flex-1 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: "Managed Creators", value: "120", change: "+8 this month", pos: true },
          { label: "Active Campaigns", value: "34", change: "across 15 brands", pos: null },
          { label: "Total Revenue", value: "₹1.2Cr", change: "+31% YoY", pos: true },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-white/4 border border-white/6 p-3">
            <p className="text-xs text-white/40 mb-1">{s.label}</p>
            <p className="text-lg font-bold text-white">{s.value}</p>
            <p className={`text-xs mt-0.5 ${s.pos === true ? "text-emerald-400" : "text-white/30"}`}>{s.change}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/3 border border-white/6 overflow-hidden">
        <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
          <p className="text-sm font-semibold text-white/80">Campaign Pipeline</p>
          <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/20">34 Active</span>
        </div>
        <div className="divide-y divide-white/4">
          {[
            { brand: "Nike India", creators: 8, budget: "₹12L", status: "Active", progress: 72 },
            { brand: "Nykaa", creators: 12, budget: "₹8.5L", status: "Review", progress: 55 },
            { brand: "Zomato", creators: 5, budget: "₹3.2L", status: "Active", progress: 88 },
          ].map((row, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{row.brand}</p>
                <p className="text-xs text-white/40">{row.creators} creators</p>
              </div>
              <div className="hidden sm:flex flex-1 items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${row.progress}%` }} />
                </div>
                <span className="text-xs text-white/40">{row.progress}%</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{row.budget}</p>
                <span className={`text-xs ${row.status === "Active" ? "text-emerald-400" : "text-amber-400"}`}>{row.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ctaButtons = [
  { label: "Join as Creator", href: "/register?role=creator", gradient: "from-violet-600 to-purple-700", shadow: "shadow-violet-900/50", icon: Sparkles },
  { label: "Join as Brand", href: "/register?role=brand", gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-900/40", icon: Building2 },
  { label: "Join as Agency", href: "/register?role=agency", gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-900/40", icon: Briefcase },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<DashTab>("creator");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_-10%] from-violet-900/30 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-rose-600/8 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-amber-600/6 rounded-full blur-[100px]" />

      {/* Floating side cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: card.side === "left" ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.12, duration: 0.6 }}
          style={{ top: card.top }}
          className={`hidden xl:block absolute glass-strong rounded-xl px-4 py-3 z-10 min-w-[200px] shadow-xl ${
            card.side === "left" ? "left-[4%]" : "right-[4%]"
          } ${i % 2 === 0 ? "animate-float" : "animate-float-delayed"}`}
        >
          {card.content}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-violet-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/70 font-medium">Trusted by 8,000+ Creators & 1,200+ Brands</span>
          <span className="text-xs text-white/30 border-l border-white/10 pl-2">Live Platform</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          The{" "}
          <span className="text-gradient-main">Operating System</span>
          <br />
          for the Creator Economy
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Manage creator collaborations, payments, campaigns, and brand deals —{" "}
          <span className="text-white/80">all in one place.</span> Built for creators, brands, and agencies.
        </motion.p>

        {/* 3-Role CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 w-full"
        >
          {ctaButtons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              id={`hero-cta-${btn.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r ${btn.gradient} text-white font-semibold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-2xl ${btn.shadow}`}
            >
              <btn.icon className="w-4 h-4" />
              {btn.label}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="mb-14"
        >
          <a
            href="#marketplace"
            id="hero-cta-marketplace"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            Explore Marketplace
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Tabbed Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="absolute -inset-4 bg-gradient-to-b from-violet-600/20 to-purple-900/10 rounded-3xl blur-2xl" />
          <div className="relative glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-white/3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="hidden sm:inline text-xs text-white/30 ml-3 font-mono">app.creatorOS.io/dashboard</span>
              </div>
              {/* Dashboard tabs */}
              <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-1">
                {dashTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? tab.id === "creator"
                          ? "bg-violet-500/20 text-violet-300"
                          : tab.id === "brand"
                          ? "bg-rose-500/20 text-rose-300"
                          : "bg-amber-500/20 text-amber-300"
                        : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <tab.icon className="w-3 h-3" />
                    <span className="hidden xs:inline sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col gap-1 p-3 border-r border-white/8 w-12 items-center py-4">
                {["⚡", "📊", "💰", "📄", "🤝"].map((icon, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all ${i === 0 ? "bg-violet-500/20 text-violet-400" : "text-white/20 hover:bg-white/5"}`}>
                    {icon}
                  </div>
                ))}
              </div>

              {/* Animated tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1"
                >
                  {activeTab === "creator" && <CreatorDash />}
                  {activeTab === "brand" && <BrandDash />}
                  {activeTab === "agency" && <AgencyDash />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
