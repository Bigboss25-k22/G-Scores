export class Subject {
  name: string;
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }

  classify(): 'Giỏi' | 'Khá' | 'Trung bình' | 'Yếu' {
    if (this.score >= 8) return 'Giỏi';
    if (this.score >= 6) return 'Khá';
    if (this.score >= 4) return 'Trung bình';
    return 'Yếu';
  }
} 