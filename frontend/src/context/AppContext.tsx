import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, AppContextType, UserScore } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  activeSection: 'search',
  isMobileMenuOpen: false,
  registrationNumber: '',
  scores: [],
  loading: false,
  error: null
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case 'SET_REGISTRATION_NUMBER':
      return { ...state, registrationNumber: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SCORES':
      return { ...state, scores: action.payload };
    default:
      return state;
  }
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value: AppContextType = {
    state,
    dispatch,
    setActiveSection: (section: string) => 
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: section }),
    toggleMobileMenu: () => 
      dispatch({ type: 'TOGGLE_MOBILE_MENU' }),
    setRegistrationNumber: (number: string) => 
      dispatch({ type: 'SET_REGISTRATION_NUMBER', payload: number }),
    setLoading: (loading: boolean) => 
      dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error: string | null) => 
      dispatch({ type: 'SET_ERROR', payload: error }),
    setScores: (scores: UserScore[]) => 
      dispatch({ type: 'SET_SCORES', payload: scores })
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 