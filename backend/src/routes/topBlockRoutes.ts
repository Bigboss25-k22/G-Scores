import { Router } from 'express';
import { getTopBlock } from '../controllers/TopBlockController';

const router = Router();

/**
 * @swagger
 * /top-block:
 *   get:
 *     summary: Lấy top 10 học sinh theo khối (A, A1, B, C, D)
 *     parameters:
 *       - in: query
 *         name: block
 *         schema:
 *           type: string
 *         required: true
 *         description: "Tên khối (A, A1, B, C, D)"
 *     responses:
 *       200:
 *         description: Top 10 học sinh theo khối
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       regNumber:
 *                         type: string
 *                       name:
 *                         type: string
 *                       totalScore:
 *                         type: number
 *                       subjects:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             score:
 *                               type: number
 */
router.get('/', getTopBlock);

export default router; 