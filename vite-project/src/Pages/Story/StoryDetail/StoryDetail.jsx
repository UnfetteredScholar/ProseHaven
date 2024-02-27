import './StoryDetail.css';
import { Link } from 'react-router-dom';
import { sellingBooksData } from '../../../Data/Data';

export default function StoryDetail() {
	return (
		<section className="story-detail">
			<div className="container story-detail-container">
				<div className="story-detail-header">
					{sellingBooksData.map(
						({ infoTitle, details, img, btnLink }, index) => {
							return (
								<div className="story" key={index}>
									<h2>{infoTitle}</h2>
									<div className="story-detail-thumbnail">
										<img src={img} alt="" />
									</div>
									<p>{details}</p>
								</div>
							);
						}
					)}
				</div>

				{/* <StoryAuthor /> */}
				<div className="story-detail-buttons">
					<Link to={`/:id`} className="btn sm primary">
						Read
					</Link>
					<button
						onClick={() => handleAddToLibrary(img)}
						className="btn sm primary"
					>
						Add to Library
					</button>
				</div>
			</div>
		</section>
	);
}
