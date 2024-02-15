import './LatestArticle.css';

// Import Title Props
import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne';

// Import Arcticle Props
import { latestArticleData } from '../../Data/Data';

// Import Link
import { Link } from 'react-router-dom';

// Import react icons
import { ImFacebook, ImBehance } from 'react-icons/im';
import { FiInstagram } from 'react-icons/fi';
import { RiTwitterXLine } from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';

export default function LatestArticle() {
	return (
		<section className="latestArticle">
			<div className="container latest-container">
				<TitleTypeOne
					Title={'Latest Articles'}
					TitleTop={'Read our ProseHaven Articles'}
				/>

				<div className="latest-article-content">
					{latestArticleData.map(
						(
							{
								titleLink,
								title,
								date,
								instLink,
								fbLink,
								xLink,
								inspiration,
								image,
							},
							index
						) => {
							return (
								<article className="latest-article" key={index}>
									<div className="article-image">
										<img src={image} alt="" />
									</div>
									<div className="article-info">
										<h5>{date}</h5>
										<Link to={titleLink}>
											<h3>{title}</h3>
										</Link>
									</div>
									<div className="latest-article-socials">
										<p>{inspiration}</p>
										<div className="article-social">
											<a href={fbLink}>
												<ImFacebook />
											</a>
											<a href={instLink}>
												<FiInstagram />
											</a>
											<a href={xLink}>
												<RiTwitterXLine />
											</a>
										</div>
									</div>
								</article>
							);
						}
					)}
				</div>
				<Link to={'*'} className="btn btn-border">
					Find More
					<BsArrowRight />
				</Link>
			</div>
		</section>
	);
}
