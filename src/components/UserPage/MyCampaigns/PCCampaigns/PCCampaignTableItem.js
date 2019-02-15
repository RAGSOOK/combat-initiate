import React, { Component } from 'react';
import { connect } from 'react-redux';

class PCCampaignTableItem extends Component {

    handleLeave = () => {
        console.log(this.props.campaign);
        const action = {
            type: 'LEAVE_CAMPAIGN',
            payload: this.props.campaign.id,
          }
        this.props.dispatch(action);
    }

    handleJoinSession =() => {
        const action = {type: 'SET_SESSION_CAMPAIGN',
                        payload: this.props.campaign}
        this.props.dispatch(action);
        this.props.history.push('/select-character')
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
