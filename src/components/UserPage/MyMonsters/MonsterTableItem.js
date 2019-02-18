import React, { Component } from 'react';
import { connect } from 'react-redux';

class MonsterTableItem extends Component {

    buttonConditional = () => {
            return(
                <td><button onClick={this.handleEdit}>Edit Encounter</button></td>
            );
    }

    handleEdit = () => {
        const action = {
            type: 'SET_EDIT_MONSTER',
            payload: this.props.monster,
            }
        this.props.dispatch(action);

        this.props.history.push('/edit-monster');
    }

    render() {
        return (
            <tr>
                <td>{this.props.monster.name}</td>
                {this.buttonConditional()}
            </tr>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(MonsterTableItem);