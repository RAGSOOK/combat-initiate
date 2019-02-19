import React, { Component } from 'react';

class PCSessionPage extends Component{
    constructor(props){
        super(props);
        this.state={
            character: this.props.character,
        }

        this.props.socket.on('pollChars', () => this.submitChar());
    }

    submitChar = () => {
        this.props.socket.emit('polledChar', {room: this.props.roomId,
                                              character: this.state.character});
    }

    render(){
        return(
            <div>
                <p>You joined as {this.props.character.name}</p>
            </div>
        );
    }
}

export default PCSessionPage;