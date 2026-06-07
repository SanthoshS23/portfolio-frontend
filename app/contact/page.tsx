'use client';

import React from 'react';
import ContactForm from '../../components/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom SVG component for Linkedin logo
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const contactDetails = [
    {
      icon: <Mail className="w-5.5 h-5.5 text-indigo-400" />,
      title: 'Email Address',
      value: 'santhoshpy0209@gmail.com',
      href: 'mailto:santhoshpy0209@gmail.com',
      label: 'Send email',
    },
    {
      icon: <Phone className="w-5.5 h-5.5 text-purple-400" />,
      title: 'Phone Number',
      value: '+91 90807 06050',
      href: 'tel:+919080706050',
      label: 'Call now',
    },
    {
      icon: <Linkedin className="w-5.5 h-5.5 text-pink-400" />,
      title: 'LinkedIn',
      value: 'santhosh-s-8700421b9',
      href: 'https://linkedin.com/in/santhosh-s-8700421b9',
      label: 'Connect',
    },
    {
      icon: <MapPin className="w-5.5 h-5.5 text-emerald-400" />,
      title: 'Location',
      value: 'Erode, Tamil Nadu, India',
      href: 'https://maps.google.com/?q=Erode,Tamil+Nadu,India',
      label: 'View map',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Get In Touch</h1>
        <p className="text-sm sm:text-base text-slate-400 font-medium tracking-wide">
          Have a question or want to collaborate? Drop me a line!
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start">
        
        {/* Left Side: Contact Form (Takes 2 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 glass-panel p-6 sm:p-10 rounded-3xl border border-white/5"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Send a Message</h2>
          <ContactForm />
        </motion.div>

        {/* Right Side: Info Cards (Takes 1 col) */}
        <div className="space-y-6 lg:col-span-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 lg:pl-2">Contact Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {contactDetails.map((detail, index) => (
              <motion.a
                key={index}
                href={detail.href}
                target={detail.title === 'Location' || detail.title === 'LinkedIn' ? '_blank' : undefined}
                rel={detail.title === 'Location' || detail.title === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/5 flex gap-4 items-start"
              >
                <div className="p-3 bg-slate-950/40 border border-white/5 rounded-xl shrink-0">
                  {detail.icon}
                </div>
                
                <div className="overflow-hidden">
                  <h3 className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{detail.title}</h3>
                  <p className="text-sm sm:text-base font-bold text-slate-200 truncate">{detail.value}</p>
                  <span className="text-xs text-indigo-400 font-bold hover:underline inline-block mt-2">
                    {detail.label} &rarr;
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
