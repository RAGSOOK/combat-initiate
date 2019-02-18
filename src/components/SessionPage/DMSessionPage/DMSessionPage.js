import React, { Component } from 'react';
import { connect } from 'react-redux';
import SessionEncounters from '../SessionEncounters/SessionEncounters.js';

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

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(DMSessionPage);