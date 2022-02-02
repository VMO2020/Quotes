import React, { useEffect, useState } from 'react';

// Modals
import { Modal } from '../components/Modal';
import AuthorEdit from '../components/AuthorEdit';

// Icons
import { ReactComponent as IconEdit } from '../assets/icons/ui/edit_nc.svg';

export const Author = ({ user, author, userAdmin }) => {
	const [isCreator, setIsCreator] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);

	useEffect(() => {
		if (user === author.created) {
			setIsCreator(true);
		}
	}, []);

	const handleEdit = () => {
		setOpenEdit(true);
	};

	return (
		<div className='elements_card-container'>
			{openEdit && (
				<Modal>
					<AuthorEdit setOpenEdit={setOpenEdit} author={author} />
				</Modal>
			)}
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
						<p key={index} className='tag'>
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
			<div className='icons-container'>
				{isCreator && (
					<button className='icons-quote' onClick={handleEdit}>
						<IconEdit />
					</button>
				)}
			</div>
		</div>
	);
};
