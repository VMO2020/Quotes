import React, { useEffect, useState } from 'react';

// Modals
import { Modal } from '../components/Modal';
import { Share } from '../components/Share';
import { QuoteEditForm } from '../components/QuoteEditForm';

// services
import { DeleteQuote } from '../services/deleteData';
import { UpdateQuoteLikes } from '../services/patchData';

// Icons
import { ReactComponent as IconShare } from '../assets/icons/share.svg';
import { ReactComponent as IconCopy } from '../assets/icons/content_copy.svg';
import { ReactComponent as IconEdit } from '../assets/icons/edit.svg';
import { ReactComponent as IconDelete } from '../assets/icons/delete.svg';
import { ReactComponent as IconFavorite } from '../assets/icons/favorite.svg';
import { ReactComponent as IconFavoriteFull } from '../assets/icons/favorite_full.svg';

export const Quote = ({
	user,
	liked,
	quote,
	authorList,
	setOpenLogin,
	setRenderMain,
}) => {
	// States
	const [quoteEdited, setQuoteEdited] = useState('');
	const [isFavorite, setIsFavorite] = useState(false);
	const [isCreator, setIsCreator] = useState(false);
	const [likesCount, setLikesCount] = useState(quote.likeCount);
	const [openShare, setOpenShare] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openMessage, setOpenMessage] = useState(false);

	const quoteSelected = `${quote.author}: "${quote.quote}"`;

	const author = quote.author;
	const quoteId = quote._id;
	let photo = '';

	const authorSelected = authorList.filter((name) => name.name === author);
	if (authorSelected.length > 0) {
		photo = authorSelected[0].photo;
	}

	useEffect(() => {
		if (user === quote.creator) {
			setIsCreator(true);
		}
		const isLiked = liked.includes(quote._id);
		if (isLiked) {
			setIsFavorite(true);
		}
	}, [liked, quote.creator, quote._id, user]);

	const handleShare = () => {
		let copyArea = quoteSelected;
		// write text to clipboard
		navigator.clipboard.writeText(copyArea);
		setOpenShare(true);
	};

	const handleCopy = () => {
		let copyArea = quoteSelected;
		// write text to clipboard
		navigator.clipboard.writeText(copyArea);

		setOpenMessage(true);
		setTimeout(() => {
			setOpenMessage(false);
		}, 1000);
	};

	const handleEdit = () => {
		setOpenEdit(true);
	};

	const handleDelete = async () => {
		// Verification is user logeed in?
		if (!user) {
			return setOpenLogin(true);
		}

		const id = quoteId;
		// Make a DELETE request to the API
		DeleteQuote({ id }).then(() => {
			setRenderMain(true);
		});
	};

	const handleLikes = async (updateData) => {
		// Verification is user logeed in?
		if (!user) {
			return setOpenLogin(true);
		}
		setIsFavorite(!isFavorite);

		const userId = user;
		const quoteId = quote._id;

		// Make a PATH (Update) request to the API
		UpdateQuoteLikes({ userId, quoteId, updateData, setLikesCount });
	};

	return (
		<div className='components_quote-card-container'>
			{openShare && (
				<Modal>
					<Share
						setOpenShare={setOpenShare}
						url={'vmog.net'}
						message={'Quote copied to clipboard!'}
					/>
				</Modal>
			)}
			{openEdit && (
				<Modal>
					<QuoteEditForm
						user={user}
						author={author}
						quote={quote}
						authorList={authorList}
						setOpenEdit={setOpenEdit}
						setQuoteEdited={setQuoteEdited}
					/>
				</Modal>
			)}
			<ul>
				<li className='photo'>
					{photo && (
						<img className='image-avatar_quote' src={photo} alt={quote._id} />
					)}
					<p className='quote'>
						<span>&#8220;</span>{' '}
						<i id='quote'>{quoteEdited ? quoteEdited : quote.quote}</i>
						<span>&#8221;</span>
					</p>
					<input
						id='copyArea'
						type='text'
						defaultValue={quoteSelected}
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
				<button className='icons-quote' onClick={handleShare}>
					<IconShare />
				</button>
				<button className='icons-quote' onClick={handleCopy}>
					<IconCopy />
					{openMessage && (
						<p style={{ margin: '0 0.5em', color: 'green', fontSize: '1em' }}>
							Copied
						</p>
					)}
				</button>
				{isCreator && (
					<button className='icons-quote' onClick={handleEdit}>
						<IconEdit />
					</button>
				)}
				{isCreator && (
					<button className='icons-quote' onClick={() => handleDelete()}>
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
					<p>{likesCount}</p>
				</div>
			</div>
		</div>
	);
};
