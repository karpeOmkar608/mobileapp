import { ReactNode } from "react";
import GradientBackground from "@/components/auth/GradientBackground";
import { Zap } from "lucide-react";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center overflow-hidden">
      <GradientBackground />

      {/* Nav */}
      <nav className="relative z-10 w-full flex items-center justify-center pt-8 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg glow-violet-sm">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">CreatorOS</span>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}
