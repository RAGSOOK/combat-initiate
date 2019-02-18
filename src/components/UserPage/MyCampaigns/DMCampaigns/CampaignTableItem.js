import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignTableItem extends Component {

    handleEdit = () => {
        const action = {
            type: 'SET_EDIT_CAMPAIGN',
            payload: this.props.campaign,
          }
        this.props.dispatch(action);
        const nextAction = {
            type: 'GET_CURRENT_PLAYERS',
            payload: this.props.campaign.id,
        }
        this.props.dispatch(nextAction);
        this.props.history.push('/edit-campaign');
    }

    handleDelete = () => {
        const action = {
            type: 'DELETE_CAMPAIGN',
            payload: this.props.campaign,
          }
        this.props.dispatch(action);
    }

    handleJoinSession = () => {
        const action = {type: 'SET_SESSION_CAMPAIGN',
                        payload: this.props.campaign}
        this.props.dispatch(action);
        this.props.history.push(`/session`);
    }

    render() {
        return (
            <tr>
                <td>{this.props.campaign.name}</td>
                <td><button onClick={this.handleJoinSession}>Join Session</button></td>
                <td><button onClick={this.handleEdit}>Edit</button></td>
                <td><button onClick={this.handleDelete}>Delete</button></td>
            </tr>
        );
    }
}

export default connect()(CampaignTableItem);
