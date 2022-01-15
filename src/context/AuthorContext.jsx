import React, { useState } from 'react';

const Context = React.createContext({});

export function AuthorContextProvider({ children }) {
	const [authorList, setAuthorList] = useState([]);
	const [AuthorFiltered, setAuthorFiltered] = useState('all');

	return (
		<Context.Provider
			value={{
				authorList,
				setAuthorList,
				AuthorFiltered,
				setAuthorFiltered,
			}}
		>
			{children}
		</Context.Provider>
	);
}

export default Context;
