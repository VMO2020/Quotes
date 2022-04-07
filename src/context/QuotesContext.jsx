import React, { useState, useEffect } from 'react';

// Services API
import { GetQuotes } from '../services/getData';

const Context = React.createContext({});

export function QuotesContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [dataList, setDataList] = useState([]);

	useEffect(() => {
		GetQuotes({ setDataList, setLoading, setError });
	}, [setDataList]);

	return (
		<Context.Provider
			value={{
				dataList,
				setDataList,
				loading,
				error,
			}}
		>
			{children}
		</Context.Provider>
	);
}

export default Context;
