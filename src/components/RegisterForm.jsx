import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateRegister';

// Components
import { Photo } from '../components/Photo';

// Services
import { PostUser } from '../services/postData';

// Icons
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';

const RegisterForm = ({
	setOpenRegisterForm,
	setUser,
	setRenderHome,
	setUserAcceptCookies,
}) => {
	const initialForm = {
		name: '',
		nickname: '',
		email: '',
		password: '',
		password2: '',
		photo: '',
		subscribe: false,
	};

	const [serverError, setserverError] = useState('');

	const {
		handleChange,
		handlePhoto,
		handleSubmit,
		handleAllChecked,
		values,
		errors,
		reset,
	} = useForm(submit, validate, initialForm);

	function submit() {
		PostUser({ values, handleData, setserverError });
	}

	const handleData = async (data) => {
		reset();
		setserverError('');
		setOpenRegisterForm(false);
		setUserAcceptCookies(true);
		await setUser(data.data.user);
		await setRenderHome(true);
	};

	const closeRegisterForm = () => {
		setOpenRegisterForm(false);
	};

	return (
		<form className='elements_form' onSubmit={handleSubmit} noValidate>
			<span className='icon-close' onClick={closeRegisterForm}>
				<Close />
			</span>
			<h2>REGISTER User</h2>
			{/* <hr /> */}
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
			<div className='checkbox'>
				<input
					id='checkbox1'
					className='checkbox-item'
					name='subscribe'
					type='checkbox'
					value={values.subscribe}
					onChange={handleAllChecked}
				/>
				<label htmlFor='checkbox1'>
					<span>✓</span>Subscribe
				</label>
			</div>
			<div className='btn-container'>
				<button type='submit' className='btn'>
					Submit
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
