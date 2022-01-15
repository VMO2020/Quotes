export default function validateQuote(values) {
	let errors = {};

	// Quote
	if (!values.quote) {
		errors.quote = 'Quote is required';
	} else if (values.quote.length < 10) {
		errors.quote = 'Quote lenght is invalid > 10';
	}

	return errors;
}
