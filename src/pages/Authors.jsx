import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Components
import { Author } from '../components/Author';
import { Footer } from '../components/Footer';
import { Menu } from '../components/Menu';

// Services
import AuthContextProvider from '../context/AuthContext';
import AuthorContextProvider from '../context/AuthorContext';

// Icons
import { ReactComponent as Home } from '../assets/icons/ui/home_nc.svg';

export const Authors = () => {
	const { user, userAdmin, userAceptCookies } = useContext(AuthContextProvider);
	const { authorList } = useContext(AuthorContextProvider);

	const [openMenu, setOpenMenu] = useState(false);

	const backToTop = () => {
		window.location.href = '#top';
	};

	if (!userAceptCookies) {
		return <Navigate to='/quotes' element={<Home />} />;
	}

	return (
		<div className='pages-container'>
			{openMenu && <Menu setOpenMenu={setOpenMenu} active={'authors'} />}
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
						<Author
							key={author._id}
							author={author}
							user={user}
							userAdmin={userAdmin}
						/>
					))}
				</div>
				<button className='btn btn-top' onClick={() => backToTop()}>
					Back to top
				</button>
			</main>

			<footer className='components_footer-container'>
				<Footer
					userAdmin={userAdmin}
					active={'authors'}
					setOpenMenu={setOpenMenu}
				/>
			</footer>
		</div>
	);
};
