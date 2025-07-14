import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';
import { BlockA, BlockA1, BlockB, BlockC, BlockD } from '../models/Block';

const studentService = new StudentService();

const blockMap: Record<string, any> = {
  A: BlockA,
  A1: BlockA1,
  B: BlockB,
  C: BlockC,
  D: BlockD,
};

export const getTopBlock = async (req: Request, res: Response) => {
  const { block } = req.query;
  if (!block || !blockMap[block as string]) {
    return res.status(400).json({
      success: false,
      message: 'Khối không hợp lệ. Hỗ trợ: A, A1, B, C, D',
      data: null,
    });
  }
  const blockInstance = new blockMap[block as string]();
  const data = await studentService.getTopStudentsByBlock(blockInstance, 10);
  res.json({
    success: true,
    message: `Top 10 học sinh khối ${block}`,
    data,
  });
}; 