import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (url: string, options?: RequestInit) => Promise<T>;
  reset: () => void;
}

export const useApi = <T>(): UseApiReturn<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (url: string, options?: RequestInit): Promise<T> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setState(prev => ({ ...prev, data, loading: false }));
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  };
}; 