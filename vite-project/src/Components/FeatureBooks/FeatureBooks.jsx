import './FeatureBooks.css';

// Import Title Props
import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne';

// Import Swiper React components Import Swiper styles
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import featured books data
import { featuredBooksData } from '../../Data/Data';

//Import Link from React Router
import { Link } from 'react-router-dom';

export default function FeatureBooks() {
	return (
		<section>
			<div className="container feature-books-container">
				{/* Title Props */}
				<TitleTypeOne
					TitleTop={'Some quality items'}
					Title={'Featured Books'}
				/>

				{/* Featured Books Slider */}
				<Swiper
					spaceBetween={50}
					slidesPerView={1}
					loop={true}
					modules={[Pagination]}
					pagination={{ el: '.swiper-pagination', clickable: true }}
				>
					{featuredBooksData.map(
						({ img, imgLlink, name, nameLink, writer, price }, index) => {
							return (
								<SwiperSlide key={index}>
									<div className="featurebook-box">
										<Link to={imgLlink}>
											<img src={img} alt="" />
										</Link>
									</div>
								</SwiperSlide>
							);
						}
					)}
				</Swiper>
			</div>
		</section>
	);
}
