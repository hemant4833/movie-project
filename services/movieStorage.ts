import type { MovieDetails } from '../types';

const LOCAL_STORAGE_KEY = 'geminiMovieStreamAdminMovies';

// Helper to safely parse JSON from localStorage
const safeJsonParse = <T>(jsonString: string | null): T | null => {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.error("Failed to parse JSON from localStorage", e);
    return null;
  }
};

export const getStoredMovies = (): MovieDetails[] => {
  const moviesJson = localStorage.getItem(LOCAL_STORAGE_KEY);
  return safeJsonParse<MovieDetails[]>(moviesJson) || [];
};

export const addStoredMovie = (movie: MovieDetails): void => {
  const existingMovies = getStoredMovies();
  // Avoid adding duplicates based on title
  if (existingMovies.some(m => m.title.toLowerCase() === movie.title.toLowerCase())) {
    console.warn(`Movie "${movie.title}" already exists.`);
    // Overwrite existing movie with the same title
    const updatedMovies = existingMovies.map(m => m.title.toLowerCase() === movie.title.toLowerCase() ? movie : m);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMovies));
    return;
  }
  const updatedMovies = [movie, ...existingMovies];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMovies));
};
