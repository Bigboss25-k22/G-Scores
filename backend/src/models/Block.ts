export interface Block {
  name: string;
  subjects: string[];
  calcScore(subjects: { name: string; score: number }[]): number;
}

export class BlockA implements Block {
  name = 'A';
  subjects = ['Toán', 'Vật lí', 'Hóa học'];
  calcScore(subjects: { name: string; score: number }[]) {
    return this.subjects.reduce((sum, subjName) => {
      const subj = subjects.find(s => s.name === subjName);
      return sum + (subj ? subj.score : 0);
    }, 0);
  }
}

export class BlockB implements Block {
  name = 'B';
  subjects = ['Toán', 'Hóa học', 'Sinh học'];
  calcScore(subjects: { name: string; score: number }[]) {
    return this.subjects.reduce((sum, subjName) => {
      const subj = subjects.find(s => s.name === subjName);
      return sum + (subj ? subj.score : 0);
    }, 0);
  }
}

export class BlockC implements Block {
  name = 'C';
  subjects = ['Ngữ văn', 'Lịch sử', 'Địa lí'];
  calcScore(subjects: { name: string; score: number }[]) {
    return this.subjects.reduce((sum, subjName) => {
      const subj = subjects.find(s => s.name === subjName);
      return sum + (subj ? subj.score : 0);
    }, 0);
  }
}

export class BlockD implements Block {
  name = 'D';
  subjects = ['Toán', 'Ngữ văn', 'Ngoại ngữ'];
  calcScore(subjects: { name: string; score: number }[]) {
    return this.subjects.reduce((sum, subjName) => {
      const subj = subjects.find(s => s.name === subjName);
      return sum + (subj ? subj.score : 0);
    }, 0);
  }
}

export class BlockA1 implements Block {
  name = 'A1';
  subjects = ['Toán', 'Vật lí', 'Ngoại ngữ'];
  calcScore(subjects: { name: string; score: number }[]) {
    return this.subjects.reduce((sum, subjName) => {
      const subj = subjects.find(s => s.name === subjName);
      return sum + (subj ? subj.score : 0);
    }, 0);
  }
} 