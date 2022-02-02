import mongoose from 'mongoose';

const autorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name'],
		unique: true,
		min: 3,
	},
	country: {
		type: String,
		required: [true, 'Please provide a country'],
		min: 3,
	},
	born: {
		type: String,
		min: 4,
	},
	dead: {
		type: String,
		min: 4,
	},
	photo: {
		type: String,
	},
	wiki: {
		type: String,
		min: 10,
	},
	created: {
		type: String,
	},
	likeCount: {
		type: Number,
		default: 0,
	},
	tags: {
		type: [String],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const Author = mongoose.model('Authors', autorSchema);
export default Author;
