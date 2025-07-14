import React from 'react';
import { useApp } from '../../context/AppContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import SearchScores from '../../pages/SearchScores';
import Reports from '../../pages/Reports';
import Settings from '../../pages/Settings';

const Layout: React.FC = () => {
  const { state, toggleMobileMenu } = useApp();

  const renderContent = (): React.ReactNode => {
    switch (state.activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'search':
        return <SearchScores />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <SearchScores />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header luôn nằm trên cùng */}
      <Header />
      <div className="flex flex-1">
        {/* Sidebar bên trái */}
        <Sidebar />
        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout; 