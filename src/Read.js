import React,{Component} from  'react'
import Library from './Library'
class Read extends React.Component{
    
    render(){
        return(
           <Library
           name="Read"
           books={this.props.books}
           setWantToRead={this.props.onSetWantToRead}
           setCurrentlyReading={this.props.onSetCurrentlyReading}
           defaultValue="read"
           />
        )
    }
}

export default Read