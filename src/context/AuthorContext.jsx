import React, { useState, useEffect } from 'react';

// Services API
import { GetAuthors } from '../services/getData';

const Context = React.createContext({});

export function AuthorContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [authorList, setAuthorList] = useState([]);
	const [AuthorFiltered, setAuthorFiltered] = useState('all');

	useEffect(() => {
		GetAuthors({ setAuthorList, setLoading, setError });
	}, [setAuthorList]);

	return (
		<Context.Provider
			value={{
				authorList,
				setAuthorList,
				AuthorFiltered,
				setAuthorFiltered,
				loading,
				error,
			}}
		>
			{children}
		</Context.Provider>
	);
}

export default Context;
