import React from 'react';

// Styles
import './user.scss';

export const User = ({ user }) => {
	return (
		<div className='card-container-user'>
			<ul>
				{user.photo && (
					<li className='photo'>
						<img src={user.photo} alt='author' />
					</li>
				)}
				<li>
					<p className='user-id'>
						id: <b>{user._id}</b>
					</p>
				</li>

				<li>
					<p>
						name: <b> {user.username}</b>
					</p>
				</li>
				<li>
					<p>
						nickname: <b>{user.nickname}</b>
					</p>
				</li>
				<li>
					<p>
						email: <b> {user.email}</b>{' '}
					</p>
				</li>
			</ul>
		</div>
	);
};
