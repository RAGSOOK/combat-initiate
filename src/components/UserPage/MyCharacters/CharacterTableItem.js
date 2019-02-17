import React, { Component } from 'react';
import { connect } from 'react-redux';

class CharacterTableItem extends Component {

    buttonConditional = () => {
        if(this.props.location.pathname === '/select-character'){
            return (
                <td><button onClick={this.handleSelect}>Select</button></td>
            );
        }else{
            return(
                <td><button onClick={this.handleEdit}>Edit Character</button></td>
            );
        }
    }

    handleSelect = () => {
        const action = {
            type: 'SET_SESSION_CHARACTER',
            payload: this.props.character,
            }
        this.props.dispatch(action);

        this.props.history.push(`/session/${this.props.reduxStore.DmCampaigns.joinSessionDM.user_id}`);
    }

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
                {this.buttonConditional()}
            </tr>
        );
    }
}

const mapStateToProps = reduxStore => ({ reduxStore: reduxStore });

export default connect(mapStateToProps)(CharacterTableItem);