import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyEncounterTable from './MyEncounterTable.js';

class MyEncounters extends Component{

    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_ENCOUNTERS'});
    }

    handleAddEncounter = () => {
        this.props.history.push('/add-encounter');
    }

    render(){
        return(
            <div>
                <h4>Your Encounters</h4>
                <MyEncounterTable history={this.props.history}
                                  location={this.props.location}/> 
                <hr />
                <button onClick={this.handleAddEncounter}>Create New Encounter</button>
            </div>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MyEncounters);