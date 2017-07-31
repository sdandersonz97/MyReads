import React,{Component} from 'react'
import Library from './Library'

class WantToRead extends React.Component{

render(){
return(
    <Library
    name="Want To Read"
    books={this.props.books}
    setRead={this.props.onSetRead}
    setCurrentlyReading={this.props.onSetCurrentlyReading}
    />
        


)}
}

export default WantToRead