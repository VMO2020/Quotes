import Quote from '../models/Quotes.js';

// LIST
export const getQuotes = async (req, res) => {
	try {
		const Quotes = await Quote.find();
		res.status(201).json({
			success: true,
			Quotes,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

// REGISTER
export const registerQuote = async (req, res) => {
	const { author, quote, creator } = req.body;

	try {
		// Checking if the quote is already in the database
		const quoteExist = await Quote.findOne({ quote: quote });
		if (quoteExist)
			return res.status(401).send({
				success: false,
				error: 'Quote already posted',
			});
		// Create a new quote
		const newquote = await Quote.create({
			author,
			quote,
			creator,
		});

		res.status(201).json({
			success: true,
			newquote,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

// UPDATE
export const updateQuote = async (req, res) => {
	const { quoteId, quoteEdited } = req.body;

	try {
		const updatedQuote = await Quote.findByIdAndUpdate(
			quoteId,
			{ quote: quoteEdited },
			{ new: true }
		);

		res.status(201).json({
			success: true,
			quoteId,
			quoteEdited,
			updatedQuote,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

// DELETE
export const deleteQuote = async (req, res) => {
	const { id } = req.params;

	try {
		// Checking if the quote is already in the database
		const quoteExist = await Quote.findOne({ _id: id });
		if (!quoteExist)
			return res.status(404).send({
				success: false,
				error: `No quote with id: ${id}}`,
			});
		// Delete Quote
		await Quote.findByIdAndRemove(id);
		res.status(201).json({
			success: true,
			message: `Quote ${id} deleted successfully.`,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
