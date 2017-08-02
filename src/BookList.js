import React,{Component} from 'react'
import PropTypes from 'prop-types'

class BookList extends React.Component{
    onSelectChange = (event,book) => {
        const shelf = event.target.value
        this.props.onShelfChange(book,shelf)              
    }
    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">                       
                            {this.props.books.map((book,index)=>{return(
                                <li key={index}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage:`url(${book.imageLinks.thumbnail})`  }}></div>
                                        <div className="book-shelf-changer">
                                            <select  onChange={(event)=>this.onSelectChange(event,book,index)} value={book.shelf}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="none">None</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead" >Want to Read</option>
                                                <option value="read">Read</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                            )})}
                        </ol>
                    </div>
            </div>        
        )
    }
}

BookList.PropTypes = {
    book: PropTypes.array,
    onShelfChange: PropTypes.func
}

export default BookList