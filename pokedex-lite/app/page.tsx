'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { SearchBar } from '@/components/SearchBar';
import { TypeFilter } from '@/components/TypeFilter';
import { PokemonDetailModal } from '@/components/PokemonDetailModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { usePokemonContext } from '@/context/PokemonContext';
import { usePokemon } from '@/hooks/usePokemon';
import { fetchPokemonList, enrichPokemonWithTypes, fetchPokemonDetail } from '@/lib/pokeapi';
import type { PokemonListItem, PokemonDetail } from '@/types/pokemon';

export default function Home() {
  const { state, dispatch } = usePokemonContext();
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [initialError, setInitialError] = useState<string | null>(null);
  const [selectedPokemonDetail, setSelectedPokemonDetail] = useState<PokemonDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const {
    paginatedPokemon,
    totalFiltered,
    totalPages,
    currentPage,
    isFavorited,
    toggleFavorite,
    setSearchQuery,
    setSelectedTypes,
    goToNextPage,
    goToPreviousPage,
  } = usePokemon(allPokemon);

  // Fetch initial Pokémon list on mount
  useEffect(() => {
    const loadInitialPokemon = async () => {
      try {
        setIsInitialLoading(true);
        setInitialError(null);
        dispatch({ type: 'SET_LOADING', payload: true });

        // Fetch initial list
        const { pokemon, total } = await fetchPokemonList(20, 0);

        // Enrich with types
        const enriched = await enrichPokemonWithTypes(pokemon);

        setAllPokemon(enriched);
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        console.error('Failed to load Pokémon:', error);
        setInitialError(
          'Failed to load Pokémon. Please check your internet connection and try again.'
        );
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to load Pokémon',
        });
      } finally {
        setIsInitialLoading(false);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadInitialPokemon();
  }, [dispatch]);

  const handleRetry = () => {
    setInitialError(null);
    setIsInitialLoading(true);
    const loadInitialPokemon = async () => {
      try {
        const { pokemon } = await fetchPokemonList(20, 0);
        const enriched = await enrichPokemonWithTypes(pokemon);
        setAllPokemon(enriched);
      } catch (error) {
        console.error('Retry failed:', error);
        setInitialError('Failed to load Pokémon. Please try again.');
      } finally {
        setIsInitialLoading(false);
      }
    };
    loadInitialPokemon();
  };

  const handleOpenPokemonDetail = async (pokemon: PokemonListItem) => {
    try {
      setIsDetailLoading(true);
      const detail = await fetchPokemonDetail(pokemon.id);
      setSelectedPokemonDetail(detail);
    } catch (error) {
      console.error('Failed to load Pokémon detail:', error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleClosePokemonDetail = () => {
    setSelectedPokemonDetail(null);
  };

  if (isInitialLoading) {
    return <LoadingSpinner />;
  }

  if (initialError) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Pokédex
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{initialError}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header with Theme Toggle */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">🔴 Pokédex Lite</h1>
            <p className="text-blue-100">
              Explore and favorite your favorite Pokémon
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🔍 Search & Filter
          </h2>

          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search by Name
            </label>
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Type
            </label>
            <TypeFilter
              selectedTypes={state.selectedTypes}
              onTypesChange={setSelectedTypes}
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ✨ Pokémon ({totalFiltered})
          </h2>
          {totalFiltered > 0 && (
            <p className="text-gray-600 dark:text-gray-400">
              Showing {(currentPage - 1) * 20 + 1} -{' '}
              {Math.min(currentPage * 20, totalFiltered)} of {totalFiltered}
            </p>
          )}
        </div>

        {/* Pokemon Grid */}
        {paginatedPokemon.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {paginatedPokemon.map((pokemon) => (
                <div
                  key={pokemon.id}
                  onClick={() => handleOpenPokemonDetail(pokemon)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition duration-300 cursor-pointer transform"
                >
                  {/* Pokemon Image */}
                  <div className="bg-gradient-to-b from-blue-50 dark:from-blue-900 to-blue-100 dark:to-blue-800 p-4 flex justify-center">
                    <img
                      src={pokemon.imageUrl}
                      alt={pokemon.name}
                      className="h-32 w-32 object-contain drop-shadow-lg"
                      loading="lazy"
                    />
                  </div>

                  {/* Pokemon Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                      {pokemon.name}
                    </h3>

                    {/* Types */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pokemon.types.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full font-medium capitalize"
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(pokemon.id);
                      }}
                      className={`w-full py-2 rounded-lg font-medium transition transform hover:scale-105 ${
                        isFavorited(pokemon.id)
                          ? 'bg-yellow-400 dark:bg-yellow-500 text-yellow-900 hover:bg-yellow-500 dark:hover:bg-yellow-600'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {isFavorited(pokemon.id)
                        ? '★ Favorited'
                        : '☆ Add to Favorites'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition"
                >
                  ← Previous
                </button>
                <span className="px-4 py-2 flex items-center text-gray-700 dark:text-gray-300 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No Pokémon found matching your criteria. Try adjusting your
              search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Pokemon Detail Modal */}
      {selectedPokemonDetail && (
        <PokemonDetailModal
          pokemon={selectedPokemonDetail}
          isOpen={!!selectedPokemonDetail}
          onClose={handleClosePokemonDetail}
        />
      )}
    </main>
  );
}
