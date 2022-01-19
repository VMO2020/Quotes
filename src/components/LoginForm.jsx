import React, { useState } from 'react';
import Axios from 'axios';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateLogin';

// services
import { PostlLogin } from '../services/postData';

// helpers
import { setLocalStoreValue } from '../helpers/LocalStore';

const LoginForm = ({
	setUser,
	setAvatar,
	setLiked,
	setUserAdmin,
	setOpenLogin,
	setRenderHome,
	setOpenRegister,
}) => {
	const initialForm = {
		email: '',
		password: '',
	};

	const [serverError, setserverError] = useState('');

	const { handleChange, handleSubmit, values, errors, reset } = useForm(
		submit,
		validate,
		initialForm
	);

	function submit() {
		handelLogin();
	}

	const handelLogin = async () => {
		const URL = process.env.REACT_APP_URL;
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const data = await Axios.post(
				`${URL}/api/user/login`,
				{
					email: values.email,
					password: values.password,
					liked: values.liked,
				},
				config
			);
			// console.log('user: ' + data.data.user);
			setLocalStoreValue('auth-ID', data.data.user);
			return handleData(data);
		} catch (error) {
			console.log(error.response.data.error);
			setserverError(error.response.data.error);
			setTimeout(() => {
				setserverError('');
			}, 5000);
		}
	};

	const handleData = async (data) => {
		reset();
		setserverError('');
		setOpenLogin(false);
		await setUser(data.data.user);
		await setUserAdmin(data.data.ua);
		await setAvatar(data.data.photo);
		await setLiked(data.data.liked);
		await setRenderHome(true);
	};

	const opendRegisterForm = () => {
		setOpenLogin(false);
		setOpenRegister(true);
	};

	return (
		<>
			<form
				className='elements_form'
				onSubmit={handleSubmit}
				noValidate
				id='loginform'
			>
				<h2>LOGIN</h2>
				<hr />
				<span onClick={() => setOpenLogin(false)}>X</span>
				<div className='form-item'></div>
				<div className='form-item'>
					<label>Email:</label>
					<div>
						<input
							id='email'
							className={`${errors.email && 'inputError'}`}
							name='email'
							type='email'
							value={values.email}
							onChange={handleChange}
							// autoComplete='off'
						/>
						{errors.email && <p className='error'>{errors.email}</p>}
					</div>
				</div>
				<div className='form-item'>
					<label>Password:</label>
					<div>
						<input
							id='password'
							className={`${errors.password && 'inputError'}`}
							name='password'
							type='password'
							value={values.password}
							onChange={handleChange}
							autoComplete='off'
						/>
						{errors.password && <p className='error'>{errors.password}</p>}
						{serverError && <p className='error'>{serverError}</p>}
					</div>
				</div>

				<div className='btn-container'>
					<button type='submit' className='btn'>
						Submit
					</button>
					<button onClick={opendRegisterForm} className='btn btn-register'>
						REGISTER
					</button>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
