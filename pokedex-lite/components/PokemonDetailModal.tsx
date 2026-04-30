'use client';

import React from 'react';
import type { PokemonDetail } from '@/types/pokemon';

interface PokemonDetailModalProps {
  pokemon: PokemonDetail;
  isOpen: boolean;
  onClose: () => void;
}

export function PokemonDetailModal({
  pokemon,
  isOpen,
  onClose,
}: PokemonDetailModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black dark:bg-black bg-opacity-50 dark:bg-opacity-60 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 dark:from-blue-900 to-purple-50 dark:to-purple-900">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white capitalize">
              {pokemon.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold transition"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Image and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="w-48 h-48 object-contain bg-gradient-to-b from-blue-100 dark:from-blue-900 to-blue-50 dark:to-blue-800 rounded-lg p-4 shadow-md"
                />
              </div>

              {/* Basic Info */}
              <div className="flex-grow space-y-4">
                {/* Type Badges */}
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-full text-sm font-medium capitalize hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Physical Attributes */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Height</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {pokemon.height / 10} m
                    </p>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Weight</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {pokemon.weight / 10} kg
                    </p>
                  </div>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Base Experience</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {pokemon.baseExperience}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-3">Stats</h3>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.name} className="flex items-center gap-3">
                    <span className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {stat.name}
                    </span>
                    <div className="flex-grow bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-2 rounded-full transition-all duration-300 shadow-sm"
                        style={{
                          width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white text-lg mb-3">
                Abilities
              </h3>
              <div className="space-y-2">
                {pokemon.abilities.map((ability) => (
                  <div
                    key={ability.name}
                    className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                      {ability.name}
                    </span>
                    {ability.isHidden && (
                      <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded font-semibold">
                        Hidden ✨
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
