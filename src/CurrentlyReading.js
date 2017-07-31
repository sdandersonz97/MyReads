import React,{Component} from 'react'
import Library from './Library'

class CurrentlyReading extends React.Component{

render(){
return(
    <Library
    name="Currently Reading"
    books={this.props.books}
    setWantToRead={this.props.onSetWantToRead}
    setRead={this.props.onSetRead}
    defaultValue="curretlyReading"
    />
        


)}
}

export default CurrentlyReading