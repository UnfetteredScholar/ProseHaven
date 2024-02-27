// LibraryPage.jsx
import React from 'react';

const LibraryPage = ({ library }) => {
	return (
		<div>
			<h1>Library</h1>
			<div className="image-container">
				{library.map((image, index) => (
					<img key={index} src={image.url} alt={`Image ${index}`} />
				))}
			</div>
		</div>
	);
};

export default LibraryPage;
