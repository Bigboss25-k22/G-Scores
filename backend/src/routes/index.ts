import { Router } from 'express';
import studentRoutes from './studentRoutes';
import reportRoutes from './reportRoutes';
import topBlockRoutes from './topBlockRoutes';

const router = Router();

router.use('/students', studentRoutes);
router.use('/report', reportRoutes);
router.use('/top-block', topBlockRoutes);

export default router; 