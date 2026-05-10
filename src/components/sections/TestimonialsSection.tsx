"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  creator: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  brand: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  agency: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="testimonials">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-rose-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Loved by the{" "}
            <span className="text-gradient-rose">creator economy</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Hear from creators, brands, and agencies who&apos;ve made CreatorOS their home base.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 border border-white/8 hover:border-white/14 transition-all duration-300 flex flex-col group"
            >
              {/* Quote icon */}
              <Quote className="w-7 h-7 text-violet-400/30 mb-4 group-hover:text-violet-400/50 transition-colors" />

              {/* Quote text */}
              <p className="text-sm text-white/65 leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/6">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                  <p className="text-xs text-white/35 truncate">{t.role}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border shrink-0 ${typeColors[t.type]}`}>
                  {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust signal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2">
            {["★", "★", "★", "★", "★"].map((s, i) => (
              <span key={i} className="text-amber-400 text-lg">{s}</span>
            ))}
            <span className="text-white/30 text-sm ml-2">4.9/5 from early access users</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
