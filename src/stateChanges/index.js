export const addNewBook = (state, newBook) => { books: state.books.push(newBook) }

export const changeShelfOfBook = (state, onChangeBook, shelf) => {
    let newBooks = state.books.map(book => {
      if (onChangeBook.id === book.id) {
        book.shelf = shelf;
      }
      return book;
    });
    return { books: newBooks };
}