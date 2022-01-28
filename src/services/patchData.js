import Axios from 'axios';

const URL = process.env.REACT_APP_URL;

// UPDATE QUOTE LIKES
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

		// console.log(data.data);
		await setLikesCount(data.data.updatedQuote.likeCount);
	} catch (error) {
		console.log(error.response.data.error);
	}
};

// UPDATE QUOTE
export const EditQuote = async ({ values, setserverError }) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};
	// console.log('Values: ', values);
	try {
		const data = await Axios.patch(
			`${URL}/api/quotes/update`,
			{
				quoteId: values.quoteId,
				quoteEdited: values.quote,
			},
			config
		);

		// console.log(data.data);
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(error.response.data.error);
		setTimeout(() => {
			setserverError('');
		}, 5000);
	}
};

// UPDATE USER PROFILE
export const EditUser = async ({ valuesEdited, setserverError }) => {
	// console.log(valuesEdited);
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const data = await Axios.patch(
			`${URL}/api/user/edit`,
			{
				userId: valuesEdited.userId,
				updateData: valuesEdited.updateData,
			},
			config
		);

		// console.log(data.data);
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(error.response.data.error);
		setTimeout(() => {
			setserverError('');
		}, 5000);
	}
};
