"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Users, Briefcase, CheckCircle2 } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "12,400+",
    label: "Campaigns Managed",
    color: "text-violet-400",
    iconBg: "bg-violet-500/15",
    border: "border-violet-500/15",
    delay: 0.5,
  },
  {
    icon: Users,
    value: "48K+",
    label: "Creator Collaborations",
    color: "text-rose-400",
    iconBg: "bg-rose-500/15",
    border: "border-rose-500/15",
    delay: 0.6,
  },
  {
    icon: Briefcase,
    value: "3,200+",
    label: "Brand Partnerships",
    color: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    border: "border-emerald-500/15",
    delay: 0.7,
  },
];

const features = [
  "Manage brand deals & contracts",
  "Track payments & invoices in real-time",
  "Collaborate with your team seamlessly",
  "AI-powered creator-brand matching",
];

export default function AuthBranding() {
  return (
    <div className="relative flex-1 flex flex-col justify-center py-10 px-8 xl:px-12 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-violet-600/12 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-rose-600/8 rounded-full blur-[70px] pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex items-center gap-2.5 mb-10 relative z-10"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg glow-violet-sm">
          <Zap className="w-4 h-4 text-white fill-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">CreatorOS</span>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.6 }}
        className="relative z-10 mb-4"
      >
        <h1 className="text-3xl xl:text-[2.4rem] font-bold tracking-tight leading-[1.12] mb-3">
          The{" "}
          <span className="text-gradient-main">Operating System</span>
          <br />
          for the Creator Economy
        </h1>
        <p className="text-sm text-white/40 leading-relaxed max-w-[300px]">
          Manage collaborations, payments, and campaigns — all in one powerful workspace.
        </p>
      </motion.div>

      {/* Feature list */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.33, duration: 0.5 }}
        className="relative z-10 flex flex-col gap-2 mb-9"
      >
        {features.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.36 + i * 0.06, duration: 0.4 }}
            className="flex items-center gap-2.5 text-sm text-white/50"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
            {f}
          </motion.li>
        ))}
      </motion.ul>

      {/* Stat cards — horizontal layout, compact */}
      <div className="relative z-10 grid grid-cols-1 gap-2.5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stat.delay, duration: 0.45 }}
              className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-white/4 border border-white/8 backdrop-blur-sm"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${stat.iconBg} ${stat.border} border`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="min-w-0">
                <p className={`text-base font-bold leading-none ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-white/35 mt-0.5 leading-none">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
