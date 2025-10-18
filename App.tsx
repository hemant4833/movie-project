import React, { useState } from 'react';
import type { Movie, MovieDetails as MovieDetailsType } from './types';
import { useMovies } from './hooks/useMovies';
import { addStoredMovie } from './services/movieStorage';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import Spinner from './components/Spinner';
import HeroSection from './components/HeroSection';
import LoginPage from './components/admin/LoginPage';
import AdminPanel from './components/admin/AdminPanel';

type View = 'main' | 'login' | 'admin';

const AdminHeader: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <h1 className="text-xl font-bold text-white">Admin Console</h1>
                <button
                    onClick={onBack}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Back to Main Site
                </button>
            </div>
        </div>
    </header>
);

const App: React.FC = () => {
  const { movies, featuredMovie, isLoading, error, performSearch, loadMovies } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [view, setView] = useState<View>('main');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  
  const handleWatchTrailer = (movie: MovieDetailsType) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };
  
  const handleLogin = (password: string) => {
    // In a real app, this would be a secure check.
    if (password === 'password') {
        setIsAuthenticated(true);
        setView('admin');
        setLoginError(null);
    } else {
        setLoginError('Incorrect password. The correct password is "password".');
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('login');
  };
  
  const handleAddMovie = (movie: MovieDetailsType) => {
    addStoredMovie(movie);
    loadMovies(); // Reload movies to include the new one
  };
  
  if (view === 'login') {
      return (
          <div className="min-h-screen bg-gray-900 font-sans">
              <AdminHeader onBack={() => setView('main')} />
              <LoginPage onLogin={handleLogin} error={loginError} />
          </div>
      );
  }
  
  if (view === 'admin') {
      if (!isAuthenticated) {
          // This is a safeguard; handleLogin should prevent this state.
          setView('login');
          return null;
      }
      return (
          <div className="min-h-screen bg-gray-900 font-sans">
              <AdminHeader onBack={() => setView('main')} />
              <AdminPanel onAddMovie={handleAddMovie} onLogout={handleLogout} />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header />
      <main className="flex-grow">
        {isLoading && movies.length === 0 ? (
          <div className="h-[60vh] flex items-center justify-center"><Spinner /></div>
        ) : error && movies.length === 0 ? (
          <div className="h-[60vh] flex items-center justify-center text-red-500 text-lg">
            <p>Error: {error}</p>
          </div>
        ) : (
          <HeroSection movie={featuredMovie} onWatchTrailer={handleWatchTrailer} />
        )}
        
        <SearchBar onSearch={performSearch} isLoading={isLoading} />
        
        {isLoading && movies.length > 0 ? (
          <Spinner />
        ) : error ? (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-red-500">
            <p>Error loading movies: {error}</p>
          </div>
        ) : (
          <MovieGrid movies={movies} onSelectMovie={handleSelectMovie} title="Discover Movies" />
        )}

      </main>
      
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      )}

      <Footer onAdminClick={() => setView('login')} />
    </div>
  );
};

export default App;
