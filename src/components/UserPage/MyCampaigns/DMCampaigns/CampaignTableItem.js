import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignTableItem extends Component {

    handleEdit = () => {
        const id = this.props.campaign.id;
        const action = {
                        type: 'SET_EDIT_CAMPAIGN',
                        payload: this.props.campaign,
                      }
        this.props.dispatch(action);
    }

    handleDelete = () => {
        const id = this.props.campaign.id;
        
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
