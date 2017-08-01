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
  setWantToRead = (book) =>{
    this.setState(state=>({
      wantToRead:state.wantToRead.concat([ book ]),
      currentlyReading:state.currentlyReading.filter((c)=>c.id !==book.id),
      read:state.read.filter((c)=>c.id !==book.id)
    }))

  }
  setRead = (book) =>{
    this.setState(state=>({
      read:state.read.concat([ book ]),
      wantToRead:state.wantToRead.filter((c)=>c.id !==book.id),
      currentlyReading:state.currentlyReading.filter((c)=>c.id !==book.id)
    }))

  }
  setCurrentlyReading = (book) =>{
    this.setState(state=>({
      currentlyReading:state.currentlyReading.concat([ book ]),
      read:state.read.filter((c)=>c.id !==book.id),
      wantToRead:state.wantToRead.filter((c)=>c.id !==book.id)
    }))

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
            books={this.state.books.filter(book=>book.shelf === 'read')}
            />
            <BookList
            books={this.state.books.filter(book=>book.shelf === 'currentlyReading')}
            />
            <BookList
            books={this.state.books.filter(book=>book.shelf === 'wantToRead')}
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
