import React, { createContext, useContext, useState } from 'react';

const LibraryContext = createContext();

export const useLibrary = () => useContext(LibraryContext);

export const LibraryProvider = ({ children }) => {
	const [library, setLibrary] = useState([]);

	const addToLibrary = (image) => {
		setLibrary([...library, image]);
	};

	return (
		<LibraryContext.Provider value={{ library, addToLibrary }}>
			{children}
		</LibraryContext.Provider>
	);
};
