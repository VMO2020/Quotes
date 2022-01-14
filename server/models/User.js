import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide username'],
		min: 3,
	},
	nickname: {
		type: String,
		required: [true, 'Please provide a nickname'],
		unique: true,
		min: 3,
	},
	email: {
		type: String,
		required: [true, 'Please provide email address'],
		unique: true,
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		// select: false,
	},
	photo: {
		type: String,
	},
	admin: {
		type: Boolean,
		default: false,
	},
	liked: {
		type: [String],
		default: '',
	},
	subscribe: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', userSchema);
export default User;
