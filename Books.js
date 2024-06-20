import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title, author, or genre"
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {filteredBooks.map(book => (
                    <li key={book._id}>
                        {book.title} by {book.author} ({book.genre}, {book.publishedYear})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Books;
