import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Read} from './Read.js'
import {WantToRead} from './WantToRead'
import {CurrentlyReading} from './CurrentlyReading'
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
  setQuery = (query) =>{
    if(query){
      BooksAPI.search(query,10).then(books=>{
          this.setState({
            books:books
          })         
      })
    }  
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
        {console.log(this.state.books)}
        <Route exact path="/" render={()=>(
          <SearchBooks
            books={this.state.books}
            onSearchQuery={this.setQuery}
            onSetSearchPage={this.setSearchPage}
            onSetWantToRead={this.setWantToRead}
            onSetRead={this.setRead}
            onSetCurrentlyReading={this.setCurrentlyReading}
          />
          )}
        />
        <Route path="/library" render={()=>(
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList
            books={this.state.books.filter(book=>book.shelf === 'currentlyReading')}
            onShelfChange={this.handleShelfChange}
            name="currentlyReading"
            />
            <BookList
            books={this.state.books.filter(book=>book.shelf === 'wantToRead')}
            onShelfChange={this.handleShelfChange}
            name="wantToRead"
            />
            <BookList
            books={this.state.books.filter(book=>book.shelf === 'read')}
            onShelfChange={this.handleShelfChange}
            name="Read"
            />
            <div className="open-search">
              <Link to="/">Add a book</Link>
            </div>
          </div>
          )}
        />
      </div>  
    )
  }
}

export default BooksApp
