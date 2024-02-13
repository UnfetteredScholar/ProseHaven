// Components Import
import Header from '../Components/Header/Header';
import Brands from '../Components/Brands/Brands';
import FeatureBooks from '../Components/FeatureBooks/FeatureBooks';
import BestSellingBooks from '../Components/BestSellingBooks/BestSellingBooks';

export default function Home() {
	return (
		<>
			<Header />
			<Brands />
			<FeatureBooks />
			<BestSellingBooks />
		</>
	);
}
