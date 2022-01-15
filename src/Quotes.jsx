import React, { useEffect } from 'react';
import { AppRouter } from './routers/AppRouter';

import Aos from 'aos';
import 'aos/dist/aos.css';

const Quotes = () => {
	useEffect(() => {
		Aos.init({
			delay: 300,
		});
		Aos.refresh();
	}, []);

	return <AppRouter />;
};

export default Quotes;
