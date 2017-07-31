import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Read from './Read.js'
import WantToRead from './WantToRead'
import CurrentlyReading from './CurrentlyReading'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  constructor(){
    super()
    this.state = {
      books:[],
      wantToRead:[],
      currentlyReading:[],
      read:[],
      showSearchPage: true
    }
  }

  componentDidMount(){
   
  }
  setQuery = (query) =>{
    if(query !==""){
    BooksAPI.search(query,10).then(books=>{
      if(books.length > 1){
      this.setState({
        books:books
      })
      }
    })
    }
    this.setState({books:[]})
  }
  setSearchPage = () =>{
    this.setState({
      showSearchPage:false
    })
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
        {this.state.showSearchPage ? (
        <SearchBooks
        books={this.state.books}
        onSearchQuery={this.setQuery}
        onSetSearchPage={this.setSearchPage}
        onSetWantToRead={this.setWantToRead}
        onSetRead={this.setRead}
        onSetCurrentlyReading={this.setCurrentlyReading}
        />
        ):(
          <div>
        <CurrentlyReading 
          books={this.state.currentlyReading}
          onSetWantToRead={this.setWantToRead}
          onSetRead={this.setRead}
          onSetCurrentlyReading={this.setCurrentlyReading}
        />
        <WantToRead
        books={this.state.wantToRead}
        onSetCurrentlyReading={this.setCurrentlyReading}
        onSetRead={this.setRead}
        onSetWantToRead={this.setWantToRead}
        />
        <Read 
          books={this.state.read}
          onSetWantToRead={this.setWantToRead}
          onSetCurrentlyReading={this.setCurrentlyReading}
          onSetRead={this.setRead}
        />
         <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
        </div>
        )}
      </div>
        
    )
  }
}

export default BooksApp
