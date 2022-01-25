import Axios from 'axios';

// helpers
import { setLocalStoreValue } from '../helpers/LocalStore';

const URL = process.env.REACT_APP_URL;

// AUTHORS
export const PostAuthors = async ({
	values,
	setserverError,
	setAuthorList,
}) => {
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

		console.log(data.data);
		setAuthorList(data.data.authors);
		return data.data;
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(error.response.data.error);
		setTimeout(() => {
			setserverError('');
		}, 5000);
	}
};

// USERS
export const PostUser = async ({ values, handleData, setserverError }) => {
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
				subscribe: values.subscribe,
			},
			config
		);

		console.log(data.data);
		setLocalStoreValue('auth-ID', data.data.user);
		return handleData(data);
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(error.response.data.error);
		setTimeout(() => {
			setserverError('');
		}, 5000);
	}
};

// QUOTES
export const PostQuote = async ({ values, setserverError, setDataList }) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const data = await Axios.post(
			`${URL}/api/quotes/register`,
			{
				author: values.author,
				quote: values.quote,
				creator: values.creator,
			},
			config
		);

		console.log(data.data);
		setDataList(data.data.quotes);
		return data.data;
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(error.response.data.error);
		setTimeout(() => {
			setserverError('');
		}, 5000);
	}
};

// LOGIN
export const PostLogin = async ({ values, handleData, setserverError }) => {
	const config = {
		header: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const data = await Axios.post(
			`${URL}/api/user/login`,
			{
				email: values.email,
				password: values.password,
			},
			config
		);

		console.log(data.data);
		setLocalStoreValue('auth-ID', data.data.user);
		return handleData(data);
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(error.response.data.error);
		setTimeout(() => {
			setserverError('');
		}, 5000);
	}
};
