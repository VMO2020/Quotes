import express from 'express';
const router = express.Router();

import {
	getAuthors,
	registerAuthor,
	editAuthor,
} from '../controllers/authors.js';

// /api/authors/list
router.get('/list', getAuthors);
// /api/authors/register
router.post('/register', registerAuthor);
// /api/authors/edit
router.patch('/edit', editAuthor);

export default router;
