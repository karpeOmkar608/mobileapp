"use client";

import { motion } from "framer-motion";

const nodes = [
  // Center
  { id: "hub", x: 50, y: 50, label: "CreatorOS", size: 52, color: "#7c3aed", glow: "#7c3aed", emoji: "⚡", type: "hub" },
  // Creators (left cluster)
  { id: "c1", x: 18, y: 25, label: "Lifestyle Creator", size: 38, color: "#8b5cf6", glow: "#8b5cf6", emoji: "✨", type: "creator" },
  { id: "c2", x: 12, y: 55, label: "Tech Creator", size: 36, color: "#a78bfa", glow: "#a78bfa", emoji: "💻", type: "creator" },
  { id: "c3", x: 22, y: 78, label: "Fitness Creator", size: 34, color: "#8b5cf6", glow: "#8b5cf6", emoji: "💪", type: "creator" },
  // Brands (right cluster)
  { id: "b1", x: 82, y: 22, label: "Nike India", size: 38, color: "#f43f5e", glow: "#f43f5e", emoji: "👟", type: "brand" },
  { id: "b2", x: 88, y: 52, label: "Nykaa", size: 36, color: "#fb7185", glow: "#fb7185", emoji: "💄", type: "brand" },
  { id: "b3", x: 78, y: 78, label: "Boat", size: 34, color: "#f43f5e", glow: "#f43f5e", emoji: "🎧", type: "brand" },
  // Agencies (bottom)
  { id: "a1", x: 42, y: 88, label: "InfluenceHub", size: 36, color: "#f59e0b", glow: "#f59e0b", emoji: "🚀", type: "agency" },
  { id: "a2", x: 62, y: 88, label: "CreatorMgmt", size: 34, color: "#fbbf24", glow: "#fbbf24", emoji: "📊", type: "agency" },
];

const connections = [
  { from: "hub", to: "c1" }, { from: "hub", to: "c2" }, { from: "hub", to: "c3" },
  { from: "hub", to: "b1" }, { from: "hub", to: "b2" }, { from: "hub", to: "b3" },
  { from: "hub", to: "a1" }, { from: "hub", to: "a2" },
  { from: "c1", to: "b1" }, { from: "c2", to: "b2" }, { from: "c3", to: "b3" },
];

function getNodeCenter(id: string) {
  const node = nodes.find((n) => n.id === id);
  if (!node) return { x: 0, y: 0 };
  return { x: node.x, y: node.y };
}

export default function EcosystemSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="ecosystem">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/6 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Ecosystem
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-4">
            One platform.{" "}
            <span className="text-gradient-main">Infinite connections.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Creators discover brands, brands discover creators, and agencies manage it all — through a single, connected ecosystem.
          </p>
        </motion.div>

        {/* Network Viz */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="glass rounded-3xl border border-white/8 p-4 sm:p-8 shadow-2xl shadow-black/40">
            <svg viewBox="0 0 100 100" className="w-full" style={{ aspectRatio: "1/0.85" }}>
              {/* Connection lines */}
              {connections.map((conn, i) => {
                const from = getNodeCenter(conn.from);
                const to = getNodeCenter(conn.to);
                return (
                  <motion.line
                    key={i}
                    x1={from.x} y1={from.y}
                    x2={to.x} y2={to.y}
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                  />
                );
              })}

              {/* Animated pulse on hub connections */}
              {connections.slice(0, 8).map((conn, i) => {
                const from = getNodeCenter(conn.from);
                const to = getNodeCenter(conn.to);
                return (
                  <motion.circle
                    key={`pulse-${i}`}
                    r="0.8"
                    fill="#7c3aed"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      cx: [from.x, to.x],
                      cy: [from.y, to.y],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "linear",
                    }}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, type: "spring" }}
                  style={{ originX: `${node.x}%`, originY: `${node.y}%` }}
                >
                  {/* Glow */}
                  <circle
                    cx={node.x} cy={node.y}
                    r={node.size / 14}
                    fill={node.glow}
                    opacity={0.2}
                  />
                  {/* Node circle */}
                  <circle
                    cx={node.x} cy={node.y}
                    r={node.size / 20}
                    fill={`${node.color}22`}
                    stroke={node.color}
                    strokeWidth={node.type === "hub" ? 0.8 : 0.5}
                    opacity={0.9}
                  />
                  {/* Emoji */}
                  <text
                    x={node.x} y={node.y + 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={node.type === "hub" ? 3.5 : 2.8}
                  >
                    {node.emoji}
                  </text>
                  {/* Label */}
                  <text
                    x={node.x} y={node.y + node.size / 16 + 2.5}
                    textAnchor="middle"
                    fontSize="2"
                    fill="rgba(255,255,255,0.5)"
                    fontFamily="system-ui"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          {[
            { color: "bg-violet-500", label: "Creators", emoji: "✨" },
            { color: "bg-rose-500", label: "Brands", emoji: "🏢" },
            { color: "bg-amber-500", label: "Agencies", emoji: "🚀" },
          ].map((leg) => (
            <div key={leg.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${leg.color}`} />
              <span className="text-sm text-white/50">{leg.emoji} {leg.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
