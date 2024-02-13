import './TitleTypeTwo.css';

// Import Victor Image
import victor from '../../assets/victor.png';

export default function TitleTypeTwo({ ClassName, Title, TitleTop }) {
	return (
		<div className={`titleTypeTwo ${ClassName}`}>
			<h2>{Title}</h2>
			<img src={victor} alt="" className="victor" />
		</div>
	);
}
