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
    const scored = students.map((student: any) => {
      const blockSubjects = block.subjects.map((subjName: string) => {
        const subj = student.subjects.find((s: any) => s.name === subjName);
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
      .sort((a: any, b: any) => b.totalScore - a.totalScore)
      .slice(0, topN);
  }

  // Thống kê số lượng học sinh theo level và phân phối điểm cho một môn
  async getSubjectStatistics(subjectName: string, step: number = 0.25) {
    const subjects = await prisma.subject.findMany({
      where: { name: subjectName },
      select: { score: true }
    });

    const levels = { 'Giỏi': 0, 'Khá': 0, 'Trung bình': 0, 'Yếu': 0 };
    for (const s of subjects as any[]) {
      if (s.score >= 8) levels['Giỏi']++;
      else if (s.score >= 6) levels['Khá']++;
      else if (s.score >= 4) levels['Trung bình']++;
      else levels['Yếu']++;
    }

    const scoreDistribution: { score: number, count: number }[] = [];
    for (let score = 0; score <= 10; score += step) {
      const rounded = Math.round(score * 100) / 100;
      const count = subjects.filter((s: any) => Math.abs(s.score - rounded) < step / 2).length;
      scoreDistribution.push({ score: rounded, count });
    }

    return { subject: subjectName, levels, scoreDistribution };
  }

  // RAW SQL: Thống kê số lượng học sinh theo level và phân phối điểm cho một môn
  async getSubjectStatisticsRaw(subjectName: string, step: number = 0.25) {
    // Định nghĩa biểu thức làm tròn score
    const scoreExpr = `ROUND(ROUND(score::numeric / ${step}) * ${step}, 2)`;
    const scoreDist = await prisma.$queryRaw<
      { score: number, count: number }[]
    >`
      WITH filtered_subjects AS (
        SELECT score FROM "Subject" WHERE name = ${subjectName}
      ),
      score_bins AS (
        SELECT generate_series(0, 10, ${step}::numeric) AS score
      )
      SELECT
        score_bins.score,
        COUNT(fs.score) AS count
      FROM score_bins
      LEFT JOIN filtered_subjects fs
        ON ABS(fs.score - score_bins.score) < ${step}::numeric / 2.0
      GROUP BY score_bins.score
      ORDER BY score_bins.score ASC
    `;

    const levels = await prisma.$queryRaw<
      { level: string, count: number }[]
    >`
      WITH filtered_subjects AS (
        SELECT * FROM "Subject" WHERE name = ${subjectName}
      )
      SELECT
        CASE
          WHEN score >= 8 THEN 'Giỏi'
          WHEN score >= 6 THEN 'Khá'
          WHEN score >= 4 THEN 'Trung bình'
          ELSE 'Yếu'
        END AS level,
        COUNT(*) AS count
      FROM filtered_subjects
      GROUP BY level
    `;

    const levelObj: Record<string, number> = { 'Giỏi': 0, 'Khá': 0, 'Trung bình': 0, 'Yếu': 0 };
    for (const l of levels as any[]) levelObj[l.level] = Number(l.count);

    return {
      subject: subjectName,
      levels: levelObj,
      scoreDistribution: scoreDist.map((s: any) => ({ score: Number(s.score), count: Number(s.count) })),
    };
  }

  // RAW SQL: Lấy top N học sinh theo khối, trả về điểm từng môn trong khối
  async getTopStudentsByBlockRaw(blockSubjects: string[], topN: number = 10) {
    if (!blockSubjects || blockSubjects.length === 0) return [];
    const students = await prisma.$queryRaw<
      {
        regNumber: string,
        name: string,
        totalScore: number,
        subjects: { name: string, score: number }[]
      }[]
    >`
      WITH filtered_subjects AS (
        SELECT * FROM "Subject"
        WHERE name IN (${Prisma.join(blockSubjects)})
      )
      SELECT s."regNumber", s.name,
        SUM(f.score) as "totalScore",
        json_agg(json_build_object('name', f.name, 'score', f.score)) as subjects
      FROM "Student" s
      JOIN filtered_subjects f ON f."studentId" = s.id
      GROUP BY s.id
      ORDER BY "totalScore" DESC
      LIMIT ${topN}
    `;
    return students;
  }
} 