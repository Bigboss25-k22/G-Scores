import { Router } from 'express';
import { getSubjectReport } from '../controllers/ReportController';

const router = Router();

/**
 * @swagger
 * /report/subject:
 *   get:
 *     summary: Thống kê số lượng học sinh theo mức điểm và level cho một môn
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         required: true
 *         description: "Tên môn học (ví dụ: Toán, Ngữ văn, ...)"
 *     responses:
 *       200:
 *         description: Thống kê thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     subject:
 *                       type: string
 *                     levels:
 *                       type: object
 *                       properties:
 *                         Giỏi:
 *                           type: integer
 *                         Khá:
 *                           type: integer
 *                         Trung bình:
 *                           type: integer
 *                         Yếu:
 *                           type: integer
 *                     scoreDistribution:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           score:
 *                             type: number
 *                           count:
 *                             type: integer
 */
router.get('/subject', getSubjectReport);

export default router; 