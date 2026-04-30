'use client';

import { useTheme } from '@/context/ThemeContext';

/**
 * ThemeToggle component
 * Provides buttons to switch between light, dark, and system theme preferences
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      {/* Light Mode Button */}
      <button
        onClick={() => setTheme('light')}
        className={`px-3 py-2 rounded-lg transition transform hover:scale-110 ${
          theme === 'light'
            ? 'bg-yellow-300 text-yellow-900 shadow-lg'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        title="Light Mode"
      >
        ☀️
      </button>

      {/* System Mode Button */}
      <button
        onClick={() => setTheme('system')}
        className={`px-3 py-2 rounded-lg transition transform hover:scale-110 ${
          theme === 'system'
            ? 'bg-blue-300 text-blue-900 shadow-lg'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        title="System Theme"
      >
        💻
      </button>

      {/* Dark Mode Button */}
      <button
        onClick={() => setTheme('dark')}
        className={`px-3 py-2 rounded-lg transition transform hover:scale-110 ${
          theme === 'dark'
            ? 'bg-purple-400 text-purple-900 shadow-lg'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
        }`}
        title="Dark Mode"
      >
        🌙
      </button>
    </div>
  );
}
