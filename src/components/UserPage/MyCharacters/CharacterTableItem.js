import React, { Component } from 'react';
import { connect } from 'react-redux';

class CharacterTableItem extends Component {


    render() {
        return (
            <tr>
                <td>{this.props.character.name}</td>
                {/* <td><button onClick={this.handleJoinSession}>Join Session</button></td>
                <td><button onClick={this.handleLeave}>Leave</button></td> */}
            </tr>
        );
    }
}

export default connect()(CharacterTableItem);