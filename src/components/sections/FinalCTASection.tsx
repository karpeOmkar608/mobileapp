"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Calendar } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden" id="waitlist">
      {/* Big gradient blob */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-purple-950/40 to-rose-950/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-rose-600/10 rounded-full blur-[100px]" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-violet-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/60">Waitlist now open</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Run your creator business{" "}
          <span className="text-gradient-main">like a company.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12"
        >
          Join thousands of creators, brands, and agencies already on the waitlist for CreatorOS.
          Be the first to get access when we launch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link
            href="/register"
            id="final-cta-waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-base hover:from-violet-500 hover:to-purple-600 transition-all duration-200 shadow-2xl shadow-violet-900/50 glow-violet hover:scale-[1.02]"
          >
            <Zap className="w-4 h-4 fill-white" />
            {siteConfig.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            id="final-cta-demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/12 text-white font-medium text-base hover:bg-white/8 transition-all duration-200"
          >
            <Calendar className="w-4 h-4 text-white/50" />
            {siteConfig.ctaDemo}
          </Link>
        </motion.div>

        {/* Social proof mini */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/30"
        >
          {["✓ No credit card required", "✓ Free 30-day trial", "✓ Cancel anytime"].map((text, i) => (
            <span key={i} className="flex items-center gap-1.5">{text}</span>
          ))}
        </motion.div>

        {/* Floating avatar row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <div className="flex -space-x-2">
            {[
              "from-violet-500 to-purple-600",
              "from-rose-500 to-pink-600",
              "from-amber-500 to-orange-600",
              "from-emerald-500 to-teal-600",
              "from-sky-500 to-blue-600",
            ].map((color, i) => (
              <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} border-2 border-background flex items-center justify-center text-xs font-bold text-white`}>
                {["P", "A", "R", "D", "K"][i]}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 ml-2">
            <span className="text-white/50 font-medium">2,400+ creators</span> already on the waitlist
          </p>
        </motion.div>
      </div>
    </section>
  );
}
