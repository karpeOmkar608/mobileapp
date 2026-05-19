import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  TrendingUp, DollarSign, Users, Briefcase, ArrowUpRight,
  Zap, Bell, Settings, BarChart3, Plus, Building2, Star,
  CheckCircle2, Clock, AlertCircle
} from "lucide-react";

const CREATORS = [
  { name: "Priya Sharma", niche: "Lifestyle", followers: "1.2M", deals: 8, revenue: "₹9.6L", status: "Active", avatar: "PS", color: "from-violet-500 to-purple-600" },
  { name: "Arjun Mehta", niche: "Fitness", followers: "800K", deals: 5, revenue: "₹4.2L", status: "Active", avatar: "AM", color: "from-rose-500 to-pink-600" },
  { name: "Riya Kapoor", niche: "Tech", followers: "2.1M", deals: 12, revenue: "₹22L", status: "Active", avatar: "RK", color: "from-amber-500 to-orange-600" },
  { name: "Dev Patel", niche: "Fashion", followers: "520K", deals: 3, revenue: "₹1.8L", status: "Onboarding", avatar: "DP", color: "from-sky-500 to-blue-600" },
  { name: "Ananya Singh", niche: "Beauty", followers: "1.8M", deals: 9, revenue: "₹15L", status: "Active", avatar: "AS", color: "from-emerald-500 to-teal-600" },
];

const CLIENTS = [
  { name: "Nike India", budget: "₹45L/qtr", campaigns: 3, status: "Active", color: "from-slate-600 to-slate-800", abbr: "NI" },
  { name: "Nykaa Beauty", budget: "₹28L/qtr", campaigns: 5, status: "Active", color: "from-rose-600 to-pink-800", abbr: "NK" },
  { name: "Boat Lifestyle", budget: "₹18L/qtr", campaigns: 2, status: "Renewing", color: "from-sky-700 to-sky-900", abbr: "BT" },
];

export default async function AgencyDashboard() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) redirect("/login");

  const profile = await prisma.agencyProfile.findUnique({
    where: { userId: session.user.id }
  });

  const initials = session.user.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "AG";

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/6 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">CreatorOS</span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-[10px] font-medium uppercase tracking-wide">Agency</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <Bell className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">
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
              {profile?.agencyName ? `${profile.agencyName} Dashboard 🏢` : "Agency Dashboard 🏢"}
            </h1>
            <p className="text-white/45 text-sm">Welcome back, {session.user.name || session.user.email}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/6 hover:bg-white/10 border border-white/8 text-white/70 hover:text-white text-sm font-medium transition-all">
              <Plus className="w-4 h-4" /> Add Creator
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-sm font-semibold transition-all shadow-lg shadow-emerald-900/30">
              <BarChart3 className="w-4 h-4" /> Client Reports
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Creators", value: "47", change: "+5 this month", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
            { label: "Active Campaigns", value: "18", change: "Across 3 brands", icon: Briefcase, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
            { label: "Client Brands", value: "12", change: "3 renewing this Q", icon: Building2, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
            { label: "Monthly Revenue", value: "₹91L", change: "+28% vs last month", icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
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
          {/* Creator Roster Table */}
          <div className="lg:col-span-2 glass rounded-2xl border border-white/8 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/6 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Creator Roster</h2>
              <button className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                View all 47 <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-white/4">
              {CREATORS.map((c) => (
                <div key={c.name} className="px-6 py-4 hover:bg-white/3 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">{c.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-white">{c.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          c.status === "Active" ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"
                        }`}>{c.status}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/35">
                        <span>{c.niche}</span>
                        <span>•</span>
                        <span>{c.followers}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-white">{c.revenue}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{c.deals} deals</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Client Brands */}
            <div className="glass rounded-2xl border border-white/8 p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Client Brands</h2>
                <button className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                  All 12 <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {CLIENTS.map((client) => (
                  <div key={client.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 transition-all">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${client.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">{client.abbr}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{client.name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-white/35">
                        <span>{client.campaigns} campaigns</span>
                        <span>•</span>
                        <span className="text-emerald-400">{client.budget}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      client.status === "Active" ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"
                    }`}>{client.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-2xl border border-white/8 p-5">
              <h2 className="text-sm font-semibold text-white mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Users, label: "Add Creator", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { icon: Briefcase, label: "New Campaign", color: "text-violet-400", bg: "bg-violet-500/10" },
                  { icon: BarChart3, label: "Analytics", color: "text-amber-400", bg: "bg-amber-500/10" },
                  { icon: Building2, label: "Client Portal", color: "text-rose-400", bg: "bg-rose-500/10" },
                ].map((a) => (
                  <button key={a.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-white/5 border border-white/6 hover:border-white/12 transition-all group">
                    <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center`}>
                      <a.icon className={`w-4 h-4 ${a.color}`} />
                    </div>
                    <span className="text-[10px] text-white/50 group-hover:text-white/80 transition-colors text-center">{a.label}</span>
                  </button>
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
