"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MetricsBanner() {
  const [metrics, setMetrics] = useState({
    tweetsScanned: 0,
    activeNarratives: 0,
    trendingSignals: 0,
  });

  useEffect(() => {
    // Animate counters
    const intervals = [
      setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          tweetsScanned: Math.min(prev.tweetsScanned + Math.floor(Math.random() * 1000), 847392)
        }));
      }, 100),
      setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          activeNarratives: Math.min(prev.activeNarratives + 1, 23)
        }));
      }, 500),
      setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          trendingSignals: Math.min(prev.trendingSignals + 1, 7)
        }));
      }, 800),
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <motion.section
      className="py-8 border-y border-purple-500/20 bg-purple-950/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold spectrum-text mb-2">
              {metrics.tweetsScanned.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">
              Tweets Scanned Today
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold spectrum-text mb-2">
              {metrics.activeNarratives}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">
              Active Narratives
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl md:text-4xl font-bold spectrum-text mb-2">
              {metrics.trendingSignals}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">
              Trending Signals
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}