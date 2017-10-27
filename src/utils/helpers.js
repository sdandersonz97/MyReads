export const filterByShelf = (books, shelf) => books.filter(book => book.shelf === shelf )
export const shelfs = [
    { shelfId: 'currentlyReading', shelfTitle: 'Currently Reading'},
    { shelfId: 'wantToRead', shelfTitle: 'Want To Read' },
    { shelfId: 'read', shelfTitle: 'Read'}
]