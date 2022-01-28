import express from 'express';
const router = express.Router();

import {
	Register,
	Login,
	getUser,
	getUsers,
	updateUser,
	editUser,
} from '../controllers/auth.js';

// /api/user/register
router.post('/register', Register);
// /api/user/login
router.post('/login', Login);
// /api/user/user
router.get('/user/:id', getUser);
// /api/user/list
router.get('/list', getUsers);
// /api/user/update
router.patch('/update', updateUser);
// /api/user/edit
router.patch('/edit', editUser);

export default router;
