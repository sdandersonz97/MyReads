import React,{Component} from 'react'
import Library from './Library'


class SearchBooks extends React.Component{
constructor(){
    super();
    this.state={
        query:""
    }
}
handleChange(event){
    this.setState({
        query:event.target.value
    })
    this.props.onSearchQuery(this.state.query)
}
render(){
    return(
            <div className="search-books">
                {console.log(this.state.query)}
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.props.onSetSearchPage()}>Close</a>
                    <div className="search-books-input-wrapper">
              
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event)=>this.handleChange(event)}/>
                
                    </div>
                </div>
                <div className="search-books-results">
                    <Library
                    name="Results"
                    books={this.props.books}
                    setWantToRead={this.props.onSetWantToRead}
                    setCurrentlyReading={this.props.onSetCurrentlyReading}
                    setRead={this.props.onSetRead}
                    defaultValue="none"
                    />
                </div>
          </div>
    )
}
}
export default SearchBooks
