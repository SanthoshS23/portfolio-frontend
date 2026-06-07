import React from 'react';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Hero Section containing name animations and statistics */}
      <HeroSection />

      {/* Mini Core Skills Preview Section */}
      <section className="py-12 sm:py-20 border-t border-white/5 bg-slate-950/20 backdrop-blur-sm">
        <SkillsSection previewOnly={true} />
      </section>
    </div>
  );
}
