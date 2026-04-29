'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { loadFavorites, saveFavorites } from '@/lib/storage';
import type { AppContextState, AppContextAction } from '@/types/pokemon';

// Create context
const PokemonContext = createContext<
  | {
      state: AppContextState;
      dispatch: React.Dispatch<AppContextAction>;
    }
  | undefined
>(undefined);

// Initial state
const initialState: AppContextState = {
  favorites: [],
  searchQuery: '',
  selectedTypes: [],
  currentPage: 1,
  pageSize: 20,
  paginationMode: 'traditional',
  selectedPokemonId: null,
  showDetailModal: false,
  isLoading: false,
  error: null,
};

// Reducer function
function appReducer(state: AppContextState, action: AppContextAction): AppContextState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: Array.from(new Set([...state.favorites, action.payload])),
      };

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
        currentPage: 1, // Reset to page 1 when searching
      };

    case 'SET_SELECTED_TYPES':
      return {
        ...state,
        selectedTypes: action.payload,
        currentPage: 1, // Reset to page 1 when filtering
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };

    case 'SET_PAGE_SIZE':
      return {
        ...state,
        pageSize: action.payload,
        currentPage: 1,
      };

    case 'SET_PAGINATION_MODE':
      return {
        ...state,
        paginationMode: action.payload,
        currentPage: 1, // Reset when switching pagination mode
      };

    case 'OPEN_DETAIL_MODAL':
      return {
        ...state,
        selectedPokemonId: action.payload,
        showDetailModal: true,
      };

    case 'CLOSE_DETAIL_MODAL':
      return {
        ...state,
        selectedPokemonId: null,
        showDetailModal: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return state;
  }
}

// Provider component
export function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = loadFavorites();
    dispatch({ type: 'LOAD_FAVORITES', payload: savedFavorites });
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    saveFavorites(state.favorites);
  }, [state.favorites]);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {children}
    </PokemonContext.Provider>
  );
}

// Custom hook to use the context
export function usePokemonContext() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error(
      'usePokemonContext must be used within a PokemonProvider'
    );
  }
  return context;
}
