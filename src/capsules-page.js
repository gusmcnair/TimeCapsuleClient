import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import IndividualCapsule from './IndividualCapsule.js'


export default class CapsulesPage extends React.Component {
    render(){
        console.log(this.props.capsules[0], this.props.capsules[1], this.props.capsules[2])
        return(
            <section>
                <Link to='/addcapsule'>
                    <button>Add new capsule</button>
                </Link>
                {this.props.capsules.map((capsule, index) => 
                    <IndividualCapsule
                        key={`${capsule[0]}___${index}`}
                        title={capsule[0]} 
                        datecreated={capsule[1]}
                        dateexpires={capsule[2]}
                        datexpireshuman={capsule[3]}
                        contents={this.props.contents}
                        handleDelete={this.props.handleDelete}
                    />
                )}
            </section>
        )
    }
}