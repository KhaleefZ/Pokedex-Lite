// lib/pokeapi.ts

import { POKEAPI_BASE_URL } from './constants';
import type {
  PokemonListItem,
  PokemonDetail,
  PokeAPIListResponse,
  PokeAPIDetailResponse,
  PokeAPITypesResponse,
} from '@/types/pokemon';

/**
 * Fetch a list of Pokémon with pagination
 */
export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<{
  pokemon: PokemonListItem[];
  total: number;
}> {
  try {
    const url = `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: PokeAPIListResponse = await response.json();

    const pokemon: PokemonListItem[] = data.results.map((p, index) => {
      const id = offset + index + 1;
      return {
        id,
        name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        types: [],
      };
    });

    return {
      pokemon,
      total: data.count,
    };
  } catch (error) {
    console.error('Failed to fetch Pokémon list:', error);
    throw new Error('Failed to fetch Pokémon list');
  }
}

/**
 * Fetch detailed information for a specific Pokémon
 */
export async function fetchPokemonDetail(
  idOrName: number | string
): Promise<PokemonDetail> {
  try {
    const url = `${POKEAPI_BASE_URL}/pokemon/${idOrName}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: PokeAPIDetailResponse = await response.json();

    return {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      imageUrl:
        data.sprites.other['official-artwork'].front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      height: data.height,
      weight: data.weight,
      baseExperience: data.base_experience,
      types: data.types.map((t) => t.type.name),
      stats: data.stats.map((s) => ({
        name: s.stat.name.toUpperCase(),
        value: s.base_stat,
      })),
      abilities: data.abilities.map((a) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
      })),
    };
  } catch (error) {
    console.error('Failed to fetch Pokémon detail:', error);
    throw new Error('Failed to fetch Pokémon details');
  }
}

/**
 * Fetch all available Pokémon types
 */
export async function fetchPokemonTypes(): Promise<string[]> {
  try {
    const url = `${POKEAPI_BASE_URL}/type`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: PokeAPITypesResponse = await response.json();

    // Filter out unknown type and sort alphabetically
    return data.results
      .map((t) => t.name)
      .filter((t) => t !== 'unknown')
      .sort();
  } catch (error) {
    console.error('Failed to fetch Pokémon types:', error);
    throw new Error('Failed to fetch Pokémon types');
  }
}

/**
 * Enhance Pokémon list items with type information
 */
export async function enrichPokemonWithTypes(
  pokemon: PokemonListItem[]
): Promise<PokemonListItem[]> {
  try {
    const enriched = await Promise.all(
      pokemon.map(async (p) => {
        try {
          const detail = await fetchPokemonDetail(p.id);
          return {
            ...p,
            types: detail.types,
          };
        } catch {
          return p;
        }
      })
    );
    return enriched;
  } catch (error) {
    console.error('Failed to enrich Pokémon with types:', error);
    return pokemon;
  }
}
