"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, CreditCard, FileText, Clock, Shield, Store,
  Search, Megaphone, LineChart, GitMerge, DollarSign,
  Users, Workflow, BarChart3, Building2
} from "lucide-react";
import { features } from "@/lib/mock-data";

type Tab = "creator" | "brand" | "agency";

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Megaphone: <Megaphone className="w-5 h-5" />,
  LineChart: <LineChart className="w-5 h-5" />,
  GitMerge: <GitMerge className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Workflow: <Workflow className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
};

const tabs: { id: Tab; label: string; emoji: string; desc: string; accent: string; border: string }[] = [
  {
    id: "creator",
    label: "Creators",
    emoji: "✨",
    desc: "Tools to run your creator business like a company",
    accent: "from-violet-600 to-purple-700",
    border: "border-violet-500/40",
  },
  {
    id: "brand",
    label: "Brands",
    emoji: "🏢",
    desc: "Discover, collaborate, and measure creator impact",
    accent: "from-rose-500 to-pink-600",
    border: "border-rose-500/40",
  },
  {
    id: "agency",
    label: "Agencies",
    emoji: "🚀",
    desc: "Manage your roster and campaigns at scale",
    accent: "from-amber-500 to-orange-600",
    border: "border-amber-500/40",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cardAnim = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const hoverBorder: Record<Tab, string> = {
  creator: "hover:border-violet-500/40 hover:shadow-violet-900/20",
  brand: "hover:border-rose-500/40 hover:shadow-rose-900/20",
  agency: "hover:border-amber-500/40 hover:shadow-amber-900/20",
};

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("creator");
  const activeConfig = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-violet-600/8 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Everything you need,{" "}
            <span className="text-gradient-violet">nothing you don&apos;t</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Purpose-built features for every role in the creator economy.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex glass rounded-2xl p-1.5 border border-white/8 gap-1 max-w-full overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.accent} text-white shadow-lg`
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab + "-desc"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-white/40 mb-8 text-sm"
          >
            {activeConfig.desc}
          </motion.p>
        </AnimatePresence>

        {/* Feature Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features[activeTab].map((feature, i) => (
              <motion.div
                key={i}
                variants={cardAnim}
                className={`glass rounded-2xl p-6 border border-white/6 ${hoverBorder[activeTab]} group transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/3 to-transparent rounded-2xl" />
                <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-5 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {iconMap[feature.icon]}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
