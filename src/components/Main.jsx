import React, { useState, useEffect } from 'react';

// Components
import { Quote } from '../components/Quote';

// Services
import { GetQuotes } from '../services/getData';

// Styles
import './main.scss';

export const Main = ({
	user,
	liked,
	dataList,
	authorList,
	AuthorFiltered,
	setUser,
	setDataList,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		GetQuotes({ setDataList, setLoading, setError });
	}, [setDataList]);

	useEffect(() => {
		backToTop();
	}, [AuthorFiltered]);

	const quotesFiltered = dataList.filter(function (el) {
		return el.author === AuthorFiltered;
	});

	const backToTop = () => {
		window.location.href = '#top';
	};

	return (
		<div className='main_home'>
			<div id='top'></div>
			{error && <h2 className='center'>{error}</h2>}
			{loading && <h3 style={{ color: 'red' }}>Loading...</h3>}

			<div className='list-container'>
				{AuthorFiltered !== 'all'
					? quotesFiltered.map((quote) => (
							<div key={quote._id}>
								<Quote
									user={user}
									quote={quote}
									liked={liked}
									authorList={authorList}
									setDataList={setDataList}
								/>
							</div>
					  ))
					: dataList.map((quote) => (
							<div key={quote._id}>
								<Quote
									user={user}
									liked={liked}
									quote={quote}
									authorList={authorList}
									setDataList={setDataList}
								/>
							</div>
					  ))}
			</div>
			<div className='btn-container'>
				<a className='btn' href='#top' style={{ textDecoration: 'none' }}>
					Back to top
				</a>
			</div>
		</div>
	);
};
