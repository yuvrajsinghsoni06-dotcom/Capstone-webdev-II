import React, { Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import Search from '../components/Search';
import { useModels } from '../context/ModelContext';

const ModelList = lazy(() => import('../components/ModelList'));

const SkeletonFallback = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="bg-white dark:bg-[rgba(10,10,40,0.6)] border border-slate-200 dark:border-[rgba(0,212,255,0.08)] rounded-2xl p-5 animate-pulse min-h-[200px]"
      />
    ))}
  </div>
);

export default function Home() {
  const { loading, error, paginatedModels, bookmarkedIds, toggleBookmark, hasMore, loadMore } = useModels();

  return (
    <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8">
      <Hero />
      <Search />

      {/* API Error banner */}
      {error && (
        <div className="
          flex items-center gap-2 mb-6 px-4 py-3 rounded-xl text-sm
          bg-red-50 border border-red-200 text-red-500
          dark:bg-red-500/[0.08] dark:border-red-500/30 dark:text-red-400
        ">
          ⚡ API Error: {error}
        </div>
      )}

      <Suspense fallback={<SkeletonFallback />}>
        <ModelList
          models={paginatedModels}
          loading={loading}
          bookmarkedIds={bookmarkedIds}
          toggleBookmark={toggleBookmark}
        />
      </Suspense>

      {/* Load More */}
      {!loading && hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            className="
              font-orbitron font-bold text-sm tracking-widest uppercase
              text-white px-10 py-3.5 rounded-full
              bg-gradient-to-r from-sky-500 via-violet-500 to-accent-purple
              shadow-[0_0_25px_rgba(14,165,233,0.35)]
              hover:opacity-90 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(155,89,255,0.5)]
              transition-all duration-200
            "
            id="load-more-btn"
          >
            Load More Models
          </button>
        </div>
      )}
    </main>
  );
}
