import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import BookList from './BookList'

class BooksApp extends React.Component {
  constructor(){
    super()
    this.state = {
      books:[]    
    }
  }
  componentDidMount(){
    BooksAPI.getAll().then(books=>{
      this.setState({
        books:books
      })
    })
  }
  handleShelfChange=(bookOnChange,shelf)=>{
    this.setState(state=>{
      let newBooks = state.books.map(book => {
        if(bookOnChange.id === book.id){
          book.shelf = shelf
        }
        return book
      })
      return {book:newBooks}
    })
    BooksAPI.update(bookOnChange,shelf)
  }
  render() {
    return (
      <div className="app">
        {console.log(this.state.books)}
        <Route path="/search" render={()=>(
          <SearchBooks
            onShelfChange={this.handleShelfChange}
            homePagebooks={this.state.books}
          />
          )}
        />
        <Route exact path="/" render={()=>(
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList
              books={this.state.books.filter(book=>book.shelf === 'currentlyReading')}
              onShelfChange={this.handleShelfChange}
              shelfName="Currently Reading"
            />
            <BookList
              books={this.state.books.filter(book=>book.shelf === 'wantToRead')}
              onShelfChange={this.handleShelfChange}
              shelfName="Want To Read"
            />
            <BookList
              books={this.state.books.filter(book=>book.shelf === 'read')}
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
    )
  }
}
export default BooksApp
