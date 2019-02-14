import React, { Component } from 'react';
import { connect } from 'react-redux';

class EncounterPage extends Component{
    render(){
        return(
            <div>

            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(EncounterPage);