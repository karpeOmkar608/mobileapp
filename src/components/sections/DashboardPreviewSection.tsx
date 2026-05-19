"use client";

import { motion } from "framer-motion";
import { dashboardCampaigns } from "@/lib/mock-data";

const revenueData = [55, 72, 48, 88, 65, 91, 78];
const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

const activities = [
  { text: "Invoice sent to Nike India", time: "2m ago", color: "bg-violet-500" },
  { text: "Contract signed — Boat Lifestyle", time: "15m ago", color: "bg-emerald-500" },
  { text: "Payment received ₹1,20,000", time: "1h ago", color: "bg-amber-500" },
  { text: "New deal offer from Zomato", time: "3h ago", color: "bg-rose-500" },
];

export default function DashboardPreviewSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="dashboard">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            Product Preview
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            Your entire creator business,{" "}
            <span className="text-gradient-violet">at a glance</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A unified dashboard that shows everything — campaigns, payments, deadlines, and analytics — all in one beautiful view.
          </p>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-violet-600/15 to-rose-600/10 rounded-3xl blur-2xl" />

          <div className="relative glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/8 bg-white/2">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-white/30 font-mono">app.creatorOS.io/dashboard</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-xs font-bold text-white">P</div>
                <span className="hidden sm:block text-xs text-white/40">Priya Sharma</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[220px_1fr] min-h-[480px]">
              {/* Sidebar */}
              <div className="hidden lg:flex flex-col p-4 border-r border-white/6 bg-white/1">
                <p className="text-xs text-white/20 uppercase tracking-widest mb-4 px-2">Navigation</p>
                {[
                  { icon: "⚡", label: "Dashboard", active: true },
                  { icon: "💼", label: "Deals CRM", active: false },
                  { icon: "💰", label: "Payments", active: false },
                  { icon: "📄", label: "Invoices", active: false },
                  { icon: "🤝", label: "Collaborations", active: false },
                  { icon: "📊", label: "Analytics", active: false },
                  { icon: "🔒", label: "Contracts", active: false },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 cursor-pointer transition-all ${item.active ? "bg-violet-500/15 text-white" : "text-white/30 hover:bg-white/5 hover:text-white/60"}`}>
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
                <div className="mt-auto">
                  <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-3">
                    <p className="text-xs text-violet-300 font-medium mb-1">Monthly Revenue</p>
                    <p className="text-xl font-bold text-white">₹5.2L</p>
                    <p className="text-xs text-emerald-400 mt-0.5">↑ 24% vs last month</p>
                  </div>
                </div>
              </div>

              {/* Main */}
              <div className="p-5 lg:p-6">
                {/* Mini stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "Active Deals", value: "8", icon: "💼", change: "+2", pos: true },
                    { label: "Pending", value: "₹3.4L", icon: "⏳", change: "4 invoices", pos: null },
                    { label: "Completed", value: "23", icon: "✅", change: "this year", pos: true },
                    { label: "Avg. Deal", value: "₹72K", icon: "📈", change: "+18%", pos: true },
                  ].map((s, i) => (
                    <div key={i} className="rounded-xl bg-white/4 border border-white/6 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/40 truncate mr-1">{s.label}</span>
                        <span className="text-sm shrink-0">{s.icon}</span>
                      </div>
                      <p className="text-lg font-bold text-white">{s.value}</p>
                      <p className={`text-xs mt-0.5 ${s.pos === true ? "text-emerald-400" : s.pos === false ? "text-rose-400" : "text-white/30"}`}>
                        {s.change}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-[1fr_220px] gap-4">
                  {/* Campaign table */}
                  <div className="rounded-xl bg-white/3 border border-white/6 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
                      <p className="text-sm font-semibold text-white/80">Active Campaigns</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">4 Live</span>
                    </div>
                    <div className="divide-y divide-white/4">
                      {dashboardCampaigns.map((row, i) => (
                        <div key={i} className="px-4 py-3 flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${row.dot} shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white/80 truncate">{row.brand}</p>
                            <p className="text-xs text-white/30">{row.type}</p>
                          </div>
                          <div className="flex-1 hidden sm:flex items-center gap-2">
                            <div className="flex-1 h-1 rounded-full bg-white/8">
                              <div className="h-full rounded-full bg-violet-500" style={{ width: `${row.progress}%` }} />
                            </div>
                            <span className="text-xs text-white/30">{row.progress}%</span>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-white">{row.value}</p>
                            <span className={`text-xs ${row.statusColor}`}>{row.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity + mini chart */}
                  <div className="flex flex-col gap-4">
                    {/* Revenue chart */}
                    <div className="rounded-xl bg-white/3 border border-white/6 p-4">
                      <p className="text-xs text-white/40 mb-3">Revenue Trend</p>
                      <div className="flex items-end gap-1.5 h-16">
                        {revenueData.map((val, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${val}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06, duration: 0.5 }}
                            className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-600 to-violet-400"
                            style={{ minHeight: "4px" }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-1.5">
                        {months.map((m) => (
                          <span key={m} className="text-[9px] text-white/20">{m}</span>
                        ))}
                      </div>
                    </div>

                    {/* Activity feed */}
                    <div className="rounded-xl bg-white/3 border border-white/6 p-4 flex-1">
                      <p className="text-xs text-white/40 mb-3">Recent Activity</p>
                      <div className="space-y-3">
                        {activities.map((act, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${act.color} shrink-0 mt-1.5`} />
                            <div>
                              <p className="text-xs text-white/60 leading-relaxed">{act.text}</p>
                              <p className="text-[10px] text-white/25 mt-0.5">{act.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
