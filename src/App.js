import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { filterByShelf, shelfs } from './utils/helpers';
import { addNewBook, changeShelfOfBook } from './stateChanges';
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = { books: [] };
  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({ books })
    );
  }
  isTheBookNew = bookOnChange => {
    let is = false;
    if (bookOnChange.shelf === "none") {
      this.setState(state => addNewBook(state, bookOnChange))
      is = true;
    }
    return is;
  };
  handleShelfChange = (bookOnChange, shelf) => {
    !this.isTheBookNew(bookOnChange) &&
      this.setState(state => changeShelfOfBook(state, bookOnChange, shelf));
    BooksAPI.update(bookOnChange, shelf);
  };
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              onShelfChange={this.handleShelfChange}
              booksOnHomePage={books}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {shelfs.map(shelf => 
                <BookList 
                  books={filterByShelf(books, shelf.shelfId)}
                  onShelfChange={this.handleShelfChange}
                  shelfName={shelf.shelfTitle} />)}
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}
export default BooksApp;
