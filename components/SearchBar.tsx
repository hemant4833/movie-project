
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          disabled={isLoading}
          className="w-full bg-gray-800 text-white rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-red-500 transition-shadow duration-300"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-1.5 transition-colors duration-300 disabled:bg-gray-500"
        >
          {isLoading ? '...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
