import './Signup.css';
import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

export default function Signup() {


	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
	const [error, setError] = useState(null);
	const [isSignedUp, setIsSignedUp] = useState('');


    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
			const body = {};
			body['email'] = email;
            body['username'] = username;
            body['password'] = password;

			const response = await fetch('http://localhost:8000/api/v1/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

            if (!response.ok) {
				console.log(response)

				if (response.status === 400) {
					setError("Username or Email taken");
				}
				else {
					setError('Signup failed. Please try again.'); // Update error state
				}
				console.log(error)
                throw new Error('Sign up failed');
            }
			else {
				console.log("Sign up Successful")
				const responseBody = await response.json();
				localStorage.setItem('accessToken', responseBody['access_token']);
				setIsSignedUp("Sign Up Successful. Email verification sent!");
			}

            // Handle successful login (redirect, update state, etc.)
        } catch (err) {
			console.log(error)
			// if (error == 400) {
			// 	setError("Username or Email taken");
			// }
			// else {
            //     setError('Signup failed. Please try again.'); // Update error state
			// }
        }
    };

	return (
		<section className="background">
			<div className="container signup-container">
				<form onSubmit={handleSignUp}>
					<h1>Sign Up</h1>
					{error && <div className="error-message">{error}</div>}
					<div className="input-box">
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
							value={username}
							onChange={(e) => setUsername(e.target.value)}
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
					{isSignedUp && <div>{isSignedUp}</div>}

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
