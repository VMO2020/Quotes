import Axios from 'axios';

const URL = process.env.REACT_APP_URL;

export const DeleteQuote = async ({ id }) => {
	try {
		const data = await Axios.delete(`${URL}/api/quotes/delete/${id}`);

		console.log(data.data);
		return data.data;
	} catch (error) {
		console.log(error.response.data.error);
	}
	return console.log('id submited:', id);
};
