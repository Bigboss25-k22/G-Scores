export interface SubjectScore {
  name: string;
  score: number;
  type: string;
}

export interface TopBlockData {
  id: number;
  regNumber: string;
  name: string;
  blockAScore: number;
  subjects: SubjectScore[];
}

export interface TopBlockResponse {
  success: boolean;
  message: string;
  data: TopBlockData;
} 