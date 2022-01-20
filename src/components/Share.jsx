import React from 'react';

// Components
import { Modal } from '../components/Modal';

// Icons
import { ReactComponent as Whatsapp } from '../assets/icons/share/whatsapp.svg';
import { ReactComponent as Facebook } from '../assets/icons/share/facebook.svg';
import { ReactComponent as Twitter } from '../assets/icons/share/twitter.svg';
import { ReactComponent as Telegram } from '../assets/icons/share/telegram.svg';
import { ReactComponent as Close } from '../assets/icons/ui/close.svg';

export const Share = ({ url, setOpenShare, message }) => {
	const close = () => {
		setOpenShare(false);
	};

	return (
		<Modal>
			<section className='components_share-social'>
				<div className='icon-close' onClick={() => close()}>
					<Close />
				</div>
				<div className='components_share-social__element'>
					<div
						className='fb-share-button'
						data-href={`https://${url}`}
						data-layout='button'
						data-size='large'
					>
						<a
							target='_blank'
							rel='noreferrer'
							href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F.${url}%2F&amp;src=sdkpreparse`}
							className='btn btn__social btn__facebook'
							onClick={() => close()}
						>
							<Facebook /> Share
						</a>
					</div>
				</div>

				<div className='components_share-social__element'>
					<a
						className='btn btn__social btn__whatsapp'
						rel='noreferrer'
						data-action='share/whatsapp/share'
						href={`whatsapp://send?text=https%3A%2F%2F${url}/`}
						onClick={() => close()}
					>
						<Whatsapp /> Share
					</a>
				</div>

				<div className='components_share-social__element'>
					<a
						className='btn btn__social btn__twitter'
						target='_blank'
						rel='noreferrer'
						href={`https://twitter.com/intent/tweet?text=https://${url}/`}
						onClick={() => close()}
					>
						<Twitter /> Tweet
					</a>
				</div>
				<div className='components_share-social__element'>
					<a
						className='btn btn__social btn__telegram'
						target='_blank'
						rel='noreferrer'
						href={`tg://msg_url?url=https%3A%2F%2F${url}`}
						onClick={() => close()}
					>
						<Telegram />
						Share
					</a>
				</div>
				{message && <p>{message}</p>}
			</section>
		</Modal>
	);
};
