import React,{Component} from 'react'
import Library from './Library'

export const CurrentlyReading =(props)=>{
    return(
        <Library
            name="Currently Reading"
            books={props.books}
            setWantToRead={props.onSetWantToRead}
            setRead={props.onSetRead}
            defaultValue="currentlyReading"
        />
        )
}

