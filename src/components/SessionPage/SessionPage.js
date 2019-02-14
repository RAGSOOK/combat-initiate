import React, { Component } from 'react';
import { connect } from 'react-redux';

class SessionPage extends Component{
    render(){
        return(
            <div>
                <SessionPlayers />
                <SessionEncounters />

                <div>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(SessionPage);