import React, { memo } from 'react';
import { Download, Heart, Copy, Check, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ModelCard = memo(({ model, isBookmarked, toggleBookmark }) => {
  const [copied, setCopied] = React.useState(false);
  const navigate = useNavigate();

  const copyToClipboard = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(model.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(model.id);
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
    return num.toString();
  };

  const author = model.id.includes('/') ? model.id.split('/')[0] : 'huggingface';
  const name   = model.id.includes('/') ? model.id.split('/').pop() : model.id;

  return (
    <div
      className="
        group relative flex flex-col
        bg-white dark:bg-gradient-to-br dark:from-[rgba(10,10,40,0.85)] dark:to-[rgba(20,10,50,0.7)]
        border border-slate-200 dark:border-[rgba(0,212,255,0.15)]
        rounded-2xl p-5
        backdrop-blur-md
        cursor-pointer overflow-hidden
        transition-all duration-300
        hover:-translate-y-1.5
        hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,212,255,0.15),0_20px_40px_rgba(0,0,0,0.5)]
        hover:border-sky-300 dark:hover:border-[rgba(0,212,255,0.5)]
        animate-fadeIn
      "
      onClick={() => navigate(`/model/${model.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/model/${model.id}`)}
    >
      {/* Hover glow layer — dark only */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none dark:bg-[radial-gradient(circle_at_60%_40%,rgba(0,212,255,0.05)_0%,transparent_60%)]" />

      {/* Header row */}
      <div className="flex items-start justify-between mb-1">
        <h3
          className="text-base font-bold truncate pr-2 text-slate-800 dark:text-slate-100 tracking-tight"
          title={name}
        >
          {name}
        </h3>
        <button
          className={`
            shrink-0 p-1 rounded-md transition-all duration-200
            ${isBookmarked
              ? 'text-sky-500 dark:text-accent-cyan drop-shadow-[0_0_6px_rgba(0,212,255,0.8)]'
              : 'text-slate-400 dark:text-slate-500 hover:text-sky-400 dark:hover:text-accent-cyan'}
            hover:scale-110 active:scale-90
          `}
          onClick={handleBookmark}
          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Model'}
          aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Model'}
        >
          <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Author */}
      <p className="text-xs italic text-slate-400 dark:text-slate-500 mb-4">{author}</p>

      {/* Pipeline tag */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="
          inline-block text-[0.65rem] font-semibold uppercase tracking-widest
          px-2.5 py-0.5 rounded-full
          bg-sky-50 text-sky-600 border border-sky-200
          dark:bg-accent-cyan/10 dark:text-accent-cyan dark:border-[rgba(0,212,255,0.25)]
        ">
          {model.pipeline_tag || 'Unknown Task'}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 mt-auto">
        <div className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
          <Download size={15} />
          <span>{formatNumber(model.downloads)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
          <Heart size={15} />
          <span>{formatNumber(model.likes)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          className="
            flex-1 flex items-center justify-center gap-1.5
            text-xs font-semibold tracking-wide
            px-3 py-2 rounded-lg
            bg-sky-50 text-sky-600 border border-sky-200
            dark:bg-accent-cyan/10 dark:text-accent-cyan dark:border-[rgba(0,212,255,0.25)]
            hover:bg-sky-100 dark:hover:bg-accent-cyan/20
            hover:shadow-[0_0_12px_rgba(14,165,233,0.2)] dark:hover:shadow-[0_0_12px_rgba(0,212,255,0.25)]
            transition-all duration-200
          "
          onClick={copyToClipboard}
          aria-label="Copy model ID"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy ID'}
        </button>

        <span className="
          flex-1 flex items-center justify-center gap-1.5
          text-xs font-semibold tracking-wide
          px-3 py-2 rounded-lg cursor-default
          bg-violet-50 text-violet-500 border border-violet-200
          dark:bg-accent-purple/10 dark:text-purple-400 dark:border-[rgba(155,89,255,0.25)]
        ">
          View Details →
        </span>
      </div>
    </div>
  );
});

export default ModelCard;
