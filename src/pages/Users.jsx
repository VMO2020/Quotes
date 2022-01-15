import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import { User } from '../components/User';
import { Footer } from '../components/Footer';
import { ScrollBackToTop } from '../components/ScrollBackToTop';

// Services
import { GetUsers } from '../services/getData';
import AuthContextProvider from '../context/AuthContext';

// Icons
import { ReactComponent as Home } from '../assets/icons/home.svg';

// Styles
import './users.scss';

// Read JSON Data
// const geninfo = require('../data/geninfo.json').data;

export const Users = () => {
	const { userAdmin } = useContext(AuthContextProvider);

	const [dataList, setDataList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (userAdmin) {
			setLoading(true);
			GetUsers({ setDataList, setLoading, setError });
		} else {
			setError('User not allowed');
		}
	}, [userAdmin]);

	return (
		<div className='users'>
			<header>
				USERS
				<Link to='/' style={{ textDecoration: 'none' }}>
					<span className='icon'>
						<Home />
					</span>
				</Link>
			</header>
			<main>
				<div className='list-container'>
					{error && <h2 className='center'>{error}</h2>}
					{loading && <h3 style={{ color: 'red' }}>Loading...</h3>}
					{dataList.map((user) => (
						<User key={user._id} user={user} />
					))}
				</div>
				<div className='center'>
					<ScrollBackToTop />
				</div>
			</main>
			<footer className='footer'>
				<Footer userAdmin={userAdmin} active={'users'} />
			</footer>
		</div>
	);
};
