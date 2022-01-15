import { useEffect } from 'react';
import reactDOM from 'react-dom';

// Styles
import './modal.scss';

export const Modal = ({ children }) => {
	// Create a new 'div'
	const portalNode = document.createElement('div');
	portalNode.id = 'modal';

	useEffect(() => {
		// Include 'div' inside the body
		document.body.appendChild(portalNode);

		return () => {
			portalNode.remove();
		};
	}, [portalNode]);

	return reactDOM.createPortal(children, portalNode);
};
