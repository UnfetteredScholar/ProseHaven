import './Forgot.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';


export default function Forgot() {

    const [isReset, setIsReset] = useState(false);
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('');
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const [password, setPassword] = useState('');

    const handleResetEmail = async () => {
        try {
            const body = {};
            body['email'] = email;


            const response = await fetch('http://web-01.akt-global.tech/api/v1/forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                // if (response.status === 400){
                //     alert("Account not found");
                // }
                // else {
                //     console.log(response)
                // }
                console.log(response);
                throw Error("Password Reset Failed");
            }
            // else {
            //     setIsReset(true);
            // }
            // Assuming your API call returns some data

        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        }
    };

    const handleReset = async () => {
        try {
            const body = {};
            body['email'] = email;
            body['token'] = token;
            body['new_password'] = password;


            const response = await fetch('http://web-01.akt-global.tech/api/v1/reset_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                // if (response.status === 400){
                //     alert("Account not found");
                // }
                // else {
                //     console.log(response)
                // }
                alert("Reset failed")
                console.log(response);
                throw Error("Password Reset Failed");
            }
            else {
                setIsReset(true);
                alert("Password reset successful")
            }
            // Assuming your API call returns some data

        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        }
    };


    return (
        // <section>
        // <h1>Verification Failed</h1>
        // <h1>Resend Verification Email</h1>
        // </section>

        <section className="background">
            <div className="container signup-container">
                <form onSubmit={handleReset}>
                    {/* <h1>Verification Failed</h1> */}
                    <h3>Reset Password</h3>
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
                    <button type="submit">Reset Password</button>
                    {/* {isSignedUp && <div>{isSignedUp}</div>} */}
                </form>
            </div>
        </section>
    );

}
