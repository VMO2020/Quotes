import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Author } from '../components/Author';
import { Footer } from '../components/Footer';

// Services
import AuthContextProvider from '../context/AuthContext';
import AuthorContextProvider from '../context/AuthorContext';

// Icons
import { ReactComponent as Home } from '../assets/icons/home.svg';

// Styles
import './authors.scss';

export const Authors = () => {
	const { userAdmin } = useContext(AuthContextProvider);
	const { authorList } = useContext(AuthorContextProvider);

	const backToTop = () => {
		window.location.href = '#top';
	};

	return (
		<div className='authors'>
			<header>
				AUTHORS
				<Link to='/' style={{ textDecoration: 'none' }}>
					<span className='icon'>
						<Home />
					</span>
				</Link>
			</header>

			<main>
				<div id='top'>...</div>
				<div className='list-container'>
					{authorList.map((author) => (
						<Author key={author._id} author={author} userAdmin={userAdmin} />
					))}
				</div>
				<button className='btn' onClick={() => backToTop()}>
					Back to top
				</button>
			</main>

			<footer className='footer'>
				<Footer userAdmin={userAdmin} active={'authors'} />
			</footer>
		</div>
	);
};
