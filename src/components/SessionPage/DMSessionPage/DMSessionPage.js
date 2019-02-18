import React, { Component } from 'react';
import { connect } from 'react-redux';
import SessionEncounters from './SessionEncounters/SessionEncounters.js';
import SessionCharacters from './SessionCharacters/SessionCharacters.js';

class DMSessionPage extends Component{

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_CAMPAIGN_ENCOUNTERS', 
                              payload: this.props.reduxStore.DmCampaigns.joinSessionDM.id,
                            });
    }

    render(){
        return(
            <div>
                <h3>Current Player Characters</h3>
                <SessionCharacters characters={this.props.characters}/>
                <hr />
                <h3>Encounters for this campaign</h3>
                <SessionEncounters location={this.props.location} />
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(DMSessionPage);