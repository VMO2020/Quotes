import express from 'express';
const router = express.Router();

import { getQuotes } from '../controllers/quotes.js';
import { registerQuote } from '../controllers/quotes.js';

// /api/quotes/list
router.get('/list', getQuotes);

// /api/quotes/register
router.post('/register', registerQuote);

export default router;
