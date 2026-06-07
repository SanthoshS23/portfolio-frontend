'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Code, Globe, Cpu, Layers } from 'lucide-react';

const roles = [
  'Frontend Developer',
  'React.js Engineer',
  'Next.js Developer',
  'UI/UX Craftsman',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden bg-grid-pattern">
      {/* Abstract Glowing Orbs in Background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* React Badge */}
        <motion.div
          className="absolute top-1/4 left-[10%] sm:left-[15%] p-3 rounded-2xl glass-panel text-cyan-400 flex items-center gap-2"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Code className="w-5 h-5" />
          <span className="text-xs font-semibold hidden sm:inline">React</span>
        </motion.div>

        {/* Angular Badge */}
        <motion.div
          className="absolute top-1/3 right-[10%] sm:right-[15%] p-3 rounded-2xl glass-panel text-red-500 flex items-center gap-2"
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Globe className="w-5 h-5" />
          <span className="text-xs font-semibold hidden sm:inline">Angular</span>
        </motion.div>

        {/* Next.js Badge */}
        <motion.div
          className="absolute bottom-1/4 left-[12%] sm:left-[20%] p-3 rounded-2xl glass-panel text-slate-100 flex items-center gap-2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <Layers className="w-5 h-5" />
          <span className="text-xs font-semibold hidden sm:inline">Next.js</span>
        </motion.div>

        {/* TypeScript Badge */}
        <motion.div
          className="absolute bottom-1/3 right-[12%] sm:right-[20%] p-3 rounded-2xl glass-panel text-blue-500 flex items-center gap-2"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <Cpu className="w-5 h-5" />
          <span className="text-xs font-semibold hidden sm:inline">TypeScript</span>
        </motion.div>
      </div>

      {/* Main Hero Card Content */}
      <div className="z-10 text-center max-w-4xl mx-auto mt-8 sm:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-6 inline-block tracking-wider uppercase">
            Available for Opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          Hi, I am{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-glow">
            Santhosh S
          </span>
        </motion.h1>

        {/* Role Typewriter / Cycling Text */}
        <div className="h-10 sm:h-12 mb-8 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-300 tracking-wide"
            >
              {roles[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 sm:mb-24"
        >
          <Link
            href="/projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.6)] transition-all duration-300 hover:scale-[1.02]"
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="/resume.pdf"
            download
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white font-semibold flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
          >
            Download Resume
            <Download className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Stats Row Container */}
      <div className="w-full max-w-6xl mx-auto z-10 px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl"
        >
          {[
            { value: '2+', label: 'Years Experience' },
            { value: '2', label: 'Companies' },
            { value: '10+', label: 'Projects' },
            { value: '5+', label: 'Technologies' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-3 sm:p-4 border-r last:border-0 border-white/5 md:border-r">
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
