export const addNewBook = newBook => state => { books: state.books.push(newBook) }

export const changeShelfOfBook = (onChangeBook, shelf) => state => {
    let newBooks = state.books.map(book => {
      if (onChangeBook.id === book.id) {
        book.shelf = shelf;
      }
      return book;
    });
    return { books: newBooks };
}

export const changeShelfOfSearchedBook = (bookOnChange, shelf) => state => {
  let newBooks = state.booksInSearchResult.map(bookInSearchResult => {
    if (bookInSearchResult.id === bookOnChange.id) {
      bookInSearchResult.shelf = shelf;
    }
    return bookInSearchResult;
  });
  return { booksInSearchResult: newBooks };
}