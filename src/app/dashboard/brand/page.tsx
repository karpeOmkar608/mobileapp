import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  TrendingUp, DollarSign, Users, Megaphone, ArrowUpRight,
  CheckCircle2, Zap, Bell, Settings, BarChart3, Plus, Search, Star
} from "lucide-react";

const CREATORS = [
  { name: "Priya Sharma", handle: "@priyacreates", niche: "Lifestyle", followers: "1.2M", engagement: "4.8%", status: "Active", avatar: "PS", color: "from-violet-500 to-purple-600", rating: 4.9, deals: 3 },
  { name: "Arjun Mehta", handle: "@arjunfitness", niche: "Fitness", followers: "800K", engagement: "6.2%", status: "In Review", avatar: "AM", color: "from-rose-500 to-pink-600", rating: 4.8, deals: 1 },
  { name: "Riya Kapoor", handle: "@riyatech", niche: "Tech", followers: "2.1M", engagement: "3.9%", status: "Completed", avatar: "RK", color: "from-amber-500 to-orange-600", rating: 5.0, deals: 2 },
  { name: "Dev Patel", handle: "@devstyle", niche: "Fashion", followers: "520K", engagement: "5.1%", status: "Active", avatar: "DP", color: "from-sky-500 to-blue-600", rating: 4.7, deals: 1 },
];

const CAMPAIGNS = [
  { title: "Summer Fashion Drop", creators: 8, budget: "₹12L", spent: "₹8.4L", roi: "3.2x", status: "Active", progress: 70 },
  { title: "Tech Week Campaign", creators: 4, budget: "₹6L", spent: "₹5.9L", roi: "2.8x", status: "Ending Soon", progress: 95 },
  { title: "Wellness Collab Series", creators: 12, budget: "₹18L", spent: "₹4.5L", roi: "—", status: "Planning", progress: 25 },
];

export default async function BrandDashboard() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) redirect("/login");

  const profile = await prisma.brandProfile.findUnique({
    where: { userId: session.user.id }
  });

  const initials = session.user.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "B";

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/6 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">CreatorOS</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-300 text-[10px] font-medium uppercase tracking-wide">Brand</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <Bell className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">
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
              {profile?.companyName ? `${profile.companyName} Dashboard 📣` : "Brand Dashboard 📣"}
            </h1>
            <p className="text-white/45 text-sm">Welcome back, {session.user.name || session.user.email}</p>
            {profile?.industry && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-white/5 rounded text-xs text-white/60 border border-white/10">
                {profile.industry}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/6 hover:bg-white/10 border border-white/8 text-white/70 hover:text-white text-sm font-medium transition-all">
              <Search className="w-4 h-4" /> Discover Creators
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-700 hover:from-rose-500 hover:to-pink-600 text-white text-sm font-semibold transition-all shadow-lg shadow-rose-900/30">
              <Plus className="w-4 h-4" /> Launch Campaign
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Campaigns", value: "3", change: "+1 this month", icon: Megaphone, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
            { label: "Creator Partners", value: "24", change: "4 pending review", icon: Users, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
            { label: "Total Campaign Spend", value: "₹36L", change: "This quarter", icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
            { label: "Avg. Campaign ROI", value: "3.0x", change: "↑ 0.4x vs last Q", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
          ].map((stat) => (
            <div key={stat.label} className={`glass rounded-2xl p-5 border ${stat.border} hover:border-opacity-50 transition-all duration-200`}>
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
          {/* Creator Roster */}
          <div className="lg:col-span-2 glass rounded-2xl border border-white/8 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Active Creator Partners</h2>
              <button className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors">
                View all <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-white/4">
              {CREATORS.map((c) => (
                <div key={c.name} className="px-6 py-4 hover:bg-white/3 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">{c.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-white">{c.name}</span>
                        <span className="text-xs text-white/35">{c.handle}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span>{c.niche}</span>
                        <span>•</span>
                        <span>{c.followers}</span>
                        <span>•</span>
                        <span className="text-emerald-400">{c.engagement} eng.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-400 text-xs mb-0.5">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{c.rating}</span>
                        </div>
                        <span className="text-[10px] text-white/30">{c.deals} deal{c.deals !== 1 ? "s" : ""}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                        c.status === "Active" ? "text-emerald-400 bg-emerald-400/10 border-emerald-500/20" :
                        c.status === "In Review" ? "text-amber-400 bg-amber-400/10 border-amber-500/20" :
                        "text-white/40 bg-white/5 border-white/10"
                      }`}>{c.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Campaigns */}
            <div className="glass rounded-2xl border border-white/8 p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Campaign Overview</h2>
                <button className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors">
                  All <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-4">
                {CAMPAIGNS.map((c) => (
                  <div key={c.title}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-white/80">{c.title}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        c.status === "Active" ? "text-emerald-400 bg-emerald-400/10" :
                        c.status === "Ending Soon" ? "text-amber-400 bg-amber-400/10" :
                        "text-white/40 bg-white/5"
                      }`}>{c.status}</span>
                    </div>
                    <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-600"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-white/30">
                      <span>{c.creators} creators</span>
                      <span>•</span>
                      <span>{c.spent}/{c.budget}</span>
                      {c.roi !== "—" && <><span>•</span><span className="text-emerald-400">{c.roi} ROI</span></>}
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
