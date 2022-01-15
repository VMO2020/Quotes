import Axios from 'axios';

const URL = process.env.REACT_APP_URL;

// Get Users List
export const GetUsers = async ({ setDataList, setLoading, setError }) => {
	const endpoint = '/api/user/list';
	try {
		const data = await Axios.get(`${URL}${endpoint}`);
		const newData = SortData2(data.data.Users);
		setDataList(newData);
		setLoading(false);
	} catch (error) {
		console.log(error.response.data.error);
		setError(error.response.data.error);
	}
};

// Get Authors List
export const GetAuthors = async ({ setAuthorList, setLoading, setError }) => {
	const endpoint = '/api/authors/list';
	try {
		const data = await Axios.get(`${URL}${endpoint}`);
		const newData = SortData(data.data.Autors);
		setAuthorList(newData);
		setLoading(false);
	} catch (error) {
		console.log(error.response.data.error);
		setError(error.response.data.error);
	}
};

// Get Quotes List
export const GetQuotes = async ({ setDataList, setLoading, setError }) => {
	const endpoint = '/api/quotes/list';
	try {
		const data = await Axios.get(`${URL}${endpoint}`);
		const newData = SortData3(data.data.Quotes, 'author');
		setDataList(newData);
		setLoading(false);
	} catch (error) {
		console.log(error.response.data.error);
		setError(error.response.data.error);
	}
};

// SORT DATA BY NAME
const SortData = (items) => {
	const newItems = [...items];
	function compareItems(a, b) {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	}
	const sortedItems = newItems.sort(compareItems);
	return sortedItems;
};

// SORT DATA BY USERNAME
const SortData2 = (items) => {
	const newItems = [...items];
	function compareItems(a, b) {
		if (a.username < b.username) {
			return -1;
		}
		if (a.username > b.username) {
			return 1;
		}
		return 0;
	}
	const sortedItems = newItems.sort(compareItems);
	return sortedItems;
};

// SORT DATA BY AUTHOR
const SortData3 = (items) => {
	const newItems = [...items];
	function compareItems(a, b) {
		if (a.author < b.author) {
			return -1;
		}
		if (a.author > b.author) {
			return 1;
		}
		return 0;
	}
	const sortedItems = newItems.sort(compareItems);
	return sortedItems;
};
