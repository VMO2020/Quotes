import Autor from '../models/Autors.js';

// LIST
export const getAutors = async (req, res) => {
	try {
		const Autors = await Autor.find();
		res.status(201).json({
			success: true,
			Autors,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
// REGISTER
export const registerAutor = async (req, res) => {
	const { name, country, born, dead, photo, wiki, created, tags } = req.body;
	let tagsSeparated = tags;
	if (tags.length) {
		tagsSeparated = tags.split(',');
	}

	try {
		// Checking if the name is already in the database
		const nameExist = await Autor.findOne({ name: name });
		if (nameExist)
			return res.status(401).send({
				success: false,
				error: 'Name already in use',
			});
		// Create a new author
		const autor = await Autor.create({
			name,
			country,
			born,
			dead,
			photo,
			wiki,
			created,
			tags: tagsSeparated,
		});

		res.status(201).json({
			success: true,
			autor,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};
