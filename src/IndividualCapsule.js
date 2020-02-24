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
            alert(`Your time capsule '${this.props.title}' is ready to be opened!`)
            this.setState({
                disabled: false
            })
            clearInterval(this.interval)
        }
    }

    handleOpen = () => {
        
        let thisContents = ''
        let image = document.createElement('img')
        for(let i = 0; i < this.props.contents.length; i ++){
            if(this.props.title === this.props.contents[i].id){
                thisContents = this.props.contents[i].body
                if(this.props.contents[i].image){
                    image.src = this.props.contents[i].image
                    image.alt = this.props.title
                }
            }
        }
        if(document.getElementById(`${this.props.title}_contents`).innerHTML == ''){
        if(image.src){
        document.getElementById(`${this.props.title}_image`).append(image)
        }
        document.getElementById(`${this.props.title}_contents`).append(thisContents)
        }
        document.getElementById(this.props.title).classList.remove('hidden')
    }

    handleHide = () => {
        document.getElementById(this.props.title).classList.add('hidden')
    }

    formatDate = (inputDate) => {
        let dateArray = inputDate.split(' ')
        dateArray.shift();
        if(dateArray[0] === 'Jan'){dateArray[0] += 'uary'}
        if(dateArray[0] === 'Feb'){dateArray[0] += 'ruary'}
        if(dateArray[0] === 'Mar'){dateArray[0] += 'ch'}
        if(dateArray[0] === 'Apr'){dateArray[0] += 'il'}
        if(dateArray[0] === 'Jun'){dateArray[0] += 'e'}
        if(dateArray[0] === 'Jul'){dateArray[0] += 'y'}
        if(dateArray[0] === 'Aug'){dateArray[0] += 'ust'}
        if(dateArray[0] === 'Sep'){dateArray[0] += 'tember'}
        if(dateArray[0] === 'Oct'){dateArray[0] += 'ober'}
        if(dateArray[0] === 'Nov'){dateArray[0] += 'ember'}
        if(dateArray[0] === 'Dec'){dateArray[0] += 'ember'}
        dateArray[1] += ','
        dateArray[2] += ','
        let time = dateArray[3].split(':')
        time.pop()
        if(Number(time[0]) > 12){
            let hours = Number(time[0])
            time.shift()
            time.unshift(hours - 12)
            time.push('pm')
        } else {(time.push('am'))}
        let newArray = [dateArray[0], dateArray[1], dateArray[2], `${time[0]}:${time[1]}`, time[2]]
        return newArray.join(' ')
        }

    render(){
        console.log(this.props)

        return(
            <article>
                <h3>{this.props.title}</h3>
                <p>Buried {this.formatDate(this.props.datecreated)}</p>
                <p>Don't open until {this.formatDate(this.props.datexpireshuman)}</p>
                <button id='opencapsule' disabled={this.state.disabled} onClick={this.handleOpen}>Open capsule</button>
                <div id={this.props.title} className='capsule-contents hidden'>
                    <div id={this.props.title + '_image'}></div>
                    <p id={this.props.title + '_contents'}></p>
                    <button name='hidecapsule' onClick={this.handleHide}>Hide Capsule Contents</button>
                    <button name='delete' onClick={e => this.props.handleDelete(this.props.title)}>Delete</button>
                </div>
            </article>
        )
    }
}