import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import Routes
import homeRoute from './routes/home.js';
import authRoute from './routes/auth.js';
import autorsRoute from './routes/authors.js';
import quotesRoute from './routes/quotes.js';

// Config
dotenv.config();

const app = express();

// Variables
const PORT = process.env.PORT || 3001;
const CONNECTION_URL = process.env.CONNECTION_URL;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Route Middlewares
app.use('/', homeRoute);
app.use('/api/user', authRoute);
app.use('/api/authors', autorsRoute);
app.use('/api/quotes', quotesRoute);

// 404
app.use((req, res, next) => {
	res.status(404).send('404 Not found');
});

mongoose
	.connect(CONNECTION_URL)
	.then(() => {
		console.log('MongoDB Atlas Connected!');
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
	)
	.catch((error) => console.log(error.message));
