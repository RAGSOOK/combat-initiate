import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import MyCampaigns from './MyCampaigns/MyCampaigns.js';
import MyCharacters from './MyCharacters/MyCharacters.js';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
//
//I, Cody Have changed this from the base commit to match what I know
class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
                  showCamp: false,
                  showChar: false,
                };
  }

  campSwitch = () => {
    this.setState(prevState => ({
      showCamp: !prevState.showCamp
    }));
  }

  renderCampaigns = () => {
    if(this.state.showCamp){
      return (
        <div>
          <button onClick={this.campSwitch}>Hide Campaigns</button>
          <MyCampaigns history={this.props.history}/>
        </div>
      );
    }else{
      return(
        <button onClick={this.campSwitch}>Show Campaigns</button>
      );
    }
  }

  charSwitch = () => {
    this.setState(prevState => ({
      showChar: !prevState.showChar
    }));
  }

  renderCharacters = () => {
    if(this.state.showChar){
      return (
        <div>
          <button onClick={this.charSwitch}>Hide Characters</button>
          <MyCharacters history={this.props.history}/>
        </div>
      );
    }else{
      return(
        <button onClick={this.charSwitch}>Show Characters</button>
      );
    }
  }

  render(){
    return(
      <div>
        <h1 id="welcome">
          Welcome, { this.props.user.username }!
        </h1>
        <p>Your ID is: {this.props.user.id}</p>

        {this.renderCampaigns()}
        <br />
        {this.renderCharacters()}
        <br />
        <LogOutButton className="log-in" />
      </div>
    );
  }
  
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
