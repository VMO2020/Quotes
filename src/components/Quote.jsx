import React, { useEffect, useState, useRef } from 'react';
import Axios from 'axios';

// Modals
import { Modal } from '../components/Modal';
import { Share } from '../components/Share';
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

export const Quote = ({ user, liked, quote, authorList }) => {
	// States
	const [isFavorite, setIsFavorite] = useState(false);
	const [isCreator, setIsCreator] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	const [openMessage, setOpenMessage] = useState(false);
	const quoteSelected = `${quote.author}: "${quote.quote}"`;

	const inputRef = useRef();

	const author = quote.author;
	let photo = '';

	const authorSelected = authorList.filter((name) => name.name === author);
	if (authorSelected.length > 0) {
		photo = authorSelected[0].photo;
	}

	useEffect(() => {
		if (user === quote.creator) {
			setIsCreator(true);
			const isLiked = liked.includes(quote._id);
			if (isLiked) {
				setIsFavorite(true);
			}
		}
	}, [liked, quote.creator, quote._id, user]);

	const handleCopy = () => {
		const content = inputRef.current;
		// console.log(content);
		content.select();
		document.execCommand('copy');
		setOpenMessage(true);
		setTimeout(() => {
			setOpenMessage(false);
		}, 1000);
	};

	const handleShare = () => {
		setOpenShare(true);
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

		setIsFavorite(!isFavorite);

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
			{openShare && (
				<Modal>
					<Share setOpenShare={setOpenShare} url={'vmog.net'} />
				</Modal>
			)}
			<ul>
				<li className='photo'>
					<img className='image-avatar_quote' src={photo} alt={quote._id} />
					<p className='quote'>
						<span>&#8220;</span> <i id='quote'>{quote.quote}</i>
						<span>&#8221;</span>
					</p>
					<input
						type='text'
						defaultValue={quoteSelected}
						ref={inputRef}
						style={{ opacity: 0, position: 'absolute' }}
					></input>
				</li>
				<li>
					<p id='author'>
						<b> {quote.author}</b>
					</p>
				</li>
			</ul>
			<div className='icons-container'>
				<button className='icons-quote' onClick={handleCopy}>
					<IconCopy />
					{openMessage && (
						<p style={{ margin: '0 0.5em', color: 'green', fontSize: '1em' }}>
							Copied
						</p>
					)}
				</button>
				<button className='icons-quote' onClick={handleShare}>
					<IconShare />
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
					<button className='icons-like'>
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
