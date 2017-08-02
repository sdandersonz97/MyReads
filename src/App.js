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
  isTheBookNew=(bookOnChange)=>{
    let is = false
    if(bookOnChange.shelf === "none"){
      this.setState(state=>{
        books:state.books.push(bookOnChange)
      })
      is = true
    }
    return is
  }
  handleShelfChange=(bookOnChange,shelf)=>{
      if(!this.isTheBookNew(bookOnChange)){
        this.setState(state=>{
        let newBooks = state.books.map(book => {
          if(bookOnChange.id === book.id){
            book.shelf = shelf
          }
          return book
        })
        return {books:newBooks}
      })
      }

    BooksAPI.update(bookOnChange,shelf)
  }
  render() {
    const {books} = this.state
    return (
      <div className="app">
        <Route path="/search" render={()=>(
          <SearchBooks
            onShelfChange={this.handleShelfChange}
            booksOnHomePage={this.state.books}
          />
          )}
        />
        <Route exact path="/" render={()=>(
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList
              books={books.filter(book=>book.shelf === 'currentlyReading')}
              onShelfChange={this.handleShelfChange}
              shelfName="Currently Reading"
            />
            <BookList
              books={books.filter(book=>book.shelf === 'wantToRead')}
              onShelfChange={this.handleShelfChange}
              shelfName="Want To Read"
            />
            <BookList
              books={books.filter(book=>book.shelf === 'read')}
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
