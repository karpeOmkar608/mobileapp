"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music2, CheckCircle2, ArrowRight, ArrowLeft,
  Loader2, Camera, Tag, DollarSign, FileText, Video
} from "lucide-react";

const NICHES = [
  "Fashion", "Beauty", "Fitness", "Travel", "Food", "Tech", "Gaming",
  "Finance", "Education", "Lifestyle", "Comedy", "Music", "Art", "Parenting"
];

const STEPS = [
  { id: 1, label: "Platforms", icon: Camera },
  { id: 2, label: "Niche & Rates", icon: Tag },
  { id: 3, label: "Your Pitch", icon: FileText },
];

interface Platform { name: string; handle: string; followers: string; connected: boolean }

export default function CreatorOnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  // Step 1 — Platforms
  const [platforms, setPlatforms] = useState<Record<string, Platform>>({
    instagram: { name: "Instagram", handle: "", followers: "", connected: false },
    youtube: { name: "YouTube", handle: "", followers: "", connected: false },
    tiktok: { name: "TikTok", handle: "", followers: "", connected: false },
  });

  // Step 2 — Niche & Rates
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [rates, setRates] = useState({ story: "", reel: "", dedicated: "", collab: "" });

  // Step 3 — Bio
  const [bio, setBio] = useState("");

  const togglePlatform = (key: string) => {
    setPlatforms(prev => ({
      ...prev,
      [key]: { ...prev[key], connected: !prev[key].connected }
    }));
  };

  const toggleNiche = (n: string) => {
    setSelectedNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : prev.length < 5 ? [...prev, n] : prev);
  };

  const handleComplete = () => {
    startTransition(async () => {
      const payload = {
        roleData: {
          bio,
          niche: selectedNiches.join(", "),
          platforms: JSON.stringify(platforms),
          rates: JSON.stringify(rates),
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

  const canProceedStep1 = Object.values(platforms).some(p => p.connected);
  const canProceedStep2 = selectedNiches.length > 0;

  return (
    <div className="w-full">
      {/* Progress steps */}
      <div className="flex items-center justify-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <motion.div
              animate={{ scale: step === s.id ? 1.05 : 1 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                step > s.id
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : step === s.id
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                  : "bg-white/5 text-white/25 border border-white/8"
              }`}
            >
              {step > s.id ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${step === s.id ? "bg-violet-500 text-white" : "bg-white/10 text-white/30"}`}>
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
        {/* ── Step 1: Platforms ── */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Connect your platforms</h1>
                  <p className="text-sm text-white/40">Tell brands where to find you</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { key: "instagram", label: "Instagram", icon: <Camera className="w-5 h-5" />, color: "from-pink-500 to-rose-600", placeholder: "@yourhandle" },
                  { key: "youtube", label: "YouTube", icon: <Video className="w-5 h-5" />, color: "from-red-500 to-red-700", placeholder: "@yourchannel" },
                  { key: "tiktok", label: "TikTok", icon: <Music2 className="w-5 h-5" />, color: "from-slate-700 to-slate-900", placeholder: "@yourhandle" },
                ].map(({ key, label, icon, color, placeholder }) => {
                  const p = platforms[key];
                  return (
                    <div key={key} className={`rounded-xl border transition-all duration-200 overflow-hidden ${p.connected ? "border-violet-500/40 bg-violet-500/5" : "border-white/8 bg-white/3"}`}>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white flex-shrink-0`}>{icon}</div>
                        <span className="text-sm font-medium text-white flex-1">{label}</span>
                        <button
                          type="button"
                          onClick={() => togglePlatform(key)}
                          className={`relative w-10 h-5.5 rounded-full transition-all duration-200 ${p.connected ? "bg-violet-500" : "bg-white/15"}`}
                          style={{ height: "22px" }}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${p.connected ? "left-5" : "left-0.5"}`} />
                        </button>
                      </div>
                      <AnimatePresence>
                        {p.connected && (
                          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="px-4 pb-3 flex gap-2">
                              <input
                                value={p.handle}
                                onChange={e => setPlatforms(prev => ({ ...prev, [key]: { ...prev[key], handle: e.target.value } }))}
                                placeholder={placeholder}
                                className="flex-1 bg-white/6 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50"
                              />
                              <input
                                value={p.followers}
                                onChange={e => setPlatforms(prev => ({ ...prev, [key]: { ...prev[key], followers: e.target.value } }))}
                                placeholder="Followers (e.g. 50K)"
                                className="w-36 bg-white/6 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end mt-6">
                <motion.button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  whileHover={{ scale: canProceedStep1 ? 1.02 : 1 }}
                  whileTap={{ scale: canProceedStep1 ? 0.98 : 1 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm hover:from-violet-500 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-900/30"
                >
                  Next: Niche & Rates <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Niche & Rates ── */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Your niche & rates</h1>
                  <p className="text-sm text-white/40">Pick up to 5 niches. Set your base rates.</p>
                </div>
              </div>

              <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wide">Content niches ({selectedNiches.length}/5)</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {NICHES.map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => toggleNiche(n)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                      selectedNiches.includes(n)
                        ? "bg-violet-500/20 border-violet-500/60 text-violet-300"
                        : "bg-white/5 border-white/10 text-white/50 hover:border-white/25 hover:text-white/75"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wide">Base rates (INR)</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "story", label: "Story / post" },
                  { key: "reel", label: "Reel / short" },
                  { key: "dedicated", label: "Dedicated video" },
                  { key: "collab", label: "Long-term collab" },
                ].map(({ key, label }) => (
                  <div key={key} className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">₹</span>
                    <input
                      value={rates[key as keyof typeof rates]}
                      onChange={e => setRates(prev => ({ ...prev, [key]: e.target.value }))}
                      placeholder={label}
                      className="w-full pl-6 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-violet-500/50"
                    />
                  </div>
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
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm hover:from-violet-500 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-900/30"
                >
                  Next: Your Pitch <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Bio/Pitch ── */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <div className="glass rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Your creator pitch</h1>
                  <p className="text-sm text-white/40">Brands will read this when they discover you</p>
                </div>
              </div>

              <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wide">Bio / Pitch (2–3 sentences)</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={5}
                maxLength={400}
                placeholder="Hi, I'm a lifestyle and travel creator based in Mumbai with 500K+ engaged followers on Instagram. I specialise in authentic storytelling that drives real brand awareness and conversions for fashion, travel, and wellness brands."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 resize-none leading-relaxed"
              />
              <div className="flex justify-end mt-1">
                <span className="text-[10px] text-white/25">{bio.length}/400</span>
              </div>

              {/* Summary card */}
              <div className="mt-5 rounded-xl bg-white/3 border border-white/8 p-4">
                <p className="text-xs text-white/40 font-medium uppercase tracking-wide mb-3">Your profile summary</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-white/35">Platforms</span>
                    <p className="text-white mt-0.5">{Object.values(platforms).filter(p => p.connected).map(p => p.name).join(", ") || "—"}</p>
                  </div>
                  <div>
                    <span className="text-white/35">Niches</span>
                    <p className="text-white mt-0.5">{selectedNiches.slice(0, 3).join(", ") || "—"}{selectedNiches.length > 3 ? ` +${selectedNiches.length - 3}` : ""}</p>
                  </div>
                  <div>
                    <span className="text-white/35">Starting rate</span>
                    <p className="text-emerald-400 mt-0.5">{rates.story ? `₹${rates.story}` : "—"}</p>
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
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm hover:from-violet-500 hover:to-purple-600 disabled:opacity-50 transition-all shadow-lg shadow-violet-900/30"
                  style={{ boxShadow: "0 0 30px rgba(124,58,237,0.35), 0 8px 24px rgba(124,58,237,0.2)" }}
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
