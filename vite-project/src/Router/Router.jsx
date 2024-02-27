import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Pages
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound/NotFound';
import Login from '../Pages/Authentication/Login/Login';
import Signup from '../Pages/Authentication/Signup/Signup';
import LandingPage from '../Pages/LandingPage/LandingPage';
import StoryDetail from '../Pages/Story/StoryDetail/StoryDetail';
import StoryPage from '../Pages/Story/StoryPage/StoryPage';

// Import Components
import Nav from '../Components/Nav/Nav';
import Footer from '../Components/Footer/Footer';

export default function Router() {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/about" element={<LandingPage />} />
				<Route path="/story/:id" element={<StoryDetail />} />
				<Route path="/write" element={<StoryPage />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
