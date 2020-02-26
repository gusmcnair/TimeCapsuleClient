import React from 'react';
import '../Utilities/style.css'
import {Route, Switch, withRouter} from 'react-router-dom'
import HeaderComponent from './header-component.js'
import LandingPage from './landing-page.js'
import CapsulesPage from './capsules-page.js'
import AddCapsulePage from './add-capsule.js'

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      capsules: [],
      capsulecontents: []
    }
  }

  handleDelete = (title) => {
    console.log(title, this.state)
    let newCapsules = this.state.capsules.filter(capsule => capsule[0] !== title);
    this.setState({
      capsules: newCapsules
    })
  }

  handleNewData = (event, data) => {
    event.preventDefault()
    console.log(data.time)
    let lockTime = 0
    if(data.time === 'oneminute'){lockTime = 60000}
    else if(data.time === 'onehour'){lockTime = 3600000}
    else if(data.time === 'oneday'){lockTime = 86400000}
    else if(data.time === 'threedays'){lockTime = 259200000}
    else if(data.time === 'oneweek'){lockTime = 604800000}
    else if(data.time === 'fourweeks'){lockTime = 2419200000}
    else if(data.time === 'halfayear'){lockTime = 15768000000}
    else if(data.time === 'oneyear'){lockTime = 31536000000}
    else if(data.time === 'twoyears'){lockTime = 63072000000}
    else if(data.time === 'fiveyears'){lockTime = 157680000000}
    let currDate = new Date
    let universalDate = currDate.getTime() + lockTime
    let expDate = new Date(universalDate)
    let newCap = [data.title, currDate.toString(), universalDate, expDate.toString()]
    let currState = this.state.capsules
    let currContents = this.state.capsulecontents
    let newContents = {
      id: data.title,
      body: data.content,
      image: data.imagelink
    }
    currState.push(newCap)
    currContents.push(newContents)
    this.setState({
      capsules: currState,
      capsulecontents: currContents
    })
  }

  render(){
  return (
    <main>
        <HeaderComponent/>
        <Switch>
          <Route exact path='/'>
            <LandingPage/>
          </Route>
          <Route exact path='/capsules'>
            <CapsulesPage capsules={this.state.capsules} contents={this.state.capsulecontents} handleDelete={this.handleDelete}/>
          </Route>
          <Route exact path='/addcapsule'>
            <AddCapsulePage handleNewData={this.handleNewData}/>
          </Route>
        </Switch>
    </main>
  );
}}

export default App;
