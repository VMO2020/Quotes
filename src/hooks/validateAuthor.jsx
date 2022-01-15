export default function validateAuthor(values) {
	let namePattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g;

	let errors = {};

	// Name
	if (!values.name) {
		errors.name = 'Name is required';
	} else if (!namePattern.test(values.name)) {
		errors.name = 'Name is invalid, only letters';
	} else if (values.name.length < 3) {
		errors.name = 'Name lenght is invalid > 3';
	}

	// Country
	if (!values.country) {
		errors.country = 'Country is required';
	} else if (values.country.length < 2) {
		errors.country = 'Country lenght is invalid > 2';
	}

	return errors;
}
