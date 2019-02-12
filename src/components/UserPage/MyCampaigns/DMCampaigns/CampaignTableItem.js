import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignTableItem extends Component {

    handleAddPlayer = () => {
        const id = this.props.campaign.id;
    }

    handleDelete =() => {
        const id = this.props.campaign.id;
        
    }

    render() {
        return (
            <tr>
                <td>{this.props.campaign.name}</td>
                <td><button onClick={this.handleAddPlayer}>Add Player</button></td>
                <td><button onClick={this.handleDelete}>Delete</button></td>
            </tr>
        );
    }
}

export default connect()(CampaignTableItem);
