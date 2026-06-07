'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSkills } from '../lib/api';
import { SkillCategory } from '../types';
import { Cpu, Server, Terminal, ShieldAlert } from 'lucide-react';

interface SkillsSectionProps {
  previewOnly?: boolean;
}

export default function SkillsSection({ previewOnly = false }: SkillsSectionProps) {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSkills() {
      const data = await fetchSkills();
      setCategories(data);
      setLoading(false);
    }
    loadSkills();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // For the homepage mini preview, we only show 6 badges of primary skills
  if (previewOnly) {
    const allSkills = categories.flatMap(cat => cat.skills).slice(0, 6);
    return (
      <div className="w-full max-w-3xl mx-auto text-center mt-12 px-4">
        <h2 className="text-xl font-semibold text-slate-300 mb-6 tracking-wide">Core Technologies</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {allSkills.map((skill, idx) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.08 }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 text-slate-200 hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  const getIcon = (name: string) => {
    if (name.toLowerCase().includes('frontend')) return <Cpu className="w-6 h-6 text-indigo-400" />;
    if (name.toLowerCase().includes('backend')) return <Server className="w-6 h-6 text-purple-400" />;
    return <Terminal className="w-6 h-6 text-pink-400" />;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, catIdx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            className="glass-panel glass-panel-hover p-8 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              {getIcon(category.name)}
              <h3 className="text-lg font-bold text-white tracking-wide">{category.name}</h3>
            </div>
            
            {/* Skills grid within category: 2 cols mobile, 3 cols tablet, 4 cols desktop - wait, here it's 2 cols inside the card */}
            <div className="grid grid-cols-2 gap-3">
              {category.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skill}
                  whileHover={{ x: 3 }}
                  className="px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 text-sm text-slate-300 font-medium hover:text-white hover:border-indigo-500/20 hover:bg-slate-900/30 transition-all duration-200"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
