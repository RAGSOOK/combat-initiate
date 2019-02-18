import React, { Component } from 'react';
import SessionEncounters from './SessionEncounters/SessionEncounters.js';
import SessionCharacters from './SessionCharacters/SessionCharacters.js';

class DMSessionPage extends Component{
    render(){
        return(
            <div>
                <SessionCharacters characters={this.props.characters}/>
                <SessionEncounters />
            </div>
        );
    }
}

export default DMSessionPage;