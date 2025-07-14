import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';

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
  const step = subject === 'Toán' ? 0.2 : 0.25;
  const data = await studentService.getSubjectStatistics(subject as string, step);
  res.json({
    success: true,
    message: 'Thống kê thành công',
    data,
  });
}; 