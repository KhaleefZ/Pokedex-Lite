'use client';

import { useEffect, useState } from 'react';
import { fetchPokemonTypes } from '@/lib/pokeapi';

interface TypeFilterProps {
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
}

/**
 * TypeFilter component
 * Multi-select filter for Pokémon types
 */
export function TypeFilter({
  selectedTypes,
  onTypesChange,
}: TypeFilterProps) {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch types on mount
  useEffect(() => {
    const loadTypes = async () => {
      try {
        setLoading(true);
        const fetchedTypes = await fetchPokemonTypes();
        setTypes(fetchedTypes);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch types:', err);
        setError('Failed to load types');
      } finally {
        setLoading(false);
      }
    };

    loadTypes();
  }, []);

  const handleTypeChange = (type: string) => {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onTypesChange(updated);
  };

  if (loading) {
    return <div className="text-gray-500 dark:text-gray-400 text-sm">Loading types...</div>;
  }

  if (error) {
    return <div className="text-red-500 dark:text-red-400 text-sm">{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
              className="w-4 h-4 accent-blue-500 dark:accent-blue-400"
            />
            <span className="text-sm capitalize text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">
              {type}
            </span>
          </label>
        ))}
      </div>
      {selectedTypes.length > 0 && (
        <button
          onClick={() => onTypesChange([])}
          className="mt-2 px-4 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-sm transition"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
