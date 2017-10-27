import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class SearchBooks extends Component {
  state = {
    query: "",
    booksInSearchResult: []
  };
  handleChange = ({ target }) => {
    const { query } = this.state;
    const { booksOnHomePage } = this.props;
    this.setState({ query: target.value });
    BooksAPI.search(query, 10).then(booksInSearchResult => {
      if (booksInSearchResult) {
        booksInSearchResult.map(bookInSearchResult => {
          bookInSearchResult.shelf = "none";
          booksOnHomePage.map(bookOnHomePage => {
            if (bookInSearchResult.id === bookOnHomePage.id) {
              bookInSearchResult.shelf = bookOnHomePage.shelf;
            }
          });
        });
        this.setState({ booksInSearchResult });
      }
    });
  };
  ShelfChange = (bookOnChange, shelf) => {
    const { booksInSearchResult } = this.state;
    const { onShelfChange } = this.props;
    onShelfChange(bookOnChange, shelf);
    this.setState(state => {
      let newBooks = booksInSearchResult.map(bookInSearchResult => {
        if (bookInSearchResult.id === bookOnChange.id) {
          bookInSearchResult.shelf = shelf;
        }
        return bookInSearchResult;
      });
      return { booksInSearchResult: newBooks };
    });
  };
  render() {
    const { query, booksInSearchResult } = this.state;
    const { onBack } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/mybooks" className="close-search" onClick={onBack}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BookList
            name="Results"
            books={booksInSearchResult}
            onShelfChange={this.ShelfChange}
          />
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  homePageBooks: PropTypes.object,
  onShelfChange: PropTypes.func
};

export default SearchBooks;
