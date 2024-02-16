import './Login.css';

import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
	return (
		<section className="background">
			<div className="container login-container">
				<form action="">
					<h1>Login</h1>
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
					<div className="remember-forgot">
						<label>
							<input
								type="checkbox"
								name="forgotPassword"
								id="forgotPassword"
							/>
							Remember me
						</label>
						<a href="#">Forgot Password</a>
					</div>
					<button type="submit">Login</button>

					<div className="signup-link">
						<p>
							Don't have an account? <a href="#">Sign Up</a>
						</p>
					</div>
				</form>
			</div>
		</section>
	);
}
