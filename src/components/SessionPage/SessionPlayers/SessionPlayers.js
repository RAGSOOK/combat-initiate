import React, { Component } from 'react';
import { connect } from 'react-redux';

class SessionPlayers extends Component{
    render(){
        return(
            <div>

            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default (mapStateToProps)(SessionPlayers);