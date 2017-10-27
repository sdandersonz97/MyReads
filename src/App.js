import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import SearchBooks from "./SearchBooks";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { filterByShelf } from './utils/helpers';
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = { books: [] };
  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({ books })
    );
  }
  addBookToState = newBook => this.setState(state => { books: state.books.push(newBook) });
  isTheBookNew = bookOnChange => {
    let is = false;
    if (bookOnChange.shelf === "none") {
      this.addBookToState(bookOnChange)
      is = true;
    }
    return is;
  };
  handleShelfChange = (bookOnChange, shelf) => {
    if (!this.isTheBookNew(bookOnChange)) {
      this.setState(state => {
        let newBooks = state.books.map(book => {
          if (bookOnChange.id === book.id) {
            book.shelf = shelf;
          }
          return book;
        });
        return { books: newBooks };
      });
    }
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
              <BookList
                books={filterByShelf(books,'currentlyReading')}
                onShelfChange={this.handleShelfChange}
                shelfName="Currently Reading"
              />
              <BookList
                books={filterByShelf(books,'wantToRead')}
                onShelfChange={this.handleShelfChange}
                shelfName="Want To Read"
              />
              <BookList
                books={filterByShelf(books,'read')}
                onShelfChange={this.handleShelfChange}
                shelfName="Read"
              />
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
