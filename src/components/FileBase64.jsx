import React from 'react';

export const FileBase64 = ({ type, multiple = false, accept, onDone }) => {
	const handleChange = (e) => {
		// get the files
		let files = e.target.files;

		// Process each file
		const allFiles = [];

		for (let i = 0; i < files.length; i++) {
			let file = files[i];

			// Make new FileReader
			let reader = new FileReader();

			// Convert the file to base64 text
			reader.readAsDataURL(file);

			// on reader load somthing...
			reader.onload = () => {
				// Make a fileInfo Object
				let fileInfo = {
					name: file.name,
					type: file.type,
					size: Math.round(file.size / 1000) + ' kB',
					base64: reader.result,
					file: file,
				};

				// Push it to the state
				allFiles.push(fileInfo);

				// If all files have been proceed
				if (allFiles.length === files.length) {
					// Apply Callback function
					if (multiple) onDone(allFiles);
					else onDone(allFiles[0]);
				}
			}; // reader.onload
		} // for
	};

	return (
		<input
			type={type}
			accept={accept}
			onChange={handleChange}
			multiple={multiple}
		/>
	);
};
