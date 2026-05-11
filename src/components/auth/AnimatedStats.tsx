"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Briefcase } from "lucide-react";

const stats = [
  { icon: TrendingUp, label: "Campaigns Managed", value: "12,400+", color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/20" },
  { icon: Users, label: "Creator Collaborations", value: "48K+", color: "text-rose-400", bg: "bg-rose-500/15 border-rose-500/20" },
  { icon: Briefcase, label: "Brand Partnerships", value: "3,200+", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/20" },
];

export default function AnimatedStats() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: "easeOut" }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border glass ${stat.bg}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg} border`}>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/45 leading-none mb-1">{stat.label}</p>
              <p className={`text-base font-bold leading-none ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
