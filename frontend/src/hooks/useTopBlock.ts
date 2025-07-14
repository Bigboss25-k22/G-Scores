import { useState } from 'react';

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
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/top-block?block=${encodeURIComponent(block)}`);
      const json = await res.json();
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