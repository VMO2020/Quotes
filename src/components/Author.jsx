import React from 'react';

export const Author = ({ author, userAdmin }) => {
	return (
		<div className='elements_card-container'>
			<ul>
				{author.photo && (
					<li>
						<img
							className='elements_image-avatar'
							src={author.photo}
							alt='author'
						/>
					</li>
				)}

				<li>
					<p>
						name: <b> {author.name}</b>
					</p>
				</li>
				<li>
					<p>
						born: <b> {author.born}</b>
					</p>
				</li>
				<li>
					{author.dead && (
						<p>
							dead: <b> {author.dead}</b>
						</p>
					)}
				</li>
				<li>
					<p>
						country/city: <b> {author.country}</b>
					</p>
				</li>
				<li>
					<p>wikipedia:</p>
					{author.wiki && (
						<a
							className='wiki'
							href={author.wiki}
							target='_blank'
							rel='noreferrer'
						>
							<b>-Click for link-</b>
						</a>
					)}
				</li>
				{/* <li>
					<p>
						likes: <b> {author.likeCount}</b>
					</p>
				</li> */}
				<p>Tags:</p>
				<li className='tags'>
					{author.tags.map((tag, index) => (
						<p key={index}>
							<b>{tag}</b>
						</p>
					))}
				</li>
				{userAdmin && (
					<li>
						<p className='created'>created: {author.created}</p>
					</li>
				)}
			</ul>
		</div>
	);
};
