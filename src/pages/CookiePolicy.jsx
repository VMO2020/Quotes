import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Footer } from '../components/Footer';
import { Menu } from '../components/Menu';
import { ScrollBackToTop } from '../components/ScrollBackToTop';

// Icons
import { ReactComponent as Home } from '../assets/icons/ui/home_nc.svg';

// Read JSON Data
const geninfo = require('../data/geninfo.json').data;

export const CookiePolicy = () => {
	const [openMenu, setOpenMenu] = useState(false);

	useEffect(() => {
		window.location.href = '#top';
	}, []);

	return (
		<div className='policy'>
			{openMenu && <Menu setOpenMenu={setOpenMenu} active={'cookies'} />}
			<header>
				POLICIES
				<Link to='/' style={{ textDecoration: 'none' }}>
					<span className='icon'>
						<Home />
					</span>
				</Link>
			</header>
			<div id='top'>...</div>
			<main>
				<h1>Cookie Policy</h1>

				<p>
					<strong>What Are Cookies: </strong> As is common practice with almost
					all professional websites this site uses cookies, which are tiny files
					that are downloaded to your computer, to improve your experience. This
					page describes what information they gather, how we use it and why we
					sometimes need to store these cookies. We will also share how you can
					prevent these cookies from being stored however this may downgrade or
					‘break’ certain elements of the site’s functionality. For more general
					information on cookies see the Wikipedia article on HTTP Cookies…{' '}
					<br /> <br />
					<strong>How We Use Cookies: </strong> We use cookies for a variety of
					reasons detailed below. Unfortunately, in most cases, there are no
					industry standard options for disabling cookies without completely
					disabling the functionality and features they add to this site. It is
					recommended that you leave on all cookies if you are not sure whether
					you need them or not in case they are used to provide a service that
					you use.
					<br /> <br />
					<strong>Disabling Cookies: </strong> You can prevent the setting of
					cookies by adjusting the settings on your browser (see your browser
					Help for how to do this). Be aware that disabling cookies will affect
					the functionality of this and many other websites that you visit.
					Disabling cookies will usually result in also disabling certain
					functionality and features of this site. Therefore it is recommended
					that you do not disable cookies.
					<br /> <br />
					<strong>The Cookies We Use: </strong> In order to provide you with a
					great experience on this site, we provide the functionality to set
					your preferences for how this site runs when you use it. In order to
					remember your preferences, we need to set cookies so that this
					information can be called whenever you interact with a page which is
					affected by your preferences.
					<br /> <br />
					<strong>Third Party Cookies: </strong>
					In some special cases, we also use cookies provided by trusted third
					parties. The following section details which third party cookies you
					might encounter through this site. This site uses Google Analytics
					which is one of the most widespread and trusted analytics solutions on
					the web for helping us to understand how you use the site and ways
					that we can improve your experience. These cookies may track things
					such as how long you spend on the site and the pages that you visit so
					we can continue to produce engaging web content. For more information
					on Google Analytics cookies, see the official Google Analytics page.
					The Google AdSense service we use to serve advertising uses a
					DoubleClick cookie to serve more relevant ads across the web and limit
					the number of times that a given ad is shown to you. For more
					information on Google AdSense see the official Google AdSense privacy
					FAQ.
					<br /> <br />
					<strong>Targeting Cookies: </strong>
					This Website Will: Allow you to share pages with social networks such
					as Facebook (If available). It also contains Facebook Pixels Code: A
					pixel refers to the code that is placed on your computer in order to
					trigger a cookie. We sometimes use this methodology to allow us to
					deliver more relevant messages to you.
					<br /> <br />
					<strong>More Information: </strong>
					By using our site, as per the Cookie Law, you are agreeing to these
					cookies being stored by your browser and their data being shared with
					the aforementioned services. For more information on how Google uses
					your data, visit this page. Hopefully, that has clarified things for
					you and as was previously mentioned if there is something that you
					aren’t sure whether you need or not it’s usually safer to leave
					cookies enabled in case it does interact with one of the features you
					use on our site. However, if you are still looking for more
					information then you can contact us through one of our preferred
					contact methods. Email: <i> {geninfo[0].email}</i>
				</p>
				<ScrollBackToTop />
			</main>
			<footer className='components_footer-container'>
				<Footer active={'cookies'} setOpenMenu={setOpenMenu} />
			</footer>
		</div>
	);
};
