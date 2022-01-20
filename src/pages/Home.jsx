import React, { useEffect, useState, useContext } from 'react';

// Components
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';

// Modals
import { Modal } from '../components/Modal';
import { Share } from '../components/Share';
import AuthorForm from '../components/AuthorForm';
import LoginForm from '../components/LoginForm';
import QuoteForm from '../components/QuoteForm';
import RegisterForm from '../components/RegisterForm';

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
	const [openRegisterForm, setOpenRegisterForm] = useState(false);
	const [openQuoteForm, setOpenQuoteForm] = useState(false);
	const [openAuthorForm, setOpenAuthorForm] = useState(false);

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
						setOpenRegisterForm={setOpenRegisterForm}
					/>
				</Modal>
			)}
			{openRegisterForm && (
				<Modal>
					<RegisterForm
						setUser={setUser}
						setRenderHome={setRenderHome}
						setOpenRegisterForm={setOpenRegisterForm}
					/>
				</Modal>
			)}
			{openAuthorForm && (
				<Modal>
					<AuthorForm
						user={user}
						setRenderHome={setRenderHome}
						setOpenAuthorForm={setOpenAuthorForm}
					/>
				</Modal>
			)}
			{openQuoteForm && (
				<Modal>
					<QuoteForm
						user={user}
						authorList={authorList}
						setRenderHome={setRenderHome}
						setOpenAuthorForm={setOpenAuthorForm}
						setOpenQuoteForm={setOpenQuoteForm}
					/>
				</Modal>
			)}
			{openShare && <Share setOpenShare={setOpenShare} url={'vmog.net/'} />}
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
					setOpenRegisterForm={setOpenRegisterForm}
					setOpenQuoteForm={setOpenQuoteForm}
					setOpenAuthorForm={setOpenAuthorForm}
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
