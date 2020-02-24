import React from 'react'
import './style.css'
import {Link} from 'react-router-dom';

export default class LandingPage extends React.Component {


    render(){
        return(
            <section>
              <div class='explainer'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                <div class='button-container'>
                    <Link to='/capsules'>
                        <button className='enter-button' >
                            Enter            
                        </button>
                    </Link>
                </div>
            </section>
        )
    }
}