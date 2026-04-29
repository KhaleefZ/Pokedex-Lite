// lib/storage.ts

const FAVORITES_KEY = 'pokedex_favorites';

/**
 * Save favorites to localStorage
 */
export function saveFavorites(favorites: number[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
}

/**
 * Load favorites from localStorage
 */
export function loadFavorites(): number[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load favorites:', error);
    return [];
  }
}

/**
 * Clear all favorites from localStorage
 */
export function clearFavorites(): void {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Failed to clear favorites:', error);
  }
}
