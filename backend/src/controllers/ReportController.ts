import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';
import client from '../utils/redisClient';

const studentService = new StudentService();

export const getSubjectReport = async (req: Request, res: Response) => {
  const { subject } = req.query;
  if (!subject) {
    return res.status(400).json({
      success: false,
      message: 'Thiếu tên môn',
      data: null,
    });
  }
  const cacheKey = `subjectReport:${subject}`;
  const cached = await client.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  const step = subject === 'Toán' ? 0.2 : 0.25;
  const data = await studentService.getSubjectStatistics(subject as string, step);
  const result = {
    success: true,
    message: 'Thống kê thành công',
    data,
  };
  await client.set(cacheKey, JSON.stringify(result), { EX: 600 });
  res.json(result);
}; 