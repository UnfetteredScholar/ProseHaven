import './Verify.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';

export default function Verify() {

    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(null)
    const [email, setEmail] = useState('')

    const handleResend = async () => {
        try {
            const body = {};
            body['email'] = email;


            const response = await fetch('http://localhost:8000/api/v1/register/verify/resend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                if (response.status === 400){
                    alert("Account not found");
                }
                else if (response.status === 409) {
                    alert("Account already verified");
                }
                throw Error("Email Resend Failed");
            }
            else {
                alert("Verification email has been resent");
            }

            // Assuming your API call returns some data

        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error if API call fails
            // setIsLoading(false); // Set isLoading to false to indicate that loading is complete
        }
    };

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                // Make your API call here
                const queryParams = new URLSearchParams(window.location.search);
                // Access a specific query parameter by name
                const token = queryParams.get('token');
                const body = {};
                body['verification_token'] = token;


                const response = await fetch('http://localhost:8000/api/v1/register/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                if (!response.ok) {
                    setIsVerified(false);
                    throw new Error('Could not verify account');
                }
                else {
                    setIsLoading(false);
                    setIsVerified(true);
                }

                // Assuming your API call returns some data

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error if API call fails
                setIsLoading(false); // Set isLoading to false to indicate that loading is complete
            }
        };

        verifyAccount();
    }); // Empty dependency array ensures this effect runs only once on component mount

    // Render a loading spinner or message while waiting for API response
    if (isLoading) {
        return <div>Verifying...</div>;
    }


    if (isVerified) {
        console.log('Verification Successful');
        return (
            <section className="Verify">
                <div className="container verify-container">
                    <h1>Verification Successful</h1>
                    <Link to={'/login'} className="btn btn-border">
                        {' '}
                        Go To Login
                    </Link>
                </div>
            </section>
        );
    }
    else {
        console.log('Verification Failed');
        return (
            // <section>
            // <h1>Verification Failed</h1>
            // <h1>Resend Verification Email</h1>
            // </section>

            <section className="background">
                <div className="container signup-container">
                    <form onSubmit={handleResend}>
                        {/* <h1>Verification Failed</h1> */}
                        <h3>Resend Verification Email</h3>
                        {/* {error && <div className="error-message">{error}</div>} */}
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
                        <button type="submit">Resend</button>
                        {/* {isSignedUp && <div>{isSignedUp}</div>} */}
                    </form>
                </div>
            </section>
        );
    }
}
