import React, { useState, useEffect } from 'react';

// Components
import { Quote } from '../components/Quote';

// Services
import { GetQuotes } from '../services/getData';

export const Main = ({
	user,
	liked,
	dataList,
	renderHome,
	authorList,
	AuthorFiltered,
	setDataList,
	setOpenLogin,
}) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [renderMain, setRenderMain] = useState(false);

	useEffect(() => {
		setLoading(true);
		GetQuotes({ setDataList, setLoading, setError });
		setRenderMain(false);
	}, [setDataList, renderMain, renderHome]);

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
		<div className='components_main'>
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
									setRenderMain={setRenderMain}
									setDataList={setDataList}
									setOpenLogin={setOpenLogin}
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
									setRenderMain={setRenderMain}
									setDataList={setDataList}
									setOpenLogin={setOpenLogin}
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
