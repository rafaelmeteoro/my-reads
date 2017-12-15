import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookCase from './components/BookCase';
import SearchBooks from './components/SearchBooks';
import './App.css';

class BooksApp extends Component {

    state = {
        showSearchPage: false
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <BookCase />
                )}/>
                <Route path='/search' render={( history) => (
                    <SearchBooks />
                )}/>
            </div>
        );
    }
}

export default BooksApp;
