import React,{Component} from 'react'
import {Link} from 'react-router-dom'
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
                    <div className="search-books-bar">
                        <Link to="/library" className="close-search">Close</Link>
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
