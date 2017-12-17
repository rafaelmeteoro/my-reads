import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as BooksAPI from '../utils/BooksAPI';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

    static propTypes = {
        OnChangeBook: PropTypes.func.isRequired
    }

    state = {
        books: []
    }

    searchBooks(query) {
        query = query || ' ';

        BooksAPI.search(query).then(books => {
            this.setState({ books: books.error ? [] : books })
        });
    }

    render() {

        const { books } = this.state;

        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/'>Close</Link>
                    <div className='search-books-input-wrapper'>
                        <Debounce time='300' handler='onChange'>
                            <input
                                type='text'
                                placeholder='Search by title or author'
                                onChange={(event) => this.searchBooks(event.target.value)}
                            />
                        </Debounce>
                    </div>
                </div>
                <ListBooks
                    books={books}
                    OnChangeBook={this.props.OnChangeBook}
                />
            </div>
        )
    }
}

export default SearchBooks;
