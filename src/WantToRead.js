import React,{Component} from 'react'
import Library from './Library'

export const WantToRead = (props) =>{
    return(
        <Library
            name="Want To Read"
            books={props.books}
            setRead={props.onSetRead}
            setCurrentlyReading={props.onSetCurrentlyReading}
            defaultValue="wantToRead"
        />       
        )
}
