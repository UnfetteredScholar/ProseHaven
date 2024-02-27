import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './Library.css'


export default function Library() {
    const userFollows = localStorage.getItem('userFollows').split(',');
    const [books, setBooks] = useState([]);
    // let books = useRef([]);
    const [isLoading, setIsLoading] = useState(true);
    const cover = '../../../../public/Covers/';
    // const [inLibrary, setInLibrary] = useState(false);

    useEffect(() => {
        const getBooks = async () => {
            try {
                if (books.length > 0) {
                    return
                }
                userFollows.forEach(async (id) => {
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
                        setBooks(prevList => [...prevList, data]);
                        console.log(books)
                        
                    }
                });
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error if API call fails
                setIsLoading(false); // Set isLoading to false to indicate that loading is complete
            }
        };

        getBooks();
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <section className="story-detail">
            <div className="story">
                <h1>Library</h1>
                {/* <h2>{books.length}</h2> */}
                <div>
    </div>
                {books.map((book, index) => (
                        <div key={index}>
                        <div className='story-detail-block'>
                        <div className="story-detail-thumbnail">
                            <img className="story-detail-thumbnail" src={cover + book["_id"] + '.jpeg'} alt="COVER" />
                        </div>
                        <div>
                            <h3>Description</h3>
                            <p>{book['description']}</p>
                            <h3>Genres</h3>
                            <p>{book['genres'].join(', ')}</p>
                        </div>
                        </div>
                        </div>
                ))}

            </div>


        </section >
    );
}
