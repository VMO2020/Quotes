import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Pages
import Home from './Home';

// Services API
import AuthorContextProvider from '../context/AuthorContext';
import QuotesContextProvider from '../context/QuotesContext';

// Services API
import { GetAuthors } from '../services/getData';
import { GetQuotes } from '../services/getData';

const APIdata = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { setAuthorList } = useContext(AuthorContextProvider);
	const { setDataList } = useContext(QuotesContextProvider);

	useEffect(() => {
		GetAuthors({ setAuthorList, setLoading, setError });
	}, [setAuthorList]);

	useEffect(() => {
		GetQuotes({ setDataList, setLoading, setError });
	}, [setDataList]);

	return (
		<Navigate
			to='/quotes'
			element={
				<Home
					error={error}
					loading={loading}
					setDataList={setDataList}
					setAuthorList={setAuthorList}
				/>
			}
		/>
	);
};

export default APIdata;
