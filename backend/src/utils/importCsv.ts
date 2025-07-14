// g-scores-backend/src/utils/importCsv.ts
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const csv = require('csv-parser');

const prisma = new PrismaClient();
const BATCH_SIZE = 1000;

const SUBJECTS = [
  { csv: 'toan', name: 'Toán' },
  { csv: 'ngu_van', name: 'Ngữ văn' },
  { csv: 'ngoai_ngu', name: 'Ngoại ngữ' },
  { csv: 'vat_li', name: 'Vật lí' },
  { csv: 'hoa_hoc', name: 'Hóa học' },
  { csv: 'sinh_hoc', name: 'Sinh học' },
  { csv: 'lich_su', name: 'Lịch sử' },
  { csv: 'dia_li', name: 'Địa lí' },
  { csv: 'gdcd', name: 'GDCD' },
];

async function main() {
  const studentsBatch: any[] = [];
  const subjectsBatch: any[] = [];

  const stream = fs.createReadStream('../dataset/diem_thi_thpt_2024.csv').pipe(csv());

  for await (const row of stream) {
    studentsBatch.push({
      regNumber: row['sbd'],
      name: row['sbd'], // Nếu có cột tên thật thì thay bằng row['ten']
    });

    // Tạo danh sách môn học có điểm
    const subjects = SUBJECTS
      .filter(subj => row[subj.csv] && row[subj.csv].trim() !== '')
      .map(subj => ({
        name: subj.name,
        score: parseFloat(row[subj.csv]),
      }));

    subjectsBatch.push({
      regNumber: row['sbd'],
      subjects,
    });

    if (studentsBatch.length >= BATCH_SIZE) {
      await insertBatch(studentsBatch, subjectsBatch);
      studentsBatch.length = 0;
      subjectsBatch.length = 0;
    }
  }
  if (studentsBatch.length > 0) {
    await insertBatch(studentsBatch, subjectsBatch);
  }
  console.log('Import done!');
}

async function insertBatch(studentsBatch: any[], subjectsBatch: any[]) {
  await prisma.student.createMany({
    data: studentsBatch,
    skipDuplicates: true,
  });

  const students = await prisma.student.findMany({
    where: { regNumber: { in: studentsBatch.map((s: any) => s.regNumber) } },
    select: { id: true, regNumber: true },
  });
  const regToId = Object.fromEntries(students.map((s: any) => [s.regNumber, s.id]));

  const subjectsToInsert = [];
  for (const s of subjectsBatch) {
    const studentId = regToId[s.regNumber];
    for (const subj of s.subjects) {
      subjectsToInsert.push({
        name: subj.name,
        score: subj.score,
        studentId,
      });
    }
  }
  await prisma.subject.createMany({ data: subjectsToInsert });
}

main();