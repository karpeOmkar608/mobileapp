"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Building2, Briefcase } from "lucide-react";
import { pricing } from "@/lib/mock-data";

const planIcons = [Sparkles, Building2, Briefcase];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-violet-600/8 rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Simple pricing for{" "}
            <span className="text-gradient-violet">every stage</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 sm:gap-4 glass px-4 sm:px-5 py-3 rounded-2xl border border-white/10">
            <button
              onClick={() => setYearly(false)}
              className={`text-sm font-medium transition-colors ${!yearly ? "text-white" : "text-white/40"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly((v) => !v)}
              className={`relative w-11 h-6 rounded-full border transition-all duration-300 ${yearly ? "bg-violet-500/30 border-violet-500/50" : "bg-white/10 border-white/15"}`}
              aria-label="Toggle yearly billing"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md ${yearly ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setYearly(true)}
                className={`text-sm font-medium transition-colors ${yearly ? "text-white" : "text-white/40"}`}
              >
                Yearly
              </button>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                Save 20%
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricing.map((plan, i) => {
            const PlanIcon = planIcons[i];
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
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
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-600 to-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      <Zap className="w-3 h-3 fill-white" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${i === 0 ? "bg-violet-500/15 text-violet-400" : i === 1 ? "bg-rose-500/15 text-rose-400" : "bg-amber-500/15 text-amber-400"}`}>
                  <PlanIcon className="w-5 h-5" />
                </div>

                <span className={`self-start text-xs px-2.5 py-1 rounded-full border mb-3 ${plan.badgeColor}`}>
                  {plan.badge}
                </span>

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white/40 mb-6 leading-relaxed">{plan.description}</p>

                <div className="mb-7">
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      key={price}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl font-bold text-white"
                    >
                      {price}
                    </motion.span>
                    {plan.period && (
                      <span className="text-sm text-white/40">{plan.period}</span>
                    )}
                  </div>
                  {price !== "Custom" && (
                    <p className="text-xs text-white/30 mt-1">
                      {yearly ? "Billed annually · " : "Billed monthly · "}Cancel anytime
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${i === 0 ? "text-violet-400" : i === 1 ? "text-rose-400" : "text-amber-400"}`} />
                      <span className="text-sm text-white/60">{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.cta === "Contact Sales" ? "#contact" : i === 0 ? "/register?role=creator" : i === 1 ? "/register?role=brand" : "/register?role=agency"}
                  id={`pricing-cta-${plan.name.toLowerCase()}`}
                  className={`w-full py-3 rounded-xl text-center text-sm font-semibold transition-all duration-200 ${
                    plan.highlight
                      ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-500 hover:to-purple-600 shadow-lg shadow-violet-900/40 hover:scale-[1.02]"
                      : plan.cta === "Contact Sales"
                      ? "glass border border-white/15 text-white hover:bg-white/8"
                      : "glass border border-white/12 text-white hover:bg-white/8 hover:border-white/20"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 space-y-2"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/30">
            {["✓ 30-day free trial", "✓ No credit card required", "✓ Cancel anytime"].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
          <p className="text-xs text-white/20">Pricing in INR. GST applicable.</p>
        </motion.div>
      </div>
    </section>
  );
}
