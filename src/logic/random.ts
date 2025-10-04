/**
 * Seeded random number generator using a simple LCG (Linear Congruential Generator)
 * Returns a function that generates deterministic random numbers between 0 and 1
 */
export function seededRand(seed: number): () => number {
  let state = seed;

  return function() {
    // LCG parameters (using values from Numerical Recipes)
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;

    state = (a * state + c) % m;
    return state / m;
  };
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randInt(rng: () => number, min: number, max: number, step: number = 1): number {
  const range = Math.floor((max - min) / step) + 1;
  return min + Math.floor(rng() * range) * step;
}

/**
 * Generate a random float between min and max
 */
export function randFloat(rng: () => number, min: number, max: number, decimals: number = 2): number {
  const value = min + rng() * (max - min);
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}

/**
 * Pick a random element from an array
 */
export function randChoice<T>(rng: () => number, choices: T[]): T {
  const index = Math.floor(rng() * choices.length);
  return choices[index];
}
