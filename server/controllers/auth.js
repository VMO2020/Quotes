import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// REGISTER
export const Register = async (req, res) => {
	const { username, nickname, email, password, photo } = req.body;

	// Hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		// Checking if the nickname is already in the database
		const nicknameExist = await User.findOne({ nickname: nickname });
		if (nicknameExist)
			return res.status(401).send({
				success: false,
				error: 'Nickname already in use',
			});

		// Checking if the user is already in the database
		const userExist = await User.findOne({ email: email });
		if (userExist)
			return res.status(401).send({
				success: false,
				error: 'Email already in use',
			});

		const user = await User.create({
			username,
			nickname,
			email,
			photo,
			password: hashedPassword,
		});

		res.status(201).json({
			success: true,
			user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

// LOGIN
export const Login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Check data provided
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				error: 'Please provide email and password',
			});
		}

		// Checking if the user is already in the database
		const user = await User.findOne({ email: email });
		if (!user)
			return res.status(401).send({
				success: false,
				error: 'Invalid Email or Password',
			});

		// Check if the password is correct
		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass)
			return res.status(401).send({
				success: false,
				error: 'Invalid Email or Password',
			});

		res.status(200).send({
			success: true,
			message: 'Logged in!',
			user: user._id,
			ua: user.admin,
			photo: user.photo,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
// LIST
export const getUsers = async (req, res) => {
	try {
		const Users = await User.find().select('-password').select('-admin');
		res.status(201).json({
			success: true,
			Users,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
