import React, { useState } from 'react';
import Axios from 'axios';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateQuote';

// TODO: scss styles

const QuoteForm = ({
	user,
	authorList,
	setOpenRegister,
	setOpenQuoteRegister,
}) => {
	const initialForm = {
		author: '',
		quote: '',
		creator: user,
	};

	const [serverError, setserverError] = useState('');

	const { handleChange, handleSubmit, handleSelector, values, errors, reset } =
		useForm(submit, validate, initialForm);

	function submit() {
		handleQuote();
	}

	const handleQuote = async () => {
		const URL = process.env.REACT_APP_URL;
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const data = await Axios.post(
				`${URL}/api/quotes/register`,
				{
					author: values.author,
					quote: values.quote,
					creator: values.creator,
				},
				config
			);

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
		setOpenQuoteRegister(false);
	};

	const closeQuoteForm = () => {
		setOpenQuoteRegister(false);
	};

	const handleRegisterForm = () => {
		setOpenQuoteRegister(false);
		setOpenRegister(true);
	};

	return (
		<>
			<form className='form' onSubmit={handleSubmit} noValidate>
				<h2>Quote REGISTER</h2>
				<span onClick={closeQuoteForm}>X</span>
				<hr />
				<div className='form-item'>
					<label>Author: </label>
					<select
						id='author'
						name='author'
						onChange={(e) => handleSelector(e.target.value, 'author')}
					>
						<option value='all'>Select author</option>
						{authorList.map((name) => (
							<option key={name._id} value={name.name}>
								{name.name}
							</option>
						))}
					</select>
					{errors.author && <p className='error'>{errors.author}</p>}
				</div>
				<div className='form-item'>
					<button className='btn btn-small' onClick={handleRegisterForm}>
						Register new Author
					</button>
				</div>
				<div className='form-item'>
					<label>Quote:</label>
					<div>
						<textarea
							id='quote'
							rows='8'
							placeholder=' ✍🏽  Entry or paste a new quote here ... (Text without quotes)'
							className={`${errors.quote && 'inputError'}`}
							name='quote'
							value={values.quote}
							onChange={handleChange}
						/>
						{errors.quote && <p className='error'>{errors.quote}</p>}
					</div>
				</div>

				<div className='form-item'>
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

export default QuoteForm;
