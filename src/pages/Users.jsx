import React, { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';

// Components
import { User } from '../components/User';
import { Footer } from '../components/Footer';
import { Menu } from '../components/Menu';

// Services
import { GetUsers } from '../services/getData';
import AuthContextProvider from '../context/AuthContext';

// Icons
import { ReactComponent as Home } from '../assets/icons/ui/home_nc.svg';

// Read JSON Data
// const geninfo = require('../data/geninfo.json').data;

export const Users = () => {
	const { userAdmin } = useContext(AuthContextProvider);

	const [openMenu, setOpenMenu] = useState(false);
	const [dataList, setDataList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		console.log('Users Rendered');
		if (userAdmin) {
			setLoading(true);
			GetUsers({ setDataList, setLoading, setError });
		}
	}, [userAdmin]);

	const backToTop = () => {
		window.location.href = '#top';
	};

	if (!userAdmin) {
		return <Navigate to='/quotes' element={<Home />} />;
	}

	return (
		<div className='pages-container'>
			{openMenu && <Menu setOpenMenu={setOpenMenu} active={'users'} />}
			<header>
				USERS
				<Link to='/' style={{ textDecoration: 'none' }}>
					<span className='icon'>
						<Home />
					</span>
				</Link>
			</header>
			<main>
				<div id='top'>...</div>
				<div className='list-container'>
					{error && <h2 className='center'>{error}</h2>}
					{loading && <h3 style={{ color: 'red' }}>Loading...</h3>}
					{dataList.map((user) => (
						<User key={user._id} user={user} />
					))}
				</div>
				<button className='btn btn-top' onClick={() => backToTop()}>
					Back to top
				</button>
			</main>
			<footer className='components_footer-container'>
				<Footer
					userAdmin={userAdmin}
					active={'users'}
					setOpenMenu={setOpenMenu}
				/>
			</footer>
		</div>
	);
};
