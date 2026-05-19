"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BarChart3, Building2, ArrowRight, ArrowLeft,
  Loader2, CheckCircle2, Globe, UserCheck
} from "lucide-react";

const FOCUS_AREAS = [
  "Fashion & Lifestyle", "Beauty & Wellness", "Food & Beverage", "Technology",
  "Sports & Fitness", "Gaming & Entertainment", "Finance & Fintech", "Travel",
  "Education & EdTech", "Health & Pharma", "E-commerce & D2C", "B2B"
];

const STEPS = [
  { id: 1, label: "Agency Details", icon: Building2 },
  { id: 2, label: "Roster & Scale", icon: Users },
  { id: 3, label: "Client Brands", icon: UserCheck },
];

export default function AgencyOnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  // Step 1
  const [agency, setAgency] = useState({ name: "", website: "", teamSize: "", founded: "" });

  // Step 2
  const [rosterSize, setRosterSize] = useState("");
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);

  // Step 3
  const [clientBrands, setClientBrands] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");

  const toggleFocus = (f: string) => {
    setSelectedFocus(prev => prev.includes(f) ? prev.filter(x => x !== f) : prev.length < 5 ? [...prev, f] : prev);
  };

  const handleComplete = () => {
    startTransition(async () => {
      const payload = {
        roleData: {
          agencyName: agency.name,
          website: agency.website,
          teamSize: agency.teamSize,
          specialties: JSON.stringify(selectedFocus),
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

  const canProceedStep1 = agency.name.trim().length > 1;
  const canProceedStep2 = rosterSize !== "" && selectedFocus.length > 0;

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
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-white/5 text-white/25 border border-white/8"
              }`}
            >
              {step > s.id ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${step === s.id ? "bg-emerald-500 text-white" : "bg-white/10 text-white/30"}`}>
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
        {/* Step 1 — Agency Details */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Agency details</h1>
                  <p className="text-sm text-white/40">Tell us about your agency</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Agency name *</label>
                  <input
                    value={agency.name}
                    onChange={e => setAgency(p => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. InfluenceHub Agency"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                      <input
                        value={agency.website}
                        onChange={e => setAgency(p => ({ ...p, website: e.target.value }))}
                        placeholder="www.youragency.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>
                  <div className="w-36">
                    <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Team size</label>
                    <select
                      value={agency.teamSize}
                      onChange={e => setAgency(p => ({ ...p, teamSize: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="" className="bg-slate-900">Select</option>
                      {["1–5", "6–15", "16–50", "50+"].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Year founded</label>
                  <input
                    value={agency.founded}
                    onChange={e => setAgency(p => ({ ...p, founded: e.target.value }))}
                    placeholder="e.g. 2020"
                    maxLength={4}
                    className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <motion.button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  whileHover={{ scale: canProceedStep1 ? 1.02 : 1 }}
                  whileTap={{ scale: canProceedStep1 ? 0.98 : 1 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold text-sm hover:from-emerald-500 hover:to-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/30"
                >
                  Next: Roster & Scale <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Roster & Scale */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Roster & focus areas</h1>
                  <p className="text-sm text-white/40">Tell us about the creators you manage</p>
                </div>
              </div>

              <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Creator roster size *</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {[
                  { label: "1–10", sub: "Boutique" },
                  { label: "11–50", sub: "Growing" },
                  { label: "51–200", sub: "Established" },
                  { label: "200+", sub: "Enterprise" },
                ].map(({ label, sub }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setRosterSize(label)}
                    className={`text-center p-3 rounded-xl border transition-all duration-200 ${
                      rosterSize === label
                        ? "bg-emerald-500/15 border-emerald-500/50"
                        : "bg-white/3 border-white/8 hover:border-white/20"
                    }`}
                  >
                    <div className={`text-sm font-bold ${rosterSize === label ? "text-emerald-300" : "text-white/70"}`}>{label}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{sub}</div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Primary focus areas (up to 5) *</p>
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFocus(f)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                      selectedFocus.includes(f)
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                        : "bg-white/5 border-white/10 text-white/50 hover:border-white/25"
                    }`}
                  >
                    {f}
                  </button>
                ))}
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
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold text-sm hover:from-emerald-500 hover:to-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/30"
                >
                  Next: Client Brands <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3 — Client Brands */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Your client brands</h1>
                  <p className="text-sm text-white/40">Optional — helps us personalise your dashboard</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Notable client brands (comma-separated)</label>
                  <textarea
                    value={clientBrands}
                    onChange={e => setClientBrands(e.target.value)}
                    rows={3}
                    placeholder="e.g. Nike India, Nykaa, Boat Lifestyle, Zomato…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 font-medium uppercase tracking-wide">Approx. monthly revenue managed (INR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">₹</span>
                    <input
                      value={monthlyRevenue}
                      onChange={e => setMonthlyRevenue(e.target.value)}
                      placeholder="e.g. 25,00,000"
                      className="w-full pl-6 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl bg-white/3 border border-white/8 p-4 mt-2">
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wide mb-3">Agency summary</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-white/35">Agency</span><p className="text-white mt-0.5">{agency.name || "—"}</p></div>
                    <div><span className="text-white/35">Roster</span><p className="text-emerald-400 mt-0.5">{rosterSize || "—"} creators</p></div>
                    <div><span className="text-white/35">Focus</span><p className="text-white mt-0.5">{selectedFocus.slice(0, 2).join(", ") || "—"}{selectedFocus.length > 2 ? ` +${selectedFocus.length - 2}` : ""}</p></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(2)} className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <motion.button
                  onClick={handleComplete}
                  disabled={isPending}
                  whileHover={{ scale: isPending ? 1 : 1.02 }}
                  whileTap={{ scale: isPending ? 1 : 0.98 }}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold text-sm hover:from-emerald-500 hover:to-teal-600 disabled:opacity-50 transition-all shadow-lg shadow-emerald-900/30"
                  style={{ boxShadow: "0 0 30px rgba(5,150,105,0.35), 0 8px 24px rgba(5,150,105,0.2)" }}
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
