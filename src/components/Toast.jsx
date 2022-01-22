import React from 'react';

// Components
import { Modal } from '../components/Modal';

// Icons
import { ReactComponent as Close } from '../assets/icons/ui/close_nc.svg';

let btnAction = '';
let toastPosition = '';

export const Toast = ({
	title,
	message,
	action,
	timeout,
	position,
	setOpenToast,
	actionFunction,
}) => {
	if (action === 'Delete') {
		btnAction = `btn btn-action delete`;
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
				<span className='icon-close' onClick={() => setOpenToast(false)}>
					<Close />
				</span>
				<h2 className='toast-title'>{title}</h2>
				<p className='toast-message'>{message}</p>
				<div className='toast-actions'>
					<button className='btn' onClick={() => setOpenToast(false)}>
						Cancel
					</button>
					<button className={btnAction} onClick={() => actionFunction()}>
						{action}
					</button>
				</div>
			</div>
		</Modal>
	);
};
