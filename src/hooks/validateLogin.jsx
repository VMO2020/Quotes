export default function validateLogin(values) {
	let emailPattern =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	let errors = {};

	// Email
	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!emailPattern.test(values.email)) {
		errors.email = 'Email address is invalid';
	}
	// Password
	if (!values.password) {
		errors.password = 'Password is required';
	} else if (values.password.length < 6) {
		errors.password = 'Password needs to be more than 5 characters';
	}

	return errors;
}
