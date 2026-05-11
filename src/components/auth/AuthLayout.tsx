"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";
import GradientBackground from "./GradientBackground";
import AuthBranding from "./AuthBranding";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen flex bg-background overflow-hidden">
      <GradientBackground />

      {/* Left — Branding panel (desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden lg:flex lg:w-[45%] xl:w-[44%] relative flex-col border-r border-white/6 min-h-screen"
      >
        {/* Subtle inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-rose-900/5 pointer-events-none" />

        {/* Back to home — top-left inside left panel */}
        <div className="relative z-20 pt-6 pl-8 xl:pl-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/45 hover:text-white/80 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to home
          </Link>
        </div>

        <AuthBranding />
      </motion.div>

      {/* Right — Auth form panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 flex flex-col min-h-screen relative z-10"
      >
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-5 pt-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/45 hover:text-white/80 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">CreatorOS</span>
          </div>
        </div>

        {/* Centered form area */}
        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
