import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './StoryDetail.css'


export default function StoryDetail() {
	const { id } = useParams();
	const [bookDetails, setBookDetails] = useState(null);
	const [userDetails, setUserDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const cover = '../Covers/' + id + '.jpeg'
	const [inLibrary, setInLibrary] = useState(false);

	useEffect(() => {
		const getBookDetails = async () => {
			try {
				
				const response = await fetch('http://web-01.akt-global.tech/api/v1/stories/' + id, {
					method: 'GET',
					headers: {
						'accept': 'application/json',
					}
				});

				if (!response.ok) {
					throw new Error('Could not verify account');
				}
				else {
					const data = await response.json();
					// alert(typeof (data['follows']));
					// setInLibrary(userDetails['follows'].find(id));
					setBookDetails(data);
					setIsLoading(false);
				}

				// Assuming your API call returns some data

			} catch (error) {
				console.error('Error fetching data:', error);
				// Handle error if API call fails
				setIsLoading(false); // Set isLoading to false to indicate that loading is complete
			}
		};



		getBookDetails();
	});

	const handleAddBook = async (e) => {
		e.preventDefault();

		try {
			const body = {};
			body['story_id'] = id;
			const accessToken = localStorage.getItem('accessToken');

			const response = await fetch('http://web-01.akt-global.tech/api/v1/users/follows', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + accessToken
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				console.error(response)

				alert("Unable to follow book");
				throw new Error('Sign up failed');
			}
			else {
				console.log("Story follow Successful");
				alert("Book added to library");
			}

		} catch (err) {
			console.log(err)
		}
	};

	const handleRemoveBook = async (e) => {
		e.preventDefault();

		try {
			const accessToken = localStorage.getItem('accessToken');

			const response = await fetch('http://web-01.akt-global.tech/api/v1/users/follows/' + id, {
				method: 'DELETE',
				headers: {
					'accept': 'application/json',
					'Authorization': 'Bearer ' + accessToken
				},
			});

			if (!response.ok) {
				console.error(response)

				alert("Unable to unfollow book");
				throw new Error('Sign up failed');
			}
			else {
				console.log("Story unfollow Successful");
				alert("Book removed from to library");
			}

		} catch (err) {
			console.log(err)
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (bookDetails === null) {
		return <>{<Navigate to="/not_found" />}</>;
	}

	return (
		<section className="story-detail">
			<div className="story">
				<h1>{bookDetails['title']}</h1>
				<div className='story-detail-block'>
					<div className="story-detail-thumbnail">
						<img className="story-detail-thumbnail" src={cover} alt="COVER" />
					</div>
					<div>
						<h3>Description</h3>
						<p>{bookDetails['description']}</p>
						<h3>Genres</h3>
						<p>{bookDetails['genres'].join(', ')}</p>
						<h3>Status</h3>
						<p>{bookDetails['status']}</p>
						<h3>Follows</h3>
						<p>{bookDetails['follows']}</p>
					</div>

				</div>
			</div>
			<div className="story-detail-buttons">
				<Link to={`/:id`} className="btn sm primary">
					Read
				</Link>
				{/* {inLibrary === false && <Link to={'#'} className="btn sm primary" onClick={handleRemoveBook}>
					Remove from Library
				</Link>} */}
				<Link to={'#'} className="btn sm primary" onClick={handleAddBook}>
					Add to Library
				</Link>
				<Link to={'#'} className="btn sm primary" onClick={handleRemoveBook}>
					Remove from Library
				</Link>
			</div>


			{/* {sellingBooksData.map(({ title, info, img, btnLink }, index) => {
					return (
						<div className="story" key={index}>
							<h1>{title}</h1>
							<div className="story-detail-thumbnail">
								<img src={img} alt="" />
							</div>
						</div>
					);
				})} */}

		</section >
	);
}
