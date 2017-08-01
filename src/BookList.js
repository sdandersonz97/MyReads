import React,{Component} from 'react'

class BookList extends React.Component{
    onSelectChange = (event,book) => {
        switch(event.target.value){
            case "wantToRead":
                this.props.setWantToRead(book)
                break
            case "read":
                this.props.setRead(book)
                break
            case "currentlyReading":
                this.props.setCurrentlyReading(book)                
                break
            case "none":
                break
        }                            
    }
    render(){
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">                       
                            {this.props.books.map((book,index)=>{return(
                                <li key={index}>
                            
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage:`url(${book.imageLinks.thumbnail})`  }}></div>
                                        <div className="book-shelf-changer">
                                            <select  onChange={(event)=>this.onSelectChange(event,book)} value={this.props.defaultValue}>
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
export default BookList