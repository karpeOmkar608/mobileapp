import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  TrendingUp, DollarSign, Briefcase, Clock, ArrowUpRight,
  CheckCircle2, AlertCircle, Zap, Bell, Settings, BarChart3,
  Plus, FileText, CreditCard
} from "lucide-react";

const CAMPAIGNS = [
  { brand: "Nike India", type: "Fitness Collab", value: "₹2,40,000", status: "Active", progress: 68, due: "Jun 5", brandColor: "from-slate-600 to-slate-800", statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20" },
  { brand: "Boat Lifestyle", type: "Tech Review", value: "₹85,000", status: "In Review", progress: 90, due: "May 28", brandColor: "from-sky-700 to-sky-900", statusColor: "text-amber-400 bg-amber-400/10 border-amber-500/20" },
  { brand: "Nykaa Beauty", type: "Beauty Tutorial", value: "₹1,20,000", status: "Active", progress: 45, due: "Jun 12", brandColor: "from-rose-600 to-pink-800", statusColor: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20" },
  { brand: "Zomato", type: "Food Review", value: "₹60,000", status: "Pending", progress: 15, due: "Jul 1", brandColor: "from-red-600 to-red-800", statusColor: "text-violet-400 bg-violet-400/10 border-violet-500/20" },
];

const ACTIVITY = [
  { icon: "💰", text: "Payment received from Boat Lifestyle", time: "2h ago", color: "text-emerald-400" },
  { icon: "📄", text: "Contract signed with Nike India", time: "Yesterday", color: "text-violet-400" },
  { icon: "📊", text: "Nykaa campaign performance report ready", time: "2 days ago", color: "text-amber-400" },
  { icon: "🤝", text: "New collab request from Mamaearth", time: "3 days ago", color: "text-sky-400" },
];

export default async function CreatorDashboard() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) redirect("/login");

  const profile = await prisma.creatorProfile.findUnique({
    where: { userId: session.user.id }
  });

  const initials = session.user.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  let niches = profile?.niche ? profile.niche.split(", ") : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/6 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">CreatorOS</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-[10px] font-medium uppercase tracking-wide">Creator</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <Bell className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {initials}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">
              Good evening, {session.user.name?.split(" ")[0] || "Creator"} 👋
            </h1>
            <p className="text-white/45 text-sm">
              {profile?.bio ? profile.bio : "Here's your creator business at a glance"}
            </p>
            {niches.length > 0 && (
              <div className="flex gap-2 mt-3">
                {niches.map((n: string) => (
                  <span key={n} className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/60 border border-white/10">{n}</span>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/6 hover:bg-white/10 border border-white/8 text-white/70 hover:text-white text-sm font-medium transition-all">
              <FileText className="w-4 h-4" /> New Invoice
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white text-sm font-semibold transition-all shadow-lg shadow-violet-900/30">
              <Plus className="w-4 h-4" /> New Deal
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Deals", value: "4", change: "+2 this month", icon: Briefcase, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
            { label: "Pending Payments", value: "₹3,45,000", change: "3 invoices", icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { label: "Earned This Month", value: "₹85,000", change: "+40% vs last", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { label: "Completion Rate", value: "96%", change: "Top 5% creator", icon: CheckCircle2, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
          ].map((stat) => (
            <div key={stat.label} className={`glass rounded-2xl p-5 border ${stat.border} hover:border-opacity-50 transition-all duration-200 group`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/40 font-medium">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
              <p className={`text-xs ${stat.color}`}>{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaigns Table */}
          <div className="lg:col-span-2 glass rounded-2xl border border-white/8 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Active Campaigns</h2>
              <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                View all <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-white/4">
              {CAMPAIGNS.map((c) => (
                <div key={c.brand} className="px-6 py-4 hover:bg-white/3 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.brandColor} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">{c.brand.slice(0, 2)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white truncate">{c.brand}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${c.statusColor}`}>{c.status}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-white/35">{c.type}</span>
                        <span className="text-xs text-white/35">•</span>
                        <span className="text-xs text-white/35">Due {c.due}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/8 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-white/30 w-8 text-right">{c.progress}%</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-white">{c.value}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">deal value</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Quick Actions */}
            <div className="glass rounded-2xl border border-white/8 p-5">
              <h2 className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: CreditCard, label: "Create Invoice", color: "text-violet-400", bg: "bg-violet-500/10" },
                  { icon: Briefcase, label: "Add New Deal", color: "text-rose-400", bg: "bg-rose-500/10" },
                  { icon: BarChart3, label: "View Analytics", color: "text-amber-400", bg: "bg-amber-500/10" },
                  { icon: FileText, label: "Upload Contract", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                ].map((a) => (
                  <button key={a.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/6 transition-all group">
                    <div className={`w-7 h-7 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}>
                      <a.icon className={`w-3.5 h-3.5 ${a.color}`} />
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">{a.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-2xl border border-white/8 p-5 flex-1">
              <h2 className="text-sm font-semibold text-white mb-3">Recent Activity</h2>
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-base leading-none mt-0.5">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 leading-relaxed">{a.text}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sign Out */}
            <form action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}>
              <button type="submit" className="w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/8 border border-white/8 text-white/50 hover:text-white/70 text-sm transition-all">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
