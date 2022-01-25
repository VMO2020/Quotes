import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import validate from '../hooks/validateQuote';

// Services
import { EditQuote } from '../services/patchData';

// Icons
import { ReactComponent as IconPaste } from '../assets/icons/ui/paste_nc.svg';
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';

export const QuoteEditForm = ({
	author,
	quote,
	setOpenEdit,
	setQuoteEdited,
}) => {
	const initialForm = {
		quoteId: quote._id,
		quote: quote.quote,
	};

	const [serverError, setserverError] = useState('');

	const { handleChange, handleSubmit, handleValue, values, errors, reset } =
		useForm(submit, validate, initialForm);

	async function submit() {
		// Make a PATH (Update) request to the API
		EditQuote({ values, setserverError });
		await handleData();
	}

	const handleData = () => {
		reset();
		setserverError('');
		setOpenEdit(false);
		setQuoteEdited(values.quote);
	};

	const handelPasteButton = () => {
		let text = '';
		let error = false; // false to bypass validate
		// Read clipboard and write text to textarea
		navigator.clipboard.readText(text).then((text) => {
			handleValue('quote', text, error);
		});
	};

	const closeQuoteForm = () => {
		setOpenEdit(false);
	};

	return (
		<form className='elements_form' onSubmit={handleSubmit} noValidate>
			<span className='icon-close' onClick={closeQuoteForm}>
				<Close />
			</span>
			<h2>EDIT Quote</h2>
			{/* <hr /> */}
			<div className='form-item'>
				<div className='inline-text'>
					<h4>Author:</h4>
					<h3>{author}</h3>
				</div>
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
	);
};
