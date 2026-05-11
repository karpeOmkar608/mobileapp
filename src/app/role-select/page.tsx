"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Briefcase, Users, ArrowRight, Loader2, Zap } from "lucide-react";
import GradientBackground from "@/components/auth/GradientBackground";
import RoleCard from "@/components/auth/RoleCard";

type Role = "creator" | "brand" | "agency" | null;

const roles = [
  {
    id: "role-creator" as const,
    value: "creator" as Role,
    icon: <Camera className="w-6 h-6 text-white" />,
    iconGradient: "bg-gradient-to-br from-violet-500 to-purple-700",
    title: "Creator",
    description: "Manage brand deals, payments, campaigns, and grow your creator business effortlessly.",
    features: ["Deal & contract management", "Invoice & payment tracking", "Campaign performance analytics", "Brand collab CRM"],
    glowColor: "#7c3aed",
    borderColor: "border-violet-500/60",
  },
  {
    id: "role-brand" as const,
    value: "brand" as Role,
    icon: <Briefcase className="w-6 h-6 text-white" />,
    iconGradient: "bg-gradient-to-br from-rose-500 to-pink-700",
    title: "Brand",
    description: "Discover creators, launch campaigns, and manage creator collaborations at scale.",
    features: ["Creator discovery engine", "Campaign launch tools", "ROI & analytics dashboard", "Multi-creator management"],
    glowColor: "#e11d48",
    borderColor: "border-rose-500/60",
  },
  {
    id: "role-agency" as const,
    value: "agency" as Role,
    icon: <Users className="w-6 h-6 text-white" />,
    iconGradient: "bg-gradient-to-br from-emerald-500 to-teal-700",
    title: "Agency",
    description: "Manage creators, campaigns, and client workflows at scale with powerful agency tools.",
    features: ["Multi-creator roster management", "Client & brand portals", "Bulk campaign operations", "White-label reporting"],
    glowColor: "#059669",
    borderColor: "border-emerald-500/60",
  },
];

export default function RoleSelectPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isPending, startTransition] = useTransition();

  const handleContinue = () => {
    if (!selectedRole) return;
    startTransition(() => {
      // Simulate — no backend
      setTimeout(() => router.push("/"), 1000);
    });
  };

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-start overflow-hidden">
      <GradientBackground />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full flex items-center justify-center pt-8 pb-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg glow-violet-sm">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">CreatorOS</span>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-center mb-10"
        >
          {/* Step indicator */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-violet-500/25">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <div className="w-4 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
            </div>
            <span className="text-xs text-violet-300 font-medium">Step 3 of 3 — Choose your role</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            How would you like to{" "}
            <span className="text-gradient-main">join CreatorOS</span>?
          </h1>
          <p className="text-base text-white/45 max-w-lg mx-auto leading-relaxed">
            Select the role that best describes you. You can always change this later in settings.
          </p>
        </motion.div>

        {/* Role cards */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8"
        >
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <RoleCard
                id={role.id}
                icon={role.icon}
                iconGradient={role.iconGradient}
                title={role.title}
                description={role.description}
                features={role.features}
                selected={selectedRole === role.value}
                glowColor={role.glowColor}
                borderColor={role.borderColor}
                onClick={() => setSelectedRole(role.value)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Continue button */}
        <AnimatePresence>
          <motion.div
            key="continue-section"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.button
              id="role-select-continue-btn"
              onClick={handleContinue}
              disabled={!selectedRole || isPending}
              whileHover={{ scale: selectedRole && !isPending ? 1.02 : 1 }}
              whileTap={{ scale: selectedRole && !isPending ? 0.98 : 1 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm hover:from-violet-500 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-xl shadow-violet-900/40"
              style={{
                boxShadow: selectedRole && !isPending ? "0 0 30px rgba(124,58,237,0.4), 0 8px 32px rgba(124,58,237,0.25)" : undefined,
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Setting up your workspace…
                </>
              ) : (
                <>
                  {selectedRole ? `Continue as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}` : "Select a role to continue"}
                  {selectedRole && <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {!selectedRole && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-xs text-white/25"
                >
                  Click on a card above to select your role
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
