
import React from 'react';
import type { MovieDetails } from '../types';

interface HeroSectionProps {
  movie: MovieDetails | null;
  onWatchTrailer: (movie: MovieDetails) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie, onWatchTrailer }) => {
  if (!movie) {
    return (
        <div className="h-[60vh] bg-gray-800 flex items-center justify-center text-white">
            <p>No featured movie available.</p>
        </div>
    );
  }

  return (
    <div className="relative h-[60vh] w-full text-white">
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-12">
        <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">{movie.title}</h2>
        <p className="max-w-3xl text-lg drop-shadow-md mb-6 hidden md:block">{movie.synopsis.substring(0, 150)}...</p>
        <div className="flex space-x-4">
            <button 
                onClick={() => onWatchTrailer(movie)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 hover:scale-105"
            >
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
