"use client";

import { motion } from "framer-motion";
import { Layers, Heart, Store, TrendingUp } from "lucide-react";
import { whyItems } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Store: <Store className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
};

export default function WhyCreatorOSSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="why">
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Why CreatorOS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Built different.{" "}
            <span className="text-gradient-main">For a different era.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            The creator economy deserves purpose-built tools, not retrofitted spreadsheets or generic project management software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {whyItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="glass rounded-2xl p-7 border border-white/8 hover:border-white/15 group transition-all duration-300 hover:shadow-xl hover:shadow-black/30"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {iconMap[item.icon]}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-5 border border-rose-500/15">
              <p className="text-xs font-semibold text-rose-400/70 uppercase tracking-widest mb-4">Before CreatorOS</p>
              {["WhatsApp for deal chats", "Excel for payment tracking", "Email for contracts", "Sticky notes for deadlines", "Zero visibility on analytics"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-2.5">
                  <span className="text-rose-500 text-sm">✗</span>
                  <span className="text-sm text-white/35">{item}</span>
                </div>
              ))}
            </div>
            <div className="glass rounded-2xl p-5 border border-violet-500/20">
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">With CreatorOS</p>
              {["Deal CRM — all chats in context", "Payment tracking dashboard", "Digital contracts & e-sign", "Smart deadline reminders", "Full creator analytics"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-2.5">
                  <span className="text-emerald-400 text-sm">✓</span>
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
