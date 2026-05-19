"use client";

import { motion } from "framer-motion";
import { AlertCircle, Grid3X3, MessageSquare, Calendar, Search, BarChart2, FileX } from "lucide-react";
import { problems } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  AlertCircle: <AlertCircle className="w-5 h-5" />,
  Grid: <Grid3X3 className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  BarChart2: <BarChart2 className="w-5 h-5" />,
  FileX: <FileX className="w-5 h-5" />,
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function ProblemCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
  return (
    <motion.div variants={item} className="glass rounded-2xl p-5 border border-white/6 hover:border-white/12 transition-all group">
      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
        {iconMap[icon]}
      </div>
      <h4 className="text-sm font-semibold text-white mb-1.5">{title}</h4>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="problem">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-rose-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            The Problem
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Running a creator business is{" "}
            <span className="text-gradient-rose">chaotic</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Creators and brands are stuck using tools that were never built for the creator economy.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Creator Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <span className="text-sm">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-white">For Creators</h3>
              <div className="flex-1 h-px bg-white/6" />
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {problems.creator.map((p, i) => (
                <ProblemCard key={i} {...p} />
              ))}
            </motion.div>
          </div>

          {/* Brand Side */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <span className="text-sm">🏢</span>
              </div>
              <h3 className="text-lg font-semibold text-white">For Brands</h3>
              <div className="flex-1 h-px bg-white/6" />
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {problems.brand.map((p, i) => (
                <ProblemCard key={i} {...p} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 glass px-5 sm:px-6 py-4 rounded-2xl border border-violet-500/20 max-w-full">
            <span className="text-2xl shrink-0">⚡</span>
            <p className="text-white/70">
              <span className="text-white font-semibold">CreatorOS</span> was built to solve all of this.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
