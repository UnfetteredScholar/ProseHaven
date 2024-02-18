import './Signup.css';

import { FaUser, FaLock } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

export default function Signup() {
	return (
		<section className="background">
			<div className="container signup-container">
				<form action="">
					<h1>Sign Up</h1>
					<div className="input-box">
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							required
						/>
						<MdAlternateEmail className="icon" />
					</div>
					<div className="input-box">
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							required
						/>
						<FaUser className="icon" />
					</div>
					<div className="input-box">
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							required
						/>
						<FaLock className="icon" />
					</div>
					{/* <div className="remember-forgot">
						<label>
							<input
								type="checkbox"
								name="forgotPassword"
								id="forgotPassword"
							/>
							Remember me
						</label>
						<a href="#">Forgot Password</a>
					</div> */}
					<button type="submit">Sign Up</button>

					<div className="login-link">
						<p>
							Already have an account? <a href="/login">Login</a>
						</p>
					</div>
				</form>
			</div>
		</section>
	);
}
