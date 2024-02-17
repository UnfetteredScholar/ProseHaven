import './BestSellingBooks.css';

import { Link } from 'react-router-dom';

// Title Props
import TitleTypeTwo from '../../UI/TitleTypeTwo/TitleTypeTwo';

// Import Tree Shape
import TreeShape from '../../assets/treeShape.png';

// Import Best selling books data
import { sellingBooksData } from '../../Data/Data';

// Import react icon
import { BsArrowRight } from 'react-icons/bs';

export default function BestSellingBooks() {
	return (
		<section className="BestSellingBook">
			{/* Selling Book Tree Shape */}
			<div className="treeShape">
				<img src={TreeShape} alt="" />
			</div>

			{/* Selling book Content */}

			{sellingBooksData.map(
				({ img, infoTitle, infoTitleTop, desc, shopbtnLink }) => {
					return (
						<div className="container bestselling-container">
							{/* Left */}
							<div className="selling-book-left">
								<img src={img} alt="" />
							</div>

							{/* Right */}
							<div className="selling-book-right">
								<TitleTypeTwo
									Title={'Book of the Week'}
									ClassName="sellingBookTitle"
								/>
								<div>
									<small>{infoTitleTop}</small>
									<h3>{infoTitle}</h3>
									<p>{desc}</p>
									{/* <h5>
										<span>{price}</span>
									</h5> */}
									<Link to={shopbtnLink} className="btn ">
										<small>Start Reading</small>
										<BsArrowRight />
									</Link>
								</div>
							</div>
						</div>
					);
				}
			)}
		</section>
	);
}
