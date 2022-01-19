import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateAuthor';

// components
import { Photo } from '../components/Photo';

// services
import { PostAuthors } from '../services/postData';

const AuthorForm = ({ user, setOpenAuthorRegister, setRenderHome }) => {
	const initialForm = {
		name: '',
		country: '',
		born: '',
		dead: '',
		photo: '',
		wiki: '',
		tags: [],
		created: user,
	};

	const [serverError, setserverError] = useState('');

	const { handleChange, handlePhoto, handleSubmit, values, errors, reset } =
		useForm(submit, validate, initialForm);

	function submit() {
		PostAuthors({ values, setserverError }).then(() => {
			reset();
			closeAuthorForm();
			setserverError('');
			setRenderHome(true);
		});
	}

	const closeAuthorForm = () => {
		setOpenAuthorRegister(false);
	};

	return (
		<>
			<form
				className='elements_form'
				onSubmit={handleSubmit}
				noValidate
				id='loginform'
			>
				<h2>Author REGISTER</h2>
				<span onClick={closeAuthorForm}>X</span>
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
							placeholder='Author name'
						/>
						{errors.name && <p className='error'>{errors.name}</p>}
					</div>
				</div>
				<div className='form-item'>
					<label>Country / City:</label>
					<div>
						<input
							id='country'
							className={`${errors.country && 'inputError'}`}
							name='country'
							type='text'
							value={values.country}
							onChange={handleChange}
							placeholder='City or country of residence'
						/>
						{errors.country && <p className='error'>{errors.country}</p>}
					</div>
				</div>
				<div className='form-item'>
					<label>Born:</label>
					<div>
						<input
							id='born'
							className={`${errors.born && 'inputError'}`}
							name='born'
							type='text'
							value={values.born}
							onChange={handleChange}
							placeholder='Date of birth'
						/>
						{errors.born && <p className='error'>{errors.born}</p>}
					</div>
				</div>
				<div className='form-item'>
					<label>Dead:</label>
					<div>
						<input
							id='dead'
							className={`${errors.dead && 'inputError'}`}
							name='dead'
							type='text'
							value={values.dead}
							onChange={handleChange}
							placeholder='Date of death'
						/>
						{errors.dead && <p className='error'>{errors.dead}</p>}
					</div>
				</div>
				<div className='form-item'>
					<label>Wikipedia Link:</label>
					<div>
						<input
							id='wiki'
							className={`${errors.dead && 'inputError'}`}
							name='wiki'
							type='text'
							value={values.wiki}
							onChange={handleChange}
							placeholder='https://en.wikipedia.org....'
						/>
						{errors.wiki && <p className='error'>{errors.wiki}</p>}
					</div>
				</div>
				<div className='form-item'>
					<label>Tags (coma separated):</label>
					<div>
						<input
							id='tags'
							className={`${errors.tags && 'inputError'}`}
							name='tags'
							type='text'
							value={values.tags}
							onChange={handleChange}
							placeholder='Life, Philosophy, Science, ...'
						/>
						{errors.wiki && <p className='error'>{errors.wiki}</p>}
					</div>
				</div>
				<div className='form-item'>
					<Photo handlePhoto={handlePhoto} />
					{serverError && <p className='error'>{serverError}</p>}
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

export default AuthorForm;
