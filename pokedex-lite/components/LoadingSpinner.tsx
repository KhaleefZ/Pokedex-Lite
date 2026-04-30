'use client';

/**
 * LoadingSpinner component
 * Displays a loading indicator while data is being fetched
 */
export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="inline-flex">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-blue-900 border-t-blue-500 dark:border-t-blue-400"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
          Loading Pokémon...
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Fetching data from PokéAPI
        </p>
      </div>
    </div>
  );
}
