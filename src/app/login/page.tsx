"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import SocialLoginButton from "@/components/auth/SocialLoginButton";

// Google SVG icon
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

interface FormErrors {
  email?: string;
  password?: string;
}

function validateLogin(email: string, password: string): FormErrors {
  const errors: FormErrors = {};
  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateLogin(email, password);
    setErrors(errs);
    setTouched({ email: true, password: true });
    if (Object.keys(errs).length === 0) {
      startTransition(() => {
        // Simulate — no backend
        setTimeout(() => router.push("/role-select"), 1200);
      });
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (touched[field] || field === "email") {
      setErrors(validateLogin(email, password));
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-7"
        >
          <h2 className="text-2xl font-bold text-white mb-1.5">Welcome back</h2>
          <p className="text-sm text-white/45">Sign in to your CreatorOS account</p>
        </motion.div>

        {/* Google */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="mb-6"
        >
          <SocialLoginButton
            id="login-google-btn"
            icon={<GoogleIcon />}
            label="Continue with Google"
          />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24, duration: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs text-white/25 font-medium">or continue with email</span>
          <div className="flex-1 h-px bg-white/8" />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="flex flex-col gap-4"
          noValidate
        >
          <AuthInput
            id="login-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            icon={<Mail className="w-4 h-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            error={touched.email ? errors.email : undefined}
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="login-password" className="text-sm font-medium text-white/70">Password</label>
              <Link
                href="#"
                id="login-forgot-password"
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>
            <AuthInput
              id="login-password"
              label=""
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              icon={<Lock className="w-4 h-4" />}
              showPasswordToggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              error={touched.password ? errors.password : undefined}
            />
          </div>

          <motion.button
            id="login-submit-btn"
            type="submit"
            disabled={isPending}
            whileHover={{ scale: isPending ? 1 : 1.015 }}
            whileTap={{ scale: isPending ? 1 : 0.985 }}
            transition={{ duration: 0.15 }}
            className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm hover:from-violet-500 hover:to-purple-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-xl shadow-violet-900/40 glow-violet-sm"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="text-center text-sm text-white/40 mt-6"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            id="login-signup-link"
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200"
          >
            Create one free
          </Link>
        </motion.p>
      </AuthCard>
    </AuthLayout>
  );
}
