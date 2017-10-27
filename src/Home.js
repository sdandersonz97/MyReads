import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => (
    <div className='bg-image container'>
            <h2 className='title position-center'>
                Bookly
                
            </h2>
            <Link className='position-center' to='/mybooks'>Go to my books</Link>
            
    </div>
)

export default Home