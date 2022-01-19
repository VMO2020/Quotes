import Axios from 'axios';

const URL = process.env.REACT_APP_URL;

export const UpdateQuoteLikes = async ({
	userId,
	quoteId,
	updateData,
	setLikesCount,
}) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const data = await Axios.patch(
			`${URL}/api/user/update`,
			{
				userId,
				quoteId,
				updateData,
			},
			config
		);

		console.log(data.data);
		await setLikesCount(data.data.updatedQuote.likeCount);
	} catch (error) {
		console.log(error.response.data.error);
	}
};
