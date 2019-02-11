import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampaignTableItem extends Component {
    constructor(props){
        super(props);

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
