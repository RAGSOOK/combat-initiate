import React, { Component } from 'react';
import { connect } from 'react-redux';

class EncounterTableItem extends Component {

    buttonConditional = () => {
        if(this.props.location.pathname === '/session'){
            return (
                <td><button onClick={this.handleSelect}>Start</button></td>
            );
        }else{
            return(
                <td><button onClick={this.handleEdit}>Edit Encounter</button></td>
            );
        }
    }

    handleSelect = () => {
        const action = {
            type: 'SET_SESSION_ENCOUNTER',
            payload: this.props.encounter,
        };
        this.props.dispatch(action);

        const nextAction = {
            type: 'FETCH_SESSION_MONSTERS',
            payload: this.props.encounter,
        };
        this.props.dispatch(nextAction);
        
        const data = {room: this.props.roomId,
                      encounter: this.props.encounter};
        this.props.socket.emit('startEncounter', data);

    }

    handleEdit = () => {
        const action = {
            type: 'SET_EDIT_ENCOUNTER',
            payload: this.props.encounter,
            }
        this.props.dispatch(action);

        this.props.history.push('/edit-encounter');
    }

    render() {
        return (
            <tr>
                <td>{this.props.encounter.name}</td>
                {this.buttonConditional()}
            </tr>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(EncounterTableItem);