import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Modal } from '../components/Modal';

// Services
import AuthContextProvider from '../context/AuthContext';

// Icons
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';
import { ReactComponent as Facebook } from '../assets/icons/social/facebook.svg';
import { ReactComponent as GitHub } from '../assets/icons/social/github_full_nc.svg';
import { ReactComponent as Web } from '../assets/icons/social/bracket.svg';
import { ReactComponent as Instagram } from '../assets/icons/social/instagram_full_circle_nc.svg';
import { ReactComponent as Twitter } from '../assets/icons/social/twitter_full_circle_nc.svg';
import { ReactComponent as Linkedin } from '../assets/icons/social/linkedin_full_circle_nc.svg';

export const Menu = ({ setOpenMenu, active }) => {
	const { userAdmin } = useContext(AuthContextProvider);

	// Read JSON Data
	const geninfo = require('../data/geninfo.json').data;

	return (
		<Modal>
			<div className='components_menu'>
				<span className='icon-close' onClick={() => setOpenMenu(false)}>
					<Close />
				</span>
				<h2 className='menu-title'>MENU</h2>
				<div className='links-container'>
					<Link to='/quotes' style={{ textDecoration: 'none' }}>
						<span className={active === 'quotes' ? 'active' : 'link'}>
							Quotes
						</span>
					</Link>

					<Link to='/authors' style={{ textDecoration: 'none' }}>
						<span className={active === 'authors' ? 'active' : 'link'}>
							Authors
						</span>
					</Link>
					{userAdmin && (
						<Link to='/users' style={{ textDecoration: 'none' }}>
							<span className={active === 'users' ? 'active' : 'link'}>
								Users
							</span>
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

				<div className='icons-container'>
					<a
						className='icons-social icon-web'
						href={geninfo[0].webpage}
						target='_blank'
						rel='noreferrer'
					>
						<Web />
					</a>
					<a
						className='icons-social icon-instagram'
						href={geninfo[0].instagram}
						target='_blank'
						rel='noreferrer'
					>
						<Instagram />
					</a>
					<a
						className='icons-social icon-twitter'
						href={geninfo[0].twitter}
						target='_blank'
						rel='noreferrer'
					>
						<Twitter />
					</a>
					<a
						className='icons-social icon-facebook'
						href={geninfo[0].facebook}
						target='_blank'
						rel='noreferrer'
					>
						<Facebook />
					</a>
					<a
						className='icons-social icon-github'
						href={geninfo[0].github}
						target='_blank'
						rel='noreferrer'
					>
						<GitHub />
					</a>
					<a
						className='icons-social icon-linkedin'
						href={geninfo[0].linkedin}
						target='_blank'
						rel='noreferrer'
					>
						<Linkedin />
					</a>
				</div>
			</div>
		</Modal>
	);
};
