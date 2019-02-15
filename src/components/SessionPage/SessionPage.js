import React, { Component } from 'react';
import { connect } from 'react-redux';
// import SessionPlayers from './SessionPlayers/SessionPlayers.js';
// import MyCharacterTable fromu './../UserPage/MyCharacters/MyCharacterTable.js';
import SessionEncounters from './SessionEncounters/SessionEncounters.js';

class SessionPage extends Component{
    constructor(props){
        super(props);
        this.state= {
                     test: 'test'
                    }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    dmPcConditonal = () => {
        if(this.props.reduxStore.user.id === this.props.reduxStore.DmCampaigns.joinSessionDM.user_id){
            return(
                <div>
                    <p>are you the DM</p>
                    {/* <MyCharacterTable /> */}
                    <SessionEncounters />
                </div>
            );
        }
        else{
            return(
                <div>
                    <p>Your character is {this.props.reduxStore.characterReducer.sessionCharacter.name}</p>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                <h2>{this.props.reduxStore.DmCampaigns.joinSessionDM.name}</h2>
                {this.dmPcConditonal()}
                <input onChange={this.handleChange} type='text' 
                    value={this.state.test||''} placeholder='Test Town!' name='test'/> 
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPage);