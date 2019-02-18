import React, { Component } from 'react';

class SessionCharacterTableItem extends Component {


    render() {
        return (
            <tr>
                <td>{this.props.character.name}</td>
                {/* A button here later to display more stats on the character */}
            </tr>
        );
    }
}

export default SessionCharacterTableItem;