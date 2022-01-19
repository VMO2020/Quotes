import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Footer } from '../components/Footer';
import { ScrollBackToTop } from '../components/ScrollBackToTop';

// Icons
import { ReactComponent as Home } from '../assets/icons/home.svg';

export const PrivacyPolicy = () => {
	useEffect(() => {
		window.location.href = '#top';
	}, []);

	return (
		<div className='policy'>
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
				<h1>Privacy Policy</h1>

				<p>
					<b>
						By entering this website, you agree to all of the terms and
						conditions as set out below
					</b>{' '}
					<br />
					This privacy policy is about the way information collected is used. No
					personal information is collected however information is collected
					about how users access and use this website. The information is
					collected and used if you use this website, you are in control of what
					information is collected, but if you choose not to share your
					information, you may not be able to access or use some areas of this
					website. This information may be collected, stored and used when you
					use this website and when you call the Advertiser.
					<br />
					The information collected and held may include but is not limited to:
					information about your computer and about your visits to, and use of,
					the website (including your IP address, approximate geographical
					location, browser type, referral source, length of visit and number of
					page views); if you call the Advertiser, your phone and/or mobile
					phone number and the time, date and day of the week and length of your
					call; and any other information you may provide to the provider of
					this site.
					<br /> <br />
					<b>Using cookies or other on-device storage: </b>
					Cookies are information files stored on your computer, tablet or
					smartphone that help websites remember who you are and information
					about your visit. For further information (including how to opt out of
					cookies) please go to the Cookie Policy.
					<br /> <br />
					<b> How information collected is used: </b> By providing personal
					information such as your name and e-mail address via the forms on this
					website, you agree to the website owner contacting you with regard to
					your enquiry. When you use this website, information is collected. It
					will be used for the purposes set out in this privacy policy.
					<br />
					The information collected when you use this website may be used to
					build up a picture of your interests. This information may be used to
					try to make sure that when you visit or use the website, you don’t
					miss offers and information that might interest you. This is called
					advert targeting.
					<br />
					Information may be collected about activity on the website, or other
					organisations may be used to collect it and to share it. This
					information is used to: analyse statistics; track pages and paths used
					by visitors to, or users of, the website; target the adverts or
					offers, such as banners, on the website and on the websites of other
					organisations; and track the use of the internet banner adverts and
					other links from marketing partners’ websites to this website. For
					these purposes, the information on the path you take to get to the
					website and on some of the pages you visit or use through the website,
					using cookies, web beacons and other on-device storage will be
					retained. For information about web beacons, or the organisation used
					(including how to decline their cookies), please go to the Cookie
					Policy.
					<br /> <br />
					<b> Analysing call volumes: </b>
					If you call the Advertiser using the number featured on the website,
					we may record your phone number, the time, date, day of the week and
					length of the call and certain details about whether the call was
					answered or not. This information will be shared with the Advertiser
					and used to analyse the effectiveness of the website.
					<br /> <br />
					<b> Disclosure of your information: </b>
					Your information may be passed to one or more of the following
					organisations: the Advertiser; data processing companies, mailing
					houses and other third party suppliers; and government and enforcement
					agencies and the police. Occasionally, this may involve sending your
					information outside the European Economic Area. Every now and again,
					requests are received for information from government departments, the
					police and other enforcement agencies. If this happens, and there is a
					proper legal basis for providing your information, it will be provided
					to the organisation asking for it.
					<br /> <br />
					<b> Where your information is processed: </b>
					When your information is used as described in section 2 – How
					information collected is used, this may occasionally involve sending
					your information outside the European Economic Area (EEA). Where this
					is done, appropriate steps are taken to protect your information. By
					using this website, you agree that your information may be
					transferred, stored and processed outside the EEA.
					<br /> <br />
					<b> How your information is kept secure: </b>
					The security of information is taken very seriously. Technology and
					security policies are in place to protect the information held.
					<br /> <br />
					<b> How changes to this privacy policy may occur: </b>
					This privacy policy may be updated from time to time so you may want
					to check it each time you visit the website.
					<br /> <br />
					<b> Governing Law: </b>
					This website is intended primarily for use by persons located and
					resident within the United Kingdom, including Northern Ireland, the
					Channel Islands and the Isle of Man. Accordingly, these terms and
					conditions shall be subject to English law and the parties to any
					dispute or action hereby submit to the exclusive jurisdiction of the
					English courts.
				</p>
				<ScrollBackToTop />
			</main>
			<footer className='components_footer-container'>
				<Footer active={'privacy'} />
			</footer>
		</div>
	);
};
