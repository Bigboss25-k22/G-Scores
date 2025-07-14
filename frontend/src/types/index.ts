export interface MenuItemType {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface UserScore {
  id: string;
  registrationNumber: string;
  subject: string;
  score: number;
  grade: string;
  date: string;
}

export interface AppState {
  activeSection: string;
  isMobileMenuOpen: boolean;
  registrationNumber: string;
  scores: UserScore[];
  loading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'SET_REGISTRATION_NUMBER'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SCORES'; payload: UserScore[] };

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setActiveSection: (section: string) => void;
  toggleMobileMenu: () => void;
  setRegistrationNumber: (number: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setScores: (scores: UserScore[]) => void;
} 