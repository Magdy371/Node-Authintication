import { Router } from 'express';
import { register } from '../controllers/auth/register.controller.js';

const router = Router();
router.post('/',register);

export default router;