import React from 'react';

export const User = ({ user }) => {
	return (
		<div className='elements_card-container'>
			<ul>
				{user.photo && (
					<li>
						<img
							className='elements_image-avatar'
							src={user.photo}
							alt='author'
						/>
					</li>
				)}
				<li>
					<p className='card-id'>
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
						email: <b> {user.email}</b>
					</p>
				</li>
				<li>
					<p>
						subscribed: <b> {user.subscribe ? 'true' : 'false'}</b>
					</p>
				</li>
			</ul>
		</div>
	);
};
