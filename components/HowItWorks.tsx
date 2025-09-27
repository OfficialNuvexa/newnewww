"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Search, Brain, FileText, Target } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Scan",
    description: "Continuously monitors Crypto Twitter feeds, analyzing millions of tweets for emerging patterns and viral potential.",
  },
  {
    icon: Brain,
    title: "Identify",
    description: "AI algorithms detect narrative clusters, sentiment shifts, and meme momentum using advanced pattern recognition.",
  },
  {
    icon: FileText,
    title: "Justify",
    description: "Generates detailed rationale for each narrative, including confidence scores and supporting evidence from social signals.",
  },
  {
    icon: Target,
    title: "Recommend",
    description: "Outputs actionable insights with suggested token names, timing recommendations, and risk assessments.",
  },
];

export default function HowItWorks() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="spectrum-text">SpectraAI</span> Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From chaos to clarity. Our AI transforms the noise of social media into structured, actionable narratives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              key={index}
              className={`relative lazy-reveal ${visibleCards[index] ? 'revealed' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="console-window rounded-lg p-6 h-full relative overflow-hidden group">
                {/* Glitch overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{ opacity: visibleCards[index] ? [0, 0.3, 0] : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
                
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mb-4 mx-auto neon-glow">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3 text-purple-300">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-center text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: visibleCards[index] ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}