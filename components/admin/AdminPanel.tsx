import React, { useState } from 'react';
import type { MovieDetails } from '../../types';

interface AdminPanelProps {
  onAddMovie: (movie: MovieDetails) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddMovie, onLogout }) => {
  const [movie, setMovie] = useState<Partial<MovieDetails>>({
    title: '',
    year: '',
    posterUrl: '',
    synopsis: '',
    genres: [],
    rating: 0,
    trailerUrl: '',
  });
  const [genresInput, setGenresInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: name === 'rating' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie.title || !movie.year || !movie.posterUrl || !movie.synopsis) {
        alert('Please fill out all required fields.');
        return;
    }

    const finalMovie: MovieDetails = {
      id: crypto.randomUUID(),
      title: movie.title,
      year: movie.year,
      posterUrl: movie.posterUrl,
      synopsis: movie.synopsis,
      genres: genresInput.split(',').map(g => g.trim()).filter(Boolean),
      rating: movie.rating || 0,
      trailerUrl: movie.trailerUrl,
    };
    onAddMovie(finalMovie);
    alert(`Movie "${finalMovie.title}" added successfully!`);
    // Reset form
    e.currentTarget.closest('form')?.reset();
    setMovie({});
    setGenresInput('');
  };
  
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Panel - Add Movie</h1>
            <button
                onClick={onLogout}
                className="px-4 py-2 font-semibold text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
                Logout
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg shadow-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title-input" className="block text-sm font-medium text-gray-300">Title</label>
              <input id="title-input" type="text" name="title" onChange={handleChange} placeholder="Movie Title" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-white p-2" />
            </div>
            <div>
              <label htmlFor="year-input" className="block text-sm font-medium text-gray-300">Year</label>
              <input id="year-input" type="text" name="year" onChange={handleChange} placeholder="2023" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-white p-2" />
            </div>
          </div>
          <div>
            <label htmlFor="poster-url-input" className="block text-sm font-medium text-gray-300">Poster URL</label>
            <input id="poster-url-input" type="url" name="posterUrl" onChange={handleChange} placeholder="https://..." required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-white p-2" />
          </div>
          <div>
            <label htmlFor="synopsis-input" className="block text-sm font-medium text-gray-300">Synopsis</label>
            <textarea id="synopsis-input" name="synopsis" rows={4} onChange={handleChange} placeholder="A short summary of the movie..." required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-white p-2"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="genres-input" className="block text-sm font-medium text-gray-300">Genres (comma-separated)</label>
              <input id="genres-input" type="text" value={genresInput} onChange={(e) => setGenresInput(e.target.value)} placeholder="Action, Thriller, Sci-Fi" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-white p-2" />
            </div>
            <div>
              <label htmlFor="rating-input" className="block text-sm font-medium text-gray-300">Rating (0-10)</label>
              <input id="rating-input" type="number" name="rating" step="0.1" min="0" max="10" onChange={handleChange} placeholder="8.5" required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-white p-2" />
            </div>
          </div>
          <div>
            <label htmlFor="trailer-url-input" className="block text-sm font-medium text-gray-300">Trailer URL (YouTube Embed)</label>
            <input id="trailer-url-input" type="url" name="trailerUrl" onChange={handleChange} placeholder="https://www.youtube.com/embed/..." className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 text-white p-2" />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-colors"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminPanel;
