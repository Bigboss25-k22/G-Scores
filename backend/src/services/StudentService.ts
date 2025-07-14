import { PrismaClient, Prisma } from '@prisma/client';
import { Subject } from '../models/Subject';
import { Block } from '../models/Block';

const prisma = new PrismaClient();

export class StudentService {
  async getStudentByRegNumber(regNumber: string) {
    return prisma.student.findUnique({
      where: { regNumber },
      include: { subjects: true },
    });
  }

  classifySubjects(subjects: { name: string; score: number }[]) {
    return subjects.map(
      (s) => new Subject(s.name, s.score)
    );
  }

  // Tính điểm khối động
  calcBlockScore(subjects: { name: string; score: number }[], block: Block) {
    return block.calcScore(subjects);
  }

  // Lấy top N học sinh theo khối, trả về điểm từng môn trong khối
  async getTopStudentsByBlock(block: Block, topN: number = 10) {
    const students = await prisma.student.findMany({
      include: { subjects: true },
    });
    const scored = students.map(student => {
      const blockSubjects = block.subjects.map(subjName => {
        const subj = student.subjects.find(s => s.name === subjName);
        return { name: subjName, score: subj ? subj.score : null };
      });
      return {
        regNumber: student.regNumber,
        name: student.name,
        totalScore: block.calcScore(student.subjects),
        subjects: blockSubjects,
      };
    });
    return scored
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, topN);
  }

  // Thống kê số lượng học sinh theo level và phân phối điểm cho một môn
  async getSubjectStatistics(subjectName: string, step: number = 0.25) {
    const subjects = await prisma.subject.findMany({
      where: { name: subjectName },
      select: { score: true }
    });

    const levels = { 'Giỏi': 0, 'Khá': 0, 'Trung bình': 0, 'Yếu': 0 };
    for (const s of subjects) {
      if (s.score >= 8) levels['Giỏi']++;
      else if (s.score >= 6) levels['Khá']++;
      else if (s.score >= 4) levels['Trung bình']++;
      else levels['Yếu']++;
    }

    const scoreDistribution: { score: number, count: number }[] = [];
    for (let score = 0; score <= 10; score += step) {
      const rounded = Math.round(score * 100) / 100;
      const count = subjects.filter(s => Math.abs(s.score - rounded) < step / 2).length;
      scoreDistribution.push({ score: rounded, count });
    }

    return { subject: subjectName, levels, scoreDistribution };
  }

  // RAW SQL: Thống kê số lượng học sinh theo level và phân phối điểm cho một môn
  async getSubjectStatisticsRaw(subjectName: string, step: number = 0.25) {
    // Lấy phân phối điểm
    const scoreDist = await prisma.$queryRaw<
      { score: number, count: number }[]
    >`
      SELECT ROUND(score::numeric / ${step}) * ${step} AS score, COUNT(*) AS count
      FROM "Subject"
      WHERE name = ${subjectName}
      GROUP BY score
      ORDER BY score ASC
    `;

    // Lấy thống kê theo level
    const levels = await prisma.$queryRaw<
      { level: string, count: number }[]
    >`
      SELECT
        CASE
          WHEN score >= 8 THEN 'Giỏi'
          WHEN score >= 6 THEN 'Khá'
          WHEN score >= 4 THEN 'Trung bình'
          ELSE 'Yếu'
        END AS level,
        COUNT(*) AS count
      FROM "Subject"
      WHERE name = ${subjectName}
      GROUP BY level
    `;

    const levelObj: Record<string, number> = { 'Giỏi': 0, 'Khá': 0, 'Trung bình': 0, 'Yếu': 0 };
    for (const l of levels) levelObj[l.level] = Number(l.count);

    return {
      subject: subjectName,
      levels: levelObj,
      scoreDistribution: scoreDist.map(s => ({ score: Number(s.score), count: Number(s.count) })),
    };
  }

  // RAW SQL: Lấy top N học sinh theo khối, trả về điểm từng môn trong khối
  async getTopStudentsByBlockRaw(blockSubjects: string[], topN: number = 10) {
    const students = await prisma.$queryRaw<
      {
        regNumber: string,
        name: string,
        totalScore: number,
        subjects: { name: string, score: number }[]
      }[]
    >`
      SELECT s."regNumber", s.name,
        SUM(sub.score) as "totalScore",
        json_agg(json_build_object('name', sub.name, 'score', sub.score)) as subjects
      FROM "Student" s
      JOIN "Subject" sub ON sub."studentId" = s.id
      WHERE sub.name IN (${Prisma.join(blockSubjects)})
      GROUP BY s.id
      ORDER BY "totalScore" DESC
      LIMIT ${topN}
    `;
    return students;
  }
} 