import './ChapterForm.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ChapterForm = ({ onSubmit }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ title, content }); // Passing an object with title and content properties
		setTitle('');
		setContent('');
	};

	return (
		<Form onSubmit={handleSubmit} className="chapter-form mt-5">
			<Form.Group controlId="chapterTitle">
				<Form.Label className="chapter-label">Title</Form.Label>
				<Form.Control
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter the title of your story"
					className="chapter-input"
				/>
			</Form.Group>
			<Form.Group controlId="chapterContent">
				<Form.Label className="chapter-label">Chapter Content</Form.Label>
				<Form.Control
					as="textarea"
					rows={5}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Write your chapter here..."
					className="chapter-textarea"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Add Chapter
			</Button>
		</Form>
	);
};
export default ChapterForm;
