import express from 'express';
import { getTasks, createTask, updateTaskStatus } from '../controllers/taskController.js';
import { protect, managerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// All task routes require the user to be logged in (protected)
router.use(protect);

// GET /api/tasks -> Get tasks (logic handles Manager vs Employee view)
router.get('/', getTasks);

// POST /api/tasks -> Create task (Protected + Manager Only)
router.post('/', managerOnly, createTask);

// PUT /api/tasks/:id/status -> Update status (Protected, both roles can do this)
router.put('/:id/status', updateTaskStatus);

export default router;