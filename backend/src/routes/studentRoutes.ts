import { Router } from 'express';
import { getStudentByRegNumber } from '../controllers/StudentController';

const router = Router();

/**
 * @swagger
 * /students/{regNumber}:
 *   get:
 *     summary: Lấy thông tin sinh viên theo số báo danh
 *     parameters:
 *       - in: path
 *         name: regNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Số báo danh
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
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
 *                     id:
 *                       type: integer
 *                     regNumber:
 *                       type: string
 *                     name:
 *                       type: string
 *                     blockAScore:
 *                       type: number
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           score:
 *                             type: number
 *                           type:
 *                             type: string
 *       404:
 *         description: Không tìm thấy sinh viên
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
 *                   type: 'null'
 */
router.get('/:regNumber', getStudentByRegNumber);

export default router; 