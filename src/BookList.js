import React,{Component} from 'react'
import {Book} from './Book'
import PropTypes from 'prop-types'

class BookList extends React.Component{
    
    selectChange = (event,book) => {
        const {onShelfChange,onShelfChangeInSearch} = this.props
        const shelf = event.target.value
        onShelfChange(book,shelf)
                    
    }
    render(){
        const {shelfName,books} = this.props
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">                       
                            {books.map((book,index)=>{return(
                                <Book
                                    book={book}
                                    onSelectChange={this.selectChange}
                                    key={index}
                                /> 
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