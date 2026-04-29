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
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300">
        <div
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-3xl font-bold text-gray-800 capitalize">
              {pokemon.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition"
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
                  className="w-48 h-48 object-contain bg-gray-100 rounded-lg p-4"
                />
              </div>

              {/* Basic Info */}
              <div className="flex-grow space-y-4">
                {/* Type Badges */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium capitalize"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Physical Attributes */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Height</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {pokemon.height / 10} m
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Weight</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {pokemon.weight / 10} kg
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Base Experience</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {pokemon.baseExperience}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-3">Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.name} className="flex items-center gap-3">
                    <span className="w-24 text-sm font-medium text-gray-700 capitalize">
                      {stat.name}
                    </span>
                    <div className="flex-grow bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-semibold text-gray-700">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div>
              <h3 className="font-semibold text-gray-800 text-lg mb-3">
                Abilities
              </h3>
              <div className="space-y-2">
                {pokemon.abilities.map((ability) => (
                  <div
                    key={ability.name}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                  >
                    <span className="font-medium text-gray-800 capitalize">
                      {ability.name}
                    </span>
                    {ability.isHidden && (
                      <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded font-semibold">
                        Hidden
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
