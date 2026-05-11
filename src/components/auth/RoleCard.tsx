"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  id: string;
  icon: ReactNode;
  iconGradient: string;
  title: string;
  description: string;
  features: string[];
  selected: boolean;
  glowColor: string;
  borderColor: string;
  onClick: () => void;
}

export default function RoleCard({
  id,
  icon,
  iconGradient,
  title,
  description,
  features,
  selected,
  glowColor,
  borderColor,
  onClick,
}: RoleCardProps) {
  return (
    <motion.button
      id={id}
      onClick={onClick}
      whileHover={{ scale: 1.025, y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "relative w-full text-left rounded-2xl border p-6 cursor-pointer",
        "glass transition-all duration-300 focus:outline-none group",
        selected
          ? `border-opacity-80 ${borderColor} shadow-2xl`
          : "border-white/8 hover:border-white/20"
      )}
      style={{
        boxShadow: selected
          ? `0 0 30px ${glowColor}40, 0 0 60px ${glowColor}15, inset 0 1px 0 rgba(255,255,255,0.08)`
          : undefined,
      }}
      aria-pressed={selected}
    >
      {/* Selection ring */}
      {selected && (
        <motion.div
          layoutId="role-selection-ring"
          className={`absolute inset-0 rounded-2xl border-2 ${borderColor} pointer-events-none`}
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Check badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute top-4 right-4"
      >
        <div className={`w-6 h-6 rounded-full ${iconGradient} flex items-center justify-center`}>
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${iconGradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed mb-4">{description}</p>

      {/* Features */}
      <ul className="flex flex-col gap-2">
        {features.map((feat) => (
          <li key={feat} className="flex items-center gap-2 text-xs text-white/40">
            <div className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>
    </motion.button>
  );
}
