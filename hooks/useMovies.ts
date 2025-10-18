import { useState, useEffect, useCallback } from 'react';
import type { Movie, MovieDetails } from '../types';
import { getPopularMovies, searchMovies, getMovieDetails } from '../services/geminiService';
import { getStoredMovies } from '../services/movieStorage';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const localMovies = getStoredMovies();
      const popularMovies = await getPopularMovies();
      
      const combined = [
        ...localMovies,
        // Add popular movies that aren't already in local storage (avoids duplicates)
        ...popularMovies.filter(p => !localMovies.some(l => l.title.toLowerCase() === p.title.toLowerCase())),
      ];

      setMovies(combined);

      if (combined.length > 0) {
        // If the first movie is fully detailed, use it. Otherwise, fetch details.
        if ('synopsis' in combined[0]) {
            setFeaturedMovie(combined[0] as MovieDetails);
        } else {
            const details = await getMovieDetails(combined[0].title);
            setFeaturedMovie(details);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const performSearch = useCallback(async (query: string) => {
    if (!query) {
      loadMovies();
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const localMovies = getStoredMovies();
      const localResults = localMovies.filter(m => 
        m.title.toLowerCase().includes(query.toLowerCase())
      );

      const apiResults = await searchMovies(query);

      const combined = [
        ...localResults,
        ...apiResults.filter(p => !localResults.some(l => l.title.toLowerCase() === p.title.toLowerCase())),
      ];
      
      setMovies(combined);

      if (combined.length > 0) {
        if ('synopsis' in combined[0]) {
            setFeaturedMovie(combined[0] as MovieDetails);
        } else {
            const details = await getMovieDetails(combined[0].title);
            setFeaturedMovie(details);
        }
      } else {
        setFeaturedMovie(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [loadMovies]);

  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { movies, featuredMovie, isLoading, error, performSearch, loadMovies };
};
