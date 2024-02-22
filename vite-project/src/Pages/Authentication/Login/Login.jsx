import React, { useState } from 'react';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
			const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

			const response = await fetch('http://localhost:8000/api/v1/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData,
			});

            if (!response.ok) {
                throw new Error('Login failed');
            }
			else {
				console.log("Login Successful")
				const responseBody = await response.json();
				localStorage.setItem('accessToken', responseBody['access_token']);
				setIsLoggedIn(true);
			}

            // Handle successful login (redirect, update state, etc.)
        } catch (error) {
            setError('Login failed. Please try again.'); // Update error state
        }
    };

	const accessToken = localStorage.getItem('accessToken');

	if (accessToken) {
	// Access token exists in localStorage
	return <>{<Navigate to="/profile" />}</>;
    // history.push('/');
	} else {
	// Access token does not exist in localStorage
	console.log('Access token not found');
	}

    return (
        <section className="background">
            <div className="container login-container">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-box">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            Don't have an account? <a href="/Signup">Sign Up</a>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
