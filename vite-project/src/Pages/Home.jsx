// Components Import
import Header from '../Components/Header/Header';
import Brands from '../Components/Brands/Brands';
import FeatureBooks from '../Components/FeatureBooks/FeatureBooks';
import BestSellingBooks from '../Components/BestSellingBooks/BestSellingBooks';
import PopularBooks from '../Components/PopularBooks/PopularBooks';
import Quote from '../Components/Quote/Quote';
import LatestArticle from '../Components/LatestArticle/LatestArticle';

export default function Home() {
	return (
		<>
			<Header />
			<Brands />
			<FeatureBooks />
			<BestSellingBooks />
			<PopularBooks />
			<Quote />
			<LatestArticle />
		</>
	);
}
