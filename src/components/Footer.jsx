import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Services
import AuthContextProvider from '../context/AuthContext';

export const Footer = ({ active }) => {
	const { userAdmin } = useContext(AuthContextProvider);
	return (
		<div>
			<Link to='/' style={{ textDecoration: 'none' }}>
				<span className={active === 'quotes' ? 'active' : 'link'}>Quotes</span>
			</Link>

			<Link to='/authors' style={{ textDecoration: 'none' }}>
				<span className={active === 'authors' ? 'active' : 'link'}>
					Authors
				</span>
			</Link>
			{userAdmin && (
				<Link to='/users' style={{ textDecoration: 'none' }}>
					<span className={active === 'users' ? 'active' : 'link'}>Users</span>
				</Link>
			)}
			<Link to='/doc/cookies' style={{ textDecoration: 'none' }}>
				<span className={active === 'cookies' ? 'active' : 'link'}>
					Cookies
				</span>
			</Link>
			<Link to='/doc/privacy' style={{ textDecoration: 'none' }}>
				<span className={active === 'privacy' ? 'active' : 'link'}>
					Privacy
				</span>
			</Link>
		</div>
	);
};
