import React from "react";
import BookList from './BookList';
import * as BooksAPI from "./BooksAPI";
import { addNewBook, changeShelfOfBook } from './stateChanges';
import { filterByShelf, shelfs } from './utils/helpers';
import { Link } from 'react-router-dom';
import SearchBook from './SearchBooks';
class MyBooks extends React.Component {
    state = { 
      books: [],
      isSearching: false, 
    };
    componentDidMount() {
      BooksAPI.getAll().then(books =>
        this.setState({ books })
      );
    }
    isTheBookNew = bookOnChange => {
      let is = false;
      if (bookOnChange.shelf === "none") {
        this.setState(addNewBook(bookOnChange))
        is = true;
      }
      return is;
    };
    handleShelfChange = (bookOnChange, shelf) => {
      !this.isTheBookNew(bookOnChange) &&
        this.setState(changeShelfOfBook(bookOnChange, shelf));
      BooksAPI.update(bookOnChange, shelf);
    };
    onSearch = () => this.setState({ isSearching: true })
    onBack = () => this.setState({ isSearching: false })
    render(){
        const { books, isSearching } = this.state
        console.log('s')
        return(
            <section>
                {!isSearching 
                ?(
                  <div>
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                    {shelfs.map(shelf => 
                      <BookList 
                          key={shelf.shelfId}
                          books={filterByShelf(books, shelf.shelfId)}
                          onShelfChange={this.handleShelfChange}
                          shelfName={shelf.shelfTitle} />)}
                    <div className="open-search">
                      <Link to="/mybooks" onClick={this.onSearch}>Add a book</Link>
                    </div>
                  </div>)
                : <SearchBook  
                    booksOnHomePage={books}
                    onShelfChange={this.handleShelfChange}
                    onBack={this.onBack}
                    />
                }
               

            </section>
        )
    }
}

export default MyBooks