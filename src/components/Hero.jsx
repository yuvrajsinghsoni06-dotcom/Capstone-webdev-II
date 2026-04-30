import React from 'react';

export default function Hero() {
  return (
    <div className="relative text-center py-16 md:py-20 mb-10">
      {/* Glow backdrop — dark mode only */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[180px] rounded-full bg-accent-cyan/10 dark:bg-accent-cyan/10 blur-3xl pointer-events-none hidden dark:block" />

      <h2 className="
        relative font-orbitron text-4xl md:text-5xl font-black tracking-tight mb-5
        gradient-text-light dark:gradient-text-dark
      ">
        Discover Top AI Models
      </h2>

      <p className="
        relative text-base md:text-lg leading-relaxed tracking-wide max-w-xl mx-auto
        text-slate-500 dark:text-slate-400
      ">
        Explore, filter, and bookmark the best machine learning models from the&nbsp;
        <span className="text-sky-500 dark:text-accent-cyan font-semibold">Hugging Face Hub</span>.
      </p>
    </div>
  );
}
