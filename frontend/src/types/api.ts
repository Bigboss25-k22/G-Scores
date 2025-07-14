import { UserScore } from './index';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ScoreSearchRequest {
  registrationNumber: string;
}

export interface ScoreSearchResponse {
  scores: UserScore[];
  studentInfo: {
    name: string;
    registrationNumber: string;
    class: string;
  };
} 