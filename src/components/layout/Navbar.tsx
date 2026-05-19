"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ChevronDown, Sparkles, Building2, Briefcase } from "lucide-react";
import { siteConfig } from "@/lib/config";

const joinOptions = [
  {
    label: "Join as Creator",
    href: "/register?role=creator",
    icon: Sparkles,
    color: "text-violet-300",
    bg: "hover:bg-violet-500/10",
    gradient: "from-violet-600 to-purple-700",
    desc: "Manage deals & payments",
  },
  {
    label: "Join as Brand",
    href: "/register?role=brand",
    icon: Building2,
    color: "text-rose-300",
    bg: "hover:bg-rose-500/10",
    gradient: "from-rose-500 to-pink-600",
    desc: "Discover creators & campaigns",
  },
  {
    label: "Join as Agency",
    href: "/register?role=agency",
    icon: Briefcase,
    color: "text-amber-300",
    bg: "hover:bg-amber-500/10",
    gradient: "from-amber-500 to-orange-600",
    desc: "Manage creators at scale",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!joinOpen) return;
    const close = () => setJoinOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [joinOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/8 shadow-xl shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center glow-violet-sm group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">{siteConfig.name}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-sm text-white/55 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login" className="text-sm text-white/55 hover:text-white transition-colors px-3 py-2">
              Sign In
            </Link>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                id="navbar-join-dropdown"
                onClick={() => setJoinOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white text-sm font-medium hover:from-violet-500 hover:to-purple-600 transition-all duration-200 shadow-lg shadow-violet-900/40"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                Get Started
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${joinOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {joinOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 glass-strong rounded-2xl border border-white/12 shadow-2xl shadow-black/60 overflow-hidden"
                  >
                    <div className="p-1.5">
                      {joinOptions.map((opt) => (
                        <Link
                          key={opt.href}
                          href={opt.href}
                          id={`navbar-${opt.label.toLowerCase().replace(/\s+/g, "-")}`}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${opt.bg} group`}
                          onClick={() => setJoinOpen(false)}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${opt.gradient} flex items-center justify-center shrink-0`}>
                            <opt.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${opt.color}`}>{opt.label}</p>
                            <p className="text-xs text-white/35">{opt.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-white/6 px-3 py-2">
                      <p className="text-xs text-white/30 text-center">30-day free trial · No credit card required</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0812] border-t border-white/10 shadow-2xl shadow-black/60"
          >
            <div className="px-4 py-4 space-y-1">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-white/65 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-white/8 mt-3 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl border border-white/10 text-white/70 text-sm font-medium hover:bg-white/5 transition-all"
                >
                  Sign In
                </Link>
                {joinOptions.map((opt) => (
                  <Link
                    key={opt.href}
                    href={opt.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-gradient-to-r ${opt.gradient} text-white text-sm font-medium`}
                  >
                    <opt.icon className="w-4 h-4" />
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
