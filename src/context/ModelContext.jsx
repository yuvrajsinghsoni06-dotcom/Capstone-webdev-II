import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';

const ModelContext = createContext(null);

const PAGE_SIZE = 20;

export function ModelProvider({ children }) {
  const [allModels, setAllModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('downloads'); // 'downloads' | 'likes'
  const [page, setPage] = useState(1);

  // Bookmarks – CRUD via LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('hf_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist bookmarks on change
  useEffect(() => {
    localStorage.setItem('hf_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Debounce search query (300ms)
  const debounceTimer = useRef(null);
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // reset pagination on new search
    }, 300);
    return () => clearTimeout(debounceTimer.current);
  }, [searchQuery]);

  // Reset page when filter/sort changes
  useEffect(() => { setPage(1); }, [categoryFilter, sortBy]);

  // Fetch live data from Hugging Face API
  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://huggingface.co/api/models?limit=200&sort=${sortBy}&direction=-1`
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setAllModels(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch models.');
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, [sortBy]);

  // Derived: filter + search (debounced)
  const filteredModels = useMemo(() => {
    return allModels.filter(model => {
      const matchesSearch = model.id.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesCategory = categoryFilter ? model.pipeline_tag === categoryFilter : true;
      return matchesSearch && matchesCategory;
    });
  }, [allModels, debouncedQuery, categoryFilter]);

  // Derived: paginated slice
  const paginatedModels = useMemo(() => {
    return filteredModels.slice(0, page * PAGE_SIZE);
  }, [filteredModels, page]);

  const hasMore = paginatedModels.length < filteredModels.length;

  const loadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  // CRUD: Create bookmark
  const addBookmark = useCallback((id) => {
    setBookmarkedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  // CRUD: Delete bookmark
  const removeBookmark = useCallback((id) => {
    setBookmarkedIds(prev => prev.filter(b => b !== id));
  }, []);

  // Toggle
  const toggleBookmark = useCallback((id) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  }, []);

  const value = {
    allModels,
    paginatedModels,
    filteredModels,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    bookmarkedIds,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    hasMore,
    loadMore,
    page,
  };

  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
}

export function useModels() {
  const ctx = useContext(ModelContext);
  if (!ctx) throw new Error('useModels must be used inside ModelProvider');
  return ctx;
}
