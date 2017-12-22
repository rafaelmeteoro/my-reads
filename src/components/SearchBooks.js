import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
import * as BooksAPI from '../utils/BooksAPI';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

    static propTypes = {
        booksCase: PropTypes.array.isRequired,
        OnChangeBook: PropTypes.func.isRequired
    }

    state = {
        books: [],
        booksCase: []
    }

    componentWillMount() {
        const { booksCase } = this.props;
        this.setState({ booksCase });
    }

    searchBooks(query, booksCase) {
        query = query || ' ';

        BooksAPI.search(query).then(books => {

            let result;

            if (books.error) {
                result = [];
            } else {
                result = this.merge(books, booksCase, 'id');
            }

            this.setState({ books: result });
        });
    }

    // Merge 2 arrays from a property
    merge(a, b, prop) {
        let reduced = a.filter(aitem => {
            return !b.find(bitem => aitem[prop] === bitem[prop]);
        })

        return reduced.concat(b);
    }

    render() {

        const { books, booksCase } = this.state;

        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/'>Close</Link>
                    <div className='search-books-input-wrapper'>
                        <Debounce time='300' handler='onChange'>
                            <input
                                type='text'
                                placeholder='Search by title or author'
                                onChange={(event) => this.searchBooks(event.target.value, booksCase)}
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
