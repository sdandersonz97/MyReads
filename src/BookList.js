import React,{Component} from 'react'
import {Book} from './Book'
import PropTypes from 'prop-types'

class BookList extends React.Component{
    
    selectChange = (event,book) => {
        
        const shelf = event.target.value
        this.props.onShelfChange(book,shelf)
        if(this.props.onShelfChangeInSearch){
            this.props.onShelfChangeInSearch(book,shelf)
        }              
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