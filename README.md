## MyReads
This is MyReads project: A bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read.



## Getting up MyReads
To run this app clone this Repo with :
`git clone https://github.com/sdandersonz97/MyReads.git`

MyReads Need the following packages:
* [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
* [prop-types](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

For install all the packages run :
`npm install`

To run the server :
`npm start`
    

## Components
`BookList.js` recieve as props:
### `name`
* Header to display as title

### `onShelfChange(book,shelf)`
* The update method for the API provided

`searchBooks.js` recieve as props:
### `name`
* Header to display as title

### `homePageBooks[]`
* All books on your home pages

## Backend Server

 [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results. 

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). 

