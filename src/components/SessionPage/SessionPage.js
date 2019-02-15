import React, { Component } from 'react';
import { connect } from 'react-redux';
// import SessionPlayers from './SessionPlayers/SessionPlayers.js';
import MyCharacterTable from './../UserPage/MyCharacters/MyCharacterTable.js';
import SessionEncounters from './SessionEncounters/SessionEncounters.js';

class SessionPage extends Component{

    dmPcConditonal = () => {
        if(this.props.user.id === this.props.reduxStore.DmCampaigns.joinSessionDM.user_id){
            return(
                <div>
                    <MyCharacterTable />
                    <SessionEncounters />
                </div>
            );
        }
        else{
            return(
                <div></div>
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