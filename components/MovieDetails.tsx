
import React, { useState, useEffect } from 'react';
import type { Movie, MovieDetails as MovieDetailsType } from '../types';
import { getMovieDetails } from '../services/geminiService';
import Spinner from './Spinner';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [details, setDetails] = useState<MovieDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movieDetails = await getMovieDetails(movie.title);
        setDetails(movieDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movie details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movie.title]);

  // Handle Escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-full overflow-y-auto relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl z-10"
        >
          &times;
        </button>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center"><Spinner /></div>
        ) : error ? (
          <div className="h-96 flex items-center justify-center text-red-500">{error}</div>
        ) : details && (
          <div className="md:flex">
            <div className="md:w-1/3">
              <img src={details.posterUrl} alt={details.title} className="rounded-l-lg w-full h-full object-cover" />
            </div>
            <div className="md:w-2/3 p-6">
              <h2 className="text-3xl font-bold mb-2">{details.title} ({details.year})</h2>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400 font-bold text-lg">{details.rating}/10</span>
                <div className="ml-4 flex flex-wrap gap-2">
                  {details.genres.map(genre => (
                    <span key={genre} className="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{genre}</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6">{details.synopsis}</p>

              {details.trailerUrl && (
                 <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      src={details.trailerUrl.replace('watch?v=', 'embed/')} 
                      title={`${details.title} Trailer`} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    ></iframe>
                  </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
