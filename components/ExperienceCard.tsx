'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem } from '../types';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
}

export default function ExperienceCard({ item, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      {/* Node Bullet point on the timeline line */}
      <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(99,102,241,0.6)]">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
      </div>

      {/* Main card */}
      <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400 shrink-0" />
              {item.role}
            </h3>
            <h4 className="text-base sm:text-lg font-semibold text-slate-300 mt-1">
              {item.company}
            </h4>
          </div>

          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-slate-400 font-medium shrink-0">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/40 border border-white/5">
              <Calendar className="w-4 h-4 text-purple-400" />
              {item.period}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/40 border border-white/5">
              <MapPin className="w-4 h-4 text-pink-400" />
              {item.location}
            </span>
          </div>
        </div>

        {/* Nested Projects */}
        <div className="space-y-6">
          {item.projects.map((proj, idx) => (
            <div key={idx} className="space-y-3">
              <h5 className="text-base font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                {proj.name}
              </h5>
              <ul className="space-y-2.5 pl-4 sm:pl-6 list-disc list-outside text-sm sm:text-base text-slate-400 leading-relaxed">
                {proj.points.map((pt, ptIdx) => (
                  <li key={ptIdx} className="marker:text-indigo-500/50">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
