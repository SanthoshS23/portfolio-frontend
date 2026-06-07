'use client';

import React, { useEffect, useState } from 'react';
import { fetchExperience } from '../../lib/api';
import { ExperienceItem } from '../../types';
import ExperienceCard from '../../components/ExperienceCard';
import { motion } from 'framer-motion';

export default function Experience() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchExperience();
      setItems(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="animate-pulse space-y-12">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-6">
              <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-indigo-500/30 shrink-0" />
              <div className="flex-1 h-60 bg-slate-900/60 rounded-3xl border border-white/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Work Experience</h1>
        <p className="text-sm sm:text-base text-slate-400 font-medium tracking-wide">
          My professional career timeline and project achievements.
        </p>
      </motion.div>

      {/* Timeline Section */}
      <div className="relative border-l border-indigo-500/25 timeline-glow-line ml-4 md:ml-6">
        {items.map((item, index) => (
          <ExperienceCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
