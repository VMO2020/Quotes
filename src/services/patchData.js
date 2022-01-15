import { useContext } from 'react';
import Axios from 'axios';

// Services
import AuthContextProvider from '../context/AuthContext';
import QuotesContextProvider from '../context/AuthContext';

const URL = process.env.REACT_APP_URL;

export const UpdateLikes = async ({ userId, quoteId, updateData }) => {
	const { setUser } = useContext(AuthContextProvider);
	const { setDataList } = useContext(QuotesContextProvider);

	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const data = await Axios.patch(
			`${URL}/api/quotes/update`,
			{
				userId,
				quoteId,
				updateData,
			},
			config
		);

		setUser(data.updatedUser);
		setDataList(data.updatedQuote);
	} catch (error) {
		console.log(error.response.data.error);
	}
};
