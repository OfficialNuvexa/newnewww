"use client";

import { motion } from 'framer-motion';
import { Twitter, MessageCircle, FileText, Shield } from 'lucide-react';

export default function Footer() {
  const links = [
    { name: 'Docs', href: '#', icon: FileText },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Discord', href: '#', icon: MessageCircle },
    { name: 'Disclaimer', href: '#', icon: Shield },
  ];

  return (
    <footer className="border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold spectrum-text mb-2">SpectraAI</h3>
            <p className="text-gray-400 text-center md:text-left max-w-md">
              The intelligence that sees what others miss. From chaos to clarity, from signals to narratives.
            </p>
          </div>

          <div className="flex space-x-6">
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-4 h-4" />
                <span className="text-sm">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 pt-8 border-t border-purple-500/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 SpectraAI. All rights reserved. Not financial advice.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}