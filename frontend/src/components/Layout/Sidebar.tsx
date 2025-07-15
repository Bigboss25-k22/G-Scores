import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MENU_ITEMS } from '../../utils/constants';

const Sidebar: React.FC = () => {
  const { state, setActiveSection, toggleMobileMenu } = useApp();

  const handleMenuItemClick = (itemId: string): void => {
    setActiveSection(itemId);
    if (state.isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50 w-64 
      transform ${state.isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0 transition-transform duration-300 ease-in-out lg:transition-none
      bg-gradient-to-b from-yellow-400 via-yellow-500 to-teal-500
    `}>
      <div className="flex items-center justify-between p-4 lg:justify-center">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden text-gray-800 hover:text-gray-600"
          aria-label="Close mobile menu"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="mt-8">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuItemClick(item.id)}
              className={`
                w-full flex items-center px-6 py-3 text-left text-gray-800 
                hover:bg-black hover:bg-opacity-10 transition-colors
                ${state.activeSection === item.id ? 'bg-black bg-opacity-20 font-bold text-blue-900' : ''}
              `}
            >
              <Icon className="mr-3" size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 