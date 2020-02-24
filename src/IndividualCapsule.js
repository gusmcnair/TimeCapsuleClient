import React from 'react'
import './style.css'

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
        if(currDate > this.state.dateexpires){
            this.setState({
                disabled: false
            })
            clearInterval(this.interval)
        }
    }

    handleOpen = () => {
        
        let thisContents = ''
        for(let i = 0; i < this.props.contents.length; i ++){
            if(this.props.title === this.props.contents[i].id){
                thisContents = this.props.contents[i].body
            }
        }
        if(document.getElementById(`${this.props.title}_contents`).innerHTML == ''){
        document.getElementById(`${this.props.title}_contents`).append(thisContents)
        }
        document.getElementById(this.props.title).classList.remove('hidden')
    }

    handleHide = () => {
        document.getElementById(this.props.title).classList.add('hidden')
    }

    render(){
        console.log(this.props)

        return(
            <article>
                <h3>{this.props.title}</h3>
                <p>Buried {this.props.datecreated}</p>
                <p>Open on {this.props.datexpireshuman}</p>
                <button id='opencapsule' disabled={this.state.disabled} onClick={this.handleOpen}>Open capsule</button>
                <div id={this.props.title} className='capsule-contents hidden'>
                    <p id={this.props.title + '_contents'}></p>
                    <button name='hidecapsule' onClick={this.handleHide}>Hide Capsule Contents</button>
                </div>
            </article>
        )
    }
}