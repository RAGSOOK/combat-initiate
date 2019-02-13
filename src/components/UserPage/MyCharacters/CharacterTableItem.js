import React, { Component } from 'react';
import { connect } from 'react-redux';

class CharacterTableItem extends Component {

    handleEdit = () => {
        const action = {
            type: 'SET_EDIT_CHARACTER',
            payload: this.props.character,
            }
        this.props.dispatch(action);

        this.props.history.push('/edit-character');
    }

    render() {
        return (
            <tr>
                <td>{this.props.character.name}</td>
                <td><button onClick={this.handleEdit}>Edit Character</button></td>
            </tr>
        );
    }
}

export default connect()(CharacterTableItem);