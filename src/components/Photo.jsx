import React, { useState } from 'react';

// Components
import { FileBase64 } from './FileBase64';

export const Photo = ({ handlePhoto }) => {
	const [photo, setPhoto] = useState('');
	const [sizePhoto, setSizePhoto] = useState('');
	const [typePhoto, setTypePhoto] = useState('');
	const [error, setError] = useState('');

	// Image max size (k)
	const IMAGEsize = 200;

	const handelInput = (base64, size, type, file) => {
		setSizePhoto(size);
		setTypePhoto(type);
		// console.log(base64);

		// Validate type (jpg, jpeg & png) & image size:
		const isNameOfOneImageRegEx = /.(jpe?g|png)$/i;
		const isValidType = isNameOfOneImageRegEx.test(file.name);
		const isValidSize = file.size / 1024 < IMAGEsize;

		if (isValidType && isValidSize) {
			handlePhoto(base64, 'photo');
			setPhoto(base64);
		} else {
			setPhoto('');
		}

		if (!isValidType) {
			setError(`Invalid format, choose another file`);
			setTimeout(() => {
				setError('');
				setSizePhoto('');
				setTypePhoto('');
			}, 5000);
		} else {
			// Validate size > 200k
			if (!isValidSize) {
				setError(`Invalid size > ${IMAGEsize}k, choose another file`);
				setTimeout(() => {
					setError('');
					setSizePhoto('');
					setTypePhoto('');
				}, 5000);
			}
		}
	};
	return (
		<div className='form-item'>
			<label>
				Avatar photo: <b>{`type: jpg/jpeg & max: ${IMAGEsize}k`}</b>
			</label>
			<div>
				<FileBase64
					type='file'
					multiple={false}
					accept='.jpg, .jpeg, .png'
					onDone={({ base64, size, type, file }) =>
						handelInput(base64, size, type, file)
					}
				/>
			</div>
			{error ? (
				<p style={{ color: 'red', width: '330px' }}>{error} </p>
			) : (
				<p style={{ color: 'green' }}>{`${typePhoto} ${sizePhoto}`}</p>
			)}
			<div className='image-container'>
				{photo && (
					<>
						<p>Image preview:</p>
						<img className='image-avatar' src={photo} alt={typePhoto} />
					</>
				)}
			</div>
		</div>
	);
};
