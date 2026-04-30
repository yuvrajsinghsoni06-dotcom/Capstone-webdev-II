import React from 'react';
import ModelCard from './ModelCard';

/* Skeleton single card */
const SkeletonCard = ({ delay }) => (
  <div
    className="
      bg-white dark:bg-[rgba(10,10,40,0.6)]
      border border-slate-200 dark:border-[rgba(0,212,255,0.08)]
      rounded-2xl p-5 animate-pulse min-h-[200px] space-y-3
    "
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="h-5 w-3/5 rounded bg-slate-200 dark:bg-white/10" />
    <div className="h-3 w-2/5 rounded bg-slate-100 dark:bg-white/[0.06]" />
    <div className="h-5 w-1/3 rounded-full bg-sky-100 dark:bg-accent-cyan/10 mt-4" />
    <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-white/[0.06] mt-6" />
  </div>
);

export default function ModelList({ models, loading, bookmarkedIds, toggleBookmark }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} delay={i * 0.1} />
        ))}
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="
        text-center py-20 px-8 rounded-2xl
        bg-white dark:bg-[rgba(10,10,40,0.5)]
        border border-dashed border-slate-300 dark:border-[rgba(0,212,255,0.2)]
        text-slate-400 dark:text-slate-500 text-base
        backdrop-blur-sm
      ">
        <p className="text-4xl mb-4">🔍</p>
        <p className="font-semibold">No models found matching your criteria.</p>
        <p className="text-sm mt-1 text-slate-400">Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {models.map(model => (
        <ModelCard
          key={model.id}
          model={model}
          isBookmarked={bookmarkedIds.includes(model.id)}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
}
