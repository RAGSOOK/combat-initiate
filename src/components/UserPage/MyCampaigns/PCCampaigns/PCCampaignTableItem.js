import React, { Component } from 'react';
import { connect } from 'react-redux';

class PCCampaignTableItem extends Component {

    handleLeave = () => {
        const id = this.props.campaign.id;
    }

    handleJoinSession =() => {
        const id = this.props.campaign.id;
        
    }

    render() {
        return (
            <tr>
                <td>{this.props.campaign.name}</td>
                <td><button onClick={this.handleJoinSession}>Join Session</button></td>
                <td><button onClick={this.handleLeave}>Leave</button></td>
            </tr>
        );
    }
}

export default connect()(PCCampaignTableItem);
