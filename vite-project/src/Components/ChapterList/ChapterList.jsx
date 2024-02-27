import './ChapterList.css';
import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const ChapterList = ({ chapters }) => {
	const [selectedChapter, setSelectedChapter] = useState(null);

	const handleChapterSelect = (chapterIndex) => {
		setSelectedChapter(chapterIndex);
	};

	return (
		<div className="chapter-list mt-5">
			<DropdownButton
				id="chapter-dropdown"
				title={
					selectedChapter !== null
						? `Chapter ${selectedChapter + 1}`
						: 'Select Chapter'
				}
				className="chapter-dropdown"
			>
				{chapters.map((chapter, index) => (
					<Dropdown.Item
						key={index}
						onClick={() => handleChapterSelect(index)}
						active={selectedChapter === index}
					>
						Chapter {index + 1}
					</Dropdown.Item>
				))}
			</DropdownButton>
			{selectedChapter !== null && (
				<div className="chapter-content">
					<h5>Chapter {selectedChapter + 1}</h5>
					<p>{chapters[selectedChapter]}</p>
				</div>
			)}
		</div>
	);
};
export default ChapterList;
