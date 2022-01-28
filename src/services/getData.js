import Axios from 'axios';

const URL = process.env.REACT_APP_URL;

// Get User
export const GetUser = async ({ user, handleUserData, setserverError }) => {
	const endpoint = '/api/user/user';

	try {
		const data = await Axios.get(`${URL}${endpoint}/${user}`);

		// console.log(data.data);
		handleUserData(data);
		return data.data;
	} catch (error) {
		console.log(error.response.data.error);
		setserverError(error.response.data.error);
	}
};

// Get Users List
export const GetUsers = async ({ setDataList, setLoading, setError }) => {
	const endpoint = '/api/user/list';
	try {
		const data = await Axios.get(`${URL}${endpoint}`);
		setDataList(data.data.Users);
		setLoading(false);
		return data.data;
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
		// const newData = SortData(data.data.authors);
		setAuthorList(data.data.authors);
		setLoading(false);
		return data.data;
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
		setDataList(data.data.Quotes);
		setLoading(false);
		// console.log(data.data.Quotes);
		return data.data;
	} catch (error) {
		console.log(error.response.data.error);
		setError(error.response.data.error);
	}
};

// SORT DATA BY NAME
// const SortData = (items) => {
// 	const newItems = [...items];
// 	function compareItems(a, b) {
// 		if (a.name < b.name) {
// 			return -1;
// 		}
// 		if (a.name > b.name) {
// 			return 1;
// 		}
// 		return 0;
// 	}
// 	const sortedItems = newItems.sort(compareItems);
// 	return sortedItems;
// };
