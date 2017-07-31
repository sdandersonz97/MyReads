import React,{Component} from  'react'
import Library from './Library'

export const Read = (props) => {
    return(
        <Library
           name="Read"
           books={props.books}
           setWantToRead={props.onSetWantToRead}
           setCurrentlyReading={props.onSetCurrentlyReading}
           defaultValue="read"
        />
    )   
}
