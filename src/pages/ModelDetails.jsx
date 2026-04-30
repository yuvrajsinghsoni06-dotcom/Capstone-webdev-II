import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Heart, ArrowLeft, Bookmark, Copy, Check, ExternalLink } from 'lucide-react';
import { useModels } from '../context/ModelContext';

export default function ModelDetails() {
  const { '*': modelId } = useParams();
  const { bookmarkedIds, toggleBookmark } = useModels();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const isBookmarked = bookmarkedIds.includes(modelId);

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
    return num.toString();
  };

  const copyId = () => {
    navigator.clipboard.writeText(modelId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!modelId) return;
    const fetchModel = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://huggingface.co/api/models/${modelId}`);
        if (!res.ok) throw new Error(`Could not load model: ${res.status}`);
        const data = await res.json();
        setModel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModel();
  }, [modelId]);

  /* Shared back-link */
  const BackLink = () => (
    <Link
      to="/"
      className="
        inline-flex items-center gap-2 mb-6 text-sm font-medium
        text-slate-500 dark:text-slate-400
        border border-slate-300 dark:border-[rgba(0,212,255,0.25)]
        px-4 py-1.5 rounded-full
        hover:text-sky-500 dark:hover:text-accent-cyan
        hover:border-sky-400 dark:hover:border-accent-cyan
        hover:shadow-[0_0_12px_rgba(14,165,233,0.2)]
        transition-all duration-200
      "
    >
      <ArrowLeft size={16} /> Back to Gallery
    </Link>
  );

  /* Loading skeleton */
  if (loading) {
    return (
      <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-8">
        <div className="
          bg-white dark:bg-[rgba(10,10,40,0.8)]
          border border-slate-200 dark:border-[rgba(0,212,255,0.1)]
          rounded-3xl p-8 animate-pulse space-y-4
        ">
          <div className="h-8 w-3/5 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-4 w-2/5 rounded bg-slate-100 dark:bg-white/[0.06]" />
          <div className="h-4 w-1/4 rounded bg-slate-100 dark:bg-white/[0.06]" />
          <div className="h-6 w-1/3 rounded-full bg-sky-100 dark:bg-accent-cyan/10 mt-4" />
        </div>
      </main>
    );
  }

  /* Error */
  if (error || !model) {
    return (
      <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-red-50 border border-red-200 text-red-500 dark:bg-red-500/[0.08] dark:border-red-500/30 dark:text-red-400">
          ⚡ {error || 'Model not found.'}
        </div>
        <BackLink />
      </main>
    );
  }

  const author = model.id.includes('/') ? model.id.split('/')[0] : 'huggingface';
  const name   = model.id.includes('/') ? model.id.split('/').pop() : model.id;

  return (
    <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-8 animate-fadeIn">
      <BackLink />

      {/* Main card */}
      <div className="
        bg-white dark:bg-gradient-to-br dark:from-[rgba(10,10,40,0.9)] dark:to-[rgba(20,5,50,0.8)]
        border border-slate-200 dark:border-[rgba(0,212,255,0.2)]
        rounded-3xl p-6 md:p-10
        backdrop-blur-xl
        shadow-xl dark:shadow-[0_0_60px_rgba(0,212,255,0.07)]
      ">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="font-orbitron text-2xl md:text-3xl font-black break-all gradient-text-light dark:gradient-text-dark">
              {name}
            </h2>
            <p className="text-sm italic text-slate-400 dark:text-slate-500 mt-1">by {author}</p>
          </div>

          {/* Bookmark button */}
          <button
            onClick={() => toggleBookmark(model.id)}
            className={`
              inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold
              border transition-all duration-200 whitespace-nowrap
              ${isBookmarked
                ? 'border-sky-400 bg-sky-50 text-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.25)] dark:border-accent-cyan dark:bg-accent-cyan/15 dark:text-accent-cyan dark:shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                : 'border-slate-300 bg-slate-50 text-slate-500 dark:border-white/20 dark:bg-white/5 dark:text-slate-300'}
              hover:scale-105 active:scale-95
            `}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-7">
          {model.pipeline_tag && (
            <span className="text-[0.65rem] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-200 dark:bg-accent-cyan/10 dark:text-accent-cyan dark:border-[rgba(0,212,255,0.25)]">
              {model.pipeline_tag}
            </span>
          )}
          {model.library_name && (
            <span className="text-[0.65rem] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-violet-50 text-violet-500 border border-violet-200 dark:bg-accent-purple/10 dark:text-purple-400 dark:border-[rgba(155,89,255,0.25)]">
              {model.library_name}
            </span>
          )}
          {(model.tags || []).slice(0, 6).map(t => (
            <span key={t} className="text-[0.65rem] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 dark:bg-white/[0.05] dark:text-slate-400 dark:border-white/10">
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 mb-8">
          <div className="flex items-center gap-3">
            <Download size={20} className="text-slate-400 dark:text-slate-500" />
            <div className="flex flex-col">
              <span className="font-orbitron text-3xl font-extrabold leading-none text-sky-500 dark:text-accent-cyan" style={{ textShadow: '0 0 15px rgba(0,212,255,0.4)' }}>
                {formatNumber(model.downloads)}
              </span>
              <span className="text-[0.65rem] uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">Downloads</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-slate-400 dark:text-slate-500" />
            <div className="flex flex-col">
              <span className="font-orbitron text-3xl font-extrabold leading-none text-sky-500 dark:text-accent-cyan" style={{ textShadow: '0 0 15px rgba(0,212,255,0.4)' }}>
                {formatNumber(model.likes)}
              </span>
              <span className="text-[0.65rem] uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">Likes</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-7">
          <button
            onClick={copyId}
            className="
              flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
              bg-sky-50 text-sky-600 border border-sky-200
              dark:bg-accent-cyan/10 dark:text-accent-cyan dark:border-[rgba(0,212,255,0.25)]
              hover:bg-sky-100 dark:hover:bg-accent-cyan/20
              hover:shadow-[0_0_12px_rgba(14,165,233,0.2)] dark:hover:shadow-[0_0_12px_rgba(0,212,255,0.25)]
              transition-all duration-200
            "
            aria-label="Copy Model ID"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Model ID'}
          </button>

          <a
            href={`https://huggingface.co/${model.id}`}
            target="_blank"
            rel="noreferrer"
            className="
              flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
              bg-violet-50 text-violet-600 border border-violet-200
              dark:bg-accent-purple/10 dark:text-purple-400 dark:border-[rgba(155,89,255,0.25)]
              hover:bg-violet-100 dark:hover:bg-accent-purple/20
              hover:shadow-[0_0_12px_rgba(139,92,246,0.2)] dark:hover:shadow-[0_0_12px_rgba(155,89,255,0.25)]
              transition-all duration-200
            "
          >
            <ExternalLink size={16} /> View on Hugging Face
          </a>
        </div>

        {/* Meta info */}
        {model.cardData?.language && (
          <div className="border-t border-slate-200 dark:border-[rgba(0,212,255,0.12)] pt-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <p>
              <strong className="text-slate-700 dark:text-slate-300">Language:</strong>{' '}
              {Array.isArray(model.cardData.language)
                ? model.cardData.language.join(', ')
                : model.cardData.language}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
