import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

// Icons
import { ReactComponent as IconShare } from '../assets/icons/share.svg';
import { ReactComponent as IconCopy } from '../assets/icons/content_copy.svg';
import { ReactComponent as IconEdit } from '../assets/icons/edit.svg';
import { ReactComponent as IconDelete } from '../assets/icons/delete.svg';
import { ReactComponent as IconFavorite } from '../assets/icons/favorite.svg';
import { ReactComponent as IconFavoriteFull } from '../assets/icons/favorite_full.svg';

// Styles
import './quote.scss';

const URL = process.env.REACT_APP_URL;

export const Quote = ({
	user,
	liked,
	quote,
	authorList,
	setUser,
	setDataList,
}) => {
	// States
	const [isFavorite, setIsFavorite] = useState(false);
	const [isCreator, setIsCreator] = useState(false);

	const author = quote.author;
	let photo = '';

	const authorSelected = authorList.filter((name) => name.name === author);
	if (authorSelected.length > 0) {
		photo = authorSelected[0].photo;
	}

	useEffect(() => {
		handleRender();
		if (user === quote.creator) {
			setIsCreator(true);
		}
	}, [liked, quote._id, user]);

	const handleRender = () => {
		if (liked) {
			const isLiked = liked.includes(quote._id);
			if (isLiked) {
				// console.log(quote._id);
				setIsFavorite(true);
			}
		}
	};

	const handleCopy = () => {
		const content = document.querySelector('#quote').textContent;
		console.log(content);
		// content.current.select();
		// content.select();
		// document.execCommand('copy');
	};

	const handleShare = () => {
		const contenido = document.querySelector('#quote').textContent;
		console.log(`Share: ${contenido}`);
		// copyText.select();
	};

	const handleEdit = () => {
		console.log('Edit');
	};

	const handleDelete = () => {
		console.log('Delete');
	};

	const handleLikes = async (updateData) => {
		// Verification user log in
		if (!user) {
			return;
		}
		const userId = user;
		const quoteId = quote._id;

		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const data = await Axios.patch(
				`${URL}/api/user/update`,
				{
					userId,
					quoteId,
					updateData,
				},
				config
			);

			console.log(data);
		} catch (error) {
			console.log(error.response.data.error);
		}
	};

	return (
		<div className='quote_card-container'>
			<ul>
				<li className='photo'>
					<img className='image-avatar_quote' src={photo} alt={quote._id} />
				</li>
				<li>
					<p className='quote'>
						<span>&#8220;</span> <i id='quote'>{quote.quote}</i>
						<span>&#8221;</span>
					</p>
				</li>
				<li>
					<p id='author'>
						<b> {quote.author}</b>
					</p>
				</li>
			</ul>
			<div className='icons-container'>
				<button className='icons-quote' onClick={handleShare}>
					<IconShare />
				</button>
				<button className='icons-quote' onClick={handleCopy}>
					<IconCopy />
				</button>
				{isCreator && (
					<button className='icons-quote' onClick={handleEdit}>
						<IconEdit />
					</button>
				)}
				{isCreator && (
					<button className='icons-quote' onClick={handleDelete}>
						<IconDelete />
					</button>
				)}
				<div className='likes'>
					<button className='icons-quote'>
						{isFavorite ? (
							<span onClick={() => handleLikes('dislike')}>
								<IconFavoriteFull />
							</span>
						) : (
							<span onClick={() => handleLikes('like')}>
								<IconFavorite />
							</span>
						)}
					</button>
					<p>{quote.likeCount}</p>
				</div>
			</div>
		</div>
	);
};
