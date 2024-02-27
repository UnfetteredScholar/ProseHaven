import './ChapterForm.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ChapterForm = ({ onSubmit }) => {
	const [content, setContent] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(content);
		setContent('');
	};

	return (
		<form onSubmit={handleSubmit} className="chapter-form mt-5">
			<label className="chapter-label">Chapter Content</label>
			<textarea
				rows={5}
				cols={100}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Write your chapter here..."
				className="chapter-textarea mb-3"
			/>
			<button type="submit" className="btn btn-primary">
				Add Chapter
			</button>
		</form>
	);
};

export default ChapterForm;
