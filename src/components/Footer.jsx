import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// Services
import AuthContextProvider from '../context/AuthContext';

export const Footer = ({ active, setOpenMenu }) => {
	const { userAdmin } = useContext(AuthContextProvider);

	return (
		<div className='components_footer'>
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
			<button className='footer' onClick={() => setOpenMenu(true)}>
				<span className='footer'>MENU</span>
			</button>
		</div>
	);
};
