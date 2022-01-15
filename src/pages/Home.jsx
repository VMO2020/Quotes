import React, { useEffect, useState, useContext } from 'react';

// Components
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';

// Services
import { GetAuthors } from '../services/getData';
import AuthContextProvider from '../context/AuthContext';
import AuthorContextProvider from '../context/AuthorContext';

// helpers
import { getLocalStoreValue } from '../helpers/LocalStore';

// Styles
import './home.scss';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	// Open states
	const [openLogin, setOpenLogin] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);
	const [openQuoteRegister, setOpenQuoteRegister] = useState(false);
	const [openAuthorRegister, setOpenAuthorRegister] = useState(false);

	// Services Context
	const { user, avatar, setUser, liked, setLiked, setAvatar, setUserAdmin } =
		useContext(AuthContextProvider);
	const { authorList, AuthorFiltered, setAuthorList, setAuthorFiltered } =
		useContext(AuthorContextProvider);

	useEffect(() => {
		// Helper Local Storage
		const getUserId = getLocalStoreValue('auth-ID');
		if (getUserId) {
			setUser(getUserId);
		}
		// Service Authors
		GetAuthors({ setAuthorList, setLoading, setError });
	}, []);

	return (
		<div className='home-container'>
			<header>
				<Header
					user={user}
					avatar={avatar}
					authorList={authorList}
					setUser={setUser}
					setAvatar={setAvatar}
					setUserAdmin={setUserAdmin}
					setAuthorFiltered={setAuthorFiltered}
					setOpenLogin={setOpenLogin}
					setOpenShare={setOpenShare}
					setOpenRegister={setOpenRegister}
					setOpenQuoteRegister={setOpenQuoteRegister}
					setOpenAuthorRegister={setOpenAuthorRegister}
				/>
			</header>
			<main>
				{loading && <p>Loading...</p>}
				{error && <h2 className='center'>{error}</h2>}
				<Main
					user={user}
					liked={liked}
					authorList={authorList}
					AuthorFiltered={AuthorFiltered}
					openLogin={openLogin}
					openQuoteRegister={openQuoteRegister}
					openShare={openShare}
					openRegister={openRegister}
					openAuthorRegister={openAuthorRegister}
					setUser={setUser}
					setAvatar={setAvatar}
					setLiked={setLiked}
					setUserAdmin={setUserAdmin}
					setOpenLogin={setOpenLogin}
					setOpenShare={setOpenShare}
					setOpenRegister={setOpenRegister}
					setOpenQuoteRegister={setOpenQuoteRegister}
					setOpenAuthorRegister={setOpenAuthorRegister}
				/>
			</main>

			<footer className='footer'>
				<Footer active={'quotes'} />
			</footer>
		</div>
	);
};

export default Home;
