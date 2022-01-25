import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { Modal } from '../components/Modal';

// Icons
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';

let btnAction1 = '';
let btnAction2 = '';
let btnText1 = '';
let btnText2 = '';
let toastPosition = '';

export const Toast = ({
	title,
	message,
	action,
	timeout,
	position,
	closeIcon,
	setOpenToast,
	actionFunction,
}) => {
	const handleAction = () => {
		actionFunction();
	};

	if (action === 'Delete') {
		btnAction1 = 'btn';
		btnText1 = 'Cancel';
		btnAction2 = `btn btn-action delete`;
		btnText2 = 'Delete';
	}
	if (action === 'cookies') {
		btnAction1 = 'btn';
		btnText1 = 'Policies';
		btnAction2 = `btn btn-action cookies`;
		btnText2 = 'Got it!';
	}
	if (position === 'Top') {
		toastPosition = `elements_toast top`;
	} else if (position === 'Botton') {
		toastPosition = `elements_toast botton`;
	} else {
		toastPosition = `elements_toast`;
	}

	if (timeout) {
		setTimeout(() => {
			setOpenToast(false);
		}, timeout);
	}

	return (
		<Modal>
			<div className={toastPosition}>
				{closeIcon && (
					<span className='icon-close' onClick={() => setOpenToast(false)}>
						<Close />
					</span>
				)}
				<h2 className='toast-title'>{title}</h2>
				<p className='toast-message'>{message}</p>
				<div className='toast-actions'>
					{action === 'cookies' ? (
						<Link to='/doc/cookies' style={{ textDecoration: 'none' }}>
							<span className={btnAction1}>{btnText1}</span>
						</Link>
					) : (
						<button className={btnAction1} onClick={() => setOpenToast(false)}>
							{btnText1}
						</button>
					)}

					<button className={btnAction2} onClick={() => handleAction()}>
						{btnText2}
					</button>
				</div>
			</div>
		</Modal>
	);
};
