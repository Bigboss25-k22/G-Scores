import { useState } from 'react';
import { apiService } from '../services/api';
import { SubjectReportResponse } from '../types/report';

export function useSubjectReport() {
  const [data, setData] = useState<SubjectReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (subject: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getSubjectReport(subject);
      setData(res);
    } catch (e: any) {
      setError(e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, search };
} 