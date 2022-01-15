export const getLocalStoreValue = (key) => {
	try {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : '';
	} catch (error) {
		return '';
	}
};

export const setLocalStoreValue = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(error);
	}
};

export const clearLocalStoreValue = (key) => {
	try {
		localStorage.clear(key);
	} catch (error) {
		console.error(error);
	}
};
