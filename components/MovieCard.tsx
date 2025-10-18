
import React from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelectMovie }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
      onClick={() => onSelectMovie(movie)}
    >
      <img 
        src={movie.posterUrl} 
        alt={movie.title} 
        className="w-full h-auto object-cover aspect-[2/3]"
        onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src='https://picsum.photos/500/750';
        }}
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate group-hover:text-red-400 transition-colors duration-300">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
