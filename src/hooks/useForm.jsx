import { useState, useEffect } from 'react';

const useForm = (callback, validate, initialForm) => {
	const [values, setValues] = useState(initialForm);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const reset = () => {
		setValues(initialForm);
	};

	// "name" is the LoginForm input "name" (name, email,...)
	// "event.target" get all data "value" introduced in the input by "name"
	const handleChange = (event) => {
		const { name, value } = event.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleValue = (name, value, error) => {
		if (value) {
			setValues({
				...values,
				[name]: value,
			});
		}
		if (!error) {
			setErrors('');
		}
	};

	const handlePhoto = (base64, name) => {
		// console.log(base64);
		if (base64) {
			setValues({
				...values,
				[name]: base64,
			});
		}
	};

	const handleSelector = (data, name) => {
		setValues({
			...values,
			[name]: data,
		});
	};

	const handleAllChecked = (event) => {
		const { name } = event.target;
		const check = event.target.checked;
		console.log(name);
		console.log(check);

		setValues({
			...values,
			[name]: check,
		});
	};

	// Prevent default page to be rendered & put errors values in "errors"
	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};

	// Check when ever erros change & if errors = 0 & isSubminitting = "true" => callback (submit):
	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			callback();
		}
		// eslint-disable-next-line
	}, [errors]);

	return {
		handleChange,
		handlePhoto,
		handleSubmit,
		handleSelector,
		handleAllChecked,
		handleValue,
		setValues,
		values,
		errors,
		reset,
	};
};

export default useForm;
