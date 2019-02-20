import React, { Component } from 'react';

class InitiativeTableItem extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.actor.name}</td>
                {/* A button here later to display more stats on the character */}
            </tr>
        );
    }
}

export default InitiativeTableItem;