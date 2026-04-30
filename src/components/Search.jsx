import React from 'react';
import { Search as SearchIcon, Filter, ArrowUpDown } from 'lucide-react';
import { useModels } from '../context/ModelContext';

/* Shared box style for search/filter inputs */
const boxCls = `
  flex items-center gap-3
  bg-[rgba(10,10,40,0.7)]
  border border-[rgba(0,212,255,0.2)]
  rounded-2xl px-4 py-3
  backdrop-blur-md
  transition-all duration-200
  focus-within:border-accent-cyan
  focus-within:shadow-[0_0_20px_rgba(0,212,255,0.2)]
`;

const iconCls = 'shrink-0 text-accent-cyan';

const inputCls = `
  bg-transparent border-none outline-none w-full
  text-sm text-slate-100
  placeholder-slate-500
  font-inter
`;

const selectCls = `
  bg-transparent border-none outline-none cursor-pointer appearance-none pr-1
  text-sm text-slate-200
  font-inter [color-scheme:dark]
`;

export default function Search() {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, sortBy, setSortBy } = useModels();

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-10">
      {/* Search box */}
      <div className={`${boxCls} flex-1 min-w-[240px]`}>
        <SearchIcon className={iconCls} size={20} />
        <input
          type="text"
          placeholder="Search models by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={inputCls}
          id="model-search"
          aria-label="Search models"
        />
      </div>

      {/* Category filter */}
      <div className={boxCls}>
        <Filter className={iconCls} size={20} />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={selectCls}
          id="category-filter"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          <option value="text-generation">Text Generation</option>
          <option value="image-classification">Image Classification</option>
          <option value="text-to-image">Text to Image</option>
          <option value="automatic-speech-recognition">Speech Recognition</option>
          <option value="text-classification">Text Classification</option>
          <option value="feature-extraction">Feature Extraction</option>
          <option value="fill-mask">Fill Mask</option>
          <option value="object-detection">Object Detection</option>
        </select>
      </div>

      {/* Sort */}
      <div className={boxCls}>
        <ArrowUpDown className={iconCls} size={20} />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={selectCls}
          id="sort-select"
          aria-label="Sort models"
        >
          <option value="downloads">Most Popular</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>
    </div>
  );
}
