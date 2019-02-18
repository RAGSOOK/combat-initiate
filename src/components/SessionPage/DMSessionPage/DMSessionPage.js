import React, { Component } from 'react';
import SessionEncounters from './SessionEncounters/SessionEncounters.js';
import SessionCharacters from './SessionCharacters/SessionCharacters.js';

class DMSessionPage extends Component{
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

export default DMSessionPage;