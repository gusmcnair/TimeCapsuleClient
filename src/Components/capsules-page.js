import React from 'react'
import '../Utilities/style.css'
import {Link, Router} from 'react-router-dom'
import IndividualCapsule from './IndividualCapsule.js'


export default class CapsulesPage extends React.Component {
    render(){
        console.log(this.props.capsules[0], this.props.capsules[1], this.props.capsules[2])
        return(
            <section>
                <Link to='/addcapsule'>
                    <button>Add new capsule</button>
                </Link>
                {this.props.capsules.map((capsule) => 
                    <IndividualCapsule
                        key={capsule.id}
                        id={capsule.id}
                        title={capsule.title} 
                        datecreated={capsule.burydate}
                        dateexpires={capsule.opennumber}
                        datexpireshuman={capsule.opendate}
                        contents={this.props.contents}
                        handleDelete={this.props.handleDelete} 
                    />
                )}
            </section>
        )
    }
}