'use client';

import React, { useEffect, useState } from 'react';
import { fetchAbout } from '../../lib/api';
import { AboutData } from '../../types';
import { 
  User, Calendar, MapPin, Mail, Phone, 
  GraduationCap, Award, BookOpen, Heart, Languages, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

// Custom SVG component for Linkedin logo since brand icons are removed from newer lucide versions
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 444 444" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetchAbout();
      setData(res);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          <div className="lg:col-span-1 space-y-6">
            <div className="w-full h-80 bg-slate-900/60 rounded-3xl border border-white/5" />
            <div className="w-full h-40 bg-slate-900/60 rounded-3xl border border-white/5" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full h-48 bg-slate-900/60 rounded-3xl border border-white/5" />
            <div className="w-full h-48 bg-slate-900/60 rounded-3xl border border-white/5" />
            <div className="w-full h-40 bg-slate-900/60 rounded-3xl border border-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">About Me</h1>
        <p className="text-sm sm:text-base text-slate-400 font-medium tracking-wide">
          My academic qualifications, certifications, and background.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar Column - Profile and Details */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Avatar and Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl text-center flex flex-col items-center border border-white/5"
          >
            {/* SS Initials Avatar with glowing ring */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-3xl sm:text-4xl shadow-[0_0_30px_rgba(99,102,241,0.4)] mb-6 select-none border border-white/15">
              SS
            </div>
            
            <h2 className="text-2xl font-bold text-white tracking-wide">{data.name}</h2>
            <p className="text-sm font-semibold text-indigo-400 mt-1 mb-6">{data.title}</p>
            
            {/* Quick Contact Links */}
            <div className="w-full space-y-4 border-t border-white/5 pt-6 text-left">
              <a 
                href={`mailto:${data.email}`}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-semibold break-all"
              >
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{data.email}</span>
              </a>
              <a 
                href={`tel:${data.phone}`}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{data.phone}</span>
              </a>
              <a 
                href={data.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Personal Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl space-y-5 border border-white/5"
          >
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2 pb-3 border-b border-white/5">
              <User className="w-5 h-5 text-indigo-400" />
              Personal Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Date of Birth</span>
                <span className="text-sm sm:text-base text-slate-300 font-medium flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {data.dob}
                </span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Location</span>
                <span className="text-sm sm:text-base text-slate-300 font-medium flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {data.location}
                </span>
              </div>
              <div>
                <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Languages</span>
                <span className="text-sm sm:text-base text-slate-300 font-medium flex items-center gap-2 mt-1">
                  <Languages className="w-4 h-4 text-slate-400" />
                  {data.languages.join(', ')}
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Main Column - Summary, Edu, Certs, Pubs, Awards */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Summary Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5"
          >
            <h3 className="text-lg font-bold text-white tracking-wide mb-4">Professional Summary</h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {data.summary}
            </p>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5"
          >
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2 pb-4 border-b border-white/5 mb-6">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
              Education
            </h3>
            
            {data.education.map((edu, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="text-slate-300 font-semibold mt-1">{edu.institution}</p>
                  <p className="text-sm text-indigo-400 font-bold mt-2 bg-indigo-500/10 px-3 py-1 rounded-lg inline-block border border-indigo-500/20">
                    {edu.details}
                  </p>
                </div>
                <span className="text-sm font-semibold text-slate-400 bg-slate-950/40 border border-white/5 px-3.5 py-1.5 rounded-xl self-start">
                  {edu.period}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Certifications & Publications Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Certifications Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5"
            >
              <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2 pb-3 border-b border-white/5 mb-4">
                <Award className="w-5 h-5 text-purple-400" />
                Certifications
              </h3>
              <ul className="space-y-4">
                {data.certifications.map((cert, index) => (
                  <li key={index} className="flex flex-col">
                    <span className="text-sm sm:text-base font-bold text-slate-200">{cert.name}</span>
                    <span className="text-xs text-slate-500 font-semibold mt-0.5">{cert.issuer}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Publications Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5"
            >
              <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2 pb-3 border-b border-white/5 mb-4">
                <FileText className="w-5 h-5 text-pink-400" />
                Publications
              </h3>
              {data.publications.map((pub, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-sm font-bold text-slate-200 leading-relaxed">{pub.title}</span>
                  <div className="flex gap-2 text-xs text-slate-500 font-semibold mt-1">
                    <span>{pub.journal}</span>
                    <span>•</span>
                    <span>{pub.date}</span>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Interests & Awards Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Interests List */}
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2 pb-3 border-b border-white/5 mb-4">
                  <Heart className="w-5 h-5 text-indigo-400" />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {data.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3.5 py-2 rounded-xl bg-slate-950/40 border border-white/5 text-sm text-slate-300 font-semibold hover:text-white transition-all duration-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awards List */}
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2 pb-3 border-b border-white/5 mb-4">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Awards
                </h3>
                <ul className="space-y-3">
                  {data.awards.map((award, index) => (
                    <li key={index} className="flex gap-2.5 text-sm sm:text-base font-semibold text-slate-300">
                      <Award className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
