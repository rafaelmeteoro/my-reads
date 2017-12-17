import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookCase from './components/BookCase';
import SearchBooks from './components/SearchBooks';
import './App.css';
import * as BooksAPI from './utils/BooksAPI';

class BooksApp extends Component {

    state = {
        books: []
    }

    componentWillMount() {
        BooksAPI.getAll().then(books => {
            this.setState({ books })
        });
    }

    changeBook = (book, value) => {
        let { books } = this.state;

        books = books.filter(item => item.id !== book.id)
            .concat({
                ...book,
                shelf: value
            });

        BooksAPI.update(book, value);
        this.setState({ books });
    }

    render() {

        return (
            <div className='app'>
                <Route exact path='/' render={() => (
                    <BookCase
                        books={this.state.books}
                        OnChangeBook={this.changeBook}
                    />
                )}/>
                <Route path='/search' render={() => (
                    <SearchBooks
                        OnChangeBook={this.changeBook}
                    />
                )}/>
            </div>
        );
    }
}

export default BooksApp;
