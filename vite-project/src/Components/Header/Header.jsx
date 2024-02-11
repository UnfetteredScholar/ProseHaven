import './Header.css';

// Import Header Books Data
import { headerBooks } from '../../Data/Data';

// Import Swiper React components Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Header() {
	return (
		<header>
			<div className="container header-container"></div>
		</header>
	);
}
