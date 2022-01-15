import React, { useState, useEffect } from 'react';

// Components
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AuthorForm from '../components/AuthorForm';
import QuoteForm from '../components/QuoteForm';
import { Modal } from '../components/Modal';
import { Quote } from '../components/Quote';
import { Share } from '../components/Share';

// Services
import { GetQuotes } from '../services/getData';

// Styles
import './main.scss';

export const Main = ({
	user,
	authorList,
	AuthorFiltered,
	openLogin,
	openRegister,
	openShare,
	openQuoteRegister,
	openAuthorRegister,
	setUser,
	setAvatar,
	setLiked,
	setOpenShare,
	setUserAdmin,
	setOpenLogin,
	setOpenRegister,
	setOpenQuoteRegister,
	setOpenAuthorRegister,
}) => {
	const [dataList, setDataList] = useState([]);
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
			{openLogin && (
				<Modal>
					<LoginForm
						setUser={setUser}
						setAvatar={setAvatar}
						setLiked={setLiked}
						setUserAdmin={setUserAdmin}
						setOpenLogin={setOpenLogin}
						setOpenRegister={setOpenRegister}
					/>
				</Modal>
			)}
			{openRegister && (
				<Modal>
					<RegisterForm setUser={setUser} setOpenRegister={setOpenRegister} />
				</Modal>
			)}
			{openShare && (
				<Modal>
					<Share setOpenShare={setOpenShare} url={'vmog.net/'} />
				</Modal>
			)}
			{openAuthorRegister && (
				<Modal>
					<AuthorForm
						user={user}
						setOpenAuthorRegister={setOpenAuthorRegister}
					/>
				</Modal>
			)}
			{openQuoteRegister && (
				<Modal>
					<QuoteForm
						user={user}
						authorList={authorList}
						setOpenRegister={setOpenRegister}
						setOpenQuoteRegister={setOpenQuoteRegister}
					/>
				</Modal>
			)}
			<div className='list-container'>
				{AuthorFiltered !== 'all'
					? quotesFiltered.map((quote) => (
							<div key={quote._id}>
								<Quote quote={quote} />
							</div>
					  ))
					: dataList.map((quote) => (
							<div key={quote._id}>
								<Quote quote={quote} />
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
