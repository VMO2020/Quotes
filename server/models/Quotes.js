import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
	author: {
		type: String,
		required: [true, 'Please provide a name'],
		min: 3,
	},
	quote: {
		type: String,
		required: [true, 'Please provide a quote'],
		unique: true,
		min: 10,
	},
	creator: {
		type: String,
	},
	likeCount: {
		type: Number,
		default: 0,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Quote = mongoose.model('Quotes', quoteSchema);
export default Quote;
