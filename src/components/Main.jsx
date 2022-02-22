import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import { Quote } from '../components/Quote';

// Modals
import { Toast } from '../components/Toast';

// Services
import { GetQuotes } from '../services/getData';

export const Main = ({
	user,
	liked,
	dataList,
	authorList,
	AuthorFiltered,
	setDataList,
	setOpenLogin,
	userAceptCookies,
	setUserAcceptCookies,
}) => {
	let navigate = useNavigate();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [renderMain, setRenderMain] = useState(false);
	const [openCookiesToast, setOpenCookiesToast] = useState(false);

	useEffect(() => {
		// console.log('Main Rendered');
		if (!user) {
			setOpenCookiesToast(true);
		}
		if (renderMain) {
			GetQuotes({ setDataList, setLoading, setError });
		}
		setRenderMain(false);
	}, [user, setDataList, renderMain]);

	useEffect(() => {
		backToTop();
	}, [AuthorFiltered]);

	const handleCookiesAccepted = () => {
		// console.log('Cookies Accepted');
		setOpenCookiesToast(false);
		setUserAcceptCookies(true);
		toggleFullScreen();
		navigate('/');
	};

	const quotesFiltered = dataList.filter(function (el) {
		return el.author === AuthorFiltered;
	});

	const backToTop = () => {
		window.location.href = '#top';
	};

	function toggleFullScreen() {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		}
	}

	return (
		<div className='components_main'>
			{!userAceptCookies && openCookiesToast && (
				<Toast
					closeIcon={false}
					title={'COOKIES'}
					message={
						'We use cookies to give you the best possible experience while you browse through our website. By pursuing the use of our website you implicitly agree to the usage of cookies on this site.'
					}
					action={'cookies'}
					actionFunction={handleCookiesAccepted}
					position={'Center'} // Top, Center or Botton
					setOpenToast={setOpenCookiesToast}
					// timeout={5000}
				/>
			)}
			<div id='top'></div>
			{/* {error && <h2 className='center'>{error}</h2>} */}
			{/* {loading && <h3 style={{ color: 'red' }}>Loading...</h3>} */}

			<div className='list-container'>
				<h2>More than 100 Quotes for Life.</h2>
				<h1>
					"Find the best quote to inspire you and live your life happier,
					better, smarter and funnier."
				</h1>
				{AuthorFiltered !== 'all'
					? quotesFiltered.map((quote) => (
							<div key={quote._id}>
								<Quote
									user={user}
									quote={quote}
									liked={liked}
									authorList={authorList}
									setRenderMain={setRenderMain}
									setDataList={setDataList}
									setOpenLogin={setOpenLogin}
								/>
							</div>
					  ))
					: dataList.map((quote) => (
							<div key={quote._id}>
								<Quote
									user={user}
									liked={liked}
									quote={quote}
									authorList={authorList}
									setRenderMain={setRenderMain}
									setDataList={setDataList}
									setOpenLogin={setOpenLogin}
								/>
							</div>
					  ))}
			</div>
			<div className='btn-container'>
				<a className='btn' href='#top' style={{ textDecoration: 'none' }}>
					Back to top
				</a>
			</div>
		</div>
	);
};
