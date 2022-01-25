import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateLogin';

// Services
import { PostLogin } from '../services/postData';

// Icons
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';

const LoginForm = ({
	setUser,
	setAvatar,
	setLiked,
	setUserAdmin,
	setOpenLogin,
	setRenderHome,
	setOpenRegisterForm,
	setUserAcceptCookies,
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
		PostLogin({ values, handleData, setserverError });
	}

	const handleData = async (data) => {
		reset();
		setserverError('');
		setOpenLogin(false);
		setRenderHome(true);
		setUserAcceptCookies(true);
		await setUser(data.data.user);
		await setUserAdmin(data.data.ua);
		await setAvatar(data.data.photo);
		await setLiked(data.data.liked);
	};

	const opendRegisterForm = () => {
		setOpenLogin(false);
		setOpenRegisterForm(true);
	};

	return (
		<>
			<form
				className='elements_form'
				onSubmit={handleSubmit}
				noValidate
				id='loginform'
			>
				<span className='icon-close' onClick={() => setOpenLogin(false)}>
					<Close />
				</span>
				<h2>LOGIN</h2>
				{/* <hr /> */}
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
