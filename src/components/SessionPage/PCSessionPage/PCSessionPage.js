import React, { Component } from 'react';

class PCSessionPage extends Component{
    render(){
        return(
            <div>
                <p>You joined as {this.props.character.name}</p>
            </div>
        );
    }
}

export default PCSessionPage;