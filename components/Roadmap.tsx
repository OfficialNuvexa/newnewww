"use client";

import { motion } from 'framer-motion';
import { Zap, Network, Users, Rocket } from 'lucide-react';

const phases = [
  {
    phase: "Phase 1",
    title: "SpectraAI Scanner Demo",
    description: "Launch narrative extraction engine with real-time Twitter analysis and structured output generation.",
    icon: Zap,
    status: "current"
  },
  {
    phase: "Phase 2",
    title: "Multi-Chain Narrative Streams",
    description: "Expand beyond Twitter to Discord, Telegram, and Reddit. Cross-platform narrative correlation and trend synthesis.",
    icon: Network,
    status: "upcoming"
  },
  {
    phase: "Phase 3",
    title: "Community-Driven Curation",
    description: "Implement community voting on narrative quality, collaborative filtering, and crowdsourced signal validation.",
    icon: Users,
    status: "future"
  },
  {
    phase: "Phase 4",
    title: "Spectra Ecosystem Scaling",
    description: "Deploy autonomous narrative agents, predictive modeling, and integration with major DeFi protocols.",
    icon: Rocket,
    status: "vision"
  }
];

export default function Roadmap() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="spectrum-text">Spectra</span> Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From chaos to clarity, from signals to ecosystems. The evolution of narrative intelligence.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 hidden md:block" />

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <div className="flex items-start space-x-8">
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center neon-glow
                      ${phase.status === 'current' ? 'bg-gradient-to-r from-purple-600 to-cyan-600' :
                        phase.status === 'upcoming' ? 'bg-gradient-to-r from-purple-800 to-cyan-800' :
                        'bg-gradient-to-r from-gray-600 to-gray-800'}
                    `}>
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                    {phase.status === 'current' && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 console-window rounded-lg p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-sm text-purple-400 font-mono uppercase tracking-wider">
                        {phase.phase}
                      </span>
                      {phase.status === 'current' && (
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {phase.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 pt-12 border-t border-purple-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to see what SpectraAI sees?
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold neon-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Experience the Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}