import { useState } from 'react';
import { TopBlockResponse } from '../types/score';
import { fetchTopBlock } from '../services/api';

export function useTopBlock() {
  const [data, setData] = useState<TopBlockResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (regNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchTopBlock(regNumber);
      setData(res);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, search };
} 