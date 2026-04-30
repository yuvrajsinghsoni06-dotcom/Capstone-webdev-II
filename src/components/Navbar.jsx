import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="
      sticky top-0 z-50 flex items-center justify-between
      px-6 md:px-10 py-4
      bg-[rgba(0,0,26,0.6)]
      backdrop-blur-lg
      border-b border-[rgba(0,212,255,0.2)]
      shadow-[0_1px_30px_rgba(0,212,255,0.08)]
      transition-all duration-300
    ">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 no-underline group">
        <Sparkles
          className="text-accent-cyan transition-transform duration-300 group-hover:scale-110"
          style={{ filter: 'drop-shadow(0 0 8px #00d4ff)', color: '#00d4ff' }}
          size={24}
        />
        <h1 className="font-orbitron text-lg font-black tracking-wide logo-gradient">
          Nexus ML Box
        </h1>
      </Link>

      {/* Hugging Face link */}
      <div className="flex items-center gap-3">
        <a
          href="https://huggingface.co"
          target="_blank"
          rel="noreferrer"
          className="
            hidden sm:inline-flex items-center gap-1
            text-sm font-medium text-slate-400
            border border-[rgba(0,212,255,0.25)]
            px-4 py-1.5 rounded-full
            transition-all duration-200
            hover:text-accent-cyan hover:border-accent-cyan
            hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]
          "
          style={{ color: '#7ba7c7' }}
        >
          Hugging Face ↗
        </a>
      </div>
    </nav>
  );
}
