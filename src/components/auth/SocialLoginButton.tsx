"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SocialLoginButtonProps extends HTMLMotionProps<"button"> {
  icon: ReactNode;
  label: string;
}

export default function SocialLoginButton({ icon, label, className, ...props }: SocialLoginButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.015, backgroundColor: "rgba(255,255,255,0.09)" }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.15 }}
      type="button"
      className={cn(
        "w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl",
        "bg-white/5 border border-white/10 text-white/80 text-sm font-medium",
        "hover:border-white/20 transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-violet-500/30",
        className
      )}
      {...props}
    >
      {icon}
      {label}
    </motion.button>
  );
}
