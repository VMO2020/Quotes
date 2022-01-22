import React from 'react';

// Helpers
import { clearLocalStoreValue } from '../helpers/LocalStore';

// Icons
import { ReactComponent as IconFace } from '../assets/icons/ui/face_nc.svg';
import { ReactComponent as IconShare } from '../assets/icons/ui/share_nc.svg';

// Read JSON Data
const geninfo = require('../data/geninfo.json').data;

export const Header = ({
	user,
	avatar,
	authorList,
	setUser,
	setAvatar,
	setUserAdmin,
	setAuthorFiltered,
	setOpenLogin,
	setOpenShare,
	setOpenQuoteForm,
	setOpenAuthorForm,
	setOpenRegisterForm,
}) => {
	const handleSelector = (name) => {
		// console.log(name);
		name !== 'all' ? setAuthorFiltered(name) : setAuthorFiltered('all');
	};

	const handleLogin = () => {
		setOpenLogin(true);
	};

	const handleShare = () => {
		setOpenShare(true);
	};

	const handleLogout = () => {
		setUser('');
		setAvatar('');
		setUserAdmin(false);
		clearLocalStoreValue('auth-ID');
	};

	const handleAuthorRegister = () => {
		if (user) {
			setOpenAuthorForm(true);
		} else {
			setOpenLogin(true);
		}
	};

	const handleQuoteRegister = () => {
		if (user) {
			setOpenQuoteForm(true);
		} else {
			setOpenLogin(true);
		}
	};

	const handleRegister = () => {
		setOpenRegisterForm(true);
	};

	return (
		<div>
			<div className='component_header-line line1'>
				<h3>
					<a
						className='logo'
						href={geninfo[0].webpage}
						target='_blank'
						rel='noreferrer'
					>
						<i>Quotes</i>
					</a>
				</h3>
				<div className='line-items'>
					{user ? (
						<button className='login' onClick={handleLogout}>
							Log out
						</button>
					) : (
						<button className='login' onClick={handleLogin}>
							Log in
						</button>
					)}
					{!user && (
						<button className='register' onClick={handleRegister}>
							Sign up
						</button>
					)}
					{avatar ? (
						<img
							className='elements_image-avatar_header'
							src={avatar}
							alt='avatar'
						/>
					) : (
						<p className='icon'>{user && <IconFace />}</p>
					)}
				</div>
			</div>
			<div className='component_header-line line2'>
				<div className='line-items'>
					<select
						id='author'
						name='author'
						className='custom-select'
						onChange={(e) => handleSelector(e.target.value, 'author')}
					>
						<option value='all'>All authors</option>
						{authorList.map((name) => (
							<option key={name._id} value={name.name}>
								{name.name}
							</option>
						))}
					</select>
				</div>
				<div className='line-items'>
					<button className='quote-register' onClick={handleShare}>
						<span className='icon'>
							<IconShare />
						</span>
					</button>
					<button className='author-register' onClick={handleAuthorRegister}>
						Add Author
					</button>
					<button className='quote-register' onClick={handleQuoteRegister}>
						Add Quote
					</button>
				</div>
			</div>
		</div>
	);
};
