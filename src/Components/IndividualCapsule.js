import React from 'react'
import '../Utilities/style.css'

let AUTH_TOKEN ='bd990ba4-228b-11ea-978f-2e728ce88125'

export default class IndividualCapsule extends React.Component {
    constructor(){
        super()
        this.state = {
            disabled: true,
            dateexpires: 0,
            currentdate: 0
        }
    }

    componentDidMount(){
        this.checkDate()
        this.setState({
            dateexpires: this.props.dateexpires
        })

        this.interval = setInterval(() => 
            this.checkDate(),
            10000
        )
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    checkDate(){
        let currDate = Date.now()
        if(currDate > this.props.dateexpires){
            this.setState({
                disabled: false
            })
            clearInterval(this.interval)
        }
    }

    handleOpen = (id) => {
        fetch(`http://localhost:8000/api/capsules/${id}?auth=${AUTH_TOKEN}`)
            .then(capsule => {
                if(capsule.ok){
                    return capsule.json()
                }
            })
            .then(capsule => this.handleNewCapsule(capsule))
            .catch(err => console.log(err))
        }
        
    handleNewCapsule = (newCapsule) => {
        let image = document.createElement('img')
        console.log(newCapsule)
        if(newCapsule.imageurl !== ''){
            image.src = newCapsule.imageurl
            image.alt = this.props.title
        }
        if(document.getElementById(`${this.props.title}_contents`).innerHTML == ''){
        if(image.src){
        document.getElementById(`${this.props.title}_image`).append(image)
        }
        document.getElementById(`${this.props.title}_contents`).append(newCapsule.contents)
        }
        document.getElementById(this.props.title).classList.remove('hidden')
    }

    handleHide = () => {
        document.getElementById(this.props.title).classList.add('hidden')
    }

    render(){
        return(
            <article>
                <h3>{this.props.title}</h3>
                <p>Buried on {this.props.datecreated}</p>
                <p>Don't open until {this.props.datexpireshuman}</p>
                <button id='opencapsule' disabled={this.state.disabled} onClick={e => this.handleOpen(this.props.id)}>Open capsule</button>
                <div id={this.props.title} className='capsule-contents hidden'>
                    <div id={this.props.title + '_image'}></div>
                    <p id={this.props.title + '_contents'}></p>
                    <button name='hidecapsule' onClick={this.handleHide}>Hide Capsule Contents</button>
                    <button name='delete' onClick={e => this.props.handleDelete(this.props.id)}>Delete</button>
                </div>
            </article>
        )
    }
}