import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-2">
              <span className="bg-red-500 text-white font-black text-2xl px-2 py-1 rounded-md">HJ</span>
              <span>MovieStream</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;