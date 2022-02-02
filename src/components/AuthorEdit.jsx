import React, { useContext, useState } from 'react';

// hooks
import useForm from '../hooks/useForm';
import validate from '../hooks/validateAuthor';

// Components
import { Photo } from '../components/Photo';

// Services
import { EditAuthor } from '../services/patchData';

// Services API
import AuthorContextProvider from '../context/AuthorContext';

// Icons
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';

const AuthorEdit = ({ author, setOpenEdit }) => {
	const { authorList, setAuthorList } = useContext(AuthorContextProvider);

	const initialForm = {
		authorId: author._id,
		name: author.name,
		country: author.country,
		born: author.born,
		dead: author.dead,
		photo: author.photo,
		wiki: author.wiki,
		tags: author.tags,
	};

	const [serverError, setserverError] = useState('');

	const { handleChange, handlePhoto, handleSubmit, values, errors, reset } =
		useForm(submit, validate, initialForm);

	async function submit() {
		EditAuthor({ values, setserverError });
		await handleData();
	}

	const handleData = () => {
		reset();
		closeAuthorForm();
		setserverError('');
		updateAuthorList();
	};

	const updateAuthorList = () => {
		let newArr = authorList.map((obj) => {
			if (obj._id === values.authorId) {
				return {
					...obj,
					authorId: author._id,
					name: values.name,
					country: values.country,
					born: values.born,
					dead: values.dead,
					photo: values.photo,
					wiki: values.wiki,
					tags: values.tags,
				};
			}
			return obj;
		});
		// console.log(newArr);
		setAuthorList(newArr);
	};

	const closeAuthorForm = () => {
		setOpenEdit(false);
	};

	return (
		<form
			className='elements_form'
			onSubmit={handleSubmit}
			noValidate
			id='loginform'
		>
			<span className='icon-close' onClick={closeAuthorForm}>
				<Close />
			</span>
			<h2>EDIT Author</h2>
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
	);
};

export default AuthorEdit;
