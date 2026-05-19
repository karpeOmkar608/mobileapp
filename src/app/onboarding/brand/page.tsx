"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Target, Users, ArrowRight, ArrowLeft,
  Loader2, CheckCircle2, Globe, DollarSign, BarChart2
} from "lucide-react";

const INDUSTRIES = [
  "Fashion", "Beauty & Skincare", "Food & Beverage", "Technology", "Sports & Fitness",
  "Travel & Tourism", "Health & Wellness", "Education", "Finance", "Entertainment",
  "Automotive", "Real Estate", "E-commerce", "Gaming", "B2B / SaaS"
];

const GOALS = [
  "Brand awareness", "Product launches", "Lead generation", "App installs",
  "Community building", "Sales & conversions", "Content creation", "Event promotion"
];

const STEPS = [
  { id: 1, label: "Company", icon: Building2 },
  { id: 2, label: "Campaign Goals", icon: Target },
  { id: 3, label: "Creator Preferences", icon: Users },
];

export default function BrandOnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  // Step 1
  const [company, setCompany] = useState({ name: "", website: "", industry: "", teamSize: "" });

  // Step 2
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [budget, setBudget] = useState({ min: "", max: "", currency: "INR" });

  // Step 3
  const [preferredNiches, setPreferredNiches] = useState<string[]>([]);
  const [creatorSize, setCreatorSize] = useState("");

  const toggleGoal = (g: string) => {
    setSelectedGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : prev.length < 4 ? [...prev, g] : prev);
  };

  const toggleNiche = (n: string) => {
    setPreferredNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : prev.length < 6 ? [...prev, n] : prev);
  };

  const handleComplete = () => {
    startTransition(async () => {
      const payload = {
        roleData: {
          companyName: company.name,
          website: company.website,
          industry: company.industry,
          budgetRange: `${budget.currency} ${budget.min} - ${budget.max}`,
          // Note: In Prisma schema we only have companyName, website, industry, budgetRange for BrandProfile. 
          // Other fields are optional or can be mapped if we extend schema later.
        }
      };
      
      const res = await fetch("/api/onboarding/complete", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const data = await res.json();
        await update({ onboardingCompleted: true });
        router.push(data.redirectUrl);
        router.refresh();
      }
    });
  };

  const canProceedStep1 = company.name.trim().length > 1 && company.industry;
  const canProceedStep2 = selectedGoals.length > 0;

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <motion.div
              animate={{ scale: step === s.id ? 1.05 : 1 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                step > s.id
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : step === s.id
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                  : "bg-white/5 text-white/25 border border-white/8"
              }`}
            >
              {step > s.id ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${step === s.id ? "bg-rose-500 text-white" : "bg-white/10 text-white/30"}`}>
                  {s.id}
                </span>
              )}
              {s.label}
            </motion.div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-px mx-1 transition-colors duration-300 ${step > s.id ? "bg-emerald-500/40" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1 — Company Details */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Tell us about your brand</h1>
                  <p className="text-sm text-white/40">Help creators understand who you are</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Brand / Company name *</label>
                  <input
                    value={company.name}
                    onChange={e => setCompany(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. Nykaa Beauty"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                      <input
                        value={company.website}
                        onChange={e => setCompany(p => ({ ...p, website: e.target.value }))}
                        placeholder="www.yourbrand.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-rose-500/50"
                      />
                    </div>
                  </div>
                  <div className="w-36">
                    <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Team size</label>
                    <select
                      value={company.teamSize}
                      onChange={e => setCompany(p => ({ ...p, teamSize: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500/50"
                    >
                      <option value="" className="bg-slate-900">Select</option>
                      {["1–10", "11–50", "51–200", "200+"].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Industry *</label>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map(ind => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => setCompany(p => ({ ...p, industry: ind }))}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                          company.industry === ind
                            ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                            : "bg-white/5 border-white/10 text-white/50 hover:border-white/25"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <motion.button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  whileHover={{ scale: canProceedStep1 ? 1.02 : 1 }}
                  whileTap={{ scale: canProceedStep1 ? 0.98 : 1 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold text-sm hover:from-rose-500 hover:to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-rose-900/30"
                >
                  Next: Campaign Goals <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Campaign Goals & Budget */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Campaign goals & budget</h1>
                  <p className="text-sm text-white/40">What do you want to achieve? Pick up to 4.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {GOALS.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                      selectedGoals.includes(g)
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                        : "bg-white/5 border-white/10 text-white/50 hover:border-white/25"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wide">Monthly campaign budget (INR)</p>
              <div className="flex gap-3 items-center">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">₹</span>
                  <input
                    value={budget.min}
                    onChange={e => setBudget(p => ({ ...p, min: e.target.value }))}
                    placeholder="Min (e.g. 50,000)"
                    className="w-full pl-6 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <span className="text-white/25 text-sm">to</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">₹</span>
                  <input
                    value={budget.max}
                    onChange={e => setBudget(p => ({ ...p, max: e.target.value }))}
                    placeholder="Max (e.g. 5,00,000)"
                    className="w-full pl-6 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <motion.button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  whileHover={{ scale: canProceedStep2 ? 1.02 : 1 }}
                  whileTap={{ scale: canProceedStep2 ? 0.98 : 1 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold text-sm hover:from-rose-500 hover:to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-rose-900/30"
                >
                  Next: Creator Preferences <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Creator Preferences */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Creator preferences</h1>
                  <p className="text-sm text-white/40">What kind of creators are you looking for?</p>
                </div>
              </div>

              <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Preferred niches (up to 6)</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Fashion", "Beauty", "Fitness", "Travel", "Food", "Tech", "Gaming", "Finance", "Lifestyle", "Comedy", "Music", "Education"].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => toggleNiche(n)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                      preferredNiches.includes(n)
                        ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                        : "bg-white/5 border-white/10 text-white/50 hover:border-white/25"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Preferred creator size</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { label: "Nano", sub: "1K – 10K", desc: "Hyper-targeted audiences" },
                  { label: "Micro", sub: "10K – 100K", desc: "High engagement rates" },
                  { label: "Macro", sub: "100K – 1M", desc: "Mass reach campaigns" },
                  { label: "Mega", sub: "1M+", desc: "Maximum brand visibility" },
                ].map(({ label, sub, desc }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCreatorSize(label)}
                    className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                      creatorSize === label
                        ? "bg-rose-500/10 border-rose-500/50"
                        : "bg-white/3 border-white/8 hover:border-white/20"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${creatorSize === label ? "text-rose-300" : "text-white/80"}`}>{label}</div>
                    <div className="text-xs text-white/40">{sub}</div>
                    <div className="text-[10px] text-white/25 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-2">
                <button onClick={() => setStep(2)} className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <motion.button
                  onClick={handleComplete}
                  disabled={isPending}
                  whileHover={{ scale: isPending ? 1 : 1.02 }}
                  whileTap={{ scale: isPending ? 1 : 0.98 }}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold text-sm hover:from-rose-500 hover:to-pink-600 disabled:opacity-50 transition-all shadow-lg shadow-rose-900/30"
                  style={{ boxShadow: "0 0 30px rgba(225,29,72,0.35), 0 8px 24px rgba(225,29,72,0.2)" }}
                >
                  {isPending ? <><Loader2 className="w-4 h-4 animate-spin" />Setting up dashboard…</> : <>Complete setup <CheckCircle2 className="w-4 h-4" /></>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
