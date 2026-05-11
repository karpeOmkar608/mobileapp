"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle2, TrendingUp, DollarSign, Users } from "lucide-react";
import { siteConfig } from "@/lib/config";

const floatingCards = [
  {
    side: "left",
    top: "20%",
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
    side: "left",
    top: "50%",
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
    side: "right",
    top: "25%",
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
    side: "right",
    top: "55%",
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
];

const dashStats = [
  { label: "Active Campaigns", value: "5", change: "+2 this week" },
  { label: "Revenue This Month", value: "₹5.2L", change: "+24%" },
  { label: "Pending Invoices", value: "₹1.4L", change: "3 overdue" },
];

const campaignRows = [
  { brand: "Nike India", type: "Fitness", value: "₹2,40,000", status: "Active", progress: 68, color: "bg-emerald-400" },
  { brand: "Boat Lifestyle", type: "Tech", value: "₹85,000", status: "Review", progress: 90, color: "bg-amber-400" },
  { brand: "Nykaa", type: "Beauty", value: "₹1,20,000", status: "Active", progress: 45, color: "bg-emerald-400" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-radial-[ellipse_80%_60%_at_50%_-10%] from-violet-900/30 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-rose-600/8 rounded-full blur-[100px]" />

      {/* Floating side cards (hidden on mobile) */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: card.side === "left" ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
          style={{ top: card.top }}
          className={`hidden xl:block absolute glass-strong rounded-xl px-4 py-3 z-10 min-w-[200px] shadow-xl ${
            card.side === "left" ? "left-[5%]" : "right-[5%]"
          } ${i % 2 === 0 ? "animate-float" : "animate-float-delayed"}`}
        >
          {card.content}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-violet-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-sm text-violet-300 font-medium">Now in Early Access</span>
          <span className="text-xs text-white/30 border-l border-white/10 pl-2">Join 2,000+ creators</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
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
          <span className="text-white/80">all in one place.</span> No more spreadsheets, WhatsApp chaos, or missed payments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/register"
            id="hero-cta-waitlist"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-base hover:from-violet-500 hover:to-purple-600 transition-all duration-200 shadow-2xl shadow-violet-900/50 glow-violet hover:scale-[1.02]"
          >
            <Zap className="w-4 h-4 fill-white" />
            {siteConfig.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            id="hero-cta-explore"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/10 text-white font-medium text-base hover:bg-white/8 transition-all duration-200"
          >
            {siteConfig.ctaSecondary}
            <ArrowRight className="w-4 h-4 text-white/40" />
          </a>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9, ease: "easeOut" }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-b from-violet-600/20 to-purple-900/10 rounded-3xl blur-2xl" />

          {/* Dashboard card */}
          <div className="relative glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8 bg-white/3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs text-white/30 ml-3 font-mono">creatorOS / dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-5 rounded-md bg-white/5" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-xs font-bold text-white">P</div>
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

              {/* Main */}
              <div className="flex-1 p-5">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {dashStats.map((stat, i) => (
                    <div key={i} className="rounded-xl bg-white/4 border border-white/6 p-3">
                      <p className="text-xs text-white/40 mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className={`text-xs mt-0.5 ${i === 2 ? "text-rose-400" : "text-emerald-400"}`}>{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Campaign table */}
                <div className="rounded-xl bg-white/3 border border-white/6 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white/80">Active Campaigns</p>
                    <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/20">Live</span>
                  </div>
                  <div className="divide-y divide-white/4">
                    {campaignRows.map((row, i) => (
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
                          <span className={`text-xs ${row.status === "Active" ? "text-emerald-400" : row.status === "Review" ? "text-amber-400" : "text-violet-400"}`}>
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
