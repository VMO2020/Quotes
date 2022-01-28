import React, { useEffect, useState, useContext } from 'react';

// Components
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import { Menu } from '../components/Menu';

// Modals
import { Modal } from '../components/Modal';
import { Share } from '../components/Share';
import AuthorForm from '../components/AuthorForm';
import LoginForm from '../components/LoginForm';
import QuoteForm from '../components/QuoteForm';
import RegisterForm from '../components/RegisterForm';
import EditUserForm from '../components/EditUserForm';

// Services
import AuthContextProvider from '../context/AuthContext';
import AuthorContextProvider from '../context/AuthorContext';
import QuotesContextProvider from '../context/QuotesContext';

// helpers
import { getLocalStoreValue } from '../helpers/LocalStore';

const Home = ({ loading, error, setAuthorList }) => {
	const [renderHome, setRenderHome] = useState(true);

	// Open states
	const [openMenu, setOpenMenu] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	const [openQuoteForm, setOpenQuoteForm] = useState(false);
	const [openAuthorForm, setOpenAuthorForm] = useState(false);
	const [openRegisterForm, setOpenRegisterForm] = useState(false);
	const [openEditUserForm, setOpenEditUserForm] = useState(false);

	// Services Context
	const {
		user,
		avatar,
		setUser,
		liked,
		setLiked,
		setAvatar,
		setUserAdmin,
		userAceptCookies,
		setUserAcceptCookies,
	} = useContext(AuthContextProvider);

	const { authorList, AuthorFiltered, setAuthorFiltered } = useContext(
		AuthorContextProvider
	);

	const { dataList, setDataList } = useContext(QuotesContextProvider);

	useEffect(() => {
		// Helper Local Storage
		const getUserId = getLocalStoreValue('auth-ID');
		if (getUserId) {
			setUser(getUserId);
			setUserAcceptCookies(true);
		}
		// Render
		setRenderHome(false);
	}, [renderHome, setAuthorList, setUser, setDataList, setUserAcceptCookies]);

	return (
		<div className='home-container'>
			{openMenu && <Menu setOpenMenu={setOpenMenu} active={'quotes'} />}

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
						setUserAcceptCookies={setUserAcceptCookies}
					/>
				</Modal>
			)}
			{openRegisterForm && (
				<Modal>
					<RegisterForm
						setUser={setUser}
						setRenderHome={setRenderHome}
						setOpenRegisterForm={setOpenRegisterForm}
						setUserAcceptCookies={setUserAcceptCookies}
					/>
				</Modal>
			)}
			{openAuthorForm && (
				<Modal>
					<AuthorForm
						user={user}
						setRenderHome={setRenderHome}
						setOpenAuthorForm={setOpenAuthorForm}
						setAuthorList={setAuthorList}
					/>
				</Modal>
			)}
			{openQuoteForm && (
				<Modal>
					<QuoteForm
						user={user}
						authorList={authorList}
						setDataList={setDataList}
						setRenderHome={setRenderHome}
						setOpenAuthorForm={setOpenAuthorForm}
						setOpenQuoteForm={setOpenQuoteForm}
					/>
				</Modal>
			)}
			{openEditUserForm && (
				<Modal>
					<EditUserForm user={user} setOpenEditUserForm={setOpenEditUserForm} />
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
					setUserAcceptCookies={setUserAcceptCookies}
					setOpenEditUserForm={setOpenEditUserForm}
				/>
			</header>
			<main>
				{loading && <p>Loading...</p>}
				{error && <h2 className='center'>{error}</h2>}
				<Main
					user={user}
					liked={liked}
					dataList={dataList}
					authorList={authorList}
					AuthorFiltered={AuthorFiltered}
					userAceptCookies={userAceptCookies}
					setDataList={setDataList}
					setOpenLogin={setOpenLogin}
					setUserAcceptCookies={setUserAcceptCookies}
				/>
			</main>

			<footer className='components_footer-container'>
				<Footer active={'quotes'} setOpenMenu={setOpenMenu} />
			</footer>
		</div>
	);
};

export default Home;
