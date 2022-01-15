import express from 'express';
const router = express.Router();

import { Register, Login, getUsers, updateUser } from '../controllers/auth.js';

// /api/user/register
router.post('/register', Register);
// /api/user/login
router.post('/login', Login);
// /api/user/list
router.get('/list', getUsers);
// /api/user/update
router.patch('/update', updateUser);

export default router;
