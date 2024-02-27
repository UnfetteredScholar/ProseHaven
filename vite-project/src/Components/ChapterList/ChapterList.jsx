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
			{chapters.map((chapter, index) => (
				<div key={index}>
					<h3 className="book-title">{chapter.title}</h3>
					<DropdownButton
						id={`chapter-dropdown-${index}`}
						title={
							selectedChapter !== null && selectedChapter === index
								? `Chapter ${index + 1}`
								: 'Select Chapter'
						}
						className="chapter-dropdown"
					>
						<Dropdown.Item
							onClick={() => handleChapterSelect(index)}
							active={selectedChapter === index}
						>
							Chapter {index + 1}
						</Dropdown.Item>
					</DropdownButton>
					{selectedChapter !== null && selectedChapter === index && (
						<div className="chapter-content">
							<h5>Chapter {index + 1}</h5>
							<p>{chapter.content}</p>
						</div>
					)}
				</div>
			))}
		</div>
	);
};
export default ChapterList;
