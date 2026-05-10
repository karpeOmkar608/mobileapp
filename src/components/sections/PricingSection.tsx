"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { pricing } from "@/lib/mock-data";

export default function PricingSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/8 rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Simple pricing for{" "}
            <span className="text-gradient-violet">every stage</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Early access pricing — lock in your rate before public launch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricing.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-violet-600/20 to-purple-900/20 border border-violet-500/40 shadow-2xl shadow-violet-900/30 glow-violet-sm"
                  : "glass border border-white/8 hover:border-white/15"
              }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-600 to-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3 fill-white" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan badge */}
              <span className={`self-start text-xs px-2.5 py-1 rounded-full border mb-5 ${plan.badgeColor}`}>
                {plan.badge}
              </span>

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-white/40 mb-6 leading-relaxed">{plan.description}</p>

              {/* Price */}
              <div className="mb-7">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-white/40">{plan.period}</span>
                  )}
                </div>
                {plan.price !== "Custom" && (
                  <p className="text-xs text-white/30 mt-1">Billed monthly · Cancel anytime</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/60">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#waitlist"
                className={`w-full py-3 rounded-xl text-center text-sm font-semibold transition-all duration-200 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-500 hover:to-purple-600 shadow-lg shadow-violet-900/40"
                    : plan.price === "Custom"
                    ? "glass border border-white/15 text-white hover:bg-white/8"
                    : "glass border border-white/12 text-white hover:bg-white/8"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Join Waitlist"}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-white/25 mt-10"
        >
          All plans include a 30-day free trial. No credit card required. Pricing in INR.
        </motion.p>
      </div>
    </section>
  );
}
