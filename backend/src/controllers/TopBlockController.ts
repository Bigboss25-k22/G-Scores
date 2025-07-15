import { Request, Response } from 'express';
import { StudentService } from '../services/StudentService';
import { BlockA, BlockA1, BlockB, BlockC, BlockD } from '../models/Block';
import client from '../utils/redisClient';

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
  const cacheKey = `topBlock:${block}`;
  const cached = await client.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  const blockInstance = new blockMap[block as string]();
  const data = await studentService.getTopStudentsByBlockRaw(blockInstance.subjects, 10);
  const result = {
    success: true,
    message: `Top 10 học sinh khối ${block}`,
    data,
  };
  await client.set(cacheKey, JSON.stringify(result), { EX: 600 });
  res.json(result);
}; 