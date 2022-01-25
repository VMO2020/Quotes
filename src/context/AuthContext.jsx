import React, { useState } from 'react';

const Context = React.createContext({});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState('');
	const [avatar, setAvatar] = useState('');
	const [liked, setLiked] = useState([]);
	const [userAdmin, setUserAdmin] = useState(false);
	const [userAceptCookies, setUserAcceptCookies] = useState(false);

	return (
		<Context.Provider
			value={{
				user,
				setUser,
				avatar,
				setAvatar,
				liked,
				setLiked,
				userAdmin,
				setUserAdmin,
				userAceptCookies,
				setUserAcceptCookies,
			}}
		>
			{children}
		</Context.Provider>
	);
}

export default Context;
