import express from 'express';
import { getEmployees } from '../controllers/userController.js';
import { protect, managerOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Only logged-in Managers can request the employee list
router.get('/employees', protect, managerOnly, getEmployees);

export default router;