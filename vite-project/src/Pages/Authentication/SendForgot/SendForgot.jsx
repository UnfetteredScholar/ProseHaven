import './SendForgot.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';


export default function Forgot() {

    const [error, setError] = useState(null)
    const [email, setEmail] = useState('');

    const handleResetEmail = async () => {
        try {
            const body = {};
            body['email'] = email;


            const response = await fetch('http://localhost:8000/api/v1/forgot_password', {
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
                console.error(response);
                throw Error("Password Reset Failed");
            }
            else {
                console.log("Reset email sent")
            }
            // Assuming your API call returns some data

        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
        }
    };




    return (
        <section className="background">
            <div className="container signup-container">
                <form onSubmit={handleResetEmail}>
                    {/* <h1>Verification Failed</h1> */}
                    <h3>Send Password Reset</h3>
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
                    <button type="submit">Send Reset</button>
                    {/* {isSignedUp && <div>{isSignedUp}</div>} */}
                </form>
            </div>
        </section>
    );

}
