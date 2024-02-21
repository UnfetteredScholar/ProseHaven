import './TitleTypeOne.css';

// Import Victor Image
import victor from '../../assets/victor.png';

export default function TitleTypeOne({ ClassName, Title, TitleTop }) {
	return (
		<div className={`titleTypeOne ${ClassName}`}>
			<small>{TitleTop}</small>
			<div className="heading-H">
				<div className="line"></div>
				<h2>{Title}</h2>
				<div className="line"></div>
			</div>
			<img src={victor} alt="" className="victor" />
		</div>
	);
}
