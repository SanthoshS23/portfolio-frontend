'use client';

import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { ChevronDown, ChevronUp, Layers, Calendar, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isComingSoon = project.status === 'Coming Soon';

  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      tabIndex={0}
      className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] group relative overflow-hidden"
    >
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-start mb-4 gap-2">
          <span className="p-2 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/10 inline-block">
            <Layers className="w-5 h-5" />
          </span>

          {isComingSoon ? (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/20 uppercase tracking-wider">
              Coming Soon
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider">
              Completed
            </span>
          )}
        </div>

        {/* Title & Date */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide mb-2 group-hover:text-indigo-400 transition-colors duration-200">
          {project.title}
        </h3>
        
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>{project.period}</span>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-lg bg-slate-950/40 text-slate-300 border border-white/5 font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable details */}
        {!isComingSoon && (
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <div className="pt-2 border-t border-white/5 space-y-2.5">
                  <h4 className="text-sm font-bold text-indigo-300">Key Contributions:</h4>
                  <ul className="list-none space-y-2">
                    {project.points.map((pt, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-400 flex items-start gap-2 leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* View Details Toggle Button */}
      {!isComingSoon && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-4 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-white/5 hover:border-indigo-500/20 text-sm font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all duration-200"
        >
          {isExpanded ? (
            <>
              Hide Details
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              View Details
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </motion.div>
  );
}
