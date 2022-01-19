import React, { useEffect, useState, useContext } from 'react';

// Components
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';

// Modals
import { Modal } from '../components/Modal';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import AuthorForm from '../components/AuthorForm';
import QuoteForm from '../components/QuoteForm';
import { Share } from '../components/Share';

// Services
import { GetAuthors } from '../services/getData';
import AuthContextProvider from '../context/AuthContext';
import AuthorContextProvider from '../context/AuthorContext';
import QuotesContextProvider from '../context/QuotesContext';

// helpers
import { getLocalStoreValue } from '../helpers/LocalStore';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [renderHome, setRenderHome] = useState(false);

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
	const { dataList, setDataList } = useContext(QuotesContextProvider);

	useEffect(() => {
		// Helper Local Storage
		const getUserId = getLocalStoreValue('auth-ID');
		if (getUserId) {
			setUser(getUserId);
		}
		// Service Authors
		GetAuthors({ setAuthorList, setLoading, setError });
		// Render
		setRenderHome(false);
	}, [renderHome, setAuthorList, setUser]);

	return (
		<div className='home-container'>
			{openLogin && (
				<Modal>
					<LoginForm
						setUser={setUser}
						setAvatar={setAvatar}
						setLiked={setLiked}
						setRenderHome={setRenderHome}
						setUserAdmin={setUserAdmin}
						setOpenLogin={setOpenLogin}
						setOpenRegister={setOpenRegister}
					/>
				</Modal>
			)}
			{openRegister && (
				<Modal>
					<RegisterForm
						setUser={setUser}
						setRenderHome={setRenderHome}
						setOpenRegister={setOpenRegister}
					/>
				</Modal>
			)}
			{openAuthorRegister && (
				<Modal>
					<AuthorForm
						user={user}
						setRenderHome={setRenderHome}
						setOpenAuthorRegister={setOpenAuthorRegister}
					/>
				</Modal>
			)}
			{openQuoteRegister && (
				<Modal>
					<QuoteForm
						user={user}
						authorList={authorList}
						setRenderHome={setRenderHome}
						setOpenAuthorRegister={setOpenAuthorRegister}
						setOpenQuoteRegister={setOpenQuoteRegister}
					/>
				</Modal>
			)}
			{openShare && (
				<Modal>
					<Share setOpenShare={setOpenShare} url={'vmog.net/'} />
				</Modal>
			)}
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
					dataList={dataList}
					renderHome={renderHome}
					authorList={authorList}
					AuthorFiltered={AuthorFiltered}
					setDataList={setDataList}
					setOpenLogin={setOpenLogin}
				/>
			</main>

			<footer className='components_footer-container'>
				<Footer active={'quotes'} />
			</footer>
		</div>
	);
};

export default Home;
