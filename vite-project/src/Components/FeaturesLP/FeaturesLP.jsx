import './FeaturesLP.css';
import read from '../../assets/LandingPage/read.png';
import write from '../../assets/LandingPage/write.png';
import share from '../../assets/LandingPage/share.png';

export default function FeaturesLP() {
	const workInfoData = [
		{
			image: read,
			title: 'Read',
			text: 'Explore a diverse library of books spanning genres and eras, all at your fingertips.',
		},
		{
			image: write,
			title: 'Write',
			text: 'Unleash your creativity with easy-to-use writing tools, and bring your stories to life.',
		},
		{
			image: share,
			title: 'Share',
			text: 'Connect and share your favorite books, and engage in vibrant discussions.',
		},
	];
	return (
		<div className=" container work-section-wrapper">
			<div className="work-section-top">
				<p className="primary-subheading">Features</p>
				<h1 className="primary-heading">How It Works</h1>
				<p className="primary-text">
					ProseHaven invites you to immerse yourself in a world where literature
					thrives in the digital realm.
				</p>
			</div>
			<div className="work-section-bottom">
				{workInfoData.map((data) => (
					<div className="work-section-info" key={data.title}>
						<div className="info-boxes-img-container">
							<img src={data.image} alt="" />
						</div>
						<h2>{data.title}</h2>
						<p>{data.text}</p>
					</div>
				))}
			</div>
		</div>
	);
}
