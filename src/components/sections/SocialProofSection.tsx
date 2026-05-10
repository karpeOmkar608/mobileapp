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
];

const creators = [
  { name: "Priya S.", abbr: "PS", color: "from-violet-500 to-purple-600", followers: "1.2M" },
  { name: "Arjun M.", abbr: "AM", color: "from-rose-500 to-pink-600", followers: "800K" },
  { name: "Riya K.", abbr: "RK", color: "from-amber-500 to-orange-600", followers: "2.1M" },
  { name: "Dev P.", abbr: "DP", color: "from-sky-500 to-blue-600", followers: "500K" },
  { name: "Ananya S.", abbr: "AS", color: "from-emerald-500 to-teal-600", followers: "1.8M" },
  { name: "Kabir R.", abbr: "KR", color: "from-fuchsia-500 to-violet-600", followers: "950K" },
];

const marqueeItems = [...brands, ...brands];
const creatorMarquee = [...creators, ...creators];

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
          <p className="text-white/60 text-base">Thousands of creators and brands managing their collaborations on CreatorOS</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
        >
          {siteConfig.stats.map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center border border-white/8 hover:border-violet-500/30 transition-all">
              <p className="text-3xl font-bold text-gradient-violet mb-1">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Marquee — Brand logos */}
        <div className="relative mb-4 overflow-hidden">
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

        {/* Marquee — Creator avatars (reverse) */}
        <div className="relative overflow-hidden">
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
      </div>
    </section>
  );
}
