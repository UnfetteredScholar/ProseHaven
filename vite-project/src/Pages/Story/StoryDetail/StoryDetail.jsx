import React from 'react';
import { Link } from 'react-router-dom';
import { sellingBooksData } from '../../../Data/Data';

export default function StoryDetail() {
	return (
		<section className="story-detail">
			<div className="container story-detail-container">
				<div className="story-detail-header">
					{/* <StoryAuthor /> */}
					<div className="story-detail-buttons">
						<Link to={`/:id`} className="btn sm primary">
							Read
						</Link>
						<Link to={`/library`} className="btn sm primary">
							Add to Library
						</Link>
					</div>
				</div>
				{sellingBooksData.map(({ title, info, img, btnLink }, index) => {
					return (
						<div className="story" key={index}>
							<h1>{title}</h1>
							<div className="story-detail-thumbnail">
								<img src={img} alt="" />
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
