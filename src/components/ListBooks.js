import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        OnChangeBook: PropTypes.func.isRequired
    }

    render() {

        const { books, OnChangeBook } = this.props;

        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select
                                            onChange={e => {
                                                OnChangeBook(book, e.target.value)
                                            }}
                                            value={book.shelf}
                                        >
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListBooks;
