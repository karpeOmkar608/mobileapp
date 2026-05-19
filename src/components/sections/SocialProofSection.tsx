"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

const brands = [
  { name: "Nike India", abbr: "NI", color: "from-slate-600 to-slate-800" },
  { name: "Boat", abbr: "BO", color: "from-slate-700 to-slate-900" },
  { name: "Nykaa", abbr: "NK", color: "from-rose-600 to-pink-700" },
  { name: "Zomato", abbr: "ZM", color: "from-red-600 to-rose-700" },
  { name: "Myntra", abbr: "MN", color: "from-fuchsia-600 to-pink-700" },
  { name: "Mamaearth", abbr: "ME", color: "from-green-600 to-emerald-700" },
  { name: "Zepto", abbr: "ZP", color: "from-orange-600 to-amber-700" },
  { name: "CRED", abbr: "CR", color: "from-violet-700 to-purple-800" },
  { name: "Meesho", abbr: "MS", color: "from-pink-600 to-rose-700" },
  { name: "Swiggy", abbr: "SW", color: "from-orange-500 to-amber-600" },
];

const creators = [
  { name: "Priya S.", abbr: "PS", color: "from-violet-500 to-purple-600", followers: "1.2M" },
  { name: "Arjun M.", abbr: "AM", color: "from-rose-500 to-pink-600", followers: "800K" },
  { name: "Riya K.", abbr: "RK", color: "from-amber-500 to-orange-600", followers: "2.1M" },
  { name: "Dev P.", abbr: "DP", color: "from-sky-500 to-blue-600", followers: "500K" },
  { name: "Ananya S.", abbr: "AS", color: "from-emerald-500 to-teal-600", followers: "1.8M" },
  { name: "Kabir R.", abbr: "KR", color: "from-fuchsia-500 to-violet-600", followers: "950K" },
  { name: "Meera T.", abbr: "MT", color: "from-sky-400 to-cyan-600", followers: "620K" },
  { name: "Rohan V.", abbr: "RV", color: "from-lime-500 to-green-600", followers: "1.4M" },
];

const agencies = [
  { name: "InfluenceHub", abbr: "IH", color: "from-violet-600 to-indigo-700" },
  { name: "CreatorMgmt", abbr: "CM", color: "from-amber-600 to-orange-700" },
  { name: "TalentScale", abbr: "TS", color: "from-emerald-600 to-teal-700" },
  { name: "CollabStudio", abbr: "CS", color: "from-sky-600 to-blue-700" },
];

const liveStats = [
  { label: "Deals closed today", value: "127", color: "text-emerald-400" },
  { label: "Payments processed", value: "₹14.2L", color: "text-violet-400" },
  { label: "New signups (24h)", value: "83", color: "text-rose-400" },
  { label: "Active campaigns", value: "2,841", color: "text-amber-400" },
];

const marqueeItems = [...brands, ...brands];
const creatorMarquee = [...creators, ...creators];
const agencyMarquee = [...agencies, ...agencies];

export default function SocialProofSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="social-proof">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-violet-950/10 to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-white/30 uppercase tracking-widest mb-2">Trusted by the creator economy</p>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Thousands of creators, brands, and agencies managing their entire collaboration lifecycle on CreatorOS
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {siteConfig.stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center border border-white/8 hover:border-violet-500/30 transition-all group">
              <p className="text-3xl font-bold text-gradient-violet mb-1 group-hover:scale-105 transition-transform origin-bottom">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Live activity bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-white/8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/40">Platform live</span>
          </div>
          {liveStats.map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-white/8">
              <span className={`text-xs font-semibold ${s.color}`}>{s.value}</span>
              <span className="text-xs text-white/35 hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Marquee — Brands */}
        <div className="relative mb-3 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          <div className="flex gap-3 animate-marquee w-max">
            {marqueeItems.map((brand, i) => (
              <div key={i} className="glass rounded-xl px-5 py-3 flex items-center gap-3 border border-white/6 shrink-0">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${brand.color} flex items-center justify-center text-xs font-bold text-white`}>
                  {brand.abbr}
                </div>
                <span className="text-sm text-white/60 whitespace-nowrap">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee — Creators (reverse) */}
        <div className="relative mb-3 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          <div className="flex gap-3 w-max" style={{ animation: "marquee 25s linear infinite reverse" }}>
            {creatorMarquee.map((creator, i) => (
              <div key={i} className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-white/6 shrink-0">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${creator.color} flex items-center justify-center text-xs font-bold text-white`}>
                  {creator.abbr}
                </div>
                <div>
                  <p className="text-xs font-medium text-white/70 whitespace-nowrap">{creator.name}</p>
                  <p className="text-xs text-white/30">{creator.followers}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee — Agencies (forward, slower) */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          <div className="flex gap-3 w-max" style={{ animation: "marquee 20s linear infinite" }}>
            {agencyMarquee.map((agency, i) => (
              <div key={i} className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-amber-500/15 shrink-0">
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${agency.color} flex items-center justify-center text-xs font-bold text-white`}>
                  {agency.abbr}
                </div>
                <span className="text-xs font-medium text-white/60 whitespace-nowrap">{agency.name}</span>
                <span className="text-[10px] text-amber-400/60 bg-amber-500/10 px-2 py-0.5 rounded-full">Agency</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
