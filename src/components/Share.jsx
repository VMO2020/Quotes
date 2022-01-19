import React from 'react';

// Icons
import { ReactComponent as Icon1 } from '../assets/icons/share/whatsapp.svg';
import { ReactComponent as Icon2 } from '../assets/icons/share/facebook.svg';
import { ReactComponent as Icon3 } from '../assets/icons/share/twitter.svg';
import { ReactComponent as Icon4 } from '../assets/icons/share/telegram.svg';
import { ReactComponent as Close } from '../assets/icons/ui/close.svg';

export const Share = ({ url, setOpenShare, message }) => {
	const close = () => {
		setOpenShare(false);
	};

	return (
		<section className='components_share-social'>
			<div className='icon-close close' onClick={() => close()}>
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
						<Icon2 /> Share
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
					<Icon1 /> Share
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
					<Icon3 /> Tweet
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
					<Icon4 />
					Share
				</a>
			</div>
			{message && <p>{message}</p>}
		</section>
	);
};
