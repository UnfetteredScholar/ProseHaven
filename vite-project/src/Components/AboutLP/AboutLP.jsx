import './AboutLP.css';
import AboutBackground from '../../assets/LandingPage/about-background.png';
import AboutBackgroundImage from '../../assets/LandingPage/about-background-image.png';
import { BsFillPlayCircleFill } from 'react-icons/bs';

export default function AboutLP() {
	return (
		<div className="container about-section-container">
			<div className="about-background-image-container">
				<img src={AboutBackground} alt="" />
			</div>
			<div className="about-section-image-container">
				<img src={AboutBackgroundImage} alt="" />
			</div>
			<div className="about-section-text-container">
				<p className="primary-subheading">About</p>
				<h1 className="primary-heading">
					ProseHaven: A Digital Literary Oasis
				</h1>
				<p className="primary-text">
					ProseHaven was born from our passion for literature and a desire to
					create a digital sanctuary for fellow book lovers. Inspired by a love
					for storytelling and community, we set out to build a platform where
					readers could connect, explore, and discuss their favorite works. It's
					a heartfelt endeavor to reignite the joy of reading in the digital
					age.
				</p>
				{/* <div className="about-buttons-container">
					<button className="btn btn-border">Learn More</button>
					<button className="watch-video-button">
						<BsFillPlayCircleFill /> Watch Video
					</button>
				</div> */}
			</div>
		</div>
	);
}
