import express from 'express';
const router = express.Router();

import { getAutors, registerAutor } from '../controllers/autors.js';

// /api/autors/list
router.get('/list', getAutors);
// /api/autors/register
router.post('/register', registerAutor);

export default router;
