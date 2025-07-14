export interface ScoreDistribution {
  score: number;
  count: number;
}

export interface SubjectReportData {
  subject: string;
  levels: {
    'Giỏi': number;
    'Khá': number;
    'Trung bình': number;
    'Yếu': number;
  };
  scoreDistribution: ScoreDistribution[];
}

export interface SubjectReportResponse {
  success: boolean;
  message: string;
  data: SubjectReportData;
} 