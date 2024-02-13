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

//Import react icon
import { BsArrowReturnRight } from 'react-icons/bs';

// Swiper breakpoints
const breakpoints = {
	// when window width is <= 1024px
	1024: {
		slidesPerView: 4,
		spaceBetween: 30,
	},

	//when window width is <= 768px
	768: {
		slidesPerView: 3,
		spaceBetween: 20,
	},

	//when window width is <= 480px
	480: {
		slidesPerView: 2,
		spaceBetween: 10,
	},

	//when window width is <= 0
	0: {
		slidesPerView: 1,
		spaceBetween: 0,
	},
};

export default function FeatureBooks() {
	return (
		<section className="Featured">
			<div className="container feature-books-container">
				{/* Title Props */}
				<TitleTypeOne
					TitleTop={'You will love these'}
					Title={'Books For You'}
				/>

				{/* Featured Books Slider */}
				<Swiper
					spaceBetween={50}
					slidesPerView={4}
					loop={true}
					modules={[Pagination]}
					pagination={{ el: '.swiper-pagination', clickable: true }}
					breakpoints={breakpoints}
				>
					{featuredBooksData.map(
						({ img, imgLlink, name, nameLink, writer, price }, index) => {
							return (
								<SwiperSlide key={index}>
									<div className="featurebook-box">
										<Link to={imgLlink} className="featurebook">
											<img src={img} alt="" />
										</Link>
										<div className="featurebook-info">
											<Link to={nameLink}>
												<h4>{name}</h4>
											</Link>
											<div>
												<small>{writer}</small>
											</div>
											<h5>
												<span>{price}</span>
											</h5>
										</div>
									</div>
								</SwiperSlide>
							);
						}
					)}

					<div className="feature-border container"></div>
					{/* Swiper Pagination */}
					<div className="swiper-pagination"></div>
					{/* View all products button */}
					<Link to="*" className="btn feature-btn">
						View All Products <BsArrowReturnRight />
					</Link>
				</Swiper>
			</div>
		</section>
	);
}
