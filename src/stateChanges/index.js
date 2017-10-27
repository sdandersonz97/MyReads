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