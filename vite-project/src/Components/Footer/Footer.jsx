import './Footer.css';

import { FootersLinksData } from '../../Data/Data';

import { Link } from 'react-router-dom';

import Copyright from '../Copyright/Copyright';

export default function Footer() {
	return (
		<footer>
			<div className="container footer-container">
				{/* About Params */}
				<div>
					<h4>About Us</h4>
					<ul className="about-params param-links">
						{FootersLinksData.Aboutus.map(({ linkname, link }, index) => {
							return (
								<li key={index}>
									<Link to={link}>{linkname}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{/* Discover Params */}
				<div>
					<h4>Discover</h4>
					<ul className="discover-params param-links">
						{FootersLinksData.Discover.map(({ linkname, link }, index) => {
							return (
								<li key={index}>
									<Link to={link}>{linkname}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{/* Myaccount Params */}
				<div>
					<h4>My Account</h4>
					<ul className="myaccount-params param-links">
						{FootersLinksData.Myaccount.map(({ linkname, link }, index) => {
							return (
								<li key={index}>
									<Link to={link}>{linkname}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{/* Help Params */}
				<div>
					<h4>Help</h4>
					<ul className="help-params param-links">
						{FootersLinksData.Help.map(({ linkname, link }, index) => {
							return (
								<li key={index}>
									<Link to={link}>{linkname}</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<Copyright />
		</footer>
	);
}
