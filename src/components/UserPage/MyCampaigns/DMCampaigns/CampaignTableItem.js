import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignTableItem extends Component {

    handleEdit = () => {
        const action = {
                        type: 'SET_EDIT_CAMPAIGN',
                        payload: this.props.campaign,
                      }
        this.props.dispatch(action);
    }

    handleDelete = () => {
        console.log('trying to delete campaign:',this.props.campaign);
        const action = {
            type: 'DELETE_CAMPAIGN',
            payload: this.props.campaign,
          }
        this.props.dispatch(action);
    }

    handleJoinSession = () => {

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
