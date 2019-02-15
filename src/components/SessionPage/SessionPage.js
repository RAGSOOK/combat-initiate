import React, { Component } from 'react';
import { connect } from 'react-redux';
// import SessionPlayers from './SessionPlayers/SessionPlayers.js';
// import MyCharacterTable fromu './../UserPage/MyCharacters/MyCharacterTable.js';
import SessionEncounters from './SessionEncounters/SessionEncounters.js';

class SessionPage extends Component{

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
                {this.dmPcConditonal()}
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPage);