import Axios from 'axios';

// helpers
import { setLocalStoreValue } from '../helpers/LocalStore';

const URL = process.env.REACT_APP_URL;

export const PostAuthors = async ({ values, handleData, setserverError }) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const data = await Axios.post(
			`${URL}/api/authors/register`,
			{
				name: values.name,
				country: values.country,
				born: values.born,
				dead: values.dead,
				photo: values.photo,
				wiki: values.wiki,
				created: values.created,
				tags: values.tags,
			},
			config
		);

		return handleData(data);
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(
			`Invalid format, choose another file: ${error.response.data.error}`
		);
		setTimeout(() => {
			setserverError('');
		}, 5000);
	}
};

export const PostUser = async ({ values, handleData, setserverError }) => {
	const URL = process.env.REACT_APP_URL;
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const data = await Axios.post(
			`${URL}/api/user/register`,
			{
				username: values.name,
				nickname: values.nickname,
				email: values.email,
				photo: values.photo,
				password: values.password,
			},
			config
		);

		setLocalStoreValue('auth-ID', data.data.user);
		return handleData(data);
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(
			`Invalid format, choose another file: ${error.response.data.error}`
		);
		setTimeout(() => {
			setserverError('');
		}, 5000);
	}
};
