//Nav.css Import
import './Nav.css';

//Import Router Link
import { Link, NavLink } from 'react-router-dom';

// Import Logo
import Logo from '../../assets/logo.png';

// Import Nav Data
import { navLinks, navRight } from '../../Data/Data';

export default function Nav() {
	return (
		<nav>
			<div className="container nav-container">
				{/* ..LOGO... */}
				<Link to={'/'} className="logo">
					<img src={Logo} alt="Logo" />
				</Link>
			</div>
		</nav>
	);
}
