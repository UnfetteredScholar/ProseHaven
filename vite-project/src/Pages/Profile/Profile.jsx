import './Profile.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Profile() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // const [error, setError] = useState(null);
    const [follows, setFollows] = useState('');
    // const [works, setWorks] = useState('');
    const [joined, setJoined] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const logout = () => {
        localStorage.removeItem('accessToken');

        setIsLoggedIn(false);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Make your API call here
          const accessToken = localStorage.getItem('accessToken');
          const response = await fetch('http://web-01.akt-global.tech/api/v1/users/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            }
          });
          if (!response.ok) {
            localStorage.removeItem('accessToken');
            throw new Error('Could not fetch user details');
          }
          
          // Assuming your API call returns some data
          const data = await response.json();
  
          // Perform any necessary logic with the data
          console.log(data['date_created'].split(' ')[0]);
          setEmail(data['email']);
          setUsername(data['username']);
          setFollows(data['follows'].length);
          setJoined(data['date_created'].split(' ')[0]);
          setIsLoading(false);
          localStorage.setItem('userFollows', data['follows']);
  
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error if API call fails
          setIsLoading(false); // Set isLoading to false to indicate that loading is complete
        }
      };
  
      fetchData();
    }); // Empty dependency array ensures this effect runs only once on component mount
  
    // Render a loading spinner or message while waiting for API response
    if (isLoading) {
      return <div>Loading...</div>;
    }


    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.log('Invalid Access Token');
        return (
            <section className="Profile">
			<div className="container profile-container">
                <h1>Not Logged In</h1>
				<Link to={'/login'} className="btn btn-border">
					{' '}
					Go To Login
				</Link>
			</div>
            </section>
        );
    }


	return (
		<section className="Profile">
			<div className="container profile-container">
				<h1>Profile</h1>
                <div className='container profile-container row'>
                    <div className="container profile-container">
                        <h3>Email</h3>
                        <h3>{email}</h3>
                    </div>
                    <div className="container profile-container">
                        <h3>Username</h3>
                        <h3>{username}</h3>
                    </div>
                    <div className="container profile-container">
                        <h3>Library</h3>
                        <h3>{follows}</h3>
                    </div>
                    <div className="container profile-container">
                        <h3>Joined</h3>
                        <h3>{joined}</h3>
                    </div>
                </div>
                <div className='container profile-container row'>

                </div>

                <button className="btn btn-border" onClick={logout}>
                    Logout
                </button>
			</div>
		</section>
	);
}
