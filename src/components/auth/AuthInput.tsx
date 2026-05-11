"use client";

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  showPasswordToggle?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon, error, showPasswordToggle, type, className, id, ...props }, ref) => {
    const [showPwd, setShowPwd] = useState(false);

    const inputType = showPasswordToggle ? (showPwd ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-white/70">
          {label}
        </label>
        <div className="relative group">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-violet-400 transition-colors duration-200">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            type={inputType}
            className={cn(
              "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25",
              "focus:outline-none focus:border-violet-500/60 focus:bg-white/8 focus:ring-2 focus:ring-violet-500/15",
              "transition-all duration-200",
              "hover:border-white/20 hover:bg-white/7",
              icon && "pl-10",
              showPasswordToggle && "pr-11",
              error && "border-rose-500/60 focus:border-rose-500/60 focus:ring-rose-500/15",
              className
            )}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              tabIndex={-1}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors duration-200"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs text-rose-400 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-rose-400 inline-block" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
export default AuthInput;
