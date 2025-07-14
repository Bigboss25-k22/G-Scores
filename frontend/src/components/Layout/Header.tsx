import React from 'react';
import { Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Header: React.FC = () => {
  const { toggleMobileMenu } = useApp();

  return (
    <header className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="flex items-center justify-center relative">
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden text-white hover:text-gray-300 mr-4 absolute left-0 top-1/2 -translate-y-1/2"
          aria-label="Toggle mobile menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-center w-full">
          G-Scores
        </h1>
      </div>
    </header>
  );
};

export default Header; 