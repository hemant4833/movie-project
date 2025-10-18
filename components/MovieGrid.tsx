
import React from 'react';
import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  title: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelectMovie, title }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">{title}</h2>
      {movies.length > 0 ? (
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onSelectMovie={onSelectMovie} />
            ))}
        </div>
      ) : (
        <p className="text-gray-400">No movies found.</p>
      )}
    </div>
  );
};

export default MovieGrid;
