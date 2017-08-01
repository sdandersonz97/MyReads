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
  handleShelfChange=(book,newShelf)=>{
    BooksAPI.update(book,newShelf).then(book=>{
      BooksAPI.getAll().then(books=>{
        this.setState({
          books:books
        })
      })
    })
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <SearchBooks
            onShelfChange={this.handleShelfChange}
            books={this.state.books}
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
              name="Currently Reading"
            />
            <BookList
              books={this.state.books.filter(book=>book.shelf === 'wantToRead')}
              onShelfChange={this.handleShelfChange}
              name="Want To Read"
            />
            <BookList
              books={this.state.books.filter(book=>book.shelf === 'read')}
              onShelfChange={this.handleShelfChange}
              name="Read"
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
