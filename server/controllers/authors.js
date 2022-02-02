import Author from '../models/Authors.js';

// LIST
export const getAuthors = async (req, res) => {
	try {
		// Get new authors list, sorted by ascending names (1) or descending names (-1)
		const authors = await Author.find().sort({ name: 1 });
		res.status(201).json({
			success: true,
			authors,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
// REGISTER
export const registerAuthor = async (req, res) => {
	const { name, country, born, dead, photo, wiki, created, tags } = req.body;
	let tagsSeparated = tags;
	if (tags.length) {
		tagsSeparated = tags.split(',');
	}

	try {
		// Checking if the name is already in the database
		const nameExist = await Author.findOne({ name: name });
		if (nameExist)
			return res.status(401).send({
				success: false,
				error: 'Name already in use',
			});
		// Create a new author
		const author = await Author.create({
			name,
			country,
			born,
			dead,
			photo,
			wiki,
			created,
			tags: tagsSeparated,
		});
		// Get new authors list, sorted by ascending names (1) or descending names (-1)
		const authors = await Author.find().sort({ name: 1 });

		res.status(201).json({
			success: true,
			author,
			authors,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

// EDIT
export const editAuthor = async (req, res) => {
	// console.log(req.body.values);
	const { authorId, name, country, born, dead, photo, wiki, tags } =
		req.body.values;

	try {
		// Update author new data
		const updatedAuthor = await Author.findByIdAndUpdate(
			authorId,
			{ name, country, born, dead, photo, wiki, tags },
			{ new: true }
		);

		res.status(201).json({
			success: true,
			updatedAuthor,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
