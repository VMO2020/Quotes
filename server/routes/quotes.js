import express from 'express';
const router = express.Router();

import {
	getQuotes,
	registerQuote,
	updateQuote,
	deleteQuote,
} from '../controllers/quotes.js';

// /api/quotes/list
router.get('/list', getQuotes);

// /api/quotes/register
router.post('/register', registerQuote);

// /api/quotes/update
router.patch('/update', updateQuote);

// /api/quotes/delete
router.delete('/delete/:id', deleteQuote);

export default router;
