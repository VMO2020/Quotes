import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateQuote';

// Services
import { PostQuote } from '../services/postData';

// Icons
import { ReactComponent as IconPaste } from '../assets/icons/ui/paste_nc.svg';
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';

const QuoteForm = ({
	user,
	authorList,
	setRenderHome,
	setOpenAuthorForm,
	setOpenQuoteForm,
}) => {
	const initialForm = {
		author: '',
		quote: '',
		creator: user,
	};

	const [serverError, setserverError] = useState('');

	const {
		handleChange,
		handleSubmit,
		handleSelector,
		handleValue,
		values,
		errors,
		reset,
	} = useForm(submit, validate, initialForm);

	const handelPasteButton = () => {
		let text = '';
		let error = false; // false to bypass validate
		// Read clipboard and write text to textarea
		navigator.clipboard.readText(text).then((text) => {
			handleValue('quote', text, error);
		});
	};

	function submit() {
		PostQuote({ values, setserverError }).then(() => {
			reset();
			setserverError('');
			setOpenQuoteForm(false);
			setRenderHome(true);
		});
	}

	const closeQuoteForm = () => {
		setOpenQuoteForm(false);
	};

	const handleRegisterForm = () => {
		setOpenQuoteForm(false);
		setOpenAuthorForm(true);
	};

	return (
		<>
			<form className='elements_form' onSubmit={handleSubmit} noValidate>
				<span className='icon-close' onClick={closeQuoteForm}>
					<Close />
				</span>
				<h2>REGISTER Quote</h2>
				{/* <hr /> */}
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
					<div className='form-textarea'>
						<p className='form-textarea-top'>"</p>
						<textarea
							id='pasteArea'
							rows='8'
							placeholder='Entry or paste a new quote here ... (Text without quotes)'
							className={`${errors.quote && 'inputError'}`}
							name='quote'
							value={values.quote}
							onChange={handleChange}
						/>
						<p className='form-textarea-botom'>"</p>
					</div>
					{errors.quote && (
						<p className='error' style={{ margin: '1em' }}>
							{errors.quote}
						</p>
					)}
				</div>

				<div className='form-item'>
					{serverError && <p className='error'>{serverError}</p>}
				</div>
				<div className='icons-container'>
					<button className='icons-quote' onClick={() => handelPasteButton()}>
						<IconPaste />
					</button>
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
