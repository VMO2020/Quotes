import React, { useState } from 'react';

const Context = React.createContext({});

export function QuotesContextProvider({ children }) {
	const [dataList, setDataList] = useState([]);

	return (
		<Context.Provider
			value={{
				dataList,
				setDataList,
			}}
		>
			{children}
		</Context.Provider>
	);
}

export default Context;
