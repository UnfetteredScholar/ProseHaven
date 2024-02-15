import './NotFound.css';

import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<section className="Not-Found">
			<div className="container not-found-container">
				<h1>404</h1>
				<h3>Updating Page. Kindly come back later</h3>
				<Link to={'/'} className="btn btn-border">
					{' '}
					Go To Home
				</Link>
			</div>
		</section>
	);
}
