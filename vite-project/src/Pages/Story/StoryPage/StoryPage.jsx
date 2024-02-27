import './StoryPage.css';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChapterForm from '../../../Components/ChapterForm/ChapterForm';
import ChapterList from '../../../Components/ChapterList/ChapterList';
// import ChapterPage from '../../../Components/ChapterPage';

function StoryPage() {
	const [chapters, setChapters] = useState([]);

	const addChapter = (content) => {
		setChapters([...chapters, content]);
	};

	return (
		<Container className="story-container">
			<Row>
				<Col xs={6}>
					<h1 className="story-title">Write Your Story</h1>
					<ChapterForm onSubmit={addChapter} />
				</Col>
				<Col xs={6}>
					<h2>Your Story</h2>
					<ChapterList chapters={chapters} />
				</Col>
			</Row>
		</Container>
	);
}

export default StoryPage;
