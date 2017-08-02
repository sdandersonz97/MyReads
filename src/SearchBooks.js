import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component{
    constructor(){
        super();
        this.state={
            query:"",
            booksInSearchResult:[]
        }
    }
    handleChange(event){
        this.setState({
            query:event.target.value
        })
        BooksAPI.search(this.state.query,10).then(booksInSearchResult=>{
            if(booksInSearchResult){
                booksInSearchResult.map(bookInSearchResult => {
                bookInSearchResult.shelf="none"
                    this.props.booksOnHomePage.map(bookOnHomePage => {
                            if (bookInSearchResult.id === bookOnHomePage.id){
                                bookInSearchResult.shelf = bookOnHomePage.shelf
                            }
                        })
                    })
                this.setState({
                    booksInSearchResult:booksInSearchResult
                })
            } 
        })
    }
    ShelfChange = (bookOnChange,shelf) =>{    
        this.setState(state=>{
            let newBooks = this.state.booksInSearchResult.map(bookInSearchResult=>{
                if (bookInSearchResult.id === bookOnChange.id){
                    bookInSearchResult.shelf = shelf
                }
                return bookInSearchResult
            })
        return {booksInSearchResult:newBooks}
        })
    }
    render(){
        const {onShelfChange} = this.props
        const {query, booksInSearchResult} = this.state
        return(
                <div className="search-books">            
                    <div className="search-books-bar">
                        <Link to="/" className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author" value={query} onChange={(event)=>this.handleChange(event)}/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <BookList
                            name="Results"
                            books={booksInSearchResult}
                            onShelfChange={onShelfChange}
                            onShelfChangeInSearch={this.ShelfChange}
                        />
                    </div>
            </div>
        )
    }
}

SearchBooks.PropTypes={
    homePageBooks: PropTypes.array,
    onShelfChange: PropTypes.func
}

export default SearchBooks

