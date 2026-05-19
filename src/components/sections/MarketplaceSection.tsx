"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, CheckCircle2, Users, TrendingUp, ArrowRight, Zap, SlidersHorizontal } from "lucide-react";
import { marketplaceCreators, marketplaceCampaigns } from "@/lib/mock-data";

type FilterTab = "All" | "Lifestyle" | "Tech" | "Fitness" | "Beauty" | "Travel";
const filterTabs: FilterTab[] = ["All", "Lifestyle", "Tech", "Fitness", "Beauty", "Travel"];

const platformColors: Record<string, string> = {
  Instagram: "bg-rose-500/20 text-rose-300",
  YouTube: "bg-red-500/20 text-red-300",
  Twitter: "bg-sky-500/20 text-sky-300",
  TikTok: "bg-fuchsia-500/20 text-fuchsia-300",
};

export default function MarketplaceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [activeView, setActiveView] = useState<"creators" | "campaigns">("creators");

  const filteredCreators = activeFilter === "All"
    ? marketplaceCreators
    : marketplaceCreators.filter((c) => c.tags.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()) || c.niche.toLowerCase() === activeFilter.toLowerCase()));

  return (
    <section className="py-24 relative overflow-hidden" id="marketplace">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-rose-600/8 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold text-rose-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            Creator Marketplace
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Discover the{" "}
            <span className="text-gradient-rose">Creator Marketplace</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            8,000+ creators and 1,200+ brands collaborate directly. Find your perfect match and start working together — in minutes.
          </p>
        </motion.div>

        {/* Search + View Toggle Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-3 mb-6"
        >
          {/* Search row */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search creators by niche, location, or platform..."
                className="w-full glass rounded-xl border border-white/10 py-3 pl-10 pr-4 text-sm text-white/70 placeholder-white/25 focus:outline-none focus:border-violet-500/40 transition-colors"
                readOnly
              />
            </div>
            <button className="flex items-center gap-2 glass px-4 py-3 rounded-xl border border-white/10 text-sm text-white/50 hover:text-white hover:border-white/20 transition-all shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
          {/* View toggle on separate row for mobile */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-white/30">
              {activeView === "creators" ? "6 of 8,000+ creators" : "3 featured campaigns"}
            </p>
            <div className="flex glass rounded-xl border border-white/10 p-1 shrink-0">
              <button
                onClick={() => setActiveView("creators")}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeView === "creators" ? "bg-violet-500/20 text-violet-300" : "text-white/40 hover:text-white/60"}`}
              >
                Creators
              </button>
              <button
                onClick={() => setActiveView("campaigns")}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${activeView === "campaigns" ? "bg-rose-500/20 text-rose-300" : "text-white/40 hover:text-white/60"}`}
              >
                Campaigns
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <div className="flex gap-2 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 whitespace-nowrap ${
                  activeFilter === tab
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-300"
                    : "glass border-white/8 text-white/40 hover:text-white/70 hover:border-white/15"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeView === "creators" ? (
            <motion.div
              key="creators"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
            >
              {filteredCreators.map((creator, i) => (
                <motion.div
                  key={creator.handle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass rounded-2xl border border-white/8 p-5 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-900/15 group transition-all duration-300 cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl" />
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${creator.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                      {creator.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-white truncate">{creator.name}</p>
                        {creator.verified && <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-white/40">{creator.handle}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium text-white/70">{creator.rating}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <p className="text-sm font-bold text-white">{creator.followers}</p>
                      <p className="text-[10px] text-white/35">Followers</p>
                    </div>
                    <div className="text-center border-x border-white/6">
                      <p className="text-sm font-bold text-emerald-400">{creator.engagement}</p>
                      <p className="text-[10px] text-white/35">Engagement</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-white">{creator.deals}</p>
                      <p className="text-[10px] text-white/35">Deals Done</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {creator.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full glass border border-white/8 text-white/45">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Platforms */}
                  <div className="flex gap-1.5 mb-4">
                    {creator.platforms.map((p) => (
                      <span key={p} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${platformColors[p] || "bg-white/10 text-white/40"}`}>
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/6">
                    <div>
                      <p className="text-[10px] text-white/30">Starting from</p>
                      <p className="text-sm font-semibold text-violet-300">{creator.startingPrice}</p>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-white/50 group-hover:text-violet-300 transition-colors">
                      View Profile <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
            >
              {marketplaceCampaigns.map((campaign, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl border border-white/8 p-5 hover:border-rose-500/30 group transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${campaign.brandColor} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                      {campaign.brandAbbr}
                    </div>
                    <div>
                      <p className="text-xs text-white/40">{campaign.brand}</p>
                      <p className="text-sm font-semibold text-white">{campaign.title}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-lg bg-white/4 p-2.5">
                      <p className="text-[10px] text-white/35 mb-0.5">Budget Range</p>
                      <p className="text-xs font-semibold text-emerald-400">{campaign.budget}</p>
                    </div>
                    <div className="rounded-lg bg-white/4 p-2.5">
                      <p className="text-[10px] text-white/35 mb-0.5">Deadline</p>
                      <p className="text-xs font-semibold text-white">{campaign.deadline}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {campaign.niche.map((n) => (
                      <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
                        {n}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/6">
                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <Users className="w-3 h-3" />
                      {campaign.applicants} applied
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">
                      {campaign.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/register?role=creator"
              id="marketplace-cta-creator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-medium text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-xl shadow-violet-900/30"
            >
              <Zap className="w-4 h-4 fill-white" />
              Browse 8,000+ Creators
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/register?role=brand"
              id="marketplace-cta-brand"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/12 text-white font-medium text-sm hover:bg-white/8 transition-all"
            >
              <TrendingUp className="w-4 h-4 text-rose-400" />
              Post a Campaign
            </a>
          </div>
          <p className="text-xs text-white/25 mt-3">Free to browse · Apply directly · No middlemen</p>
        </motion.div>
      </div>
    </section>
  );
}
