import React from 'react'
import './style.css'
import {withRouter} from 'react-router-dom'

class AddCapsulePage extends React.Component{
    constructor(){
        super()
        this.state = {
            title: '',
            content: '',
            imagelink: '',
            time: 'oneminute',
        }
    }

    updateState = (category, value) => {
        this.setState({
            [category]: value
        })
    }

    handleDisabled = () => {
        if(this.state.title.length >= 8 && this.state.content.length >= 20){return false}
        else{return true}
    }

    handleDiscard = () => {
        this.props.history.push('/capsules')
    }

    handleSubmit = (event, data) => {
        event.preventDefault()
        this.props.handleNewData(event, data)
        this.props.history.push('/capsules')  
    }

    render(){
        const isDisabled = this.handleDisabled()
        return(
            <section>
               <form onSubmit={e => this.handleSubmit(e, this.state)}>
                <label htmlFor='title'>Title</label>
                <input name='title' id='title' type='text' placeholder='All my secrets' onChange={e => this.updateState(e.target.id, e.target.value)}/>
                <label htmlFor='content'>Content</label>
                <textarea name='content' id='content' type='text' placeholder='I dont have any' onChange={e => this.updateState(e.target.id, e.target.value)}/>
                <label htmlFor='imagelink'>Link To Image</label>
                <input name='imagelink' id='imagelink' type='url' onChange={e => this.updateState(e.target.id, e.target.value)}/>
                <label htmlFor='time'>Amount of Time</label>
                <select id='time' onChange={e => this.updateState(e.target.id, e.target.value)}>
                    <option value='oneminute'>One minute</option>
                    <option value='onehour'>One hour</option>
                    <option value='fourhours'>Four hours</option>
                    <option value='eighthours'>Eight hours</option>
                    <option value='oneday'>One day</option>
                    <option value='threedays'>Three days</option>
                    <option value='oneweek'>One week</option>
                    <option value='fourweeks'>Four weeks</option>
                    <option value='halfayear'>Half a year</option>
                    <option value='oneyear'>One year</option>
                    <option value='twoyears'>Two years</option>
                    <option value='fiveyears'>Five years</option>
                </select>
                    <button id='submit' disabled={isDisabled}>Submit</button>
                    <button id='discard' onClick={this.handleDiscard}>Discard and Return</button>
            </form>
            </section>
        )
    }
}

export default withRouter(AddCapsulePage)