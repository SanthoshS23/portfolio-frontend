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

  const normalizedCategories = categories.map((category) => ({
    name: category.name || 'Unknown Category',
    skills: Array.isArray(category.skills) ? category.skills : [],
  }));

  // For the homepage mini preview, we only show 6 badges of primary skills
  if (previewOnly) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-10">
          <h2 className="text-lg uppercase tracking-[0.3em] text-indigo-300 mb-3">Core Technologies</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {normalizedCategories.map((category, catIdx) => (
            <motion.div
              key={`${category.name}-${catIdx}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: catIdx * 0.08 }}
              className="glass-panel p-6 rounded-3xl border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.length > 0 ? (
                  category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-2xl bg-slate-950/70 border border-white/10 text-sm text-slate-200"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="px-4 py-2 rounded-2xl bg-slate-950/70 border border-white/10 text-sm text-slate-400">
                    No skills available
                  </span>
                )}
              </div>
            </motion.div>
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
        {normalizedCategories.map((category, catIdx) => (
          <motion.div
            key={`${category.name}-${catIdx}`}
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
            
            {/* Skills grid within category */}
            <div className="grid grid-cols-2 gap-3">
              {category.skills.length > 0 ? (
                category.skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ x: 3 }}
                    className="px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 text-sm text-slate-300 font-medium hover:text-white hover:border-indigo-500/20 hover:bg-slate-900/30 transition-all duration-200"
                  >
                    {skill}
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 px-4 py-3 rounded-xl bg-slate-950/40 border border-white/5 text-sm text-slate-400">
                  Skills not available yet.
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
