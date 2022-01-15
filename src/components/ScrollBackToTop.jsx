import React from 'react';

export const ScrollBackToTop = () => {
	const scrollBackTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div className='btn-container' onClick={scrollBackTop}>
			<button className='btn'>Back to top</button>
		</div>
	);
};
