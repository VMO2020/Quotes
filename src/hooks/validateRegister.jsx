export default function validateRegister(values) {
	let namePattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g;
	let nicknamePattern = /^[a-zA-Z ]+$/;
	let emailPattern =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	let errors = {};
	// Name
	if (!values.name) {
		errors.name = 'Name is required';
	} else if (!namePattern.test(values.name)) {
		errors.name = 'Name is invalid';
	} else if (values.name.length < 3) {
		errors.name = 'Name lenght is invalid > 3';
	}
	// Nickname
	if (!values.nickname) {
		errors.nickname = 'Nickame is required';
	} else if (!nicknamePattern.test(values.nickname)) {
		errors.nickname = 'Nickname is invalid, only letters & > 3';
	} else if (values.nickname.length < 3) {
		errors.nickname = 'Nickname lenght is invalid > 3';
	}
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
	// Password2
	if (!values.password2) {
		errors.password2 = 'Password2 is required';
	} else if (values.password2 !== values.password) {
		errors.password2 = 'Passwords needs to match';
	}
	return errors;
}
