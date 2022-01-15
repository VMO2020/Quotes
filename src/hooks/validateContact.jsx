export default function validateContact(values) {
	let namePattern = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/g;
	let emailPattern = /^[a-z0-9._%+-]+@[^ ]+\.[a-z]{2,4}$/;

	// AGE
	let today = new Date();
	let year = today.getFullYear();
	let age = year - values.date.substr(0, 4);

	let errors = {};
	// Name
	if (!values.name) {
		errors.name = 'Name is required';
	} else if (!namePattern.test(values.name)) {
		errors.name = 'Please Enter Valid Name';
	} else if (values.name.length < 3) {
		errors.name = 'Name lenght is invalid > 3';
	}
	// Email
	if (!values.email) {
		errors.email = 'Email is required';
	} else if (!emailPattern.test(values.email)) {
		errors.email = 'Please Enter Valid Email';
	}
	// Date of Birth
	if (!values.date) {
		errors.date = 'Date of Birth is required';
	} else if (age > 110) {
		errors.date = 'Date is invalid > 110 years';
	}
	// Phone number
	if (!values.phone) {
		errors.phone = 'Phone number is required';
	} else if (values.phone.length < 10) {
		errors.phone = 'Please Enter Valid Phone Number';
	}
	// Postcode
	if (!values.postcode) {
		errors.postcode = 'Postcode is required';
	} else if (values.postcode.length < 5) {
		errors.postcode = 'Please Enter Valid Postcode';
	}
	// Message
	if (!values.message) {
		errors.message = 'Please enter your Message';
	}

	return errors;
}
