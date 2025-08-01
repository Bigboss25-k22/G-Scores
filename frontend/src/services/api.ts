import { ApiResponse, ScoreSearchRequest, ScoreSearchResponse } from '../types/api';
import { TopBlockResponse } from '../types/score';
import { SubjectReportResponse } from '../types/report';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async searchScores(request: ScoreSearchRequest): Promise<ApiResponse<ScoreSearchResponse>> {
    return this.request<ScoreSearchResponse>('/api/scores/search', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
}

// API chuẩn hóa cho toàn bộ FE
export const apiService = {
  async getStudentInfo(regNumber: string) {
    const res = await fetch(`${API_BASE_URL}/students/${regNumber}`);
    if (!res.ok) throw new Error('Failed to fetch student info');
    return res.json();
  },

  async getTopBlock(block: string) {
    const res = await fetch(`${API_BASE_URL}/top-block?block=${encodeURIComponent(block)}`);
    if (!res.ok) throw new Error('Failed to fetch top block');
    return res.json();
  },

  async getSubjectReport(subject: string) {
    const res = await fetch(`${API_BASE_URL}/report/subject?subject=${encodeURIComponent(subject)}`);
    if (!res.ok) throw new Error('Failed to fetch subject report');
    return res.json();
  },

  async getReports() {
    const res = await fetch(`${API_BASE_URL}/reports`);
    if (!res.ok) throw new Error('Failed to fetch reports');
    return res.json();
  },

  // Thêm các hàm khác nếu cần
}; 