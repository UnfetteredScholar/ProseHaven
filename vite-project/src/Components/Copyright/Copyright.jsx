import './Copyright.css';

// Import Footer Socials
import { FootersLinksData } from '../../Data/Data';

export default function Copyright() {
	return (
		<div className="footer-copyright">
			<div className="container copyright-container">
				<p>© 2024 ProseHaven. All rights reserved.</p>
				<div className="footer-socials">
					{FootersLinksData.socials.map((item, index) => {
						return (
							<a href={item.link} key={index}>
								<item.icon />
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
}
