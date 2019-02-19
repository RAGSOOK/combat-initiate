import React, { Component } from 'react';
import { connect } from 'react-redux';
import SessionEncounters from './SessionEncounters/SessionEncounters.js';
import SessionCharacters from './SessionCharacters/SessionCharacters.js';

class DMSessionPage extends Component{
    constructor(props){
        super(props);

        this.props.socket.on('prevChars', (character) => this.props.addCharacter());
    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CAMPAIGN_ENCOUNTERS', 
                              payload: this.props.reduxStore.DmCampaigns.joinSessionDM.id,
                            });
        this.props.socket.emit('pollRoom', {room: this.props.roomId});
    }

    render(){
        return(
            <div>
                <h3>Current Player Characters</h3>
                <SessionCharacters characters={this.props.characters}
                                   socket={this.props.socket}
                                   roomId={this.props.roomId}/>
                <hr />
                <h3>Encounters for this campaign</h3>
                <SessionEncounters location={this.props.location} 
                                   socket={this.props.socket}
                                   roomId={this.props.roomId}/>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(DMSessionPage);