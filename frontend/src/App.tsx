import React from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
};

export default App;
