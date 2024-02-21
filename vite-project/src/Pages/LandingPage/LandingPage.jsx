import './LandingPage.css';
import HomeLP from '../../Components/HomeLP/HomeLP';
import AboutLP from '../../Components/AboutLP/AboutLP';
import FeaturesLP from '../../Components/FeaturesLP/FeaturesLP';
import ContactLP from '../../Components/ContactLP/ContactLP';

export default function LandingPage() {
	return (
		<>
			<HomeLP />
			<FeaturesLP />
			<AboutLP />
			<ContactLP />
		</>
	);
}
