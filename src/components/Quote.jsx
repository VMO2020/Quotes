import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';

// Modals
import { Modal } from '../components/Modal';
import { Share } from '../components/Share';
import { Toast } from '../components/Toast';
import { QuoteEditForm } from '../components/QuoteEditForm';

// Services
import { DeleteQuote } from '../services/deleteData';
import { UpdateQuoteLikes } from '../services/patchData';

// Icons
import { ReactComponent as IconShare } from '../assets/icons/ui/share_nc.svg';
import { ReactComponent as IconCopy } from '../assets/icons/ui/content_copy_nc.svg';
import { ReactComponent as IconEdit } from '../assets/icons/ui/edit_nc.svg';
import { ReactComponent as IconDelete } from '../assets/icons/ui/delete_full_nc.svg';
import { ReactComponent as IconFavorite } from '../assets/icons/ui/favorite_nc.svg';
import { ReactComponent as IconFavoriteFull } from '../assets/icons/ui/favorite_full_nc.svg';

export const Quote = ({
	user,
	liked,
	quote,
	authorList,
	setOpenLogin,
	setRenderMain,
}) => {
	// States
	const [isFavorite, setIsFavorite] = useState(false);
	const [isCreator, setIsCreator] = useState(false);
	const [quoteEdited, setQuoteEdited] = useState('');
	const [likesCount, setLikesCount] = useState(quote.likeCount);
	let quoteSelected = `${quote.author}: "${quote.quote}"`;

	// States Open
	const [openEdit, setOpenEdit] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	const [openToast, setOpenToast] = useState(false);
	const [openMessage, setOpenMessage] = useState(false);

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
		if (quoteEdited) {
			quoteSelected = `${quote.author}: "${quoteEdited}"`;
		}
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
		setOpenToast(true);
	};

	const deleteQuoteDB = async () => {
		const id = quoteId;
		// Make a DELETE request to the API
		await DeleteQuote({ id }).then(() => {
			setRenderMain(true);
			setOpenEdit(false);
			setOpenToast(false);

			// return <Navigate to='/' />;
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
				<Share
					setOpenShare={setOpenShare}
					url={'vmog.net'}
					message={'Quote copied to clipboard!'}
				/>
			)}
			{openEdit && (
				<Modal>
					<QuoteEditForm
						user={user}
						author={author}
						quote={quote}
						authorList={authorList}
						quoteEdited={quoteEdited}
						setOpenEdit={setOpenEdit}
						setQuoteEdited={setQuoteEdited}
					/>
				</Modal>
			)}
			{openToast && (
				<Toast
					closeIcon={true}
					title={'DELETE'}
					message={'Are you sure you want to delete this quote?'}
					action={'Delete'}
					actionFunction={deleteQuoteDB}
					position={'Top'} // Top, Center or Botton
					setOpenToast={setOpenToast}
					// timeout={5000}
				/>
			)}
			<ul>
				<li className='photo'>
					{photo && (
						<img
							className='elements_image-avatar'
							src={photo}
							alt={quote._id}
						/>
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
