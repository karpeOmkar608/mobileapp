"use client";

import { ReactNode, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

interface SocialLoginButtonProps extends Omit<HTMLMotionProps<"button">, "onClick"> {
  icon: ReactNode;
  label: string;
  provider?: "google" | "github";
  callbackUrl?: string;
}

export default function SocialLoginButton({ icon, label, className, provider, callbackUrl = "/role-select", ...props }: SocialLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!provider) return;
    setIsLoading(true);
    await signIn(provider, { callbackUrl });
  };

  return (
    <motion.button
      whileHover={{ scale: isLoading ? 1 : 1.015, backgroundColor: isLoading ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.09)" }}
      whileTap={{ scale: isLoading ? 1 : 0.985 }}
      transition={{ duration: 0.15 }}
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl",
        "bg-white/5 border border-white/10 text-white/80 text-sm font-medium",
        "hover:border-white/20 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-violet-500/30",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-white/50" />
      ) : (
        icon
      )}
      {label}
    </motion.button>
  );
}
