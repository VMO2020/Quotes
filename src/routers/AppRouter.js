import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Routes
import Home from '../pages/Home';
import { Users } from '../pages/Users';
import { Authors } from '../pages/Authors';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { CookiePolicy } from '../pages/CookiePolicy';

// Services
import { AuthContextProvider } from '../context/AuthContext';
import { AuthorContextProvider } from '../context/AuthorContext';
import { QuotesContextProvider } from '../context/QuotesContext';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<AuthorContextProvider>
					<QuotesContextProvider>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/users' element={<Users />} />
							<Route path='/authors' element={<Authors />} />

							<Route
								path='/doc/privacy'
								element={<PrivacyPolicy />}
								rel='nofollow'
							/>
							<Route
								path='/doc/cookies'
								element={<CookiePolicy />}
								rel='nofollow'
							/>
						</Routes>
					</QuotesContextProvider>
				</AuthorContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	);
};