import React, { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateEditUser';

// Components
import { Photo } from '../components/Photo';

// Services
import { EditUser } from '../services/patchData';
import { GetUser } from '../services/getData';

// Icons
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';

const EditUserForm = ({ user, setOpenEditUserForm }) => {
	const [serverError, setserverError] = useState('');

	let initialForm = {
		username: '',
		nickname: '',
		email: '',
		photo: '',
		subscribe: false,
	};

	const {
		handleChange,
		handlePhoto,
		handleSubmit,
		handleUserValues,
		handleAllChecked,
		values,
		errors,
		reset,
	} = useForm(submit, validate, initialForm);

	useEffect(() => {
		GetUser({ user, handleUserData, setserverError });
	}, []);

	const handleUserData = async (data) => {
		const username = data.data.User.username;
		const nickname = data.data.User.nickname;
		const email = data.data.User.email;
		const photo = data.data.User.photo;
		const subscribe = data.data.User.subscribe;
		const values = { username, nickname, email, photo, subscribe };
		// console.log(values);
		await handleUserValues(values);
	};

	function submit() {
		const valuesEdited = {
			userId: user,
			updateData: values,
		};
		EditUser({ valuesEdited, setserverError });
		reset();
		setserverError('');
		setOpenEditUserForm(false);
	}

	const closeEditUserForm = () => {
		setOpenEditUserForm(false);
	};

	return (
		<form className='elements_form' onSubmit={handleSubmit} noValidate>
			<span className='icon-close' onClick={closeEditUserForm}>
				<Close />
			</span>
			<h2>EDIT Profile</h2>
			{/* <hr /> */}
			<div className='form-item'>
				<label>Name:</label>
				<div>
					<input
						id='name'
						className={`${errors.name && 'inputError'}`}
						name='username'
						type='text'
						value={values.username}
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
				<Photo handlePhoto={handlePhoto} />
				{errors.password && <p className='error'>{errors.password}</p>}
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

export default EditUserForm;
