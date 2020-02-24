import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'


export default class HeaderComponent extends React.Component {
    render(){
        return(
            <header>
                <Link to='/capsules'>
                    <h1>Time Capsule</h1>
                </Link>
            </header>
        )
    }
}