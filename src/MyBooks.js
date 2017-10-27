import React from "react";
import BookList from './BookList';
import { filterByShelf, shelfs } from './utils/helpers';
class MyBooks extends React.Component {
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
    render(){
        return(
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
        )
    }
}

export default MyBooks