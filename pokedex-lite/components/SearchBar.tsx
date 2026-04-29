'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

/**
 * SearchBar component
 * Text input for searching Pokémon by name with debouncing
 */
export function SearchBar({
  onSearch,
  placeholder = 'Search Pokémon by name...',
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  // Debounce search to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="mt-2 px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
        >
          Clear
        </button>
      )}
    </div>
  );
}
