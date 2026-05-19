"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import SocialLoginButton from "@/components/auth/SocialLoginButton";

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
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Full name is required.";
  else if (values.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!values.email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 8) errors.password = "Password must be at least 8 characters.";
  if (!values.confirmPassword) errors.confirmPassword = "Please confirm your password.";
  else if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords don't match.";
  return errors;
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const checks = [
    { label: "8+ chars", ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Number", ok: /[0-9]/.test(password) },
    { label: "Symbol", ok: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const barColor = score <= 1 ? "bg-rose-500" : score <= 2 ? "bg-amber-500" : score === 3 ? "bg-blue-400" : "bg-emerald-400";
  return (
    <div className="mt-1.5 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${i <= score ? barColor : "bg-white/10"}`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {checks.map((c) => (
          <span key={c.label} className={`text-[10px] flex items-center gap-1 transition-colors ${c.ok ? "text-emerald-400" : "text-white/25"}`}>
            <CheckCircle2 className="w-2.5 h-2.5" />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<FormValues>({ name: "", email: "", password: "", confirmPassword: "", terms: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ name: false, email: false, password: false, confirmPassword: false });
  const [termsError, setTermsError] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const set = (field: keyof Omit<FormValues, "terms">) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const blur = (field: keyof typeof touched) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateForm(values));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateForm(values);
    setErrors(errs);
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (!values.terms) { setTermsError(true); return; }
    setTermsError(false);
    if (Object.keys(errs).length === 0) {
      setApiError(null);
      startTransition(async () => {
        try {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
          });

          const data = await res.json();
          if (!res.ok) {
            setApiError(data.message || "Registration failed");
            return;
          }

          const signInRes = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });

          if (signInRes?.error) {
            setApiError("Failed to auto-login after registration");
          } else {
            router.push("/role-select");
            router.refresh();
          }
        } catch (error) {
          setApiError("An unexpected error occurred");
        }
      });
    }
  };

  return (
    <AuthLayout>
      <AuthCard>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-5"
        >
          <h2 className="text-2xl font-bold text-white mb-1">Create your account</h2>
          <p className="text-sm text-white/40">Join thousands of creators, brands &amp; agencies</p>
        </motion.div>

        {/* Google */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.4 }}
          className="mb-4"
        >
          <SocialLoginButton id="register-google-btn" icon={<GoogleIcon />} label="Sign up with Google" provider="google" />
        </motion.div>

        {apiError && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm text-center">
            {apiError}
          </div>
        )}

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-xs text-white/25 font-medium">or with email</span>
          <div className="flex-1 h-px bg-white/8" />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.45 }}
          className="flex flex-col gap-3"
          noValidate
        >
          <AuthInput
            id="register-name"
            label="Full name"
            type="text"
            placeholder="Alex Johnson"
            autoComplete="name"
            icon={<User className="w-4 h-4" />}
            value={values.name}
            onChange={set("name")}
            onBlur={blur("name")}
            error={touched.name ? errors.name : undefined}
          />

          <AuthInput
            id="register-email"
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            icon={<Mail className="w-4 h-4" />}
            value={values.email}
            onChange={set("email")}
            onBlur={blur("email")}
            error={touched.email ? errors.email : undefined}
          />

          <div>
            <AuthInput
              id="register-password"
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              icon={<Lock className="w-4 h-4" />}
              showPasswordToggle
              value={values.password}
              onChange={set("password")}
              onBlur={blur("password")}
              error={touched.password ? errors.password : undefined}
            />
            <PasswordStrength password={values.password} />
          </div>

          <AuthInput
            id="register-confirm-password"
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            icon={<Lock className="w-4 h-4" />}
            showPasswordToggle
            value={values.confirmPassword}
            onChange={set("confirmPassword")}
            onBlur={blur("confirmPassword")}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
          />

          {/* Terms */}
          <label htmlFor="register-terms" className="flex items-start gap-2.5 cursor-pointer group mt-0.5">
            <div className="relative mt-0.5 flex-shrink-0">
              <input
                id="register-terms"
                type="checkbox"
                checked={values.terms}
                onChange={(e) => { setValues((prev) => ({ ...prev, terms: e.target.checked })); setTermsError(false); }}
                className="peer sr-only"
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${values.terms ? "bg-violet-600 border-violet-500" : termsError ? "border-rose-500/60 bg-white/5" : "border-white/20 bg-white/5 group-hover:border-white/35"}`}>
                {values.terms && <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={2.5} />}
              </div>
            </div>
            <span className="text-xs text-white/40 leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors">Privacy Policy</a>
            </span>
          </label>
          {termsError && (
            <p className="text-xs text-rose-400 -mt-1.5 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-rose-400 inline-block" />
              You must accept the terms to continue.
            </p>
          )}

          <motion.button
            id="register-submit-btn"
            type="submit"
            disabled={isPending}
            whileHover={{ scale: isPending ? 1 : 1.015 }}
            whileTap={{ scale: isPending ? 1 : 0.985 }}
            transition={{ duration: 0.15 }}
            className="mt-1 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold text-sm hover:from-violet-500 hover:to-purple-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-xl shadow-violet-900/40"
          >
            {isPending ? (
              <><Loader2 className="w-4 h-4 animate-spin" />Creating account…</>
            ) : (
              <>Create account<ArrowRight className="w-4 h-4" /></>
            )}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center text-sm text-white/40 mt-5"
        >
          Already have an account?{" "}
          <Link href="/login" id="register-login-link" className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200">
            Sign in
          </Link>
        </motion.p>
      </AuthCard>
    </AuthLayout>
  );
}
