import { usePokemonContext } from '@/context/PokemonContext';
import type { PokemonListItem } from '@/types/pokemon';

export interface UsePokemonReturn {
  filteredPokemon: PokemonListItem[];
  paginatedPokemon: PokemonListItem[];
  totalFiltered: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  isFavorited: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTypes: (types: string[]) => void;
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

/**
 * Custom hook for filtering, searching, and paginating Pokémon
 * Depends on usePokemonContext for state
 */
export function usePokemon(
  allPokemon: PokemonListItem[]
): UsePokemonReturn {
  const { state, dispatch } = usePokemonContext();

  // Filter by search query
  const searchFiltered = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  // Filter by selected types (if types are selected)
  const typeFiltered =
    state.selectedTypes.length === 0
      ? searchFiltered
      : searchFiltered.filter((pokemon) =>
          pokemon.types.some((type) =>
            state.selectedTypes.includes(type)
          )
        );

  const totalFiltered = typeFiltered.length;
  const totalPages = Math.ceil(totalFiltered / state.pageSize);

  // Paginate
  const startIndex = (state.currentPage - 1) * state.pageSize;
  const endIndex = startIndex + state.pageSize;
  const paginatedPokemon = typeFiltered.slice(startIndex, endIndex);

  // Helper functions
  const isFavorited = (id: number) => state.favorites.includes(id);

  const toggleFavorite = (id: number) => {
    if (isFavorited(id)) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: id });
    }
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSelectedTypes = (types: string[]) => {
    dispatch({ type: 'SET_SELECTED_TYPES', payload: types });
  };

  const setCurrentPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    }
  };

  const goToNextPage = () => {
    if (state.currentPage < totalPages) {
      setCurrentPage(state.currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (state.currentPage > 1) {
      setCurrentPage(state.currentPage - 1);
    }
  };

  return {
    filteredPokemon: typeFiltered,
    paginatedPokemon,
    totalFiltered,
    totalPages,
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    isFavorited,
    toggleFavorite,
    setSearchQuery,
    setSelectedTypes,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
  };
}
