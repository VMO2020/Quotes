import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateRegister';

// components
import { Photo } from '../components/Photo';

//services
import { PostUser } from '../services/postData';

const RegisterForm = ({ setOpenRegister, setUser, setRenderHome }) => {
	const initialForm = {
		name: '',
		nickname: '',
		email: '',
		password: '',
		password2: '',
		photo: '',
	};

	const [serverError, setserverError] = useState('');

	const { handleChange, handlePhoto, handleSubmit, values, errors, reset } =
		useForm(submit, validate, initialForm);

	function submit() {
		PostUser({ values, handleData, setserverError });
	}

	const handleData = async (data) => {
		reset();
		setserverError('');
		setOpenRegister(false);
		await setUser(data.data.user);
		await setRenderHome(true);
	};

	const closeRegisterForm = () => {
		setOpenRegister(false);
	};

	return (
		<>
			<form className='elements_form' onSubmit={handleSubmit} noValidate>
				<h2>User REGISTER</h2>
				<span onClick={closeRegisterForm}>X</span>
				<hr />
				<div className='form-item'>
					<label>Name:</label>
					<div>
						<input
							id='name'
							className={`${errors.name && 'inputError'}`}
							name='name'
							type='text'
							value={values.name}
							onChange={handleChange}
						/>
						{errors.name && <p className='error'>{errors.name}</p>}
					</div>
				</div>
				<div className='form-item'>
					<label>Nickname:</label>
					<div>
						<input
							id='nickname'
							className={`${errors.nickname && 'inputError'}`}
							name='nickname'
							type='text'
							value={values.nickname}
							onChange={handleChange}
						/>
						{errors.nickname && <p className='error'>{errors.nickname}</p>}
					</div>
				</div>
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
						/>
						{errors.password && <p className='error'>{errors.password}</p>}
					</div>
				</div>
				<div className='form-item'>
					<label>Confirm Password:</label>
					<div>
						<input
							className={`${errors.password2 && 'inputError'}`}
							name='password2'
							type='password'
							value={values.password2}
							onChange={handleChange}
						/>
						{errors.password2 && <p className='error'>{errors.password2}</p>}
					</div>
				</div>
				<div className='form-item'>
					<Photo handlePhoto={handlePhoto} />
					{serverError && <p className='error server-error'>{serverError}</p>}
				</div>
				<div className='btn-container'>
					<button type='submit' className='btn'>
						Submit
					</button>
				</div>
			</form>
		</>
	);
};

export default RegisterForm;
