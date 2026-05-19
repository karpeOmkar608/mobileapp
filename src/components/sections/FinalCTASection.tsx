"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Building2, Briefcase, CheckCircle2 } from "lucide-react";

const ctaCards = [
  {
    icon: Sparkles,
    label: "Join as Creator",
    desc: "Manage deals, payments & brand partnerships",
    href: "/register?role=creator",
    gradient: "from-violet-600 to-purple-700",
    shadow: "shadow-violet-900/40",
    border: "border-violet-500/30",
    glow: "hover:shadow-violet-600/20",
    id: "final-cta-creator",
  },
  {
    icon: Building2,
    label: "Join as Brand",
    desc: "Discover creators & launch campaigns",
    href: "/register?role=brand",
    gradient: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-900/40",
    border: "border-rose-500/30",
    glow: "hover:shadow-rose-600/20",
    id: "final-cta-brand",
  },
  {
    icon: Briefcase,
    label: "Join as Agency",
    desc: "Manage your creator roster at scale",
    href: "/register?role=agency",
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-900/40",
    border: "border-amber-500/30",
    glow: "hover:shadow-amber-600/20",
    id: "final-cta-agency",
  },
];

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-sky-500 to-blue-600",
  "from-fuchsia-500 to-violet-600",
];
const avatarInitials = ["P", "A", "R", "D", "K", "M"];

export default function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-purple-950/40 to-rose-950/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-rose-600/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] bg-amber-600/8 rounded-full blur-[80px]" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-violet-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/60">Joined by 8,000+ creators, 1,200+ brands & 200+ agencies</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
        >
          One ecosystem.{" "}
          <span className="text-gradient-main">Infinite possibilities.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12"
        >
          Creators grow their business. Brands scale campaigns. Agencies manage operations.
          All in one place — CreatorOS.
        </motion.p>

        {/* 3 CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14 max-w-3xl mx-auto w-full"
        >
          {ctaCards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              id={card.id}
              className={`group relative flex flex-col items-center gap-3 p-6 rounded-2xl glass border ${card.border} hover:shadow-2xl ${card.glow} hover:scale-[1.02] transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white/5 to-transparent" />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg ${card.shadow}`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-base font-semibold text-white">{card.label}</p>
              <p className="text-xs text-white/45 text-center">{card.desc}</p>
              <div className={`inline-flex items-center gap-1.5 mt-1 text-xs font-medium bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                Get started free
                <ArrowRight className="w-3 h-3" style={{ color: i === 0 ? "#a78bfa" : i === 1 ? "#fb7185" : "#fbbf24" }} />
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/30 mb-10"
        >
          {[
            { icon: CheckCircle2, text: "30-day free trial" },
            { icon: CheckCircle2, text: "No credit card required" },
            { icon: CheckCircle2, text: "Cancel anytime" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <item.icon className="w-3.5 h-3.5 text-emerald-500" />
              {item.text}
            </span>
          ))}
        </motion.div>

        {/* Avatar social proof */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex -space-x-2">
            {avatarColors.map((color, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} border-2 border-background flex items-center justify-center text-xs font-bold text-white`}
              >
                {avatarInitials[i]}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 ml-1">
            <span className="text-white/55 font-medium">9,400+ users</span> already on CreatorOS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
