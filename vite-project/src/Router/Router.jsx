import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Import Pages
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound/NotFound';
import Login from '../Pages/Authentication/Login/Login';
import Signup from '../Pages/Authentication/Signup/Signup';
import Verify from '../Pages/Authentication/Verify/Verify';
import Forgot from '../Pages/Authentication/Forgot/Forgot';
import SendForgot from '../Pages/Authentication/SendForgot/SendForgot';
import LandingPage from '../Pages/LandingPage/LandingPage';
import StoryDetail from '../Pages/Story/StoryDetail/StoryDetail';
import StoryPage from '../Pages/Story/StoryPage/StoryPage';
import Profile from '../Pages/Profile/Profile';
import Library from '../Pages/Library/Library';

// Import Components
import Nav from '../Components/Nav/Nav';
import Footer from '../Components/Footer/Footer';
import { LibraryProvider } from '../Components/LibraryContext';
export default function Router() {
	return (
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/verify_account" element={<Verify />} />
				<Route path="/forgot_password" element={<Forgot />} />
				<Route path="/send_forgot_password" element={<SendForgot />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/about" element={<LandingPage />} />
				<Route path="/story/:id" element={<StoryDetail />} />
				<Route path="/write" element={<StoryPage />} />

				<Route
					path="/library"
					element={
						<LibraryProvider>
							<Library />
						</LibraryProvider>
					}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}
