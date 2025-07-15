import { useState } from 'react';
import { apiService } from '../services/api';

export interface TopBlockStudent {
  regNumber: string;
  name: string;
  totalScore: number;
  subjects: { name: string; score: number }[];
}

export function useTopBlock() {
  const [data, setData] = useState<TopBlockStudent[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTopBlock = async (block: string) => {
    setLoading(true);
    setError(null);
    try {
      const json = await apiService.getTopBlock(block);
      if (json.success) {
        setData(json.data);
      } else {
        setError(json.message || 'Lỗi không xác định');
      }
    } catch (e: any) {
      setError(e.message || 'Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchTopBlock };
} 