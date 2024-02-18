import './HomeLP.css';

import BannerBackground from '../../assets/LandingPage/home-banner-background.png';
import BannerImage from '../../assets/LandingPage/home-banner-image.png';

import { FiArrowRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';

export default function HomeLP() {
	return (
		<div className="container home-container">
			<div className="home-banner-container">
				<div className="home-bannerImage-container">
					<img src={BannerBackground} alt="" />
				</div>
				<div className="home-text-section">
					<h1 className="primary-heading">Hello, This is ProseHaven</h1>
					<p className="primary-text">Unleashing Worlds, One Word at a Time.</p>

					<Link className="btn btn-border" to={'/login'}>
						Start Reading <FiArrowRight />{' '}
					</Link>
				</div>
				<div className="home-image-section">
					<img src={BannerImage} alt="" />
				</div>
			</div>
		</div>
	);
}
