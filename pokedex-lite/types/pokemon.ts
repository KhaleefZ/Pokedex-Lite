// types/pokemon.ts

/**
 * Represents a single Pokémon in list view
 */
export interface PokemonListItem {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
}

/**
 * Represents a stat (HP, Attack, etc.)
 */
export interface PokemonStat {
  name: string;
  value: number;
}

/**
 * Represents an ability (can be hidden or normal)
 */
export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

/**
 * Represents full Pokémon details
 */
export interface PokemonDetail extends PokemonListItem {
  height: number; // in decimeters
  weight: number; // in hectograms
  baseExperience: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

/**
 * App context state type
 */
export interface AppContextState {
  // Favorites management
  favorites: number[]; // Array of Pokémon IDs

  // Search & Filter
  searchQuery: string;
  selectedTypes: string[];

  // Pagination
  currentPage: number;
  pageSize: number;
  paginationMode: 'traditional' | 'infinite';

  // Detail modal
  selectedPokemonId: number | null;
  showDetailModal: boolean;

  // Loading/Error states
  isLoading: boolean;
  error: string | null;
}

/**
 * Action types for context reducer
 */
export type AppContextAction =
  | { type: 'ADD_FAVORITE'; payload: number }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_TYPES'; payload: string[] }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'SET_PAGINATION_MODE'; payload: 'traditional' | 'infinite' }
  | { type: 'OPEN_DETAIL_MODAL'; payload: number }
  | { type: 'CLOSE_DETAIL_MODAL' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_FAVORITES'; payload: number[] };

/**
 * PokéAPI response: List of Pokémon
 */
export interface PokeAPIListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * PokéAPI response: Pokémon detail
 */
export interface PokeAPIDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
}

/**
 * PokéAPI response: List of types
 */
export interface PokeAPITypesResponse {
  results: Array<{
    name: string;
    url: string;
  }>;
}
