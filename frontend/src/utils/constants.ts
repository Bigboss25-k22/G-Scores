import { Home, Search, BarChart3, Settings } from 'lucide-react';
import { MenuItemType } from '../types';

export const MENU_ITEMS: MenuItemType[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'search', label: 'Search Scores', icon: Search },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px'
} as const;

export const API_ENDPOINTS = {
  SEARCH_SCORES: '/api/scores/search',
  GET_STUDENT_INFO: '/api/student',
  GET_REPORTS: '/api/reports'
} as const; 