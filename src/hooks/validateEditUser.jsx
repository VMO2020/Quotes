export default function validateEditUser(values) {
	let namePattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g;
	let nicknamePattern = /^[a-zA-Z ]+$/;
	let emailPattern =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	let errors = {};
	// Name
	if (!values.username) {
		errors.username = 'Name is required';
	} else if (!namePattern.test(values.username)) {
		errors.username = 'Name is invalid';
	} else if (values.username.length < 3) {
		errors.username = 'Name lenght is invalid > 3';
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
	return errors;
}
